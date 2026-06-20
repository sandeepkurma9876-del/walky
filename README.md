# Mountain OS - AeroGlass WebOS

AeroGlass Mountain OS is a premium, ultra-slick web-based desktop environment built using HTML, CSS, and JavaScript. Designed with Apple's liquid glass aesthetics (AeroGlass) and scenic mountain landscapes, it features interactive windows, custom scenic themes, synthesised Web Audio API sound sweeps, a Canvas-based Paint app, a fully functional Retro Snake arcade game, a terminal shell, and a macOS-style Control Center panel.

## Features
*   **AeroGlass Windows**: High translucency with backdrop filters (`blur(28px)`), rounded corners, and native-feeling macOS traffic light controls.
*   **Lockscreen**: Premium macOS-style lockscreen that is passwordless.
*   **macOS Control Center Panel**: Adjust screen brightness, control synthesized sounds, toggle light/dark modes, and view real-time hardware status metrics.
*   **Scenic Themes**: Dynamic drifting gradient and image-based wallpapers (Mountain Sunset, Misty Fuji, Alps Twilight, Obsidian Peak).
*   **Audio Chime**: Rich synthesised C major 9th chord startup sound.
*   **Built-in Apps**: AeroPaint canvas drawing, Retro Snake game, and Aether Shell Terminal (neofetch, matrix, clear commands).

## How to Run
1. Clone the repository.
2. Run a local development server using Python:
   ```bash
   python -m http.server 8000
   ```
3. Open `http://localhost:8000` in any modern web browser.
