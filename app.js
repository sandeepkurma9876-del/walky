// WebOS - AetherOS Core Script

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
    
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    const now = audioCtx.currentTime;
    
    if (type === 'boot') {
        // Futuristic chord: minor to major sweep
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(130.81, now); // C3
        osc.frequency.exponentialRampToValueAtTime(261.63, now + 0.3); // C4
        osc.frequency.exponentialRampToValueAtTime(392.00, now + 0.6); // G4
        osc.frequency.exponentialRampToValueAtTime(523.25, now + 1.0); // C5
        
        gainNode.gain.setValueAtTime(0.01, now);
        gainNode.gain.linearRampToValueAtTime(0.15, now + 0.2);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 1.2);
        
        osc.start(now);
        osc.stop(now + 1.3);
    } else if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.05);
        
        gainNode.gain.setValueAtTime(0.05, now);
        gainNode.gain.linearRampToValueAtTime(0.001, now + 0.08);
        
        osc.start(now);
        osc.stop(now + 0.1);
    } else if (type === 'open') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);
        
        gainNode.gain.setValueAtTime(0.08, now);
        gainNode.gain.linearRampToValueAtTime(0.001, now + 0.2);
        
        osc.start(now);
        osc.stop(now + 0.25);
    } else if (type === 'error') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.setValueAtTime(100, now + 0.1);
        
        gainNode.gain.setValueAtTime(0.15, now);
        gainNode.gain.linearRampToValueAtTime(0.001, now + 0.35);
        
        osc.start(now);
        osc.stop(now + 0.4);
    } else if (type === 'point') {
        // Point scored in snake
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
        
        gainNode.gain.setValueAtTime(0.08, now);
        gainNode.gain.linearRampToValueAtTime(0.001, now + 0.18);
        
        osc.start(now);
        osc.stop(now + 0.2);
    } else if (type === 'gameover') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.linearRampToValueAtTime(100, now + 0.5);
        
        gainNode.gain.setValueAtTime(0.1, now);
        gainNode.gain.linearRampToValueAtTime(0.001, now + 0.6);
        
        osc.start(now);
        osc.stop(now + 0.6);
    }
}

