// WebOS - AeroGlass OS Core Script

// 1. Audio Synthesizer (Web Audio API)
let audioCtx = null;
let soundEnabled = true;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function playSound(type) {
    if (!soundEnabled) return;
    initAudio();
    if (!audioCtx) return;
    
    // Resume context if suspended (browser security)
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    
    const now = audioCtx.currentTime;
    
    if (type === 'boot') {
        // Futuristic premium major 7th chord (similar to macOS startup chime)
        const notes = [130.81, 196.00, 261.63, 329.63, 392.00, 493.88]; // C3, G3, C4, E4, G4, B4
        notes.forEach((freq, index) => {
            const osc = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            osc.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            
            osc.type = index % 2 === 0 ? 'sine' : 'triangle';
            osc.frequency.setValueAtTime(freq, now);
            osc.frequency.exponentialRampToValueAtTime(freq * 1.002, now + 1.6);
            
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.04, now + 0.15 + (index * 0.04));
            gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);
            
            osc.start(now);
            osc.stop(now + 2.0);
        });
    } else {
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        if (type === 'click') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(600, now);
            osc.frequency.exponentialRampToValueAtTime(1000, now + 0.04);
            
            gainNode.gain.setValueAtTime(0.04, now);
            gainNode.gain.linearRampToValueAtTime(0.001, now + 0.06);
            
            osc.start(now);
            osc.stop(now + 0.08);
        } else if (type === 'open') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(320, now);
            osc.frequency.exponentialRampToValueAtTime(580, now + 0.12);
            
            gainNode.gain.setValueAtTime(0.06, now);
            gainNode.gain.linearRampToValueAtTime(0.001, now + 0.18);
            
            osc.start(now);
            osc.stop(now + 0.2);
        } else if (type === 'error') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(140, now);
            osc.frequency.setValueAtTime(95, now + 0.1);
            
            gainNode.gain.setValueAtTime(0.12, now);
            gainNode.gain.linearRampToValueAtTime(0.001, now + 0.3);
            
            osc.start(now);
            osc.stop(now + 0.35);
        } else if (type === 'point') {
            // Point scored in snake
            osc.type = 'sine';
            osc.frequency.setValueAtTime(523.25, now); // C5
            osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
            
            gainNode.gain.setValueAtTime(0.06, now);
            gainNode.gain.linearRampToValueAtTime(0.001, now + 0.15);
            
            osc.start(now);
            osc.stop(now + 0.18);
        } else if (type === 'gameover') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(280, now);
            osc.frequency.linearRampToValueAtTime(90, now + 0.45);
            
            gainNode.gain.setValueAtTime(0.08, now);
            gainNode.gain.linearRampToValueAtTime(0.001, now + 0.5);
            
            osc.start(now);
            osc.stop(now + 0.5);
        }
    }
}

