document.addEventListener('DOMContentLoaded', () => {
    const LANG_KEY = 'site-lang';
    const DEFAULT_LANG = 'en';
    const SUPPORTED_LANGS = ['zh-TW', 'zh-CN', 'ja', 'en'];
    const FALLBACK_LANG = 'en';
    const LANG_SHORT = {
        'zh-TW': 'TW',
        'zh-CN': 'CN',
        ja: 'JA',
        en: 'EN'
    };
    const translationCache = {};
    const dropdownControllers = [];

    function normalizeLang(code) {
        const fallback = String(code || '').toLowerCase();

        if (fallback.startsWith('zh-cn') || fallback.startsWith('zh-hans')) return 'zh-CN';
        if (fallback.startsWith('zh')) return 'zh-TW';
        if (fallback.startsWith('ja') || fallback === 'jp') return 'ja';
        if (fallback.startsWith('en')) return 'en';

        return DEFAULT_LANG;
    }

    function getInitialLanguage() {
        const queryLang = new URLSearchParams(window.location.search).get('lang');
        if (queryLang) return normalizeLang(queryLang);

        const storedLang = localStorage.getItem(LANG_KEY);
        if (storedLang && SUPPORTED_LANGS.includes(storedLang)) return storedLang;

        return normalizeLang(navigator.language || DEFAULT_LANG);
    }

    function setActiveLanguage(lang) {
        dropdownControllers.forEach((controller) => controller.setValue(lang));
    }

    function setupLanguageDropdown(rootId, onSelect) {
        const root = document.getElementById(rootId);
        if (!root) return null;

        const trigger = root.querySelector('.lang-select-trigger');
        const menu = root.querySelector('.lang-menu');
        const current = root.querySelector('.lang-current');
        const options = Array.from(root.querySelectorAll('.lang-option'));
        if (!trigger || !menu || !current || options.length === 0) return null;

        const close = () => {
            menu.classList.add('hidden');
            root.classList.remove('is-open');
            trigger.setAttribute('aria-expanded', 'false');
        };

        const open = () => {
            menu.classList.remove('hidden');
            root.classList.add('is-open');
            trigger.setAttribute('aria-expanded', 'true');
        };

        const setValue = (lang) => {
            const resolved = SUPPORTED_LANGS.includes(lang) ? lang : DEFAULT_LANG;
            current.textContent = LANG_SHORT[resolved] || LANG_SHORT[DEFAULT_LANG];

            options.forEach((option) => {
                const isSelected = option.dataset.lang === resolved;
                option.setAttribute('aria-selected', String(isSelected));
            });
        };

        trigger.addEventListener('click', () => {
            if (menu.classList.contains('hidden')) {
                open();
            } else {
                close();
            }
        });

        trigger.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                open();
                const selected = options.find((option) => option.getAttribute('aria-selected') === 'true') || options[0];
                selected.focus();
            }
            if (event.key === 'Escape') {
                close();
            }
        });

        options.forEach((option, index) => {
            option.addEventListener('click', () => {
                const lang = option.dataset.lang;
                if (!lang) return;
                onSelect(lang);
                close();
            });

            option.addEventListener('keydown', (event) => {
                if (event.key === 'Escape') {
                    event.preventDefault();
                    close();
                    trigger.focus();
                    return;
                }

                if (event.key === 'ArrowDown') {
                    event.preventDefault();
                    const nextIndex = (index + 1) % options.length;
                    options[nextIndex].focus();
                }

                if (event.key === 'ArrowUp') {
                    event.preventDefault();
                    const prevIndex = (index - 1 + options.length) % options.length;
                    options[prevIndex].focus();
                }
            });
        });

        document.addEventListener('click', (event) => {
            if (!root.contains(event.target)) {
                close();
            }
        });

        return { close, setValue };
    }

    function resolveValue(root, key) {
        return String(key || '')
            .split('.')
            .reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), root);
    }

    function buildLocaleCandidates(lang) {
        const fileName = `${lang}.json`;
        const candidates = [];
        const seen = new Set();

        const addCandidate = (value) => {
            if (!value || seen.has(value)) return;
            seen.add(value);
            candidates.push(value);
        };

        // Same-directory relative path (works for root and many static hosts).
        addCandidate(`locales/${fileName}`);

        const { origin, pathname } = window.location;
        const segments = pathname.split('/').filter(Boolean);
        const repoSegment = segments.length > 0 ? segments[0] : '';

        // Absolute root path.
        addCandidate(`${origin}/locales/${fileName}`);

        // GitHub Pages project path (e.g. /repo-name/locales/*.json).
        if (repoSegment) {
            addCandidate(`${origin}/${repoSegment}/locales/${fileName}`);
        }

        return candidates;
    }

    async function fetchLocale(lang) {
        const candidates = buildLocaleCandidates(lang);
        let lastError = null;

        for (const path of candidates) {
            try {
                const response = await fetch(path, { cache: 'no-cache' });
                if (!response.ok) {
                    lastError = new Error(`Locale fetch failed (${response.status}) for ${path}`);
                    continue;
                }
                return await response.json();
            } catch (error) {
                lastError = error;
            }
        }

        throw lastError || new Error(`Unable to load locale: ${lang}`);
    }

    function applyTranslations(lang, payload, fallbackPayload) {
        const root = payload || {};
        const fallbackRoot = fallbackPayload || {};

        document.querySelectorAll('[data-i18n]').forEach((node) => {
            const key = node.getAttribute('data-i18n');
            const value = resolveValue(root, key);
            const fallbackValue = resolveValue(fallbackRoot, key);
            const finalValue = (typeof value === 'string' && value.trim().length > 0) ? value : fallbackValue;

            if (typeof finalValue === 'string' && finalValue.trim().length > 0) {
                node.textContent = finalValue;
            }
        });

        document.querySelectorAll('[data-i18n-aria]').forEach((node) => {
            const key = node.getAttribute('data-i18n-aria');
            const value = resolveValue(root, key);
            const fallbackValue = resolveValue(fallbackRoot, key);
            const finalValue = (typeof value === 'string' && value.trim().length > 0) ? value : fallbackValue;

            if (typeof finalValue === 'string' && finalValue.trim().length > 0) {
                node.setAttribute('aria-label', finalValue);
                node.setAttribute('title', finalValue);
            }
        });

        const metaDescription = document.querySelector('meta[name="description"]');
        const metaValue = resolveValue(root, 'meta.description');
        const metaFallback = resolveValue(fallbackRoot, 'meta.description');
        const finalMeta = (typeof metaValue === 'string' && metaValue.trim().length > 0) ? metaValue : metaFallback;

        if (metaDescription && typeof finalMeta === 'string' && finalMeta.trim().length > 0) {
            metaDescription.setAttribute('content', finalMeta);
        }

        document.documentElement.lang = lang;
        document.title = resolveValue(root, 'meta.title') || resolveValue(fallbackRoot, 'meta.title') || document.title;
        setActiveLanguage(lang);
    }

    async function loadLanguage(lang) {
        const targetLang = normalizeLang(lang);

        try {
            if (!translationCache[targetLang]) {
                translationCache[targetLang] = await fetchLocale(targetLang);
            }

            if (!translationCache[FALLBACK_LANG]) {
                translationCache[FALLBACK_LANG] = await fetchLocale(FALLBACK_LANG);
            }

            applyTranslations(targetLang, translationCache[targetLang], translationCache[FALLBACK_LANG]);
            localStorage.setItem(LANG_KEY, targetLang);
            window.history.replaceState({}, '', `${window.location.pathname}?lang=${targetLang}${window.location.hash}`);
        } catch (error) {
            console.error('Translation load failed:', error);
            if (targetLang !== FALLBACK_LANG) {
                loadLanguage(FALLBACK_LANG);
            }
        }
    }

    // Mobile menu toggle
    const menuBtn = document.getElementById('mobile-menu-btn');
    const menuDrawer = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('mobile-menu-icon');

    if (menuBtn && menuDrawer) {
        menuBtn.addEventListener('click', () => {
            const isOpen = !menuDrawer.classList.contains('hidden');
            menuDrawer.classList.toggle('hidden', isOpen);
            menuIcon.textContent = isOpen ? 'menu' : 'close';
            menuBtn.setAttribute('aria-expanded', String(!isOpen));
        });

        menuDrawer.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                menuDrawer.classList.add('hidden');
                menuIcon.textContent = 'menu';
                menuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    const desktopDropdown = setupLanguageDropdown('lang-dropdown-desktop', (lang) => loadLanguage(lang));
    if (desktopDropdown) dropdownControllers.push(desktopDropdown);

    const mobileDropdown = setupLanguageDropdown('lang-dropdown-mobile', (lang) => {
        loadLanguage(lang);

        if (menuBtn && menuDrawer && menuIcon) {
            menuDrawer.classList.add('hidden');
            menuIcon.textContent = 'menu';
            menuBtn.setAttribute('aria-expanded', 'false');
        }
    });
    if (mobileDropdown) dropdownControllers.push(mobileDropdown);

    loadLanguage(getInitialLanguage());

    // Three.js canvas
    const canvas = document.getElementById('three-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2('#131313', 0.015);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 25;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const nodesCount = 150;
    const connectionsCount = 450;
    const radius = 10;

    const nodesGeometry = new THREE.BufferGeometry();
    const nodesPositions = new Float32Array(nodesCount * 3);
    const nodesColors = new Float32Array(nodesCount * 3);

    const nodeData = [];
    const colors = [new THREE.Color('#00f3ff'), new THREE.Color('#ff00ff')];

    for (let i = 0; i < nodesCount; i++) {
        const i3 = i * 3;
        const phi = Math.acos(-1 + (2 * i) / nodesCount);
        const theta = Math.sqrt(nodesCount * Math.PI) * phi;

        const r = radius + (Math.random() - 0.5) * 4;

        const x = r * Math.cos(theta) * Math.sin(phi);
        const y = r * Math.sin(theta) * Math.sin(phi);
        const z = r * Math.cos(phi);

        nodesPositions[i3] = x;
        nodesPositions[i3 + 1] = y;
        nodesPositions[i3 + 2] = z;

        const color = colors[Math.floor(Math.random() * colors.length)];
        nodesColors[i3] = color.r;
        nodesColors[i3 + 1] = color.g;
        nodesColors[i3 + 2] = color.b;

        nodeData.push({ pos: new THREE.Vector3(x, y, z), color: color });
    }

    nodesGeometry.setAttribute('position', new THREE.BufferAttribute(nodesPositions, 3));
    nodesGeometry.setAttribute('color', new THREE.BufferAttribute(nodesColors, 3));
    const nodesMaterial = new THREE.PointsMaterial({ size: 0.18, vertexColors: true, transparent: true, opacity: 0.9 });
    const nodesMesh = new THREE.Points(nodesGeometry, nodesMaterial);
    scene.add(nodesMesh);

    const lineMaterial = new THREE.LineBasicMaterial({ color: '#333333', transparent: true, opacity: 0.3 });
    const lineGroup = new THREE.Group();

    const pulses = [];

    for (let i = 0; i < connectionsCount; i++) {
        const idxA = Math.floor(Math.random() * nodesCount);
        const idxB = Math.floor(Math.random() * nodesCount);
        const nodeA = nodeData[idxA];
        const nodeB = nodeData[idxB];

        if (nodeA.pos.distanceTo(nodeB.pos) < 12) {
            const lineGeometry = new THREE.BufferGeometry().setFromPoints([nodeA.pos, nodeB.pos]);
            const line = new THREE.Line(lineGeometry, lineMaterial);
            lineGroup.add(line);

            if (Math.random() > 0.85) {
                pulses.push({
                    start: nodeA.pos,
                    end: nodeB.pos,
                    color: nodeA.color,
                    progress: Math.random(),
                    speed: 0.005 + Math.random() * 0.01
                });
            }
        }
    }
    scene.add(lineGroup);

    const pulsePointGeo = new THREE.SphereGeometry(0.1, 8, 8);
    const pulseMeshes = pulses.map((p) => {
        const pulsePointMat = new THREE.MeshBasicMaterial({ color: p.color });
        const m = new THREE.Mesh(pulsePointGeo, pulsePointMat);
        scene.add(m);
        return m;
    });

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.03;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    let animationId;

    function animate() {
        animationId = requestAnimationFrame(animate);
        const time = performance.now() * 0.001;

        pulses.forEach((p, i) => {
            p.progress += p.speed;
            if (p.progress > 1) p.progress = 0;
            pulseMeshes[i].position.lerpVectors(p.start, p.end, p.progress);
            pulseMeshes[i].scale.setScalar(0.5 + Math.sin(time * 8 + i) * 0.5);
        });

        nodesMesh.rotation.y = time * 0.05;
        lineGroup.rotation.y = time * 0.05;

        controls.update();
        renderer.render(scene, camera);
    }

    animate();

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }, 100);
    });
});
