const fs = require('fs');
const vm = require('vm');

function makeDocument(nodes = []) {
    const alternateLinks = [];
    const metaTags = {
        description: { setAttribute(name, value) { this[name] = value; }, getAttribute(name) { return this[name]; } },
        ogTitle: { setAttribute(name, value) { this[name] = value; }, getAttribute(name) { return this[name]; } },
        ogDescription: { setAttribute(name, value) { this[name] = value; }, getAttribute(name) { return this[name]; } },
        ogUrl: { setAttribute(name, value) { this[name] = value; }, getAttribute(name) { return this[name]; } },
        ogLocale: { setAttribute(name, value) { this[name] = value; }, getAttribute(name) { return this[name]; } },
        twitterTitle: { setAttribute(name, value) { this[name] = value; }, getAttribute(name) { return this[name]; } },
        twitterDescription: { setAttribute(name, value) { this[name] = value; }, getAttribute(name) { return this[name]; } },
        canonical: { setAttribute(name, value) { this[name] = value; }, getAttribute(name) { return this[name]; } }
    };

    return {
        addEventListener(event, callback) {
            if (event === 'DOMContentLoaded') callback();
        },
        dispatchEvent() { },
        getElementById() { return null; },
        querySelectorAll(selector) {
            if (selector === '[data-i18n]') return nodes;
            if (selector === '[data-i18n-aria]') return [];
            if (selector === 'link[rel="alternate"]') return alternateLinks;
            return [];
        },
        querySelector(selector) {
            if (selector === 'meta[name="description"]') return metaTags.description;
            if (selector === 'meta[property="og:title"]') return metaTags.ogTitle;
            if (selector === 'meta[property="og:description"]') return metaTags.ogDescription;
            if (selector === 'meta[property="og:url"]') return metaTags.ogUrl;
            if (selector === 'meta[property="og:locale"]') return metaTags.ogLocale;
            if (selector === 'meta[name="twitter:title"]') return metaTags.twitterTitle;
            if (selector === 'meta[name="twitter:description"]') return metaTags.twitterDescription;
            if (selector === 'link[rel="canonical"]') return metaTags.canonical;
            return null;
        },
        createElement(tagName) {
            const node = {
                tagName: String(tagName || '').toLowerCase(),
                attributes: {},
                setAttribute(name, value) {
                    this.attributes[name] = value;
                    this[name] = value;
                },
                getAttribute(name) {
                    return this.attributes[name];
                },
                remove() { }
            };
            return node;
        },
        head: {
            appendChild(node) {
                alternateLinks.push(node);
                return node;
            }
        },
        documentElement: {
            lang: '',
            classList: {
                remove() { },
                add() { }
            }
        },
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
            location: { origin: 'https://qrumi.org', pathname: '/', search: '', hash: '' },
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
        console: { error: () => { } },
        CustomEvent: function CustomEvent(type, details) {
            return { type, detail: details && details.detail ? details.detail : {} };
        },
        document
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

    const seoScenario = await runScenario({
        lang: 'ja',
        nodes: [],
        localeMap: {
            ja: { meta: { title: 'Qrumi', description: 'JA desc' } },
            en: { meta: { title: 'Qrumi', description: 'EN desc' } }
        }
    });

    const alternateCount = seoScenario.document.querySelectorAll('link[rel="alternate"]').length;
    const ogLocale = seoScenario.document.querySelector('meta[property="og:locale"]');

    console.log(JSON.stringify({
        unsupportedLangStored: unsupported.storage['site-lang'],
        unsupportedFetches: unsupported.fetched,
        chineseVariantStored: chineseVariant.storage['site-lang'],
        chineseVariantFetches: chineseVariant.fetched,
        fallbackText: fallback.document.querySelectorAll('[data-i18n]')[0].textContent,
        fallbackFetches: fallback.fetched,
        alternateHrefCount: alternateCount,
        ogLocaleValue: ogLocale ? ogLocale.getAttribute('content') : null,
        documentLang: seoScenario.document.documentElement.lang
    }, null, 2));

    if (unsupported.storage['site-lang'] !== 'en') throw new Error('Expected fallback language to normalize to English');
    if (chineseVariant.storage['site-lang'] !== 'zh-TW') throw new Error('Expected zh-sg to normalize to zh-TW');
    if (fallback.document.querySelectorAll('[data-i18n]')[0].textContent !== 'Projects') throw new Error('Expected fallback locale text to be applied');
    if (alternateCount < 5) throw new Error('Expected SEO alternate links to be generated');
    if (!ogLocale || ogLocale.getAttribute('content') !== 'ja_JP') throw new Error('Expected OG locale tag to update for Japanese');
})();