// 2. Devlog Database (Stored locally for offline & file:// capability)
const devlogsData = {
    devlog1: `<h1>Devlog 1: Setting up AeroGlass Design and Layout</h1>
<p>Today, I began building <strong>AeroGlass OS</strong>, my web-based operating system. I wanted to move away from traditional retro templates and instead adopt a premium, ultra-slick macOS-like liquid glass theme.</p>
<h3>1. Designing the Glassmorphism UI</h3>
<p>I defined the core design tokens in <code>style.css</code>:</p>
<ul>
<li><strong>Liquid Backgrounds</strong>: Implemented smooth drifting glowing color orbs in the background using animated CSS radial gradients.</li>
<li><strong>AeroGlass Windows</strong>: Utilized high translucency with <code>backdrop-filter: blur(28px) saturate(180%)</code>, pure white borders with low opacity, and wide, soft box shadows to mimic Apple's premium glass feel.</li>
<li><strong>Clean Typography</strong>: Selected <em>Outfit</em> for headers and <em>Inter</em> for normal text to keep the interface feeling professional and balanced.</li>
</ul>
<h3>2. Creating Desktop and Dock</h3>
<ul>
<li>Designed a bottom floating <strong>Dock</strong> that holds shortcut items, open app indicators, and clock.</li>
<li>Created smooth, bouncy magnify scaling animations on dock icons when hovered.</li>
</ul>`,
    devlog2: `<h1>Devlog 2: Coding the Custom Window Manager</h1>
<p>With the visual layout ready, the next step was building a robust JavaScript window manager.</p>
<h3>1. Robust Centering and Positioning</h3>
<p>Unlike basic templates, I wrote positioning code that uses <code>offsetWidth</code> and <code>offsetHeight</code> to accurately calculate the window's rendered bounding coordinates. When any desktop icon is clicked, the window opens perfectly centered in the viewport.</p>
<h3>2. Dragging and Layering Focus</h3>
<ul>
<li>Attached <code>mousedown</code> and <code>touchstart</code> listeners to the window header to allow seamless window dragging across the desktop on desktop and mobile browsers.</li>
<li>Maintained a global <code>highestZIndex</code> variable. Whenever a user clicks on a window, it pops to the foreground dynamically, focusing state.</li>
<li>Created macOS-style traffic light controls (close, minimize, maximize) that render clean icons ('×', '−', '+') on hover.</li>
</ul>`,
    devlog3: `<h1>Devlog 3: Advanced App Ecosystem & Control Center</h1>
<p>Today, I finalized the feature set by coding fully operational custom apps and a simulated Control Center.</p>
<h3>1. macOS-style Control Center</h3>
<p>Added a floating Control Center panel linked to a dock widget. It allows live toggle of Dark Mode, sound volume control, screen brightness adjustment (filtering the DOM), and simulates hardware load stats (CPU/RAM metrics) in real-time.</p>
<h3>2. Synthesized Startup Sound</h3>
<p>Implemented a premium Web Audio API startup sound. Clicking "Unlock" in the passwordless macOS login screen plays a rich major 7th chord sweep rather than a generic beep.</p>
<h3>3. Built-in Apps</h3>
<ul>
<li><strong>AeroPaint</strong>: Drawing canvas supporting brush stroke size, custom hex codes, clear action, and touch screen support.</li>
<li><strong>Retro Snake</strong>: Self-contained retro arcade game inside a window with collision detection and point sound effects.</li>
<li><strong>Aether Shell</strong>: Interactive terminal using zsh-style prompt that supports <code>neofetch</code>, <code>theme</code>, <code>matrix</code> code waterfall canvas, and command clear.</li>
</ul>`
};

// 3. Global Window Manager State
let highestZIndex = 20;
const openWindows = new Set();

function initWindowManager() {
    const windows = document.querySelectorAll('.window');
    
    windows.forEach(win => {
        const header = win.querySelector('.window-header');
        const closeBtn = win.querySelector('.window-btn.close');
        const minBtn = win.querySelector('.window-btn.minimize');
        const maxBtn = win.querySelector('.window-btn.maximize');
        
        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;
        
        // Focus click
        win.addEventListener('mousedown', () => {
            focusWindow(win);
        });
        
        win.addEventListener('touchstart', () => {
            focusWindow(win);
        }, { passive: true });
        
        // Drag logic
        header.addEventListener('mousedown', (e) => {
            if (win.classList.contains('maximized')) return;
            isDragging = true;
            offsetX = e.clientX - win.offsetLeft;
            offsetY = e.clientY - win.offsetTop;
            focusWindow(win);
            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
            e.preventDefault();
        });
        
        header.addEventListener('touchstart', (e) => {
            if (win.classList.contains('maximized')) return;
            isDragging = true;
            const touch = e.touches[0];
            offsetX = touch.clientX - win.offsetLeft;
            offsetY = touch.clientY - win.offsetTop;
            focusWindow(win);
            document.addEventListener('touchmove', touchMoveHandler, { passive: false });
            document.addEventListener('touchend', touchEndHandler);
        });
        
        function mouseMoveHandler(e) {
            if (!isDragging) return;
            let left = e.clientX - offsetX;
            let top = e.clientY - offsetY;
            
            win.style.left = `${left}px`;
            win.style.top = `${top}px`;
        }
        
        function touchMoveHandler(e) {
            if (!isDragging) return;
            const touch = e.touches[0];
            let left = touch.clientX - offsetX;
            let top = touch.clientY - offsetY;
            
            win.style.left = `${left}px`;
            win.style.top = `${top}px`;
            e.preventDefault();
        }
        
        function mouseUpHandler() {
            isDragging = false;
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        }
        
        function touchEndHandler() {
            isDragging = false;
            document.removeEventListener('touchmove', touchMoveHandler);
            document.removeEventListener('touchend', touchEndHandler);
        }
        
        // Control buttons
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                closeWindow(win.id);
            });
        }
        
        if (minBtn) {
            minBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                minimizeWindow(win.id);
            });
        }
        
        if (maxBtn) {
            maxBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleMaximize(win);
            });
        }
    });
}