// 2. Devlog Database (Stored locally for offline & file:// capability)
const devlogsData = {
    devlog1: `<h1>Devlog 1: Setting up AetherOS Design and Layout</h1>
<p>Today, I began building <strong>AetherOS</strong>, my web-based operating system. I wanted to move away from the traditional, flat Windows 95/Classic UI that many people build, and create a premium, futuristic "Cyber-Glassmorphism" theme instead.</p>
<h3>1. Setting Up the CSS Variables & Theme</h3>
<p>I defined the core color palette and styling variables in <code>style.css</code>:</p>
<ul>
<li><strong>Colors</strong>: Pure dark background, deep charcoal translucent window backgrounds, vibrant cyan and magenta glowing borders for active states.</li>
<li><strong>Fonts</strong>: Custom font links to Google Fonts for <em>Orbitron</em> (gives a sci-fi/digital clock look) and <em>Inter</em> (very readable sans-serif for UI elements).</li>
<li><strong>Glass Effect</strong>: Implemented <code>backdrop-filter: blur(12px)</code> and a subtle <code>rgba(255, 255, 255, 0.05)</code> background to create transparent, frosted-glass panels.</li>
</ul>
<h3>2. Designing the Desktop Environment</h3>
<p>I created:</p>
<ul>
<li>A <strong>Boot/Welcome Screen</strong> overlay. When you load the page, the screen presents a sleek central hub with a glowing "Boot System" button. Clicking this triggers the system initialize sound and fades out the screen to reveal the desktop.</li>
<li>A <strong>Desktop Area</strong> that supports custom grid positioning for app icons (Shortcuts).</li>
<li>A bottom <strong>Dock/Taskbar</strong> featuring a digital clock, a battery level indicator simulator, open app windows, and app launchers.</li>
</ul>`,
    devlog2: `<h1>Devlog 2: Coding the Custom Window Manager</h1>
<p>With the main visual layout and workspace ready, the next step was building the Javascript-based window manager.</p>
<h3>1. Window Operations (Open, Close, Minimize, Maximize)</h3>
<p>Each window consists of:</p>
<ul>
<li>A container <code>.window</code> with absolute positioning.</li>
<li>A header <code>.window-header</code> which acts as the handle.</li>
<li>Window controls: Red dot (Close), Yellow dot (Minimize), Green dot (Maximize).</li>
<li>A body <code>.window-body</code> holding the content.</li>
</ul>
<p>I wrote handlers in <code>app.js</code> to toggle CSS classes like <code>.hidden</code> (for minimizing/closing) and <code>.maximized</code> (which sets the window to full viewport size).</p>
<h3>2. Multi-touch and Drag Logic</h3>
<p>To make the windows draggable:</p>
<ul>
<li>I attached <code>mousedown</code> and <code>touchstart</code> event listeners to the <code>.window-header</code> element.</li>
<li>When clicked, the script computes the mouse's offset relative to the window's top-left corner.</li>
<li>It registers dynamic <code>mousemove</code>/<code>touchmove</code> listeners on the <code>document</code> level to shift the window coordinates smoothly.</li>
<li>On mouse/touch up, these listeners are removed, leaving the window in place.</li>
</ul>
<h3>3. Layering & Focus Z-Index Management</h3>
<p>To handle overlapping windows:</p>
<ul>
<li>I declared a global tracking variable <code>highestZIndex</code> in JavaScript.</li>
<li>Whenever a window header is clicked or drag begins, the manager updates the window's <code>z-index</code> to <code>highestZIndex + 1</code>, and increments <code>highestZIndex</code>. This ensures that active or clicked windows dynamically pop to the foreground.</li>
</ul>`,
    devlog3: `<h1>Devlog 3: Custom Features and Final Assembly</h1>
<p>Today was dedicated to adding high-fidelity, interactive feature sets that exceed standard guides.</p>
<h3>1. Retro Canvas Paint (CyberPaint)</h3>
<p>I added a full canvas drawing tool. Moving the mouse inside the canvas draws pixels. Added color palette presets, line thickness sliders, and a clear button.</p>
<h3>2. Retro Snake Game</h3>
<p>Built a custom, self-contained grid-based Snake game. Implemented keyboard arrow listeners, score tracking, start/restart buttons, and synthesized retro win/fail buzzes.</p>
<h3>3. Interactive Shell Terminal with Matrix Falling Code</h3>
<p>I built an interactive terminal emulator. It parses commands like <code>help</code>, <code>neofetch</code> (displays an ASCII system logo), <code>theme</code>, <code>clear</code>, and <code>matrix</code>.</p>
<ul>
<li>Typing <code>matrix</code> starts a glowing, falling green character rain animation inside the terminal window! Typing <code>matrix</code> again toggles it off.</li>
</ul>
<h3>4. Audio Synthesizer (Web Audio API)</h3>
<p>Using only native code (no audio files!), I configured an <code>AudioContext</code> to generate retro synthesizers:</p>
<ul>
<li><em>Startup Chime</em>: A nice, rich minor-to-major synthesizer chord.</li>
<li><em>Click Sound</em>: Soft high-pitched click.</li>
<li><em>Game Win/Lose Beeps</em>: Fun high/low frequency transitions.</li>
</ul>
<h3>5. Final Polishing</h3>
<p>Tested window transitions, added volume and background controllers to the customizer, and styled all items for maximum responsiveness. AetherOS is ready to run!</p>`
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
            
            // Constrain within viewport top boundary
            if (top < 0) top = 0;
            
            win.style.left = `${left}px`;
            win.style.top = `${top}px`;
        }
        
        function touchMoveHandler(e) {
            if (!isDragging) return;
            const touch = e.touches[0];
            let left = touch.clientX - offsetX;
            let top = touch.clientY - offsetY;
            
            if (top < 0) top = 0;
            
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
    
    // Center the window on the viewport, with slight cascade offset
    if (!win.dataset.positioned) {
        const winWidth = parseInt(win.style.width) || 640;
        const winHeight = parseInt(win.style.height) || 480;
        const vpWidth = window.innerWidth;
        const vpHeight = window.innerHeight - 72; // account for dock
        
        const cascade = (openWindows.size * 30) % 120;
        const centerX = Math.max(20, (vpWidth - winWidth) / 2 + cascade);
        const centerY = Math.max(20, (vpHeight - winHeight) / 2 + cascade);
        
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
}

function toggleMaximize(win) {
    win.classList.toggle('maximized');
    playSound('click');
    
    if (win.id === 'paint-window') {
        // Redraw/resize canvas
        initPaintCanvas();
    }
}

function updateDockIndicators() {
    document.querySelectorAll('.dock-shortcut-btn').forEach(btn => {
        const target = btn.dataset.window;
        const win = document.getElementById(target);
        if (win && win.classList.contains('open')) {
            btn.classList.add('active-indicator');
        } else {
            btn.classList.remove('active-indicator');
        }
    });
}

// Start Menu and Dock binds
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
    
    // Welcome Boot Button
    const bootBtn = document.getElementById('boot-btn');
    const welcome = document.getElementById('welcome-screen');
    bootBtn.addEventListener('click', () => {
        playSound('boot');
        welcome.classList.add('fade-out');
        setTimeout(() => {
            welcome.style.display = 'none';
            // Open intro window
            openWindow('about-window');
        }, 1000);
    });
    
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
    
    document.addEventListener('click', (e) => {
        if (!startMenu.contains(e.target) && e.target !== startBtn) {
            startMenu.classList.remove('show');
        }
    });
    
    // Start Menu Items Binds
    document.querySelectorAll('.start-menu-item').forEach(item => {
        item.addEventListener('click', () => {
            const target = item.dataset.window;
            openWindow(target);
            startMenu.classList.remove('show');
        });
    });
    
    // Shutdown Action
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
    const navButtons = document.querySelectorAll('.devlog-nav-btn');
    
    function loadDevlog(logKey) {
        devlogBody.innerHTML = devlogsData[logKey] || '<p>Devlog not found.</p>';
        navButtons.forEach(btn => {
            if (btn.dataset.log === logKey) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
    
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            loadDevlog(btn.dataset.log);
            playSound('click');
        });
    });
    
    // Default load devlog 1
    loadDevlog('devlog1');
}

