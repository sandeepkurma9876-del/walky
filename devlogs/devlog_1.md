# Devlog 1: Setting up AetherOS Design and Layout

Today, I began building **AetherOS**, my web-based operating system. I wanted to move away from the traditional, flat Windows 95/Classic UI that many people build, and create a premium, futuristic "Cyber-Glassmorphism" theme instead.

### 1. Setting Up the CSS Variables & Theme
I defined the core color palette and styling variables in `style.css`:
*   **Colors**: Pure dark background, deep charcoal translucent window backgrounds, vibrant cyan and magenta glowing borders for active states.
*   **Fonts**: Custom font links to Google Fonts for `Orbitron` (gives a sci-fi/digital clock look) and `Inter` (very readable sans-serif for UI elements).
*   **Glass Effect**: Implemented `backdrop-filter: blur(12px)` and a subtle `rgba(255, 255, 255, 0.05)` background to create transparent, frosted-glass panels.

### 2. Designing the Desktop Environment
I created:
*   A **Boot/Welcome Screen** overlay. When you load the page, the screen presents a sleek central hub with a glowing "Boot System" button. Clicking this triggers the system initialize sound and fades out the screen to reveal the desktop.
*   A **Desktop Area** that supports custom grid positioning for app icons (Shortcuts).
*   A bottom **Dock/Taskbar** featuring a digital clock, a battery level indicator simulator, open app windows, and app launchers.