function focusWindow(win) {
    if (win.style.zIndex != highestZIndex) {
        highestZIndex++;
        win.style.zIndex = highestZIndex;
        
        // Remove active class from all
        document.querySelectorAll('.window').forEach(w => w.classList.remove('active-window'));
        win.classList.add('active-window');
        
        // Sound cue
        playSound('click');
    }
}

function openWindow(winId) {
    const win = document.getElementById(winId);
    if (!win) return;
    
    if (win.classList.contains('open') && !win.classList.contains('minimized')) {
        focusWindow(win);
        return;
    }
    
    win.classList.remove('minimized');
    win.classList.add('open');
    openWindows.add(winId);
    
    // Center the window on the viewport, with robust measurement
    if (!win.dataset.positioned) {
        // Calculate offsetWidth/Height. If window is display hidden, it will fall back
        const winWidth = win.offsetWidth || parseInt(win.style.width) || 640;
        const winHeight = win.offsetHeight || parseInt(win.style.height) || 480;
        const vpWidth = window.innerWidth;
        const vpHeight = window.innerHeight - 72; // account for dock
        
        const centerX = Math.max(20, (vpWidth - winWidth) / 2);
        const centerY = Math.max(20, (vpHeight - winHeight) / 2);
        
        win.style.left = `${centerX}px`;
        win.style.top = `${centerY}px`;
        win.dataset.positioned = 'true';
    }
    
    focusWindow(win);
    playSound('open');
    updateDockIndicators();
    
    // App-specific start hooks
    if (winId === 'paint-window') {
        initPaintCanvas();
    } else if (winId === 'terminal-window') {
        document.getElementById('term-input').focus();
    }
}

function closeWindow(winId) {
    const win = document.getElementById(winId);
    if (!win) return;
    
    win.classList.remove('open');
    win.classList.remove('minimized');
    openWindows.delete(winId);
    playSound('click');
    updateDockIndicators();
    
    // Specific cleanup
    if (winId === 'terminal-window') {
        stopMatrixRain();
    } else if (winId === 'snake-window') {
        stopSnakeGame();
    }
}

function minimizeWindow(winId) {
    const win = document.getElementById(winId);
    if (!win) return;
    
    win.classList.add('minimized');
    playSound('click');
    updateDockIndicators();
}

function toggleMaximize(win) {
    win.classList.toggle('maximized');
    playSound('click');
}

function updateDockIndicators() {
    document.querySelectorAll('.dock-shortcut-btn').forEach(btn => {
        const target = btn.dataset.window;
        const win = document.getElementById(target);
        if (win && win.classList.contains('open')) {
            btn.classList.add('running');
        } else {
            btn.classList.remove('running');
        }
    });
}

