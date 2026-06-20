# Mountain OS — AeroGlass WebOS

**Mountain OS** is a web-based desktop environment built entirely with HTML, CSS, and JavaScript, featuring draggable glassmorphism windows, a scenic alpine theme, and a full suite of built-in apps — including a paint canvas, retro snake game, interactive terminal, and an AI copilot powered by the Groq API.

🌐 **Live Demo:** https://sandeepkurma9876-del.github.io/walky/

---

## Features

- **Draggable Windows** — 5 fully draggable, resizable, minimizable, and maximizable windows using `position: fixed` and `getBoundingClientRect()` for accurate drag tracking
- **Passwordless Lockscreen** — macOS-style login screen; just click the arrow or press Enter to unlock
- **AeroGlass Design** — Liquid glass windows with `backdrop-filter: blur(28px)`, soft shadows, and premium typography (Outfit + Inter)
- **Scenic Wallpapers** — Mountain Sunset, Misty Fuji, Swiss Alps, and Obsidian Peak presets — switchable from the Customizer or terminal
- **Web Audio Synthesizer** — Rich C major 9th chord startup chime and 6 selectable system sounds (tick, swell, beep, buzz, crash)
- **AI Copilot** — Bottom-right floating chat agent powered by Groq's `llama-3.3-70b-versatile` model
- **macOS Control Center** — Toggle dark mode, adjust brightness, mute audio, and monitor simulated CPU/RAM stats
- **CyberPaint** — Canvas drawing app with color swatches and brush size control (touch-supported)
- **Retro Snake** — Arcade snake game with high score tracking and synthesized sound effects
- **Aether Shell Terminal** — Interactive terminal with `neofetch`, `matrix`, `theme`, `audio`, `devlogs`, and `clear` commands
- **Specs & Devlogs** — System info panel with 3 devlog entries documenting the build process

---

## Devlogs

| # | Title |
|---|-------|
| 1 | Setting up AeroGlass Design and Layout |
| 2 | Coding the Custom Window Manager |
| 3 | Advanced App Ecosystem & Control Center |

Access via: **Specs & Devlogs app → Devlogs tab**

---

## How to Run Locally

```bash
git clone https://github.com/sandeepkurma9876-del/walky.git
cd walky
python -m http.server 8000
```

Then open `http://localhost:8000` in any modern browser. No build step required.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 |
| Styling | Vanilla CSS (glassmorphism, custom animations) |
| Logic | Vanilla JavaScript (ES6+) |
| Graphics | HTML5 Canvas API |
| Audio | Web Audio API |
| AI | Groq API (llama-3.3-70b-versatile) |
| Hosting | GitHub Pages |
