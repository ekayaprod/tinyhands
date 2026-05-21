# ADR 001: Fluent 3D Emoji Migration

**Context:**
Historically, emoji rendering across the application (8 games, effects, and landing page) relied on the device's default system font. This resulted in fragmented user experiences: a 🚀 might look highly polished on iOS but flat or entirely different on an older Android device. As introduced in PR #f97602a (March 2026), the system was overhauled to guarantee visual consistency.

**Decision:**
The application migrated entirely to Microsoft Fluent 3D Emoji, serving 256px PNGs directly from jsDelivr CDN. This transition fundamentally altered rendering mechanisms:
- Added a centralized `js/emoji.js` module.
- Added `js/emoji-registry.js` with per-game preload lists (~306 unique emojis).
- DOM-based games (`splat-keys`, `spell-it-out`, `ball-bonanza`, `stack-smash`, `memory-match`, `stack-audience`) moved from `textContent`/`innerHTML` string injection to `createEmojiImg()` `<img>` tags.
- Canvas-based games (`rocket-ride`, `balloon-float`, `tiny-town`) replaced `fillText` with `drawImage` using sprite caching (`getSprite()`).

*Fallback Mechanism:* As observed in commit 6283014, a Zero Width Joiner (ZWJ) fallback was implemented. If a gendered or skin-toned CDN emoji fails to load (403), the system dynamically strips the modifiers and attempts to load the base codepoint emoji. If the CDN completely fails, it gracefully falls back to the native system font emoji.

**Consequences:**
*   **Pros:** 100% visual consistency across all devices and platforms. High-quality 3D aesthetic matches the game's intended art direction.
*   **Cons:** Increased network requests (mitigated via preloading registries) and slightly increased memory footprint due to image/sprite caching. Requires specific logic (`createEmojiImg`, `getSprite`) rather than simple string assignment.