// Start Menu, Control Center and Dock binds
function initSystemUI() {
    // Clock updates
    const clockEl = document.getElementById('system-clock');
    function updateClock() {
        const now = new Date();
        const hrs = String(now.getHours()).padStart(2, '0');
        const mins = String(now.getMinutes()).padStart(2, '0');
        clockEl.innerText = `${hrs}:${mins}`;
    }
    setInterval(updateClock, 1000);
    updateClock();
    
    // Welcome Lockscreen Submit
    const bootBtn = document.getElementById('boot-btn');
    const welcome = document.getElementById('welcome-screen');
    const loginForm = document.getElementById('login-form');
    
    function performUnlock() {
        playSound('boot');
        welcome.classList.add('fade-out');
        setTimeout(() => {
            welcome.style.display = 'none';
            openWindow('about-window');
        }, 800);
    }
    
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            performUnlock();
        });
    } else if (bootBtn) {
        bootBtn.addEventListener('click', performUnlock);
    }
    
    // Desktop Shortcuts
    document.querySelectorAll('.desktop-icon').forEach(icon => {
        icon.addEventListener('click', () => {
            const target = icon.dataset.window;
            openWindow(target);
        });
    });
    
    // Dock Shortcuts Binds
    document.querySelectorAll('.dock-shortcut-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.window;
            const win = document.getElementById(target);
            if (win) {
                if (win.classList.contains('open') && !win.classList.contains('minimized')) {
                    // If active, minimize. Otherwise focus.
                    if (win.classList.contains('active-window')) {
                        minimizeWindow(target);
                    } else {
                        focusWindow(win);
                    }
                } else {
                    openWindow(target);
                }
            }
        });
    });
    
    // Start Menu Toggle
    const startBtn = document.getElementById('start-btn');
    const startMenu = document.getElementById('start-menu');
    startBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        startMenu.classList.toggle('show');
        playSound('click');
    });
    
    // Control Center Toggle
    const ccBtn = document.getElementById('control-center-btn');
    const controlCenter = document.getElementById('control-center');
    ccBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        controlCenter.classList.toggle('show');
        playSound('click');
    });
    
    document.addEventListener('click', (e) => {
        if (startMenu && !startMenu.contains(e.target) && e.target !== startBtn) {
            startMenu.classList.remove('show');
        }
        if (controlCenter && !controlCenter.contains(e.target) && e.target !== ccBtn) {
            controlCenter.classList.remove('show');
        }
    });
    
    // Dark mode toggle in CC
    const darkModeToggle = document.getElementById('cc-dark-mode-toggle');
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        playSound('click');
        
        const isDark = document.body.classList.contains('dark-mode');
        darkModeToggle.querySelector('.cc-tile-icon').innerText = isDark ? '☀️' : '🌙';
        darkModeToggle.querySelector('.cc-title').innerText = isDark ? 'Light Mode' : 'Dark Mode';
    });
    
    // Audio chime toggle in CC
    const ccAudioToggle = document.getElementById('cc-audio-toggle');
    ccAudioToggle.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        playSound('click');
        
        ccAudioToggle.querySelector('.cc-tile-icon').innerText = soundEnabled ? '🔊' : '🔇';
        ccAudioToggle.querySelector('.cc-title').innerText = soundEnabled ? 'Sound Chime' : 'Muted';
        
        // Sync volume sliders
        const volSlider = document.getElementById('cc-volume-slider');
        const customizerVolSlider = document.getElementById('audio-volume');
        if (soundEnabled) {
            volSlider.value = 0.8;
            if (customizerVolSlider) customizerVolSlider.value = 0.8;
        } else {
            volSlider.value = 0;
            if (customizerVolSlider) customizerVolSlider.value = 0;
        }
    });
    
    // Volume Control in CC
    const ccVolumeSlider = document.getElementById('cc-volume-slider');
    ccVolumeSlider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        soundEnabled = (val > 0);
        
        ccAudioToggle.querySelector('.cc-tile-icon').innerText = soundEnabled ? '🔊' : '🔇';
        ccAudioToggle.querySelector('.cc-title').innerText = soundEnabled ? 'Sound Chime' : 'Muted';
        
        const customizerVolSlider = document.getElementById('audio-volume');
        if (customizerVolSlider) customizerVolSlider.value = val;
    });
    
    // Brightness Control in CC
    const ccBrightnessSlider = document.getElementById('cc-brightness-slider');
    ccBrightnessSlider.addEventListener('input', (e) => {
        const val = e.target.value;
        document.body.style.filter = `brightness(${val}%)`;
    });
    
    // CPU/RAM metrics simulator
    const cpuBar = document.getElementById('cc-cpu-bar');
    const ramBar = document.getElementById('cc-ram-bar');
    const cpuText = document.getElementById('cc-cpu-text');
    const ramText = document.getElementById('cc-ram-text');
    
    setInterval(() => {
        if (controlCenter && controlCenter.classList.contains('show')) {
            const cpuLoad = Math.floor(Math.random() * 25) + 5; 
            const ramLoad = Math.floor(Math.random() * 8) + 42; 
            
            if (cpuBar) cpuBar.style.width = `${cpuLoad}%`;
            if (cpuText) cpuText.innerText = `${cpuLoad}%`;
            if (ramBar) ramBar.style.width = `${ramLoad}%`;
            if (ramText) ramText.innerText = `${ramLoad}%`;
        }
    }, 1500);
    
    // Start Menu Items Binds
    document.querySelectorAll('.start-menu-item').forEach(item => {
        item.addEventListener('click', () => {
            const target = item.dataset.window;
            openWindow(target);
            startMenu.classList.remove('show');
        });
    });
    
    // Shutdown Action (Logout)
    document.getElementById('shutdown-btn').addEventListener('click', () => {
        welcome.style.display = 'flex';
        welcome.classList.remove('fade-out');
        playSound('error');
        startMenu.classList.remove('show');
        // Close all windows
        document.querySelectorAll('.window').forEach(w => {
            w.classList.remove('open');
            w.classList.remove('minimized');
        });
        openWindows.clear();
        updateDockIndicators();
    });
    
    // Devlogs Reader Navigation
    const devlogBody = document.getElementById('devlog-body');
    const devlogNavBtns = document.querySelectorAll('.devlog-nav-btn');
    
    function loadDevlog(logKey) {
        devlogBody.innerHTML = devlogsData[logKey] || '<p>Devlog not found.</p>';
        devlogNavBtns.forEach(btn => {
            if (btn.dataset.log === logKey) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
    
    devlogNavBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            loadDevlog(btn.dataset.log);
            playSound('click');
        });
    });
    
    // Load first devlog by default
    loadDevlog('devlog1');
}

