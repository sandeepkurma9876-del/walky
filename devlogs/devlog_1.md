# Devlog 1: Setting up AeroGlass Design and Layout

Today, I began building **AeroGlass OS** (Walky OS), my web-based operating system. I wanted to move away from traditional retro templates and instead adopt a premium, ultra-slick macOS-like liquid glass theme.

### 1. Designing the Glassmorphism UI
I defined the core design tokens in `style.css`:
*   **Liquid Backgrounds**: Implemented smooth drifting glowing color orbs in the background using animated CSS radial gradients.
*   **AeroGlass Windows**: Utilized high translucency with `backdrop-filter: blur(28px) saturate(180%)`, pure white borders with low opacity, and wide, soft box shadows to mimic Apple's premium glass feel.
*   **Clean Typography**: Selected *Outfit* for headers and *Inter* for normal text to keep the interface feeling professional and balanced.

### 2. Creating Desktop and Dock
*   Designed a bottom floating **Dock** that holds shortcut items, open app indicators, and clock.
*   Created smooth, bouncy magnify scaling animations on dock icons when hovered.
