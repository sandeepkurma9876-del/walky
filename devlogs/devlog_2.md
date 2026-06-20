# Devlog 2: Coding the Custom Window Manager

With the main visual layout and workspace ready, the next step was building the Javascript-based window manager.

### 1. Window Operations (Open, Close, Minimize, Maximize)
Each window consists of:
*   A container `.window` with absolute positioning.
*   A header `.window-header` which acts as the handle.
*   Window controls: Red dot (Close), Yellow dot (Minimize), Green dot (Maximize).
*   A body `.window-body` holding the content.

I wrote handlers in `app.js` to toggle CSS classes like `.hidden` (for minimizing/closing) and `.maximized` (which sets the window to full viewport size).

### 2. Multi-touch and Drag Logic
To make the windows draggable:
*   I attached `mousedown` and `touchstart` event listeners to the `.window-header` element.
*   When clicked, the script computes the mouse's offset relative to the window's top-left corner.
*   It registers dynamic `mousemove`/`touchmove` listeners on the `document` level to shift the window coordinates smoothly.
*   On mouse/touch up, these listeners are removed, leaving the window in place.

### 3. Layering & Focus Z-Index Management
To handle overlapping windows:
*   I declared a global tracking variable `highestZIndex` in JavaScript.
*   Whenever a window header is clicked or drag begins, the manager updates the window's `z-index` to `highestZIndex + 1`, and increments `highestZIndex`. This ensures that active or clicked windows dynamically pop to the foreground.
