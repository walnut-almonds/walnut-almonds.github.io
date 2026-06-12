const fs = require('fs');
const vm = require('vm');

function makeDocument(nodes = []) {
    return {
        addEventListener(event, callback) {
            if (event === 'DOMContentLoaded') callback();
        },
        getElementById() { return null; },
        querySelectorAll(selector) {
            if (selector === '[data-i18n]') return nodes;
            if (selector === '[data-i18n-aria]') return [];
            return [];
        },
        querySelector() { return null; },
        documentElement: { lang: '' },
        title: 'Qrumi'
    };
}

async function runScenario({ lang, nodes = [], localeMap = {} }) {
    const storage = {};
    const fetched = [];
    const document = makeDocument(nodes);

    const context = {
        document,
        window: {
            location: { pathname: '/', search: '', hash: '' },
            history: { replaceState(_, __, url) { } }
        },
        localStorage: {
            getItem(key) { return storage[key] || null; },
            setItem(key, value) { storage[key] = String(value); }
        },
        navigator: { language: lang },
        URLSearchParams,
        fetch: async (path) => {
            fetched.push(path);
            return {
                ok: true,
                json: async () => localeMap[path.replace('locales/', '').replace('.json', '')] || {}
            };
        },
        console: { error: () => { } }
    };

    vm.createContext(context);
    vm.runInContext(fs.readFileSync('script.js', 'utf8'), context);

    // Allow the async DOMContentLoaded handler to run and resolve fetches.
    await new Promise((resolve) => setTimeout(resolve, 20));

    return { fetched, storage, document };
}

(async () => {
    const unsupported = await runScenario({
        lang: 'fr',
        localeMap: {
            en: {
                lang: { label: 'English', short: 'EN' },
                meta: { title: 'Qrumi', description: 'English desc' },
                resume: { name: 'English Name' }
            }
        }
    });

    const chineseVariant = await runScenario({
        lang: 'zh-sg',
        localeMap: {
            'zh-TW': {
                lang: { label: '繁體中文', short: 'TW' },
                meta: { title: 'Qrumi', description: 'TW desc' },
                resume: { name: 'TW Name' }
            }
        }
    });

    const node = {
        _attrs: { 'data-i18n': 'nav.projects' },
        textContent: '',
        getAttribute(name) { return this._attrs[name] || null; },
        setAttribute(name, value) { this._attrs[name] = value; }
    };

    const fallback = await runScenario({
        lang: 'ja',
        nodes: [node],
        localeMap: {
            ja: { meta: { title: 'Qrumi', description: 'JA desc' } },
            en: { meta: { title: 'Qrumi', description: 'EN desc' }, nav: { projects: 'Projects' } }
        }
    });

    console.log(JSON.stringify({
        unsupportedLangStored: unsupported.storage['site-lang'],
        unsupportedFetches: unsupported.fetched,
        chineseVariantStored: chineseVariant.storage['site-lang'],
        chineseVariantFetches: chineseVariant.fetched,
        fallbackText: fallback.document.querySelectorAll('[data-i18n]')[0].textContent,
        fallbackFetches: fallback.fetched
    }, null, 2));
})();
