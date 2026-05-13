document.addEventListener('DOMContentLoaded', () => {
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

        // Close menu when a nav link is clicked
        menuDrawer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuDrawer.classList.add('hidden');
                menuIcon.textContent = 'menu';
                menuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

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

    function animate() {
        requestAnimationFrame(animate);
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

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});
