# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Tiny Town:** Introduced orthogonal road rendering using 19 elbow nodes and hold-to-move keyboard logic.
- **Spell It Out:** Added an emoji spelling game for ages 4-7 with persistent best scores.
- **Memory Match:** New 3D emoji memory game spanning three progressive grid difficulties.
- **Balloon Float:** Augmented gameplay with power-ups (Shield, SlowMo), a 3-lives HUD, and parallax environment layers.
- **Rocket Ride:** Deployed a physics-based space flight module dodging dynamic space debris.
- **Repository Hygiene:** Established `.gitattributes` baseline and expanded `.gitignore` to bar OS-level caches (`.DS_Store`, `__pycache__`).
- **GitHub Pages Pipeline:** Automated deployment workflow with dynamic `<base href>` path fixing for relative assets.
- **Repository Documentation:** Initialized Overseer triage board and root repository README.md.
- **Song Parade:** New waterfall rhythm game mode for Melody Maker with full choruses and auto-play toggles.
- **Melody Maker:** Piano and melody learning game for ages 3-7 featuring a rhythmic timing engine and level selection.
- **Parallax Hero Section:** 3-layer depth parallax effect with sparkle particles and clustered emojis on the landing page.
- **PWA Enhancements:** Dismissible install banners, peach gradient PWA icons, and Safari-specific macOS support.

### Changed
- **Responsive Layouts:** Morphed static grid containers in games to use fluid geometry.
- **Fluid Geometry:** Replaced clashing browser outlines with brand-aligned `:focus-visible` rings and upgraded hover effects to fluid `all 0.3s ease-in-out` transitions.
- **Refactoring:** Flattened heavily nested conditions within `generateBuildings` logic to use linear paths.
- **Payload Efficiency:** Forced lazy loading (`loading="lazy"`, `decoding="async"`) across DOM-injected and dynamic emojis to aggressively reduce network payload on initialization.
- **Maintenance:** Removed diagnostic console logs, formatted game and config files, and aggregated platform detection histories.
- **Routing:** Mapped legacy nested game routes via Vercel 301s to ensure backwards compatibility.
- **Service Worker:** Updated app shell dependencies to eradicate 404 caching errors on newly nested modules.
- **Performance:** Bumped Service Worker cache (v49) and switched to stale-while-revalidate for faster asset loading.
- **UI/UX Polish:** Scaled up hero emojis for iPad portrait mode, improved mobile spacing, and added an explicit "Copy URL" button to the Safari banner.

### Fixed
- Resolved broken local module import paths in nested game directories (`js/games/balloon-float/index.js`, `js/games/rocket-ride/index.js`, `js/games/tiny-town/index.js`).
- Resolved hero scroll jitter and overflow glitches on iPhone/iPad devices.
- Fixed layout issues with the level grid tile overlapping on landscape and desktop devices.
