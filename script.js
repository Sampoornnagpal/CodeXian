/* ═══════════════════════════════════════════
   CODEXIAN AI — Premium Landing Page Scripts
   High-DPI canvas, scroll animation, reveals
   ═══════════════════════════════════════════ */

// ─────────────────────────────────────────
// 1. SCROLL-DRIVEN FRAME ANIMATION
// ─────────────────────────────────────────
const TOTAL_FRAMES = 240;
const FRAME_PATH = (i) => `ezgif-frame-${String(i).padStart(3, '0')}.jpg`;

const canvas = document.getElementById('scrollCanvas');
const ctx = canvas.getContext('2d');
const sequenceSection = document.getElementById('scroll-sequence');
const progressFill = document.getElementById('seqProgressFill');
const frameCounter = document.getElementById('seqCounter');

const images = [];
let loadedCount = 0;
let currentFrame = 0;

function preloadImages() {
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const img = new Image();
        img.src = FRAME_PATH(i);
        img.onload = () => {
            loadedCount++;
            if (loadedCount === 1) {
                resizeCanvas();
                drawFrame(img);
            }
        };
        images.push(img);
    }
}

function resizeCanvas() {
    // Use device pixel ratio for sharp rendering
    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';

    ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = true;
    if (ctx.imageSmoothingQuality) {
        ctx.imageSmoothingQuality = 'high';
    }
}

function drawFrame(img) {
    if (!img || !img.complete) return;

    const cw = window.innerWidth;
    const ch = window.innerHeight;

    // Reset transform and clear
    ctx.setTransform(window.devicePixelRatio || 1, 0, 0, window.devicePixelRatio || 1, 0, 0);
    ctx.clearRect(0, 0, cw, ch);

    // Cover fit — fill the viewport without letterboxing
    const canvasRatio = cw / ch;
    const imgRatio = img.naturalWidth / img.naturalHeight;

    let drawW, drawH, drawX, drawY;
    if (canvasRatio > imgRatio) {
        drawW = cw;
        drawH = cw / imgRatio;
        drawX = 0;
        drawY = (ch - drawH) / 2;
    } else {
        drawH = ch;
        drawW = ch * imgRatio;
        drawX = (cw - drawW) / 2;
        drawY = 0;
    }

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
}

function updateScrollFrame() {
    const rect = sequenceSection.getBoundingClientRect();
    const sectionTop = rect.top;
    const sectionHeight = rect.height - window.innerHeight;

    if (sectionTop > 0 || sectionTop < -sectionHeight) return;

    const progress = Math.abs(sectionTop) / sectionHeight;
    const frameIndex = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * TOTAL_FRAMES));

    if (frameIndex !== currentFrame && images[frameIndex] && images[frameIndex].complete) {
        currentFrame = frameIndex;
        drawFrame(images[frameIndex]);
    }

    // Update progress bar
    if (progressFill) {
        progressFill.style.height = (progress * 100) + '%';
    }

    // Update frame counter
    if (frameCounter) {
        frameCounter.textContent = String(frameIndex + 1).padStart(3, '0') + ' / 240';
    }

    // Update overlay text
    updateSeqText(progress);
}

// ─────────────────────────────────────────
// 2. OVERLAY TEXT TRANSITIONS
// ─────────────────────────────────────────
const seqTexts = [
    document.getElementById('seqText1'),
    document.getElementById('seqText2'),
    document.getElementById('seqText3'),
    document.getElementById('seqText4')
];

function updateSeqText(progress) {
    seqTexts.forEach((el, i) => {
        if (!el) return;
        const start = i * 0.25;
        const fadeIn = start + 0.06;
        const fadeOut = start + 0.22;

        if (progress >= fadeIn && progress <= fadeOut) {
            el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
    });
}

// ─────────────────────────────────────────
// 3. SCROLL REVEAL
// ─────────────────────────────────────────
const revealEls = document.querySelectorAll('[data-reveal]');

function checkReveals() {
    revealEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.88 && !el.classList.contains('revealed')) {
            el.classList.add('revealed');
        }
    });
}

// ─────────────────────────────────────────
// 4. SCROLL HINT FADE
// ─────────────────────────────────────────
const scrollHint = document.getElementById('scrollHint');

function updateScrollHint() {
    if (!scrollHint) return;
    if (window.scrollY > 100) {
        scrollHint.style.opacity = '0';
    } else {
        scrollHint.style.opacity = '';
    }
}

// ─────────────────────────────────────────
// 5. TERMINAL TYPING
// ─────────────────────────────────────────
const termBody = document.getElementById('termBody');
const termTyped = document.getElementById('termTyped');
let termStarted = false;

const CMD = 'codexian build "temperature sensor with WiFi and 3 status LEDs"';
const OUTPUT = [
    { text: '', type: 'blank' },
    { text: '⚡ CODEXIAN AI v2.0 — Brain Layer Activated', type: 'header' },
    { text: '─────────────────────────────────────────', type: 'output' },
    { text: '', type: 'blank' },
    { text: '[Phase 1/6] Cataloging components...', type: 'phase' },
    { text: '  → Generated 8 components, 12 nets, 2 power rails', type: 'output' },
    { text: '', type: 'blank' },
    { text: '[Phase 2/6] Mapping footprints...', type: 'phase' },
    { text: '  → All 8 packages mapped (LQFP-48, 0805, SOT-23-5...)', type: 'output' },
    { text: '', type: 'blank' },
    { text: '[Phase 3/6] Placing components...', type: 'phase' },
    { text: '  → Placed 8 components on 50x40mm board', type: 'output' },
    { text: '', type: 'blank' },
    { text: '[Phase 4/6] Routing traces...', type: 'phase' },
    { text: '  → Routed 12 nets (power: 0.5mm, signal: 0.25mm)', type: 'output' },
    { text: '', type: 'blank' },
    { text: '[Phase 5/6] Compiling master_build.py...', type: 'phase' },
    { text: '  → 340 lines generated, ready to execute', type: 'output' },
    { text: '', type: 'blank' },
    { text: '[Phase 6/6] Shadow Engineering validation...', type: 'phase' },
    { text: '  ✅ ERC: 0 errors', type: 'success' },
    { text: '  ✅ DRC: 0 violations', type: 'success' },
    { text: '  ✅ SI/PI: All checks passed', type: 'success' },
    { text: '', type: 'blank' },
    { text: '═══════════════════════════════════════════', type: 'header' },
    { text: '  DESIGN SCORE: 98/100 — Production Ready', type: 'header' },
    { text: '═══════════════════════════════════════════', type: 'header' },
];