// 4. Paint App Logic
let paintCanvas = null;
let paintCtx = null;
let isDrawing = false;
let brushColor = '#0ea5e9';
let brushSize = 5;

function initPaintCanvas() {
    paintCanvas = document.getElementById('paint-canvas');
    if (!paintCanvas) return;
    paintCtx = paintCanvas.getContext('2d');
    
    const container = paintCanvas.parentElement;
    paintCanvas.width = container.clientWidth;
    paintCanvas.height = container.clientHeight;
    
    paintCtx.lineCap = 'round';
    paintCtx.lineJoin = 'round';
    
    // Swatches
    const swatches = document.querySelectorAll('.color-swatch');
    swatches.forEach(swatch => {
        swatch.style.backgroundColor = swatch.dataset.color;
        swatch.addEventListener('click', () => {
            swatches.forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');
            brushColor = swatch.dataset.color;
            playSound('click');
        });
    });
    
    // Size slider
    const sizeSlider = document.getElementById('paint-size');
    sizeSlider.addEventListener('input', (e) => {
        brushSize = e.target.value;
    });
    
    // Clear btn
    document.getElementById('paint-clear').addEventListener('click', () => {
        paintCtx.clearRect(0, 0, paintCanvas.width, paintCanvas.height);
        playSound('error');
    });
    
    // Mouse events
    paintCanvas.addEventListener('mousedown', startDrawing);
    paintCanvas.addEventListener('mousemove', draw);
    paintCanvas.addEventListener('mouseup', stopDrawing);
    paintCanvas.addEventListener('mouseleave', stopDrawing);
    
    // Touch events
    paintCanvas.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        startDrawing({
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        e.preventDefault();
    });
    paintCanvas.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        draw({
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        e.preventDefault();
    });
    paintCanvas.addEventListener('touchend', stopDrawing);
}

function startDrawing(e) {
    isDrawing = true;
    paintCtx.beginPath();
    const rect = paintCanvas.getBoundingClientRect();
    paintCtx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
}

function draw(e) {
    if (!isDrawing) return;
    const rect = paintCanvas.getBoundingClientRect();
    paintCtx.strokeStyle = brushColor;
    paintCtx.lineWidth = brushSize;
    paintCtx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    paintCtx.stroke();
}

function stopDrawing() {
    isDrawing = false;
    paintCtx.closePath();
}

// 5. Snake Game Logic
let snakeCanvas = null;
let snakeCtx = null;
let snakeGameInterval = null;
const gridSize = 15;
let snake = [];
let food = {};
let dx = gridSize;
let dy = 0;
let score = 0;
let highScore = 0;
let isSnakeRunning = false;

function initSnakeGame() {
    snakeCanvas = document.getElementById('snake-canvas');
    snakeCtx = snakeCanvas.getContext('2d');
    
    const startBtn = document.getElementById('snake-start-btn');
    startBtn.addEventListener('click', () => {
        document.getElementById('snake-overlay').classList.add('hidden');
        resetSnakeGame();
        startSnakeGame();
    });
    
    window.addEventListener('keydown', handleSnakeKeys);
}

