# 🧸 Tiny Hands Play

Welcome to **Tiny Hands Play**! 👋 We build free, fun, and educational browser games for toddlers and kids aged 6 months to 9 years.
No installs, no accounts, no ads. Just open and play! ✨

Games include Kaboom Keys, Stack It Up, Spell It Out, Memory Match, Balloon Float, and Rocket Ride! 🚀🎈

---

## 🚀 Quick Start

This is a vanilla frontend application with zero build steps! To boot the application locally:

1. **Serve the repository root.** Because we use `<base href="/">` and a Service Worker (`sw.js`), you must serve the files via a local HTTP server. (e.g., `python -m http.server`, `npx serve`, or your favorite local server).
2. **Open your browser** to the local port and start playing! 🎮
3. **Vercel Magic:** We are pre-configured for Vercel out of the box (see `vercel.json` for rewrite rules). ☁️

**Need fresh emojis?**
If you want to update the 3D Fluent emojis used in the games, we have a handy script. Make sure you have Node.js installed and run:
```bash
node scripts/download-emoji.js
```

---

## 🗺️ Repository Map

Wondering where everything is? Here's the layout of our magical monorepo maze! 🧩

* 🎮 `/js/games/` — The brains behind the fun! This directory contains the raw logic for all our mini-games (like `rocket-ride.js`, `balloon-float.js`, and `tiny-town.js`).
* 🎨 `/css/` — Stylesheets for the main landing page, playground, and all individual game modules.
* 🖼️ `/assets/` — Media assets including audio files, icons, and downloaded 3D emojis.
* 🛠️ `/scripts/` — Home to our utility scripts, like the magical `download-emoji.js` downloader.
