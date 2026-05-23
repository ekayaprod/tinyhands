# Viewmorph Journal

## Axioms
- Layouts must breathe: fixed pixels are cages. Use `clamp()`, `min-width`, and `max-width` relative sizing.
- Focus on `div`, `section`, `main` layout nodes. Skip hardcoded canvas elements or images.
- Mouse hovers are invisible ghosts on mobile viewports. Always wrap pure CSS hover states inside `@media (hover: hover) and (pointer: fine)`.
- Minimum tap targets must enforce a minimum bounds of 44px by 44px to eliminate fat-finger errors on mobile viewports.

## Recent Activity
- Transformed `.memory-diff-btn` into a fluid container by stripping `min-width: 140px` and implementing `clamp(100px, 30vw, 140px)`.
- Ensured scroll-safe user gestures by wrapping `.memory-diff-btn:hover` and `.memory-endcard-btn:hover` in the `@media (hover: hover) and (pointer: fine)` block.
- Updated `.memory-endcard-btn` with `min-height: 44px` to meet minimum touch tap target accessibility standards.
- Re-anchored `.memory-hud` coordinates using `clamp()` logic to flow nicely across any dimensions instead of rigid fixed boundaries.