function startSnakeGame() {
    if (isSnakeRunning) return;
    isSnakeRunning = true;
    snakeGameInterval = setInterval(updateSnakeStep, 100);
}

function stopSnakeGame() {
    clearInterval(snakeGameInterval);
    isSnakeRunning = false;
}

function resetSnakeGame() {
    snake = [
        { x: 150, y: 150 },
        { x: 135, y: 150 },
        { x: 120, y: 150 }
    ];
    dx = gridSize;
    dy = 0;
    score = 0;
    document.getElementById('snake-score').innerText = score;
    spawnFood();
}

function spawnFood() {
    const maxX = (snakeCanvas.width / gridSize) - 1;
    const maxY = (snakeCanvas.height / gridSize) - 1;
    
    food = {
        x: Math.floor(Math.random() * maxX) * gridSize,
        y: Math.floor(Math.random() * maxY) * gridSize
    };
    
    snake.forEach(part => {
        if (part.x === food.x && part.y === food.y) {
            spawnFood();
        }
    });
}

function handleSnakeKeys(e) {
    if (!isSnakeRunning) return;
    
    const win = document.getElementById('snake-window');
    if (!win.classList.contains('active-window')) return;
    
    const goingUp = dy === -gridSize;
    const goingDown = dy === gridSize;
    const goingRight = dx === gridSize;
    const goingLeft = dx === -gridSize;
    
    if (e.key === 'ArrowLeft' && !goingRight) {
        dx = -gridSize; dy = 0; e.preventDefault();
    }
    if (e.key === 'ArrowRight' && !goingLeft) {
        dx = gridSize; dy = 0; e.preventDefault();
    }
    if (e.key === 'ArrowUp' && !goingDown) {
        dx = 0; dy = -gridSize; e.preventDefault();
    }
    if (e.key === 'ArrowDown' && !goingUp) {
        dx = 0; dy = gridSize; e.preventDefault();
    }
}

function updateSnakeStep() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    
    if (head.x < 0 || head.x >= snakeCanvas.width || head.y < 0 || head.y >= snakeCanvas.height || checkSelfCollision(head)) {
        handleGameOver();
        return;
    }
    
    snake.unshift(head);
    
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        document.getElementById('snake-score').innerText = score;
        playSound('point');
        spawnFood();
    } else {
        snake.pop();
    }
    
    drawSnakeFrame();
}

function checkSelfCollision(head) {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) return true;
    }
    return false;
}

function drawSnakeFrame() {
    snakeCtx.fillStyle = '#0f1115';
    snakeCtx.fillRect(0, 0, snakeCanvas.width, snakeCanvas.height);
    
    snakeCtx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
    for (let i = 0; i < snakeCanvas.width; i += gridSize) {
        snakeCtx.beginPath();
        snakeCtx.moveTo(i, 0);
        snakeCtx.lineTo(i, snakeCanvas.height);
        snakeCtx.stroke();
        
        snakeCtx.beginPath();
        snakeCtx.moveTo(0, i);
        snakeCtx.lineTo(snakeCanvas.width, i);
        snakeCtx.stroke();
    }
    
    // Draw food
    snakeCtx.fillStyle = '#fb923c';
    snakeCtx.shadowColor = '#fb923c';
    snakeCtx.shadowBlur = 6;
    snakeCtx.fillRect(food.x + 2, food.y + 2, gridSize - 4, gridSize - 4);
    
    // Draw snake
    snakeCtx.shadowColor = '#0ea5e9';
    snake.forEach((part, index) => {
        snakeCtx.fillStyle = index === 0 ? '#0ea5e9' : 'rgba(14, 165, 233, 0.7)';
        snakeCtx.fillRect(part.x + 1, part.y + 1, gridSize - 2, gridSize - 2);
    });
    
    snakeCtx.shadowBlur = 0;
}

function handleGameOver() {
    stopSnakeGame();
    playSound('gameover');
    
    if (score > highScore) {
        highScore = score;
        document.getElementById('snake-highscore').innerText = highScore;
    }
    
    document.getElementById('snake-overlay-status').innerText = 'GAME OVER';
    document.getElementById('snake-start-btn').innerText = 'RESTART';
    document.getElementById('snake-overlay').classList.remove('hidden');
}

