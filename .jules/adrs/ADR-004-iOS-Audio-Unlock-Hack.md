# ADR 004: iOS Safari Audio Unlock Strategy

**Context:**
Web Audio API (`AudioContext`) is intentionally blocked by Apple on iOS Safari to prevent autoplaying audio. It strictly requires a synchronous user interaction (like a tap) to "unlock" or resume the context. A significant issue was encountered where iOS Safari would unexpectedly suspend the `AudioContext` mid-session (e.g., after fullscreen transitions or system notifications), causing games to go completely silent.

**Decision:**
A robust, self-healing audio unlock mechanism was built in `js/audio.js` through a series of evolutionary hacks (commits `e7a145f` and `1847f92`):
1.  **Continuous Unlock Listeners:** Removed `{ once: true }` from global `touchstart` and `click` listeners. `initAudio()` is executed on *every* user gesture.
2.  **State Verification:** The `iosUnlocked` flag is explicitly verified against `audioCtx.state === 'running'`. If Safari suspends the context (`audioCtx.state === 'suspended'`), the flag is forcefully reset to `false`, allowing the next user tap to re-unlock it.
3.  **The Silent Buffer Trick:** The most critical hack (introduced in `e7a145f`). Because `audioCtx.resume()` is asynchronous, iOS often ignores it if not paired with immediate playback. The system creates a 1-sample silent oscillator (`createBuffer(1, 1, 22050)`) and plays it synchronously during the gesture. This forces the OS to recognize the audio session as active and permanently unlocks the context.

**Consequences:**
*   **Pros:** Highly resilient audio playback. Recovers gracefully from OS-level interruptions, PWA backgrounding, and fullscreen API quirks on iOS.
*   **Cons:** Runs a small amount of audio initialization logic on *every* click/tap across the entire application, which is a micro-optimization tradeoff for guaranteed sound.