async function startTerminal() {
    if (termStarted) return;
    termStarted = true;

    const cursor = document.querySelector('.term-cursor');
    for (let i = 0; i < CMD.length; i++) {
        termTyped.textContent += CMD[i];
        await sleep(22 + Math.random() * 30);
    }

    await sleep(500);
    if (cursor) cursor.style.display = 'none';

    for (const line of OUTPUT) {
        const div = document.createElement('div');
        div.className = 'term-line';

        if (line.type === 'blank') {
            div.innerHTML = '&nbsp;';
        } else {
            div.className += ` output-line ${line.type}`;
            div.textContent = line.text;
        }

        termBody.appendChild(div);
        termBody.scrollTop = termBody.scrollHeight;
        await sleep(line.type === 'phase' ? 350 : (line.type === 'blank' ? 80 : 100));
    }
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function checkTerminal() {
    const section = document.getElementById('demo');
    if (!section) return;
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.7 && rect.bottom > 0) {
        startTerminal();
    }
}

// ─────────────────────────────────────────
// 6. UNIFIED SCROLL HANDLER
// ─────────────────────────────────────────
let ticking = false;

function onScroll() {
    if (!ticking) {
        requestAnimationFrame(() => {
            updateScrollFrame();
            checkReveals();
            checkTerminal();
            updateScrollHint();
            ticking = false;
        });
        ticking = true;
    }
}

// ─────────────────────────────────────────
// 7. RESIZE HANDLER
// ─────────────────────────────────────────
function onResize() {
    resizeCanvas();
    // Redraw current frame
    if (images[currentFrame] && images[currentFrame].complete) {
        drawFrame(images[currentFrame]);
    }
}

// ─────────────────────────────────────────
// 8. WAITLIST FORM
// ─────────────────────────────────────────
const wlForm = document.getElementById('waitlistForm');
if (wlForm) {
    wlForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('emailInput').value;
        const btn = wlForm.querySelector('button');

        btn.textContent = 'Submitting...';
        btn.disabled = true;

        try {
            // Save to Firestore
            if (window.__codexianDB) {
                await window.__codexianAddDoc(
                    window.__codexianCollection(window.__codexianDB, 'waitlist'),
                    {
                        email: email,
                        timestamp: window.__codexianServerTimestamp(),
                        source: 'landing_page'
                    }
                );
            }

            btn.textContent = '✓ You\'re on the list!';
            btn.style.background = '#00cc44';
            document.getElementById('emailInput').value = '';

            setTimeout(() => {
                btn.innerHTML = 'Join Waitlist <span>→</span>';
                btn.style.background = '';
                btn.disabled = false;
            }, 4000);
        } catch (err) {
            console.error('Waitlist error:', err);
            btn.textContent = 'Error — try again';
            btn.style.background = '#ff4455';
            btn.disabled = false;

            setTimeout(() => {
                btn.innerHTML = 'Join Waitlist <span>→</span>';
                btn.style.background = '';
            }, 3000);
        }
    });
}

// ─────────────────────────────────────────
// 9. SMOOTH ANCHOR SCROLLING
// ─────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ─────────────────────────────────────────
// 10. MOUSE FLUORESCENT TRAIL
// ─────────────────────────────────────────
const TRAIL_COUNT = 16;
const trails = [];

for (let i = 0; i < TRAIL_COUNT; i++) {
    const el = document.createElement('div');
    el.className = 'mouse-trail';
    document.body.appendChild(el);
    trails.push({
        el,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
    });
}

let mouseX = -100;
let mouseY = -100;
let trailHue = 160;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateTrail() {
    // Slowly cycle hue
    trailHue = (trailHue + 0.15) % 360;

    for (let i = 0; i < TRAIL_COUNT; i++) {
        const t = trails[i];

        // Each point follows the one before it (or the mouse for the first)
        const targetX = i === 0 ? mouseX : trails[i - 1].x;
        const targetY = i === 0 ? mouseY : trails[i - 1].y;

        // Lerp with decreasing speed for longer tail
        const speed = 0.25 - (i * 0.012);
        t.x += (targetX - t.x) * Math.max(speed, 0.04);
        t.y += (targetY - t.y) * Math.max(speed, 0.04);

        // Opacity fades along the trail
        const opacity = 1 - (i / TRAIL_COUNT);

        // Size shrinks along the trail
        const size = 1 - (i / TRAIL_COUNT) * 0.5;

        // Each trail point gets a slightly offset hue
        const h = (trailHue + i * 8) % 360;

        t.el.style.transform = `translate(${t.x}px, ${t.y}px) scale(${size})`;
        t.el.style.setProperty('--trail-hue', h);
        t.el.style.setProperty('--trail-opacity', opacity);
    }

    requestAnimationFrame(animateTrail);
}

animateTrail();

// ─────────────────────────────────────────
// 11. INIT
// ─────────────────────────────────────────
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onResize);

preloadImages();
checkReveals();
updateScrollHint();