// 6. Interactive Terminal & Matrix Rain Animation
let terminalHistory = [];
let matrixInterval = null;
let matrixActive = false;

function initTerminal() {
    const input = document.getElementById('term-input');
    
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = input.value.trim();
            if (command) {
                executeCommand(command);
            }
            input.value = '';
        }
    });
    
    document.getElementById('terminal-window').addEventListener('click', () => {
        input.focus();
    });
    
    printTerminalLine("AeroGlass Shell Terminal v1.0");
    printTerminalLine("Type 'help' for available commands.");
    printTerminalLine("");
}

function printTerminalLine(text) {
    const termBody = document.getElementById('term-body');
    const line = document.createElement('div');
    line.className = 'terminal-output-line';
    line.innerText = text;
    termBody.appendChild(line);
    termBody.scrollTop = termBody.scrollHeight;
}

function executeCommand(cmdStr) {
    printTerminalLine(`sandeep@mountain-os:~$ ${cmdStr}`);
    playSound('click');
    
    const parts = cmdStr.split(' ');
    const cmd = parts[0].toLowerCase();
    const arg = parts.length > 1 ? parts[1].toLowerCase() : '';
    
    switch (cmd) {
        case 'help':
            printTerminalLine("Available Commands:");
            printTerminalLine("  help     - Display this menu");
            printTerminalLine("  neofetch - Display system specifications");
            printTerminalLine("  matrix   - Toggle the matrix code rain animation");
            printTerminalLine("  theme    - Set wallpaper: sunset, fuji, alps, obsidian (e.g., theme fuji)");
            printTerminalLine("  audio    - Toggle synthesized sound output: on, off");
            printTerminalLine("  clear    - Clear console output");
            printTerminalLine("  devlogs  - Show devlog options (e.g., devlogs 1)");
            break;
            
        case 'neofetch':
            printTerminalLine("OS: Mountain OS (AeroGlass v1.0)");
            printTerminalLine("Host: Web Browser");
            printTerminalLine("Shell: AeroShell v1.0");
            printTerminalLine("Resolution: " + window.innerWidth + "x" + window.innerHeight);
            printTerminalLine("Theme: Mountain Sunset (Liquid Glass)");
            break;
            
        case 'clear':
            document.getElementById('term-body').innerHTML = '';
            break;
            
        case 'theme':
            if (['sunset', 'fuji', 'alps', 'obsidian'].includes(arg)) {
                setTheme(arg);
                printTerminalLine(`Theme set to [${arg}].`);
            } else {
                printTerminalLine("Unknown theme. Try: theme [sunset|fuji|alps|obsidian]");
            }
            break;
            
        case 'audio':
            if (arg === 'on') {
                soundEnabled = true;
                printTerminalLine("Synthesizer audio output ENABLED.");
            } else if (arg === 'off') {
                soundEnabled = false;
                printTerminalLine("Synthesizer audio output DISABLED.");
            } else {
                printTerminalLine(`Audio is currently ${soundEnabled ? 'ENABLED' : 'DISABLED'}. Use 'audio on' or 'audio off'.`);
            }
            break;
            
        case 'matrix':
            toggleMatrixRain();
            break;
            
        case 'devlogs':
            if (arg === '1' || arg === '2' || arg === '3') {
                openWindow('devlog-window');
                const navButtons = document.querySelectorAll('.devlog-nav-btn');
                navButtons.forEach(btn => {
                    if (btn.dataset.log === `devlog${arg}`) {
                        btn.click();
                    }
                });
                printTerminalLine(`Opening Devlog Part ${arg} in Devlog App.`);
            } else {
                printTerminalLine("Use: devlogs [1|2|3]");
            }
            break;
            
        default:
            playSound('error');
            printTerminalLine(`bash: command not found: ${cmd}. Type 'help' for instructions.`);
    }
}

