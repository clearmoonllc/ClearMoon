/**
 * ClearMoon MSP — Shared JavaScript
 * Loaded on every page via <script src="dist/js/shared.js" defer></script>
 * 
 * PERFORMANCE: Only the active hero scene animates.
 * All inactive scene canvases are paused to save CPU/GPU.
 */

document.addEventListener('DOMContentLoaded', function () {

    // ========================================================================
    // STARFIELD CANVAS (with comets + easter egg)
    // ========================================================================
    const canvas = document.getElementById('starfield');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let stars = [];
        let comet = null;
        let easterEgg = null;
        let lastCometTime = 0;
        const COMET_INTERVAL = 20000;
        let animating = true;

        let shipImage = new Image();
        let shipLoaded = false;

        const shipSvgElement = document.getElementById('easter-egg-ship');
        if (shipSvgElement) {
            const serializer = new XMLSerializer();
            const svgString = serializer.serializeToString(shipSvgElement);
            const fullSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="16">${svgString}</svg>`;
            shipImage.onload = () => { shipLoaded = true; };
            shipImage.src = `data:image/svg+xml;base64,${window.btoa(fullSvg)}`;
        }

        function setCanvasSize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        function createStars() {
            stars = [];
            const numStars = window.innerWidth > 768 ? 150 : 80;
            for (let i = 0; i < numStars; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 1.5,
                    alpha: Math.random() * 0.5 + 0.2,
                    velocity: (Math.random() - 0.5) * 0.02
                });
            }
        }

        function spawnComet() {
            const side = Math.floor(Math.random() * 4);
            let x, y, dx, dy;
            const speed = Math.random() * 2 + 1;
            switch (side) {
                case 0: x = Math.random() * canvas.width; y = 0; dx = (Math.random() - 0.5) * 2; dy = speed; break;
                case 1: x = canvas.width; y = Math.random() * canvas.height; dx = -speed; dy = (Math.random() - 0.5) * 2; break;
                case 2: x = Math.random() * canvas.width; y = canvas.height; dx = (Math.random() - 0.5) * 2; dy = -speed; break;
                case 3: x = 0; y = Math.random() * canvas.height; dx = speed; dy = (Math.random() - 0.5) * 2; break;
            }
            comet = { x, y, dx, dy, radius: 2, alpha: 1, length: 15 };
            lastCometTime = Date.now();
        }

        function spawnEasterEgg() {
            if (easterEgg || !shipLoaded) return;
            const y = Math.random() * canvas.height * 0.8 + canvas.height * 0.1;
            easterEgg = { x: -40, y, dx: 0.5, width: 32, height: 16 };
        }

        setInterval(() => { if (Math.random() < 0.01) spawnEasterEgg(); }, 60000);

        function draw() {
            if (!animating) { requestAnimationFrame(draw); return; }
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#CCD6F6';
            stars.forEach(star => {
                star.alpha += star.velocity;
                if (star.alpha <= 0.2 || star.alpha >= 0.7) star.velocity = -star.velocity;
                ctx.globalAlpha = star.alpha;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.globalAlpha = 1;

            if (!comet && Date.now() - lastCometTime > COMET_INTERVAL) {
                if (Math.random() < 0.01) spawnComet();
            }
            if (comet) {
                comet.x += comet.dx;
                comet.y += comet.dy;
                const grad = ctx.createLinearGradient(comet.x, comet.y, comet.x - comet.dx * comet.length, comet.y - comet.dy * comet.length);
                grad.addColorStop(0, `rgba(255, 255, 255, ${comet.alpha})`);
                grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
                ctx.strokeStyle = grad;
                ctx.lineWidth = comet.radius;
                ctx.beginPath();
                ctx.moveTo(comet.x, comet.y);
                ctx.lineTo(comet.x - comet.dx * comet.length, comet.y - comet.dy * comet.length);
                ctx.stroke();
                if (comet.x < -20 || comet.x > canvas.width + 20 || comet.y < -20 || comet.y > canvas.height + 20) comet = null;
            }

            if (easterEgg) {
                easterEgg.x += easterEgg.dx;
                ctx.drawImage(shipImage, easterEgg.x, easterEgg.y, easterEgg.width, easterEgg.height);
                if (easterEgg.x > canvas.width + 50) easterEgg = null;
            }

            requestAnimationFrame(draw);
        }

        setCanvasSize();
        createStars();
        draw();
        let sfResizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(sfResizeTimer);
            sfResizeTimer = setTimeout(() => { setCanvasSize(); createStars(); }, 150);
        });

        document.addEventListener('visibilitychange', () => {
            animating = !document.hidden;
        });
    }

    // ========================================================================
    // INTERSECTION OBSERVER (fade-in-up animations)
    // ========================================================================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));

    // ========================================================================
    // MOBILE MENU
    // ========================================================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOpenIcon = document.getElementById('menu-open-icon');
    const menuCloseIcon = document.getElementById('menu-close-icon');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isExpanded = mobileMenu.classList.toggle('hidden');
            mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
            if (menuOpenIcon) menuOpenIcon.classList.toggle('hidden');
            if (menuCloseIcon) menuCloseIcon.classList.toggle('hidden');
        });

        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                if (menuOpenIcon) menuOpenIcon.classList.remove('hidden');
                if (menuCloseIcon) menuCloseIcon.classList.add('hidden');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    ['mobile-cases', 'mobile-tools'].forEach(prefix => {
        const btn = document.getElementById(`${prefix}-btn`);
        const dropdown = document.getElementById(`${prefix}-dropdown`);
        if (btn && dropdown) {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdown.classList.toggle('hidden');
                const svg = btn.querySelector('svg');
                if (svg) svg.classList.toggle('rotate-180');
            });
        }
    });

    // ========================================================================
    // FAQ ACCORDION
    // ========================================================================
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.faq-item');
            const wasOpen = item.classList.contains('open');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
            if (!wasOpen) item.classList.add('open');
        });
    });

    // ========================================================================
    // STATS COUNT-UP ANIMATION
    // ========================================================================
    const statEls = document.querySelectorAll('[data-count-to]');
    if (statEls.length) {
        const countObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.dataset.countTo, 10);
                    const suffix = el.dataset.countSuffix || '';
                    const prefix = el.dataset.countPrefix || '';
                    const duration = 2000;
                    const start = performance.now();

                    function update(now) {
                        const elapsed = now - start;
                        const progress = Math.min(elapsed / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        const current = Math.round(eased * target);
                        el.textContent = prefix + current.toLocaleString() + suffix;
                        if (progress < 1) requestAnimationFrame(update);
                    }
                    requestAnimationFrame(update);
                    countObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });
        statEls.forEach(el => countObserver.observe(el));
    }

    // ========================================================================
    // HERO SCENE MANAGER (10 scenes — only active scene animates)
    // ========================================================================
    const scenesContainer = document.getElementById('hero-scenes');
    if (scenesContainer) {
        const scenes = scenesContainer.querySelectorAll('.hero-scene');
        const dots = document.querySelectorAll('.scene-dot');
        const label = document.getElementById('scene-label');
        let currentScene = 0;
        let sceneInterval;
        const SCENE_DURATION = 15000;

        // Track which scene index is active so renderers can skip work
        let activeSceneIndex = 0;

        const sceneNames = [
            'ORBITAL MAP', 'NETWORK GRID', 'CIPHER DECODE',
            'SAT CONSTELLATION', 'FIREWALL MATRIX', 'SIGNAL ANALYZER',
            'DOCKING SEQ', 'QUANTUM LINK', 'SERVER HEATMAP', 'RADAR SWEEP',
            'WARP TRANSIT', 'PLANETARY SCAN'
        ];

        function activateScene(index) {
            index = Math.max(0, Math.min(index, scenes.length - 1));
            scenes.forEach(s => s.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));
            if (scenes[index]) scenes[index].classList.add('active');
            if (dots[index]) dots[index].classList.add('active');
            if (label) label.textContent = `[ ${sceneNames[index] || 'SCENE ' + (index + 1)} ]`;
            currentScene = index;
            activeSceneIndex = index;
        }

        function nextScene() {
            activateScene((currentScene + 1) % scenes.length);
        }

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                clearInterval(sceneInterval);
                activateScene(i);
                sceneInterval = setInterval(nextScene, SCENE_DURATION);
            });
        });

        // Arrow buttons for prev/next
        const prevBtn = document.getElementById('scene-prev');
        const nextBtn = document.getElementById('scene-next');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                clearInterval(sceneInterval);
                activateScene((currentScene - 1 + scenes.length) % scenes.length);
                sceneInterval = setInterval(nextScene, SCENE_DURATION);
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                clearInterval(sceneInterval);
                nextScene();
                sceneInterval = setInterval(nextScene, SCENE_DURATION);
            });
        }

        // Stabilize: use rAF for first paint
        requestAnimationFrame(() => {
            activateScene(0);
            sceneInterval = setInterval(nextScene, SCENE_DURATION);
        });

        // Pause cycling when tab is hidden
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                clearInterval(sceneInterval);
            } else {
                sceneInterval = setInterval(nextScene, SCENE_DURATION);
            }
        });

        // --- SCENE 2: Network Topology Canvas (index 1) ---
        const topoCanvas = document.getElementById('topo-canvas');
        if (topoCanvas) {
            const tctx = topoCanvas.getContext('2d');
            const W = 300, H = 300;
            topoCanvas.width = W; topoCanvas.height = H;
            const center = { x: W / 2, y: H / 2, r: 8 };
            const nodes = [];
            const packets = [];
            for (let i = 0; i < 10; i++) {
                const angle = (i / 10) * Math.PI * 2;
                const radius = 90 + Math.random() * 40;
                nodes.push({
                    x: W / 2 + Math.cos(angle) * radius, y: H / 2 + Math.sin(angle) * radius,
                    r: 4 + Math.random() * 3,
                    baseX: W / 2 + Math.cos(angle) * radius, baseY: H / 2 + Math.sin(angle) * radius,
                    phase: Math.random() * Math.PI * 2, status: 'ok', threatTimer: 0
                });
            }
            setInterval(() => {
                if (activeSceneIndex !== 1) return;
                const from = nodes[Math.floor(Math.random() * nodes.length)];
                const toC = Math.random() > 0.5;
                packets.push({ x: toC ? from.x : center.x, y: toC ? from.y : center.y, tx: toC ? center.x : from.x, ty: toC ? center.y : from.y, progress: 0, speed: 0.008 + Math.random() * 0.012 });
            }, 600);
            setInterval(() => { if (activeSceneIndex !== 1) return; const n = nodes[Math.floor(Math.random() * nodes.length)]; if (n.status === 'ok') { n.status = 'threat'; n.threatTimer = 120; } }, 5000);

            function drawTopo() {
                if (activeSceneIndex !== 1) { requestAnimationFrame(drawTopo); return; }
                tctx.clearRect(0, 0, W, H);
                const t = performance.now() * 0.001;
                nodes.forEach(node => {
                    node.x = node.baseX + Math.sin(t + node.phase) * 3;
                    node.y = node.baseY + Math.cos(t * 0.7 + node.phase) * 3;
                    tctx.beginPath(); tctx.moveTo(center.x, center.y); tctx.lineTo(node.x, node.y);
                    tctx.strokeStyle = node.status === 'threat' ? 'rgba(255, 107, 107, 0.3)' : 'rgba(100, 255, 218, 0.15)';
                    tctx.lineWidth = 1; tctx.stroke();
                });
                for (let i = packets.length - 1; i >= 0; i--) {
                    const p = packets[i]; p.progress += p.speed;
                    if (p.progress >= 1) { packets.splice(i, 1); continue; }
                    tctx.beginPath(); tctx.arc(p.x + (p.tx - p.x) * p.progress, p.y + (p.ty - p.y) * p.progress, 2, 0, Math.PI * 2);
                    tctx.fillStyle = 'rgba(100, 255, 218, 0.8)'; tctx.fill();
                }
                tctx.beginPath(); tctx.arc(center.x, center.y, center.r, 0, Math.PI * 2);
                tctx.fillStyle = 'rgba(100, 255, 218, 0.15)'; tctx.fill();
                tctx.strokeStyle = 'rgba(100, 255, 218, 0.6)'; tctx.lineWidth = 2; tctx.stroke();
                nodes.forEach(node => {
                    if (node.status === 'threat') { node.threatTimer--; if (node.threatTimer <= 0) node.status = 'ok'; }
                    const c = node.status === 'threat' ? '#FF6B6B' : 'rgba(100, 255, 218, 0.8)';
                    const g = node.status === 'threat' ? 'rgba(255, 107, 107, 0.4)' : 'rgba(100, 255, 218, 0.2)';
                    tctx.beginPath(); tctx.arc(node.x, node.y, node.r + 4, 0, Math.PI * 2); tctx.fillStyle = g; tctx.fill();
                    tctx.beginPath(); tctx.arc(node.x, node.y, node.r, 0, Math.PI * 2); tctx.fillStyle = c; tctx.fill();
                });
                requestAnimationFrame(drawTopo);
            }
            drawTopo();

            // --- Interactivity: hover to highlight node, click to toggle threat ---
            let hoveredNode = null;
            topoCanvas.style.cursor = 'default';
            topoCanvas.addEventListener('mousemove', (e) => {
                if (activeSceneIndex !== 1) return;
                const rect = topoCanvas.getBoundingClientRect();
                const scaleX = W / rect.width;
                const scaleY = H / rect.height;
                const mx = (e.clientX - rect.left) * scaleX;
                const my = (e.clientY - rect.top) * scaleY;
                hoveredNode = null;
                nodes.forEach(n => {
                    const dx = mx - n.x, dy = my - n.y;
                    if (Math.sqrt(dx*dx + dy*dy) < 12) hoveredNode = n;
                });
                topoCanvas.style.cursor = hoveredNode ? 'pointer' : 'default';
            });
            topoCanvas.addEventListener('click', (e) => {
                if (hoveredNode) {
                    hoveredNode.status = hoveredNode.status === 'ok' ? 'threat' : 'ok';
                    hoveredNode.threatTimer = hoveredNode.status === 'threat' ? 300 : 0;
                }
            });
            // Extend drawTopo to render hover tooltip
            const origDrawTopo = drawTopo;
            function drawTopoWithHover() {
                if (activeSceneIndex !== 1) { requestAnimationFrame(drawTopoWithHover); return; }
                // Call base rendering by clearing and rerunning the logic
                tctx.clearRect(0, 0, W, H);
                const t = performance.now() * 0.001;
                nodes.forEach(node => {
                    node.x = node.baseX + Math.sin(t + node.phase) * 3;
                    node.y = node.baseY + Math.cos(t * 0.7 + node.phase) * 3;
                    tctx.beginPath(); tctx.moveTo(center.x, center.y); tctx.lineTo(node.x, node.y);
                    tctx.strokeStyle = node.status === 'threat' ? 'rgba(255, 107, 107, 0.3)' : 'rgba(100, 255, 218, 0.15)';
                    tctx.lineWidth = 1; tctx.stroke();
                });
                for (let i = packets.length - 1; i >= 0; i--) {
                    const p = packets[i]; p.progress += p.speed;
                    if (p.progress >= 1) { packets.splice(i, 1); continue; }
                    tctx.beginPath(); tctx.arc(p.x + (p.tx - p.x) * p.progress, p.y + (p.ty - p.y) * p.progress, 2, 0, Math.PI * 2);
                    tctx.fillStyle = 'rgba(100, 255, 218, 0.8)'; tctx.fill();
                }
                tctx.beginPath(); tctx.arc(center.x, center.y, center.r, 0, Math.PI * 2);
                tctx.fillStyle = 'rgba(100, 255, 218, 0.15)'; tctx.fill();
                tctx.strokeStyle = 'rgba(100, 255, 218, 0.6)'; tctx.lineWidth = 2; tctx.stroke();
                nodes.forEach(node => {
                    if (node.status === 'threat') { node.threatTimer--; if (node.threatTimer <= 0) node.status = 'ok'; }
                    const isHover = node === hoveredNode;
                    const c = node.status === 'threat' ? '#FF6B6B' : isHover ? '#ffffff' : 'rgba(100, 255, 218, 0.8)';
                    const g = node.status === 'threat' ? 'rgba(255, 107, 107, 0.4)' : isHover ? 'rgba(255,255,255,0.15)' : 'rgba(100, 255, 218, 0.2)';
                    tctx.beginPath(); tctx.arc(node.x, node.y, (isHover ? node.r + 2 : node.r) + 4, 0, Math.PI * 2); tctx.fillStyle = g; tctx.fill();
                    tctx.beginPath(); tctx.arc(node.x, node.y, isHover ? node.r + 2 : node.r, 0, Math.PI * 2); tctx.fillStyle = c; tctx.fill();
                    // Hover tooltip
                    if (isHover) {
                        const label = node.status === 'threat' ? 'THREAT — click to clear' : 'NODE — click to flag';
                        tctx.fillStyle = 'rgba(100, 255, 218, 0.6)'; tctx.font = '6px Orbitron'; tctx.textAlign = 'center';
                        tctx.fillText(label, node.x, node.y - 14);
                    }
                });
                requestAnimationFrame(drawTopoWithHover);
            }
            // Replace the original loop — cancel overlapping rAF isn't possible, so we just override
            // The original drawTopo will see activeSceneIndex !== 1 on next frame and stop
            drawTopoWithHover();
        }

        // --- SCENE 3: Cipher Decoder (index 2) ---
        const cipherEl = document.getElementById('cipher-text');
        const cipherBar = document.getElementById('cipher-bar');
        if (cipherEl) {
            const TARGET = 'SYSTEM  SECURE';
            const HEX = '0123456789ABCDEF';
            let locked = Array(TARGET.length).fill(false);
            let lockIdx = 0, cycle = 0;
            function updateCipher() {
                if (activeSceneIndex !== 2) { requestAnimationFrame(updateCipher); return; }
                cycle++;
                if (cycle % 45 === 0 && lockIdx < TARGET.length) { locked[lockIdx] = true; lockIdx++; if (cipherBar) cipherBar.style.width = `${(lockIdx / TARGET.length) * 100}%`; }
                if (lockIdx >= TARGET.length) { setTimeout(() => { locked = Array(TARGET.length).fill(false); lockIdx = 0; if (cipherBar) cipherBar.style.width = '0%'; }, 3000); lockIdx = TARGET.length + 1; }
                // Throttle DOM updates: every 6 frames instead of every 3
                if (cycle % 6 === 0) {
                    let d = '';
                    for (let i = 0; i < TARGET.length; i++) {
                        d += locked[i] ? `<span class="locked">${TARGET[i]}</span>` : `<span class="scrambling">${TARGET[i] === ' ' ? ' ' : HEX[Math.floor(Math.random() * 16)]}</span>`;
                    }
                    cipherEl.innerHTML = d;
                }
                requestAnimationFrame(updateCipher);
            }
            updateCipher();
        }

        // --- SCENE 4: Satellite Constellation (index 3) ---
        const satCanvas = document.getElementById('sat-canvas');
        if (satCanvas) {
            const sctx = satCanvas.getContext('2d');
            const SW = 300, SH = 300;
            satCanvas.width = SW; satCanvas.height = SH;
            const sats = [];
            for (let i = 0; i < 8; i++) {
                const r = 60 + Math.random() * 70;
                sats.push({ angle: (i / 8) * Math.PI * 2, radius: r, speed: 0.003 + Math.random() * 0.004, size: 3 + Math.random() * 2, trail: [] });
            }
            function drawSat() {
                if (activeSceneIndex !== 3) { requestAnimationFrame(drawSat); return; }
                sctx.clearRect(0, 0, SW, SH);
                const cx = SW / 2, cy = SH / 2;
                sctx.beginPath(); sctx.arc(cx, cy, 18, 0, Math.PI * 2);
                sctx.fillStyle = 'rgba(100, 200, 255, 0.15)'; sctx.fill();
                sctx.strokeStyle = 'rgba(100, 200, 255, 0.3)'; sctx.lineWidth = 1; sctx.stroke();
                sctx.beginPath(); sctx.arc(cx, cy, 8, 0, Math.PI * 2);
                sctx.fillStyle = 'rgba(100, 200, 255, 0.4)'; sctx.fill();
                sats.forEach(sat => {
                    sat.angle += sat.speed;
                    const sx = cx + Math.cos(sat.angle) * sat.radius;
                    const sy = cy + Math.sin(sat.angle) * sat.radius * 0.6;
                    sat.trail.push({ x: sx, y: sy });
                    if (sat.trail.length > 30) sat.trail.shift();
                    for (let i = 0; i < sat.trail.length; i++) {
                        if (i % 3 === 0) {
                            sctx.beginPath(); sctx.arc(sat.trail[i].x, sat.trail[i].y, 0.5, 0, Math.PI * 2);
                            sctx.fillStyle = `rgba(100, 255, 218, ${i / sat.trail.length * 0.3})`;
                            sctx.fill();
                        }
                    }
                    sctx.beginPath(); sctx.arc(sx, sy, sat.size, 0, Math.PI * 2);
                    sctx.fillStyle = 'rgba(100, 255, 218, 0.8)'; sctx.fill();
                    sctx.beginPath(); sctx.moveTo(cx, cy); sctx.lineTo(sx, sy);
                    sctx.strokeStyle = 'rgba(100, 255, 218, 0.06)'; sctx.lineWidth = 0.5; sctx.stroke();
                });
                requestAnimationFrame(drawSat);
            }
            drawSat();
        }

        // --- SCENE 5: Firewall Matrix (index 4) ---
        const fwCanvas = document.getElementById('fw-canvas');
        if (fwCanvas) {
            const fctx = fwCanvas.getContext('2d');
            const FW = 300, FH = 300;
            fwCanvas.width = FW; fwCanvas.height = FH;
            const fwArrows = [];
            let fwBlocked = 0, fwAllowed = 0;
            let fwSpawnTimer = 0;

            function spawnFwArrow() {
                const fromLeft = Math.random() > 0.5;
                const y = 30 + Math.random() * (FH - 60);
                const status = Math.random() < 0.7 ? 'allowed' : (Math.random() < 0.5 ? 'blocked' : 'flagged');
                fwArrows.push({ x: fromLeft ? -10 : FW + 10, y, speed: (fromLeft ? 1 : -1) * (1.5 + Math.random()), status, alpha: 1, passed: false });
            }

            const fwCountEl = document.getElementById('fw-counter');
            function drawFw() {
                if (activeSceneIndex !== 4) { requestAnimationFrame(drawFw); return; }
                fctx.clearRect(0, 0, FW, FH);
                // Spawn arrows via frame count instead of setInterval
                fwSpawnTimer++;
                if (fwSpawnTimer % 18 === 0) spawnFwArrow();
                const wallX = FW / 2;
                fctx.beginPath(); fctx.moveTo(wallX, 10); fctx.lineTo(wallX, FH - 10);
                fctx.strokeStyle = 'rgba(100, 255, 218, 0.2)'; fctx.lineWidth = 2;
                fctx.setLineDash([4, 4]); fctx.stroke(); fctx.setLineDash([]);
                fctx.fillStyle = 'rgba(100, 255, 218, 0.15)'; fctx.font = '7px Orbitron';
                fctx.textAlign = 'center'; fctx.fillText('FIREWALL', wallX, FH - 2);
                for (let i = fwArrows.length - 1; i >= 0; i--) {
                    const a = fwArrows[i];
                    a.x += a.speed;
                    const hitWall = (a.speed > 0 && a.x >= wallX - 2 && !a.passed) || (a.speed < 0 && a.x <= wallX + 2 && !a.passed);
                    if (hitWall) { a.passed = true; if (a.status === 'blocked') { a.speed = 0; a.alpha = 0.8; fwBlocked++; } else { fwAllowed++; } }
                    if (a.status === 'blocked' && a.passed) a.alpha -= 0.02;
                    if (a.alpha <= 0 || a.x < -30 || a.x > FW + 30) { fwArrows.splice(i, 1); continue; }
                    const colors = { allowed: `rgba(100, 255, 218, ${a.alpha * 0.7})`, blocked: `rgba(255, 107, 107, ${a.alpha * 0.8})`, flagged: `rgba(255, 200, 50, ${a.alpha * 0.7})` };
                    fctx.beginPath(); fctx.arc(a.x, a.y, 3, 0, Math.PI * 2); fctx.fillStyle = colors[a.status]; fctx.fill();
                    fctx.beginPath(); fctx.moveTo(a.x, a.y); fctx.lineTo(a.x - a.speed * 6, a.y);
                    fctx.strokeStyle = colors[a.status]; fctx.lineWidth = 1; fctx.stroke();
                }
                if (fwCountEl) fwCountEl.textContent = `PKT: ${(fwAllowed + fwBlocked)} | ✓${fwAllowed} ✗${fwBlocked}`;
                requestAnimationFrame(drawFw);
            }
            drawFw();

            // --- Interactivity: click to spawn a packet at click position ---
            fwCanvas.style.cursor = 'crosshair';
            fwCanvas.addEventListener('click', (e) => {
                if (activeSceneIndex !== 4) return;
                const rect = fwCanvas.getBoundingClientRect();
                const scaleY = FH / rect.height;
                const y = (e.clientY - rect.top) * scaleY;
                const fromLeft = Math.random() > 0.5;
                const status = ['allowed', 'blocked', 'flagged'][Math.floor(Math.random() * 3)];
                fwArrows.push({ x: fromLeft ? -10 : FW + 10, y, speed: (fromLeft ? 1 : -1) * (2 + Math.random()), status, alpha: 1, passed: false });
            });
        }

        // --- SCENE 6: Signal Waveform Analyzer (index 5) ---
        const sigCanvas = document.getElementById('sig-canvas');
        if (sigCanvas) {
            const sgctx = sigCanvas.getContext('2d');
            const SGW = 300, SGH = 300;
            sigCanvas.width = SGW; sigCanvas.height = SGH;
            let sigPhase = 0;
            function drawSignal() {
                if (activeSceneIndex !== 5) { requestAnimationFrame(drawSignal); return; }
                sgctx.clearRect(0, 0, SGW, SGH);
                sigPhase += 0.03;
                const midY = SGH * 0.35;
                sgctx.beginPath();
                for (let x = 0; x < SGW; x++) {
                    const y = midY + Math.sin(x * 0.04 + sigPhase) * 30 + Math.sin(x * 0.08 + sigPhase * 1.3) * 15 + Math.sin(x * 0.02 + sigPhase * 0.5) * 20;
                    x === 0 ? sgctx.moveTo(x, y) : sgctx.lineTo(x, y);
                }
                sgctx.strokeStyle = 'rgba(100, 255, 218, 0.6)'; sgctx.lineWidth = 1.5; sgctx.stroke();
                // Grid
                sgctx.strokeStyle = 'rgba(100, 255, 218, 0.06)'; sgctx.lineWidth = 0.5;
                for (let gx = 0; gx < SGW; gx += 30) { sgctx.beginPath(); sgctx.moveTo(gx, 0); sgctx.lineTo(gx, SGH); sgctx.stroke(); }
                for (let gy = 0; gy < SGH; gy += 30) { sgctx.beginPath(); sgctx.moveTo(0, gy); sgctx.lineTo(SGW, gy); sgctx.stroke(); }
                // FFT bars
                const barCount = 24;
                const barW = (SGW - 40) / barCount;
                for (let i = 0; i < barCount; i++) {
                    const h = Math.abs(Math.sin(i * 0.5 + sigPhase * 2) * 40 + Math.cos(i * 0.3 + sigPhase) * 20);
                    sgctx.fillStyle = `rgba(100, 255, 218, ${0.2 + (h / 60) * 0.3})`;
                    sgctx.fillRect(20 + i * barW, SGH - 20 - h, barW - 2, h);
                }
                sgctx.fillStyle = 'rgba(100, 255, 218, 0.2)'; sgctx.font = '7px Orbitron';
                sgctx.fillText('FREQ', 5, SGH - 5); sgctx.fillText('dBm', SGW - 30, midY - 40);
                requestAnimationFrame(drawSignal);
            }
            drawSignal();
        }

        // --- SCENE 7: Docking Sequence (index 6) ---
        const dockCanvas = document.getElementById('dock-canvas');
        if (dockCanvas) {
            const dctx = dockCanvas.getContext('2d');
            const DW = 300, DH = 300;
            dockCanvas.width = DW; dockCanvas.height = DH;
            const dockDuration = 600;
            let dockFrame = 0;
            const dockStatusEl = document.getElementById('dock-status');

            function drawDock() {
                if (activeSceneIndex !== 6) { requestAnimationFrame(drawDock); return; }
                dctx.clearRect(0, 0, DW, DH);
                dockFrame++;
                if (dockFrame > dockDuration + 180) dockFrame = 0;
                const progress = Math.min(dockFrame / dockDuration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const cx = DW / 2, cy = DH / 2;
                const dist = 100 * (1 - eased);
                const tx = cx + 30, mx = cx - 30 - dist;
                // Crosshairs
                dctx.strokeStyle = 'rgba(100, 255, 218, 0.15)'; dctx.lineWidth = 0.5;
                dctx.beginPath(); dctx.moveTo(cx, 0); dctx.lineTo(cx, DH); dctx.stroke();
                dctx.beginPath(); dctx.moveTo(0, cy); dctx.lineTo(DW, cy); dctx.stroke();
                [60, 40, 20].forEach(r => {
                    dctx.beginPath(); dctx.arc(cx, cy, r, 0, Math.PI * 2);
                    dctx.strokeStyle = `rgba(100, 255, 218, ${progress > 0.9 ? 0.15 : 0.06})`;
                    dctx.stroke();
                });
                // Target module
                dctx.fillStyle = 'rgba(100, 255, 218, 0.3)'; dctx.fillRect(tx - 8, cy - 12, 16, 24);
                dctx.strokeStyle = 'rgba(100, 255, 218, 0.6)'; dctx.lineWidth = 1; dctx.strokeRect(tx - 8, cy - 12, 16, 24);
                // Approaching module
                dctx.fillStyle = `rgba(100, 255, 218, ${0.2 + eased * 0.2})`; dctx.fillRect(mx - 10, cy - 10, 20, 20);
                dctx.strokeStyle = `rgba(100, 255, 218, ${0.4 + eased * 0.4})`; dctx.strokeRect(mx - 10, cy - 10, 20, 20);
                // Distance
                dctx.fillStyle = 'rgba(100, 255, 218, 0.4)'; dctx.font = '8px Orbitron'; dctx.textAlign = 'center';
                if (progress < 1) {
                    dctx.fillText(`${(dist * 10).toFixed(0)}m`, cx, cy + 55);
                    if (dockStatusEl) dockStatusEl.textContent = 'APPROACH';
                } else {
                    dctx.fillStyle = 'rgba(100, 255, 218, 0.8)';
                    dctx.fillText('LOCK CONFIRMED', cx, cy + 55);
                    if (dockStatusEl) dockStatusEl.textContent = 'LOCKED';
                }
                requestAnimationFrame(drawDock);
            }
            drawDock();
        }

        // --- SCENE 8: Quantum Entanglement (index 7) ---
        const qCanvas = document.getElementById('quantum-canvas');
        if (qCanvas) {
            const qctx = qCanvas.getContext('2d');
            const QW = 300, QH = 300;
            qCanvas.width = QW; qCanvas.height = QH;
            const particlesL = [], particlesR = [];
            for (let i = 0; i < 6; i++) {
                particlesL.push({ x: 80 + Math.random() * 40, y: 120 + Math.random() * 60, vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5, phase: Math.random() * Math.PI * 2 });
                particlesR.push({ x: 180 + Math.random() * 40, y: 120 + Math.random() * 60, vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5, phase: Math.random() * Math.PI * 2 });
            }
            function drawQuantum() {
                if (activeSceneIndex !== 7) { requestAnimationFrame(drawQuantum); return; }
                qctx.clearRect(0, 0, QW, QH);
                const t = performance.now() * 0.001;
                const pulse = 0.5 + Math.sin(t * 3) * 0.3;
                // Beam
                qctx.beginPath(); qctx.moveTo(120, QH / 2); qctx.lineTo(180, QH / 2);
                const beamGrad = qctx.createLinearGradient(120, 0, 180, 0);
                beamGrad.addColorStop(0, `rgba(100, 255, 218, ${pulse * 0.2})`);
                beamGrad.addColorStop(0.5, `rgba(100, 255, 218, ${pulse * 0.5})`);
                beamGrad.addColorStop(1, `rgba(100, 255, 218, ${pulse * 0.2})`);
                qctx.strokeStyle = beamGrad; qctx.lineWidth = 3; qctx.stroke();
                for (let bx = 120; bx < 180; bx += 8) {
                    const by = QH / 2 + Math.sin(bx * 0.1 + t * 5) * 4;
                    qctx.beginPath(); qctx.arc(bx, by, 1, 0, Math.PI * 2);
                    qctx.fillStyle = `rgba(100, 255, 218, ${pulse * 0.6})`; qctx.fill();
                }
                function drawCluster(particles, centerX) {
                    particles.forEach((p, i) => {
                        p.x += p.vx; p.y += p.vy;
                        if (p.x < centerX - 40 || p.x > centerX + 40) p.vx *= -1;
                        if (p.y < 100 || p.y > 200) p.vy *= -1;
                        const pp = 0.5 + Math.sin(t * 4 + p.phase) * 0.5;
                        qctx.beginPath(); qctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
                        qctx.fillStyle = `rgba(100, 255, 218, ${pp * 0.1})`; qctx.fill();
                        qctx.beginPath(); qctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
                        qctx.fillStyle = `rgba(100, 255, 218, ${0.4 + pp * 0.5})`; qctx.fill();
                        particles.forEach((p2, j) => {
                            if (j > i) {
                                qctx.beginPath(); qctx.moveTo(p.x, p.y); qctx.lineTo(p2.x, p2.y);
                                qctx.strokeStyle = 'rgba(100, 255, 218, 0.06)'; qctx.lineWidth = 0.5; qctx.stroke();
                            }
                        });
                    });
                }
                drawCluster(particlesL, 100);
                drawCluster(particlesR, 200);
                qctx.fillStyle = 'rgba(100, 255, 218, 0.2)'; qctx.font = '6px Orbitron'; qctx.textAlign = 'center';
                qctx.fillText('PARTICLE A', 100, 230);
                qctx.fillText('PARTICLE B', 200, 230);
                qctx.fillText(`ENTANGLED: ${(pulse * 100).toFixed(0)}%`, QW / 2, 260);
                requestAnimationFrame(drawQuantum);
            }
            drawQuantum();
        }

        // --- SCENE 9: Server Rack Heatmap (index 8) ---
        const srvCanvas = document.getElementById('srv-canvas');
        if (srvCanvas) {
            const svctx = srvCanvas.getContext('2d');
            const SVW = 300, SVH = 300;
            srvCanvas.width = SVW; srvCanvas.height = SVH;
            const ROWS = 8, COLS = 4;
            const slotW = 50, slotH = 22;
            const startX = (SVW - COLS * (slotW + 4)) / 2;
            const startY = 30;
            const slots = [];
            for (let r = 0; r < ROWS; r++) {
                for (let c = 0; c < COLS; c++) {
                    slots.push({ row: r, col: c, util: 20 + Math.random() * 60, targetUtil: 20 + Math.random() * 60 });
                }
            }
            setInterval(() => { if (activeSceneIndex !== 8) return; slots.forEach(s => { s.targetUtil = 10 + Math.random() * 85; }); }, 3000);

            function utilColor(u) {
                if (u < 40) return `rgba(100, 255, 218, ${0.2 + u / 100})`;
                if (u < 70) return `rgba(255, 200, 50, ${0.3 + u / 150})`;
                return `rgba(255, 107, 107, ${0.4 + u / 200})`;
            }

            function drawSrv() {
                if (activeSceneIndex !== 8) { requestAnimationFrame(drawSrv); return; }
                svctx.clearRect(0, 0, SVW, SVH);
                svctx.fillStyle = 'rgba(100, 255, 218, 0.2)'; svctx.font = '7px Orbitron'; svctx.textAlign = 'center';
                svctx.fillText('RACK UTILIZATION', SVW / 2, 18);
                slots.forEach(s => {
                    s.util += (s.targetUtil - s.util) * 0.02;
                    const x = startX + s.col * (slotW + 4);
                    const y = startY + s.row * (slotH + 3);
                    svctx.fillStyle = 'rgba(100, 255, 218, 0.03)'; svctx.fillRect(x, y, slotW, slotH);
                    svctx.strokeStyle = 'rgba(100, 255, 218, 0.1)'; svctx.lineWidth = 0.5; svctx.strokeRect(x, y, slotW, slotH);
                    const fillW = (s.util / 100) * (slotW - 4);
                    svctx.fillStyle = utilColor(s.util); svctx.fillRect(x + 2, y + 2, fillW, slotH - 4);
                    svctx.fillStyle = 'rgba(255, 255, 255, 0.4)'; svctx.font = '5px Orbitron'; svctx.textAlign = 'left';
                    svctx.fillText(`${Math.round(s.util)}%`, x + 3, y + slotH - 4);
                });
                requestAnimationFrame(drawSrv);
            }
            drawSrv();
        }

        // --- SCENE 10: Radar Sweep (index 9) ---
        const radarCanvas = document.getElementById('radar-canvas');
        if (radarCanvas) {
            const rctx = radarCanvas.getContext('2d');
            const RW = 300, RH = 300;
            radarCanvas.width = RW; radarCanvas.height = RH;
            const rcx = RW / 2, rcy = RH / 2, maxR = 130;
            const blips = [];
            const trails = []; // phosphor decay trail

            // Generate random blips
            for (let i = 0; i < 8; i++) {
                const angle = Math.random() * Math.PI * 2;
                const dist = 30 + Math.random() * 95;
                blips.push({
                    x: rcx + Math.cos(angle) * dist,
                    y: rcy + Math.sin(angle) * dist,
                    angle: angle,
                    dist: dist,
                    alpha: 0,
                    size: 2 + Math.random() * 2,
                    label: ['UAV-' + (i+1), 'SAT-' + (i+1), 'STA-' + (i+1), 'NODE-' + (i+1)][i % 4]
                });
            }

            function drawRadar() {
                if (activeSceneIndex !== 9) { requestAnimationFrame(drawRadar); return; }
                rctx.clearRect(0, 0, RW, RH);
                const t = performance.now() * 0.001;
                const sweepAngle = (t * 0.8) % (Math.PI * 2);

                // Range rings
                for (let i = 1; i <= 4; i++) {
                    rctx.beginPath();
                    rctx.arc(rcx, rcy, maxR * (i / 4), 0, Math.PI * 2);
                    rctx.strokeStyle = 'rgba(100, 255, 218, 0.08)';
                    rctx.lineWidth = 0.5;
                    rctx.stroke();
                }

                // Crosshairs
                rctx.beginPath();
                rctx.moveTo(rcx - maxR, rcy); rctx.lineTo(rcx + maxR, rcy);
                rctx.moveTo(rcx, rcy - maxR); rctx.lineTo(rcx, rcy + maxR);
                rctx.strokeStyle = 'rgba(100, 255, 218, 0.06)';
                rctx.lineWidth = 0.5;
                rctx.stroke();

                // Compass labels
                rctx.fillStyle = 'rgba(100, 255, 218, 0.2)';
                rctx.font = '6px Orbitron';
                rctx.textAlign = 'center';
                rctx.fillText('N', rcx, rcy - maxR - 5);
                rctx.fillText('S', rcx, rcy + maxR + 10);
                rctx.fillText('E', rcx + maxR + 8, rcy + 2);
                rctx.fillText('W', rcx - maxR - 8, rcy + 2);

                // Sweep trail (phosphor glow)
                const grad = rctx.createConicalGradient ? null : null; // fallback for no conic
                // Draw sweep arc as a gradient fan
                for (let a = 0; a < 40; a++) {
                    const alpha = (1 - a / 40) * 0.12;
                    const angle = sweepAngle - (a * 0.02);
                    rctx.beginPath();
                    rctx.moveTo(rcx, rcy);
                    rctx.arc(rcx, rcy, maxR, angle, angle + 0.025);
                    rctx.closePath();
                    rctx.fillStyle = `rgba(100, 255, 218, ${alpha})`;
                    rctx.fill();
                }

                // Sweep line
                rctx.beginPath();
                rctx.moveTo(rcx, rcy);
                rctx.lineTo(rcx + Math.cos(sweepAngle) * maxR, rcy + Math.sin(sweepAngle) * maxR);
                rctx.strokeStyle = 'rgba(100, 255, 218, 0.6)';
                rctx.lineWidth = 1.5;
                rctx.stroke();

                // Center dot
                rctx.beginPath();
                rctx.arc(rcx, rcy, 3, 0, Math.PI * 2);
                rctx.fillStyle = 'rgba(100, 255, 218, 0.6)';
                rctx.fill();

                // Blips — glow when sweep passes over them
                blips.forEach(blip => {
                    const blipAngle = Math.atan2(blip.y - rcy, blip.x - rcx);
                    let diff = sweepAngle - blipAngle;
                    while (diff < 0) diff += Math.PI * 2;
                    while (diff > Math.PI * 2) diff -= Math.PI * 2;
                    if (diff < 0.3) {
                        blip.alpha = 1;
                    } else {
                        blip.alpha = Math.max(0, blip.alpha - 0.008);
                    }
                    if (blip.alpha > 0.05) {
                        // Outer glow
                        rctx.beginPath();
                        rctx.arc(blip.x, blip.y, blip.size + 6, 0, Math.PI * 2);
                        rctx.fillStyle = `rgba(100, 255, 218, ${blip.alpha * 0.1})`;
                        rctx.fill();
                        // Core
                        rctx.beginPath();
                        rctx.arc(blip.x, blip.y, blip.size, 0, Math.PI * 2);
                        rctx.fillStyle = `rgba(100, 255, 218, ${blip.alpha * 0.8})`;
                        rctx.fill();
                        // Label
                        if (blip.alpha > 0.3) {
                            rctx.fillStyle = `rgba(100, 255, 218, ${blip.alpha * 0.5})`;
                            rctx.font = '5px Orbitron';
                            rctx.textAlign = 'left';
                            rctx.fillText(blip.label, blip.x + blip.size + 4, blip.y + 2);
                        }
                    }
                });

                // Range text
                rctx.fillStyle = 'rgba(100, 255, 218, 0.15)';
                rctx.font = '5px Orbitron';
                rctx.textAlign = 'left';
                rctx.fillText('50km', rcx + maxR * 0.25 + 2, rcy - 2);
                rctx.fillText('100km', rcx + maxR * 0.5 + 2, rcy - 2);
                rctx.fillText('200km', rcx + maxR * 0.75 + 2, rcy - 2);

                requestAnimationFrame(drawRadar);
            }
            drawRadar();

            // --- Interactivity: click to place a new blip ---
            let radarBlipCount = blips.length;
            radarCanvas.style.cursor = 'crosshair';
            radarCanvas.addEventListener('click', (e) => {
                if (activeSceneIndex !== 9) return;
                const rect = radarCanvas.getBoundingClientRect();
                const scaleX = RW / rect.width;
                const scaleY = RH / rect.height;
                const mx = (e.clientX - rect.left) * scaleX;
                const my = (e.clientY - rect.top) * scaleY;
                // Only allow clicks within the radar circle
                const dx = mx - rcx, dy = my - rcy;
                if (Math.sqrt(dx*dx + dy*dy) > maxR) return;
                radarBlipCount++;
                blips.push({
                    x: mx, y: my,
                    angle: Math.atan2(my - rcy, mx - rcx),
                    dist: Math.sqrt(dx*dx + dy*dy),
                    alpha: 1,
                    size: 3,
                    label: 'MARK-' + radarBlipCount
                });
            });
        }

        // --- SCENE 11: Warp Transit (index 10) ---
        const warpCanvas = document.getElementById('warp-canvas');
        if (warpCanvas) {
            const wctx = warpCanvas.getContext('2d');
            const WW = 300, WH = 300;
            warpCanvas.width = WW; warpCanvas.height = WH;
            const stars = [];
            for(let i=0; i<80; i++) {
                stars.push({
                    x: (Math.random() - 0.5) * WW,
                    y: (Math.random() - 0.5) * WH,
                    z: Math.random() * WW,
                    pz: Math.random() * WW
                });
            }
            
            let speed = 2; // base speed
            let warpRequested = false;
            
            function drawWarp() {
                if (activeSceneIndex !== 10) { requestAnimationFrame(drawWarp); return; }
                
                // Motion blur effect
                wctx.fillStyle = 'rgba(10, 25, 47, 0.4)';
                wctx.fillRect(0, 0, WW, WH);
                
                const cx = WW / 2;
                const cy = WH / 2;
                
                // Adjust speed if requested (interactivity)
                if (warpRequested) speed = Math.min(speed + 1.5, 40);
                else speed = Math.max(speed - 0.5, 2);
                
                // Draw tunnel grid optionally
                wctx.strokeStyle = `rgba(100, 255, 218, ${0.05 + speed*0.002})`;
                wctx.lineWidth = 1;
                
                stars.forEach(s => {
                    s.pz = s.z;
                    s.z -= speed;
                    if (s.z < 1) {
                        s.z = WW;
                        s.pz = WW;
                        s.x = (Math.random() - 0.5) * WW;
                        s.y = (Math.random() - 0.5) * WH;
                    }
                    
                    const sx = cx + (s.x / s.z) * 150;
                    const sy = cy + (s.y / s.z) * 150;
                    const px = cx + (s.x / s.pz) * 150;
                    const py = cy + (s.y / s.pz) * 150;
                    
                    wctx.beginPath();
                    wctx.moveTo(px, py);
                    wctx.lineTo(sx, sy);
                    
                    const colorVal = Math.min(255, 100 + (speed * 5));
                    wctx.strokeStyle = `rgba(${colorVal}, 255, 218, ${1 - (s.z / WW)})`;
                    wctx.lineWidth = Math.max(0.5, 3 * (1 - s.z / WW));
                    wctx.stroke();
                });
                
                const warpSpeedEl = document.getElementById('warp-speed');
                if (warpSpeedEl) {
                    let lvl = Math.floor(speed / 5) + 1;
                    if (lvl > 8) warpSpeedEl.textContent = 'VELOCITY: MAX WARP';
                    else warpSpeedEl.textContent = `VELOCITY: WARP ${lvl}`;
                }
                
                requestAnimationFrame(drawWarp);
            }
            drawWarp();
            
            warpCanvas.style.cursor = 'pointer';
            warpCanvas.addEventListener('mousedown', () => warpRequested = true);
            warpCanvas.addEventListener('mouseup', () => warpRequested = false);
            warpCanvas.addEventListener('mouseleave', () => warpRequested = false);
            warpCanvas.addEventListener('touchstart', (e) => { e.preventDefault(); warpRequested = true; }, {passive: false});
            warpCanvas.addEventListener('touchend', () => warpRequested = false);
        }

        // --- SCENE 12: Planetary Scan (index 11) ---
        const planetCanvas = document.getElementById('planet-canvas');
        if (planetCanvas) {
            const pctx = planetCanvas.getContext('2d');
            const PW = 300, PH = 300;
            planetCanvas.width = PW; planetCanvas.height = PH;
            
            const pRadius = 80;
            const pcx = PW / 2;
            const pcy = PH / 2;
            let pTime = 0;
            let anomalies = [];
            let scanY = -pRadius;
            let scanDir = 1;
            
            function drawPlanet() {
                if (activeSceneIndex !== 11) { requestAnimationFrame(drawPlanet); return; }
                pctx.clearRect(0, 0, PW, PH);
                pTime += 0.02;
                
                // Draw wireframe globe
                pctx.strokeStyle = 'rgba(100, 255, 218, 0.15)';
                pctx.lineWidth = 1;
                
                // Latitudes
                for (let lat = -5; lat <= 5; lat++) {
                    const latOffset = lat * 12;
                    const ratio = Math.min(Math.abs(latOffset) / pRadius, 0.99);
                    const cosLat = Math.cos(Math.asin(ratio));
                    pctx.beginPath();
                    pctx.ellipse(pcx, pcy - latOffset, pRadius * cosLat, (pRadius * 0.2) * cosLat, 0, 0, Math.PI * 2);
                    pctx.stroke();
                }
                
                // Longitudes
                for (let lon = 0; lon < 8; lon++) {
                    pctx.beginPath();
                    let offset = (pTime + (lon * Math.PI / 4)) % Math.PI;
                    pctx.ellipse(pcx, pcy, pRadius * Math.sin(offset), pRadius, 0, 0, Math.PI * 2);
                    pctx.stroke();
                }

                // Silhouette outline
                pctx.beginPath();
                pctx.arc(pcx, pcy, pRadius, 0, Math.PI * 2);
                pctx.strokeStyle = 'rgba(100, 255, 218, 0.4)';
                pctx.lineWidth = 2;
                pctx.stroke();
                
                // Scanner bar
                scanY += scanDir * 1.5;
                if (scanY > pRadius + 10 || scanY < -pRadius - 10) scanDir *= -1;
                
                const absY = pcy + Math.max(-pRadius, Math.min(pRadius, scanY));
                const clampedScanY = Math.min(Math.abs(scanY), pRadius * 0.99);
                const scanWidth = pRadius * Math.cos(Math.asin(clampedScanY / pRadius));
                
                pctx.beginPath();
                pctx.moveTo(pcx - scanWidth - 10, absY);
                pctx.lineTo(pcx + scanWidth + 10, absY);
                pctx.strokeStyle = 'rgba(100, 255, 218, 0.8)';
                pctx.lineWidth = 1.5;
                pctx.stroke();

                // Scanner glow
                const grad = pctx.createLinearGradient(0, absY, 0, absY - (scanDir * 20));
                grad.addColorStop(0, 'rgba(100, 255, 218, 0.3)');
                grad.addColorStop(1, 'rgba(100, 255, 218, 0)');
                pctx.fillStyle = grad;
                pctx.fillRect(pcx - pRadius, Math.min(absY, absY - (scanDir*20)), pRadius*2, 20);
                
                // Randomly spawn anomalies on scanner intersection
                if (Math.random() < 0.05 && Math.abs(scanY) < pRadius) {
                    anomalies.push({
                        x: pcx + (Math.random() - 0.5) * scanWidth * 1.8,
                        y: absY,
                        alpha: 1
                    });
                }
                
                // Draw and fade anomalies
                for(let i=anomalies.length-1; i>=0; i--) {
                    let a = anomalies[i];
                    a.alpha -= 0.015;
                    a.y -= scanDir * 0.2; // Slight drift
                    if (a.alpha <= 0) { anomalies.splice(i, 1); continue; }
                    
                    pctx.beginPath();
                    pctx.arc(a.x, a.y, 2, 0, Math.PI * 2);
                    pctx.fillStyle = `rgba(255, 107, 107, ${a.alpha})`;
                    pctx.fill();
                    
                    pctx.beginPath();
                    pctx.arc(a.x, a.y, 4 + (1-a.alpha)*10, 0, Math.PI * 2);
                    pctx.strokeStyle = `rgba(255, 107, 107, ${Math.max(0, a.alpha - 0.2)})`;
                    pctx.lineWidth = 1;
                    pctx.stroke();
                }
                
                requestAnimationFrame(drawPlanet);
            }
            drawPlanet();
        }
    }

    // ========================================================================
    // MOBILE HERO TICKER
    // ========================================================================
    const mobileTicker = document.getElementById('mobile-hero-ticker');
    if (mobileTicker) {
        function updateMobileTicker() {
            const now = new Date();
            const dateStr = now.toISOString().split('T')[0];
            const timeStr = now.toTimeString().split(' ')[0].substring(0, 5);
            mobileTicker.textContent = `${dateStr} ${timeStr} UTC • SYSTEMS NOMINAL`;
        }
        updateMobileTicker();
        setInterval(updateMobileTicker, 30000);
    }

    // ========================================================================
    // EDGE TELEMETRY HUD (reduced — 4 corners only, 5s update)
    // ========================================================================
    const hudContainer = document.getElementById('edge-hud');
    if (hudContainer && window.innerWidth >= 1280) {
        const startTime = Date.now();

        // Detect real telemetry
        const ua = navigator.userAgent;
        let browserName = 'Unknown';
        if (ua.includes('Firefox')) browserName = 'Firefox';
        else if (ua.includes('Edg')) browserName = 'Edge';
        else if (ua.includes('Chrome')) browserName = 'Chrome';
        else if (ua.includes('Safari')) browserName = 'Safari';

        const screenRes = `${screen.width}×${screen.height}`;
        const cores = navigator.hardwareConcurrency || '?';

        // Non-blocking IP fetch
        let publicIP = '—';
        fetch('https://api.ipify.org?format=json', { signal: AbortSignal.timeout(3000) })
            .then(r => r.json())
            .then(d => { publicIP = d.ip; })
            .catch(() => {});

        // Event log
        const eventLog = [
            'AUTH.OK → admin@mia-hq', 'SCAN.CLEAR → subnet 10.0.1.0/24',
            'PATCH.APPLIED → fw-v4.2.1', 'CERT.RENEW → *.clearmoon.llc',
            'BACKUP.OK → vault-01 (14.2 GB)', 'DNS.RESOLVE → api.clearmoon.llc',
            'VPN.TUNNEL → site-miami UP', 'MONITOR.OK → 42 nodes healthy',
            'DEPLOY.OK → edge-node-07', 'SSL.VALID → 284 days remaining',
            'NTP.SYNC → stratum-2 δ<1ms', 'API.200 → /health (12ms)',
        ];
        let eventIdx = 0;

        // Pre-cache panel references
        const tlPanel = hudContainer.querySelector('.hud-tl');
        const trPanel = hudContainer.querySelector('.hud-tr');
        const blPanel = hudContainer.querySelector('.hud-bl');
        const brPanel = hudContainer.querySelector('.hud-br');

        function formatUptime(ms) {
            const s = Math.floor(ms / 1000);
            const h = Math.floor(s / 3600);
            const m = Math.floor((s % 3600) / 60);
            const sec = s % 60;
            return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
        }

        function updateHUD() {
            const now = new Date();
            const utc = now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
            const uptime = formatUptime(Date.now() - startTime);

            if (tlPanel) {
                tlPanel.textContent = ''; // Clear then rebuild without innerHTML
                const line1 = document.createElement('span');
                line1.className = 'hud-val'; line1.textContent = utc;
                const br = document.createElement('br');
                const lbl = document.createElement('span');
                lbl.className = 'hud-label'; lbl.textContent = 'UPTIME ';
                const val2 = document.createElement('span');
                val2.className = 'hud-val'; val2.textContent = uptime;
                tlPanel.append(line1, br, lbl, val2);
            }

            if (trPanel) {
                trPanel.textContent = '';
                const s1 = document.createElement('span'); s1.className = 'hud-label'; s1.textContent = 'STATUS ';
                const v1 = document.createElement('span'); v1.className = 'hud-val'; v1.textContent = 'CORE: ONLINE';
                const br1 = document.createElement('br');
                const s2 = document.createElement('span'); s2.className = 'hud-label'; s2.textContent = 'AGENT ';
                const v2 = document.createElement('span'); v2.className = 'hud-val'; v2.textContent = browserName;
                trPanel.append(s1, v1, br1, s2, v2);
            }

            if (blPanel) {
                blPanel.textContent = '';
                const s1 = document.createElement('span'); s1.className = 'hud-label'; s1.textContent = 'COORD ';
                const v1 = document.createElement('span'); v1.className = 'hud-val'; v1.textContent = '25.761°N 80.192°W';
                const br1 = document.createElement('br');
                const s2 = document.createElement('span'); s2.className = 'hud-label'; s2.textContent = 'NODE ';
                const v2 = document.createElement('span'); v2.className = 'hud-val'; v2.textContent = publicIP;
                const br2 = document.createElement('br');
                const s3 = document.createElement('span'); s3.className = 'hud-label'; s3.textContent = 'CORES ';
                const v3 = document.createElement('span'); v3.className = 'hud-val'; v3.textContent = String(cores);
                blPanel.append(s1, v1, br1, s2, v2, br2, s3, v3);
            }

            eventIdx = (eventIdx + 1) % eventLog.length;
            if (brPanel) {
                brPanel.textContent = '';
                const s1 = document.createElement('span'); s1.className = 'hud-label'; s1.textContent = 'LAST.EVENT';
                const br1 = document.createElement('br');
                const v1 = document.createElement('span'); v1.className = 'hud-val'; v1.textContent = eventLog[eventIdx];
                const br2 = document.createElement('br');
                const s2 = document.createElement('span'); s2.className = 'hud-label'; s2.textContent = 'DISPLAY ';
                const v2 = document.createElement('span'); v2.className = 'hud-val'; v2.textContent = screenRes;
                brPanel.append(s1, br1, v1, br2, s2, v2);
            }
        }

        // Initial render, then update every 5 seconds (was 1.5s)
        updateHUD();
        setInterval(updateHUD, 5000);
    }

    // ========================================================================
    // ASTEROID DEFENSE MINIGAME
    // ========================================================================
    const mgTrigger = document.getElementById('minigame-trigger');
    const mgModal = document.getElementById('minigame-modal');
    const mgClose = document.getElementById('minigame-close');
    const mgCanvas = document.getElementById('minigame-canvas');
    const mgStartBtn = document.getElementById('mg-start-btn');
    const mgOverlay = document.getElementById('mg-overlay');
    const mgTitle = document.getElementById('mg-title');
    const scoreEl = document.getElementById('mg-score');
    const highScoreEl = document.getElementById('mg-high-score');

    if (mgTrigger && mgModal && mgCanvas) {
        let mgCtx = mgCanvas.getContext('2d');
        let mgAnimFrame;
        let isPlaying = false;
        let score = 0;
        let highScore = localStorage.getItem('cm_mg_highscore') || 0;
        highScoreEl.textContent = highScore;
        
        // Game state
        let asteroids = [];
        let particles = [];
        let lasers = [];
        let baseHealth = 100;
        let difficultyMultiplier = 1;
        let lastTime = 0;

        function resizeMgCanvas() {
            const rect = mgCanvas.parentElement.getBoundingClientRect();
            mgCanvas.width = rect.width;
            mgCanvas.height = rect.height;
        }

        function createAsteroid() {
            asteroids.push({
                x: Math.random() * mgCanvas.width,
                y: -30,
                radius: Math.random() * 15 + 10,
                speedY: (Math.random() * 1 + 0.5) * difficultyMultiplier,
                speedX: (Math.random() - 0.5) * 0.5,
                rot: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.1,
                points: Math.floor(Math.random() * 5 + 5) // polygon points
            });
        }

        function spawnExplosion(x, y, color) {
            for(let i=0; i<15; i++) {
                particles.push({
                    x: x, y: y,
                    vx: (Math.random() - 0.5) * 5,
                    vy: (Math.random() - 0.5) * 5,
                    life: 1,
                    color: color
                });
            }
        }

        function drawHex(ctx, x, y, r, rot, points) {
            ctx.beginPath();
            for (let i = 0; i <= points; i++) {
                const angle = rot + (i * 2 * Math.PI / points);
                // varying radius for jagged look
                const rad = r * (0.8 + 0.4 * (i%2)); 
                if (i === 0) ctx.moveTo(x + rad * Math.cos(angle), y + rad * Math.sin(angle));
                else ctx.lineTo(x + rad * Math.cos(angle), y + rad * Math.sin(angle));
            }
            ctx.closePath();
        }

        function gameLoop(time) {
            if (!isPlaying) return;
            mgAnimFrame = requestAnimationFrame(gameLoop);
            
            const deltaTime = time - lastTime;
            lastTime = time;

            mgCtx.fillStyle = 'rgba(10, 25, 47, 0.4)'; // trail effect
            mgCtx.fillRect(0, 0, mgCanvas.width, mgCanvas.height);

            // Draw base (moon surface at bottom)
            mgCtx.fillStyle = '#1e293b';
            mgCtx.beginPath();
            mgCtx.ellipse(mgCanvas.width/2, mgCanvas.height + 100, mgCanvas.width*0.8, 150, 0, 0, Math.PI*2);
            mgCtx.fill();
            mgCtx.strokeStyle = '#64FFDA';
            mgCtx.lineWidth = 1 + (baseHealth/100);
            mgCtx.stroke();
            
            // Base Health bar
            mgCtx.fillStyle = baseHealth > 30 ? '#64FFDA' : '#FF6B6B';
            mgCtx.fillRect(mgCanvas.width/2 - 50, mgCanvas.height - 15, baseHealth, 4);

            // Increase difficulty
            difficultyMultiplier += 0.0005;
            
            // Spawn asteroids
            if (Math.random() < 0.02 * difficultyMultiplier) createAsteroid();

            // Draw Lasers
            for(let i=lasers.length-1; i>=0; i--) {
                let l = lasers[i];
                l.life -= 0.05;
                if(l.life <= 0) { lasers.splice(i,1); continue; }
                
                mgCtx.beginPath();
                mgCtx.moveTo(mgCanvas.width/2, mgCanvas.height-20);
                mgCtx.lineTo(l.x, l.y);
                mgCtx.strokeStyle = `rgba(100, 255, 218, ${l.life})`;
                mgCtx.lineWidth = 3;
                mgCtx.stroke();
            }

            // Draw Particles
            for(let i=particles.length-1; i>=0; i--) {
                let p = particles[i];
                p.x += p.vx; p.y += p.vy;
                p.life -= 0.03;
                if(p.life <= 0) { particles.splice(i,1); continue; }
                
                mgCtx.fillStyle = p.color === 'base' ? `rgba(100, 255, 218, ${p.life})` : `rgba(200, 200, 200, ${p.life})`;
                mgCtx.beginPath();
                mgCtx.arc(p.x, p.y, 2, 0, Math.PI*2);
                mgCtx.fill();
            }

            // Asteroids
            for(let i=asteroids.length-1; i>=0; i--) {
                let a = asteroids[i];
                a.y += a.speedY;
                a.x += a.speedX;
                a.rot += a.rotSpeed;

                // Collide with base
                if (a.y + a.radius > mgCanvas.height - 20) {
                    baseHealth -= a.radius;
                    spawnExplosion(a.x, a.y, 'base');
                    asteroids.splice(i, 1);
                    
                    // Shake effect
                    mgCanvas.style.transform = `translate(${(Math.random()-0.5)*10}px, ${(Math.random()-0.5)*10}px)`;
                    setTimeout(() => mgCanvas.style.transform = 'none', 50);

                    if (baseHealth <= 0) gameOver();
                    continue;
                }

                mgCtx.strokeStyle = '#94a3b8';
                mgCtx.fillStyle = '#0f172a';
                mgCtx.lineWidth = 2;
                drawHex(mgCtx, a.x, a.y, a.radius, a.rot, a.points);
                mgCtx.fill();
                mgCtx.stroke();
            }
        }

        function fireLaser(x, y) {
            if(!isPlaying) return;
            lasers.push({ x: x, y: y, life: 1 });
            
            // Check hit
            for(let i=asteroids.length-1; i>=0; i--) {
                let a = asteroids[i];
                const dx = a.x - x;
                const dy = a.y - y;
                if (Math.sqrt(dx*dx + dy*dy) < a.radius + 15) { // generous hitbox
                    spawnExplosion(a.x, a.y, 'rock');
                    asteroids.splice(i, 1);
                    score += Math.floor(10 * difficultyMultiplier);
                    scoreEl.textContent = score;
                    if(score > highScore) {
                        highScore = score;
                        highScoreEl.textContent = highScore;
                        localStorage.setItem('cm_mg_highscore', highScore);
                    }
                    break; // one hit per tap
                }
            }
        }

        function gameOver() {
            isPlaying = false;
            cancelAnimationFrame(mgAnimFrame);
            mgOverlay.style.display = 'flex';
            mgTitle.textContent = 'SYSTEM COMPROMISED';
            mgStartBtn.textContent = 'REBOOT DEFENSES';
            mgTitle.style.color = '#FF6B6B';
        }

        function startGame() {
            resizeMgCanvas();
            score = 0;
            baseHealth = 100;
            difficultyMultiplier = 1;
            asteroids = [];
            particles = [];
            lasers = [];
            scoreEl.textContent = score;
            mgOverlay.style.display = 'none';
            mgTitle.style.color = ''; // Reset color from game-over red
            isPlaying = true;
            lastTime = performance.now();
            gameLoop(lastTime);
        }

        // Event Listeners
        mgTrigger.addEventListener('click', () => {
            mgModal.classList.remove('hidden');
            mgModal.classList.add('flex');
            resizeMgCanvas();
        });

        mgClose.addEventListener('click', () => {
            mgModal.classList.add('hidden');
            mgModal.classList.remove('flex');
            isPlaying = false;
            cancelAnimationFrame(mgAnimFrame);
        });

        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !mgModal.classList.contains('hidden')) {
                mgModal.classList.add('hidden');
                mgModal.classList.remove('flex');
                isPlaying = false;
                cancelAnimationFrame(mgAnimFrame);
            }
        });

        mgStartBtn.addEventListener('click', startGame);

        mgCanvas.addEventListener('mousedown', (e) => {
            const rect = mgCanvas.getBoundingClientRect();
            const scaleX = mgCanvas.width / rect.width;
            const scaleY = mgCanvas.height / rect.height;
            fireLaser((e.clientX - rect.left) * scaleX, (e.clientY - rect.top) * scaleY);
        });
        
        mgCanvas.addEventListener('touchstart', (e) => {
            e.preventDefault(); // prevent scroll
            const rect = mgCanvas.getBoundingClientRect();
            const scaleX = mgCanvas.width / rect.width;
            const scaleY = mgCanvas.height / rect.height;
            for(let i=0; i<e.changedTouches.length; i++) {
                fireLaser((e.changedTouches[i].clientX - rect.left) * scaleX, (e.changedTouches[i].clientY - rect.top) * scaleY);
            }
        }, {passive: false});
        
        window.addEventListener('resize', () => {
            if(!mgModal.classList.contains('hidden')) resizeMgCanvas();
        });
    }

    // ========================================================================
    // LUNAR LANDER MINIGAME (v2 — Rotational Physics)
    // ========================================================================
    const llTrigger = document.getElementById('lunarlander-trigger');
    const llModal = document.getElementById('lunarlander-modal');
    const llClose = document.getElementById('ll-close');
    const llCanvas = document.getElementById('ll-canvas');
    const llStartBtn = document.getElementById('ll-start-btn');
    const llOverlay = document.getElementById('ll-overlay');
    const llTitle = document.getElementById('ll-title');
    const llScoreEl = document.getElementById('ll-score');
    const llHighScoreEl = document.getElementById('ll-high-score');
    const llFuelBar = document.getElementById('ll-fuel-bar');
    const llVelocityEl = document.getElementById('ll-velocity');
    const llAngleEl = document.getElementById('ll-angle');

    if (llTrigger && llModal && llCanvas) {
        const llCtx = llCanvas.getContext('2d');
        let llAnimFrame;
        let llPlaying = false;
        let llScore = 0;
        let llHighScore = parseInt(localStorage.getItem('cm_ll_highscore')) || 0;
        llHighScoreEl.textContent = llHighScore;

        // Game state
        let lander = {};
        let terrain = [];
        let padX = 0, padW = 60;
        let thrusting = false;
        let rotatingLeft = false;
        let rotatingRight = false;
        let gyroEnabled = false;
        let gyroHandler = null;

        const GRAVITY = 0.015;
        const THRUST_POWER = 0.045;
        const ROTATION_SPEED = 0.04;
        const MAX_LAND_VEL = 1.2;
        const MAX_LAND_ANGLE = 0.26; // ~15 degrees
        const FUEL_MAX = 100;

        function resizeLlCanvas() {
            const rect = llCanvas.parentElement.getBoundingClientRect();
            llCanvas.width = rect.width;
            llCanvas.height = rect.height;
        }

        function generateTerrain() {
            terrain = [];
            const w = llCanvas.width;
            const h = llCanvas.height;
            const groundBase = h * 0.85;
            const segments = 30;
            const segW = w / segments;
            const padSeg = Math.floor(Math.random() * (segments - 4)) + 2;
            padX = padSeg * segW;
            padW = segW * 2;
            for (let i = 0; i <= segments; i++) {
                let y;
                if (i >= padSeg && i <= padSeg + 2) {
                    y = groundBase;
                } else {
                    y = groundBase + (Math.random() - 0.5) * 40;
                }
                terrain.push({ x: i * segW, y: y });
            }
        }

        function resetLander() {
            lander = {
                x: llCanvas.width * 0.3 + Math.random() * llCanvas.width * 0.4,
                y: 30,
                vx: (Math.random() - 0.5) * 0.3,
                vy: 0,
                angle: 0,
                fuel: FUEL_MAX,
                width: 14,
                height: 18
            };
        }

        function getTerrainYAt(x) {
            for (let i = 0; i < terrain.length - 1; i++) {
                if (x >= terrain[i].x && x < terrain[i+1].x) {
                    const t = (x - terrain[i].x) / (terrain[i+1].x - terrain[i].x);
                    return terrain[i].y + t * (terrain[i+1].y - terrain[i].y);
                }
            }
            return llCanvas.height * 0.85;
        }

        function drawLander(ctx) {
            const l = lander;
            ctx.save();
            ctx.translate(l.x, l.y);
            ctx.rotate(l.angle);

            // Triangular body (nose up)
            ctx.fillStyle = '#E6F1FF';
            ctx.beginPath();
            ctx.moveTo(0, -l.height/2);
            ctx.lineTo(-l.width/2, l.height/2);
            ctx.lineTo(l.width/2, l.height/2);
            ctx.closePath();
            ctx.fill();

            // Legs
            ctx.strokeStyle = '#CCD6F6';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(-l.width/2, l.height/2);
            ctx.lineTo(-l.width/2 - 5, l.height/2 + 7);
            ctx.moveTo(l.width/2, l.height/2);
            ctx.lineTo(l.width/2 + 5, l.height/2 + 7);
            ctx.stroke();

            // Thrust flame
            if (thrusting && lander.fuel > 0) {
                ctx.fillStyle = 'rgba(255,' + (150 + Math.random()*105) + ',50,' + (0.6 + Math.random()*0.4) + ')';
                ctx.beginPath();
                ctx.moveTo(-5, l.height/2);
                ctx.lineTo(0, l.height/2 + 12 + Math.random()*10);
                ctx.lineTo(5, l.height/2);
                ctx.fill();
            }
            ctx.restore();
        }

        function llGameLoop() {
            if (!llPlaying) return;
            llAnimFrame = requestAnimationFrame(llGameLoop);

            const w = llCanvas.width, h = llCanvas.height;
            llCtx.fillStyle = '#0a192f';
            llCtx.fillRect(0, 0, w, h);

            // Stars
            llCtx.fillStyle = '#CCD6F6';
            for (let i = 0; i < 40; i++) {
                const sx = ((i * 7919) % w);
                const sy = ((i * 6271) % (h * 0.6));
                llCtx.globalAlpha = 0.3 + (i % 5) * 0.1;
                llCtx.fillRect(sx, sy, 1, 1);
            }
            llCtx.globalAlpha = 1;

            // Rotation
            if (rotatingLeft) lander.angle -= ROTATION_SPEED;
            if (rotatingRight) lander.angle += ROTATION_SPEED;
            lander.angle = Math.max(-Math.PI, Math.min(Math.PI, lander.angle));

            // Gravity always pulls down
            lander.vy += GRAVITY;
            // Thrust in ship's facing direction
            if (thrusting && lander.fuel > 0) {
                lander.vx += Math.sin(lander.angle) * THRUST_POWER;
                lander.vy -= Math.cos(lander.angle) * THRUST_POWER;
                lander.fuel -= 0.3;
                if (lander.fuel < 0) lander.fuel = 0;
            }
            lander.x += lander.vx;
            lander.y += lander.vy;

            // Wrap horizontal
            if (lander.x < 0) lander.x = w;
            if (lander.x > w) lander.x = 0;

            // Update HUD
            llFuelBar.style.width = (lander.fuel / FUEL_MAX * 100) + '%';
            llFuelBar.style.backgroundColor = lander.fuel < 20 ? '#FF6B6B' : '#64FFDA';
            var totalVel = Math.sqrt(lander.vx * lander.vx + lander.vy * lander.vy);
            llVelocityEl.textContent = totalVel.toFixed(1);
            llVelocityEl.style.color = totalVel > MAX_LAND_VEL ? '#FF6B6B' : '#64FFDA';
            var angleDeg = Math.round(lander.angle * 180 / Math.PI);
            if (llAngleEl) {
                llAngleEl.textContent = angleDeg + '\u00B0';
                llAngleEl.style.color = Math.abs(lander.angle) > MAX_LAND_ANGLE ? '#FF6B6B' : '#64FFDA';
            }

            // Draw terrain
            llCtx.beginPath();
            llCtx.moveTo(0, h);
            for (let i = 0; i < terrain.length; i++) {
                llCtx.lineTo(terrain[i].x, terrain[i].y);
            }
            llCtx.lineTo(w, h);
            llCtx.closePath();
            llCtx.fillStyle = '#1e293b';
            llCtx.fill();
            llCtx.strokeStyle = '#475569';
            llCtx.lineWidth = 1;
            llCtx.stroke();

            // Landing pad
            var padTerrainY = h * 0.85;
            for (var pi = 0; pi < terrain.length; pi++) {
                if (terrain[pi].x >= padX) { padTerrainY = terrain[pi].y; break; }
            }
            llCtx.fillStyle = '#64FFDA';
            llCtx.fillRect(padX, padTerrainY - 2, padW, 3);
            llCtx.font = '8px Orbitron';
            llCtx.textAlign = 'center';
            llCtx.fillText('\u25bc PAD \u25bc', padX + padW/2, padTerrainY - 8);

            // Draw lander
            drawLander(llCtx);

            // Collision check
            var landerBottom = lander.y + (lander.height/2 + 7) * Math.cos(lander.angle);
            var groundY = getTerrainYAt(lander.x);
            
            if (landerBottom >= groundY) {
                llPlaying = false;
                cancelAnimationFrame(llAnimFrame);
                
                var onPad = lander.x >= padX && lander.x <= padX + padW;
                var softLanding = totalVel <= MAX_LAND_VEL;
                var upright = Math.abs(lander.angle) <= MAX_LAND_ANGLE;
                
                if (onPad && softLanding && upright) {
                    llScore = Math.floor(lander.fuel * 10 + (MAX_LAND_VEL - totalVel) * 50 + (MAX_LAND_ANGLE - Math.abs(lander.angle)) * 100);
                    llScoreEl.textContent = llScore;
                    if (llScore > llHighScore) {
                        llHighScore = llScore;
                        llHighScoreEl.textContent = llHighScore;
                        localStorage.setItem('cm_ll_highscore', llHighScore);
                    }
                    llOverlay.style.display = 'flex';
                    llTitle.textContent = 'LANDING SUCCESSFUL';
                    llTitle.style.color = '#64FFDA';
                    llStartBtn.textContent = 'LAUNCH AGAIN';
                } else {
                    llOverlay.style.display = 'flex';
                    var reason = 'CRASHED';
                    if (!onPad) reason = 'MISSED PAD';
                    else if (!upright) reason = 'BAD ANGLE';
                    else if (!softLanding) reason = 'TOO FAST';
                    llTitle.textContent = reason + ' \u2014 CRASHED';
                    llTitle.style.color = '#FF6B6B';
                    llStartBtn.textContent = 'RETRY DESCENT';
                }
            }
        }

        function startLlGame() {
            resizeLlCanvas();
            generateTerrain();
            resetLander();
            llScore = 0;
            llScoreEl.textContent = llScore;
            llOverlay.style.display = 'none';
            llTitle.style.color = '';
            thrusting = false;
            rotatingLeft = false;
            rotatingRight = false;
            llPlaying = true;
            llGameLoop();
        }

        // Open/close
        llTrigger.addEventListener('click', function() {
            llModal.classList.remove('hidden');
            llModal.classList.add('flex');
            resizeLlCanvas();
        });

        function closeLlModal() {
            llModal.classList.add('hidden');
            llModal.classList.remove('flex');
            llPlaying = false;
            thrusting = false;
            rotatingLeft = false;
            rotatingRight = false;
            cancelAnimationFrame(llAnimFrame);
            if (gyroEnabled) toggleGyro();
        }
        llClose.addEventListener('click', closeLlModal);

        // Keyboard
        var llKeys = {};
        document.addEventListener('keydown', function(e) {
            if (llModal.classList.contains('hidden')) return;
            if (e.key === 'Escape') { closeLlModal(); return; }
            if (llKeys[e.key]) return;
            llKeys[e.key] = true;
            if (llPlaying) {
                if (e.key === ' ' || e.key === 'ArrowUp') { e.preventDefault(); thrusting = true; }
                if (e.key === 'ArrowLeft' || e.key === 'a') { e.preventDefault(); rotatingLeft = true; }
                if (e.key === 'ArrowRight' || e.key === 'd') { e.preventDefault(); rotatingRight = true; }
            }
        });
        document.addEventListener('keyup', function(e) {
            llKeys[e.key] = false;
            if (e.key === ' ' || e.key === 'ArrowUp') thrusting = false;
            if (e.key === 'ArrowLeft' || e.key === 'a') rotatingLeft = false;
            if (e.key === 'ArrowRight' || e.key === 'd') rotatingRight = false;
        });

        llStartBtn.addEventListener('click', startLlGame);

        // Mobile on-screen buttons
        var llBtnLeft = document.getElementById('ll-btn-left');
        var llBtnRight = document.getElementById('ll-btn-right');
        var llBtnThrust = document.getElementById('ll-btn-thrust');
        var llGyroToggle = document.getElementById('ll-gyro-toggle');

        function addTouchBtn(btn, downFn, upFn) {
            if (!btn) return;
            btn.addEventListener('touchstart', function(e) { e.preventDefault(); downFn(); }, {passive: false});
            btn.addEventListener('touchend', function(e) { e.preventDefault(); upFn(); }, {passive: false});
            btn.addEventListener('touchcancel', function(e) { e.preventDefault(); upFn(); }, {passive: false});
            btn.addEventListener('mousedown', downFn);
            btn.addEventListener('mouseup', upFn);
            btn.addEventListener('mouseleave', upFn);
        }

        addTouchBtn(llBtnLeft,
            function() { if(llPlaying) rotatingLeft = true; },
            function() { rotatingLeft = false; }
        );
        addTouchBtn(llBtnRight,
            function() { if(llPlaying) rotatingRight = true; },
            function() { rotatingRight = false; }
        );
        addTouchBtn(llBtnThrust,
            function() { if(llPlaying) thrusting = true; },
            function() { thrusting = false; }
        );

        // Gyroscope toggle
        function toggleGyro() {
            if (!gyroEnabled) {
                if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
                    DeviceOrientationEvent.requestPermission().then(function(state) {
                        if (state === 'granted') enableGyro();
                        else if (llGyroToggle) llGyroToggle.textContent = '\uD83D\uDCF1 GYRO: DENIED';
                    }).catch(function() { if(llGyroToggle) llGyroToggle.textContent = '\uD83D\uDCF1 GYRO: ERROR'; });
                } else {
                    enableGyro();
                }
            } else {
                disableGyro();
            }
        }

        function enableGyro() {
            gyroEnabled = true;
            if (llGyroToggle) llGyroToggle.textContent = '\uD83D\uDCF1 GYRO: ON';
            gyroHandler = function(e) {
                if (!llPlaying) return;
                var gamma = e.gamma || 0;
                rotatingLeft = gamma < -8;
                rotatingRight = gamma > 8;
            };
            window.addEventListener('deviceorientation', gyroHandler);
        }

        function disableGyro() {
            gyroEnabled = false;
            if (llGyroToggle) llGyroToggle.textContent = '\uD83D\uDCF1 GYRO: OFF';
            if (gyroHandler) window.removeEventListener('deviceorientation', gyroHandler);
            gyroHandler = null;
            rotatingLeft = false;
            rotatingRight = false;
        }

        if (llGyroToggle) llGyroToggle.addEventListener('click', toggleGyro);

        window.addEventListener('resize', function() {
            if(!llModal.classList.contains('hidden')) resizeLlCanvas();
        });
    }

});
