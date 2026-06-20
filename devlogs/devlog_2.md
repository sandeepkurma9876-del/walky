# Devlog 2: Coding the Custom Window Manager

With the visual layout ready, the next step was building a robust JavaScript window manager.

### 1. Robust Centering and Positioning
Unlike basic templates, I wrote positioning code that uses `offsetWidth` and `offsetHeight` to accurately calculate the window's rendered bounding coordinates. When any desktop icon is clicked, the window opens perfectly centered in the viewport.

### 2. Dragging and Layering Focus
*   Attached `mousedown` and `touchstart` listeners to the window header to allow seamless window dragging across the desktop on desktop and mobile browsers.
*   Maintained a global `highestZIndex` variable. Whenever a user clicks on a window, it pops to the foreground dynamically, focusing state.
*   Created macOS-style traffic light controls (close, minimize, maximize) that render clean icons (`×`, `−`, `+`) on hover.