function setTheme(themeName) {
    const body = document.body;
    body.classList.remove('bg-sunset', 'bg-fuji', 'bg-alps', 'bg-obsidian');
    
    // Reset cards selection in customizer app
    document.querySelectorAll('.wallpaper-card').forEach(card => {
        if (card.dataset.theme === themeName) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });
    
    // Sync Select elements in customizer
    const sel = document.getElementById('wallpaper-select');
    if (sel) sel.value = themeName;
    
    if (themeName === 'sunset') {
        body.classList.add('bg-sunset');
    } else if (themeName === 'fuji') {
        body.classList.add('bg-fuji');
    } else if (themeName === 'alps') {
        body.classList.add('bg-alps');
    } else if (themeName === 'obsidian') {
        body.classList.add('bg-obsidian');
    }
}

function toggleMatrixRain() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    
    if (matrixActive) {
        stopMatrixRain();
        printTerminalLine("Matrix Code Waterfall disabled.");
    } else {
        matrixActive = true;
        canvas.style.display = 'block';
        printTerminalLine("Matrix Code Waterfall enabled.");
        
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
        
        const columns = Math.floor(canvas.width / 16) + 1;
        const yPositions = Array(columns).fill(0);
        
        function stepMatrix() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#8ec5fc';
            ctx.font = '14px monospace';
            
            yPositions.forEach((y, index) => {
                const text = String.fromCharCode(Math.floor(Math.random() * 94) + 33);
                const x = index * 16;
                ctx.fillText(text, x, y);
                
                if (y > 100 + Math.random() * 10000) {
                    yPositions[index] = 0;
                } else {
                    yPositions[index] = y + 16;
                }
            });
        }
        
        matrixInterval = setInterval(stepMatrix, 33);
    }
}

function stopMatrixRain() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    
    clearInterval(matrixInterval);
    matrixActive = false;
    canvas.style.display = 'none';
}

// 7. Customizer / Settings Setup
function initCustomizer() {
    const wallpaperSelect = document.getElementById('wallpaper-select');
    if (wallpaperSelect) {
        wallpaperSelect.addEventListener('change', (e) => {
            setTheme(e.target.value);
            playSound('click');
        });
    }
    
    document.querySelectorAll('.wallpaper-card').forEach(card => {
        card.addEventListener('click', () => {
            const theme = card.dataset.theme;
            setTheme(theme);
            playSound('click');
        });
    });
    
    const applyUrlBtn = document.getElementById('apply-wallpaper-url');
    const urlInput = document.getElementById('wallpaper-url-input');
    
    if (applyUrlBtn && urlInput) {
        applyUrlBtn.addEventListener('click', () => {
            const url = urlInput.value.trim();
            if (url) {
                document.body.className = ''; // wipe background classes
                document.body.style.backgroundImage = `url('${url}')`;
                document.body.style.backgroundSize = 'cover';
                document.body.style.backgroundPosition = 'center';
                playSound('click');
            } else {
                playSound('error');
            }
        });
    }
    
    document.querySelectorAll('.sound-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.dataset.sound;
            playSound(type);
        });
    });
    
    // Volume Control Simulator in Customizer
    const volumeSlider = document.getElementById('audio-volume');
    if (volumeSlider) {
        volumeSlider.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            soundEnabled = (val > 0);
            
            // Sync Control Center volume slider
            const ccVolSlider = document.getElementById('cc-volume-slider');
            if (ccVolSlider) ccVolSlider.value = val;
            
            // Sync CC visual indicator
            const ccAudioToggle = document.getElementById('cc-audio-toggle');
            if (ccAudioToggle) {
                ccAudioToggle.querySelector('.cc-tile-icon').innerText = soundEnabled ? '🔊' : '🔇';
                ccAudioToggle.querySelector('.cc-title').innerText = soundEnabled ? 'Sound Chime' : 'Muted';
            }
        });
    }
}

// 8. Main Entry Hook
document.addEventListener('DOMContentLoaded', () => {
    initWindowManager();
    initSystemUI();
    initSnakeGame();
    initTerminal();
    initCustomizer();
    
    // Set Mountain Sunset as default body class
    setTheme('sunset');
    
    // Update battery level simulation
    const batteryLevel = document.getElementById('system-battery');
    if (batteryLevel) {
        let charge = 98;
        batteryLevel.innerText = `${charge}%`;
        setInterval(() => {
            charge = Math.max(1, charge - 1);
            batteryLevel.innerText = `${charge}%`;
        }, 120000);
    }
});
