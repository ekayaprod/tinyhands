# ADR 003: Hero Parallax Performance Optimization

**Context:**
The landing page hero section required a visually engaging, multi-layered 3D depth effect (parallax) combined with floating CSS animations and particle effects. Introduced in PR #9fddffc (March 2026), the challenge was implementing this without causing layout thrashing, jank on lower-end devices, or conflicting animations on the same DOM elements.

**Decision:**
The `js/parallax.js` module implemented a strictly segregated animation architecture:
1.  **3-Layer Depth Segregation:** The hero is split into Background (moves WITH mouse), Midground (moves slightly opposite), and Foreground (moves strongly opposite).
2.  **CSS/JS Separation of Concerns:**
    *   JS (`mousemove` handler) exclusively handles `translate3d()` on the *wrapper* `<div>` elements of each layer for hardware-accelerated 3D transforms.
    *   CSS exclusively handles the continuous `heroBob` keyframe animations on the `<img>` elements *inside* those wrappers.
    *   *Why?* This prevents CSS and JS from fighting over the `transform` property of the same element, ensuring 60fps smoothness.
3.  **Particle Lifecycle Management:** Sparkle particles (✨) spawned on `mousemove` are strictly capped at 15 concurrent elements. A `setTimeout` removes them from the DOM automatically, preventing memory leaks and DOM bloat.
4.  **Graceful Degradation:** On mobile (`<768px`) or when `prefers-reduced-motion` is active, the JS parallax tracking is completely disabled, and only lightweight CSS animations (or none) run.

**Consequences:**
*   **Pros:** Achieves a highly complex visual effect while maintaining strict 60fps performance through hardware acceleration (`translate3d`) and strict separation of CSS/JS transform targets. Memory is explicitly managed via particle capping.
*   **Cons:** Requires careful HTML nesting (wrapper divs for JS, img tags for CSS). If the nesting contract is broken, animations will conflict.