// 4. Paint App Logic
let paintCanvas = null;
let paintCtx = null;
let isDrawing = false;
let brushColor = '#5ac8fa';
let brushSize = 5;

function initPaintCanvas() {
    paintCanvas = document.getElementById('paint-canvas');
    if (!paintCanvas) return;
    paintCtx = paintCanvas.getContext('2d');
    
    // Resize canvas based on parent container
    const container = paintCanvas.parentElement;
    paintCanvas.width = container.clientWidth;
    paintCanvas.height = container.clientHeight;
    
    // Drawing setup
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
        const rect = paintCanvas.getBoundingClientRect();
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
    
    // Keybind listeners for snake
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
    
    // Verify food is not on snake body
    snake.forEach(part => {
        if (part.x === food.x && part.y === food.y) {
            spawnFood();
        }
    });
}

function handleSnakeKeys(e) {
    if (!isSnakeRunning) return;
    
    // Check if snake window is in foreground
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
    // Check collision with wall
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    
    if (head.x < 0 || head.x >= snakeCanvas.width || head.y < 0 || head.y >= snakeCanvas.height || checkSelfCollision(head)) {
        handleGameOver();
        return;
    }
    
    snake.unshift(head);
    
    // Eaten food?
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
    // Clear
    snakeCtx.fillStyle = '#0f1115';
    snakeCtx.fillRect(0, 0, snakeCanvas.width, snakeCanvas.height);
    
    // Draw grid lines subtly
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
    snakeCtx.fillStyle = '#ff6b9d';
    snakeCtx.shadowColor = '#ff6b9d';
    snakeCtx.shadowBlur = 6;
    snakeCtx.fillRect(food.x + 2, food.y + 2, gridSize - 4, gridSize - 4);
    
    // Draw snake
    snakeCtx.shadowColor = '#5ac8fa';
    snake.forEach((part, index) => {
        snakeCtx.fillStyle = index === 0 ? '#5ac8fa' : 'rgba(90, 200, 250, 0.7)';
        snakeCtx.fillRect(part.x + 1, part.y + 1, gridSize - 2, gridSize - 2);
    });
    
    // Reset shadow
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
    const termBody = document.getElementById('term-body');
    
    // Input handle
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = input.value.trim();
            if (command) {
                executeCommand(command);
            }
            input.value = '';
        }
    });
    
    // Keep focus inside terminal on click
    document.getElementById('terminal-window').addEventListener('click', () => {
        input.focus();
    });
    
    // Initial print
    printTerminalLine("AetherOS Terminal Emulator v1.0.0");
    printTerminalLine("Type 'help' for a list of available commands.");
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
    printTerminalLine(`aether-user@os:~$ ${cmdStr}`);
    playSound('click');
    
    const parts = cmdStr.split(' ');
    const cmd = parts[0].toLowerCase();
    const arg = parts.length > 1 ? parts[1].toLowerCase() : '';
    
    switch (cmd) {
        case 'help':
            printTerminalLine("Available Commands:");
            printTerminalLine("  help     - Display this menu");
            printTerminalLine("  neofetch - Display system specifications");
            printTerminalLine("  matrix   - Toggle the green digital rain waterfall animation");
            printTerminalLine("  theme    - Set colors: aurora, sunset, matrix, dark (e.g., theme sunset)");
            printTerminalLine("  audio    - Toggle synthesized sound output: on, off");
            printTerminalLine("  clear    - Clear console console output");
            printTerminalLine("  devlogs  - Show devlog options (e.g., devlogs 1)");
            break;
            
        case 'neofetch':
            printTerminalLine("       .---.          aether-user@AetherOS");
            printTerminalLine("      /     \\         -------------------");
            printTerminalLine("      \\_.._/          OS: AetherOS Web Edition 1.0");
            printTerminalLine("      //\\\\\\\\          Kernel: WebJS-DOM 2026.06");
            printTerminalLine("      \\\\\\\\//          Uptime: Just Booted");
            printTerminalLine("       '--'           Shell: Javascript Interactive Shell");
            printTerminalLine("                      Resolution: " + window.innerWidth + "x" + window.innerHeight);
            printTerminalLine("                      Theme: Cyber-Glassmorphism v1");
            printTerminalLine("                      CPU: Gemini-3.5-Flash (Simulated)");
            printTerminalLine("                      Memory: 16GB Virtual Memory");
            break;
            
        case 'clear':
            document.getElementById('term-body').innerHTML = '';
            break;
            
        case 'theme':
            if (['aurora', 'sunset', 'matrix', 'dark'].includes(arg)) {
                setTheme(arg);
                printTerminalLine(`Theme shifted successfully to [${arg}].`);
            } else {
                printTerminalLine("Unknown theme choice. Try: theme [aurora|sunset|matrix|dark]");
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
                // Simulate click on correct devlog
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
    body.className = ''; // remove current
    
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
    
    if (themeName === 'aurora') {
        body.classList.add('bg-gradient-aurora');
    } else if (themeName === 'sunset') {
        body.classList.add('bg-gradient-sunset');
    } else if (themeName === 'matrix') {
        body.classList.add('bg-gradient-matrix');
    } else if (themeName === 'dark') {
        body.classList.add('bg-solid-dark');
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
            
            ctx.fillStyle = '#0f0';
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
    // Wallpaper dropdown select Binds
    const wallpaperSelect = document.getElementById('wallpaper-select');
    wallpaperSelect.addEventListener('change', (e) => {
        setTheme(e.target.value);
        playSound('click');
    });
    
    // Preset cards click binds
    document.querySelectorAll('.wallpaper-card').forEach(card => {
        card.addEventListener('click', () => {
            const theme = card.dataset.theme;
            setTheme(theme);
            playSound('click');
        });
    });
    
    // Image URL changer
    const applyUrlBtn = document.getElementById('apply-wallpaper-url');
    const urlInput = document.getElementById('wallpaper-url-input');
    
    applyUrlBtn.addEventListener('click', () => {
        const url = urlInput.value.trim();
        if (url) {
            document.body.className = ''; // wipe gradient styles
            document.body.style.backgroundImage = `url('${url}')`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';
            playSound('click');
        } else {
            playSound('error');
        }
    });
    
    // Soundboard buttons
    document.querySelectorAll('.sound-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.dataset.sound;
            playSound(type);
        });
    });
    
    // Volume Control Simulator
    const volumeSlider = document.getElementById('audio-volume');
    volumeSlider.addEventListener('input', (e) => {
        // Simple scale
        if (e.target.value == 0) {
            soundEnabled = false;
        } else {
            soundEnabled = true;
        }
    });
}

// 8. Main Entry Hook
document.addEventListener('DOMContentLoaded', () => {
    initWindowManager();
    initSystemUI();
    initSnakeGame();
    initTerminal();
    initCustomizer();
    
    // Update battery level simulation
    const batteryLevel = document.getElementById('system-battery');
    if (batteryLevel) {
        let charge = 98;
        batteryLevel.innerText = `${charge}%`;
        setInterval(() => {
            charge = Math.max(1, charge - 1);
            batteryLevel.innerText = `${charge}%`;
        }, 120000); // drain over time
    }
});
