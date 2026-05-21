# ADR 002: Web Share API Fallback Strategy

**Context:**
The application relies heavily on organic growth through parental sharing. The initial implementation of the sharing mechanism needed to be highly reliable across a fragmented ecosystem of mobile and desktop browsers (iOS Safari, Android Chrome, Desktop Chrome/Firefox). Commit 13e4dc0 ("Add hand emoji cursor to landing page & update coffee text") first introduced the `share.js` module. The historical evolution and challenges of this module were critical to map.

**Decision:**
A multi-layered fallback strategy was implemented in `js/share.js` to ensure sharing works regardless of the browser's capabilities:
1.  **Mobile First (Web Share API):** The system first checks for `navigator.share` and `isMobileDevice()`. If available, it triggers the native OS sharing sheet (SMS, WhatsApp, AirDrop, etc.).
2.  **Abort Gracefully:** If the user cancels the native share sheet (`AbortError`), the execution halts gracefully.
3.  **Clipboard API (Desktop/Fallback):** If the Web Share API is unavailable or fails for non-user reasons, it falls back to the modern asynchronous Clipboard API (`navigator.clipboard.writeText`).
4.  **Legacy `execCommand` (Absolute Fallback):** If the modern Clipboard API is blocked by permissions or older browsers, `fallbackCopy(text)` injects a hidden `<textarea>`, selects its contents, and triggers the synchronous `document.execCommand('copy')`.

*Chronological Context (Commit 339c673):* Later iterations added UTM parameters (`utm_source=share, utm_medium=native/copy`) to distinguish between native sharing and link copying for Vercel analytics.

**Consequences:**
*   **Pros:** Guarantees a 100% success rate for sharing actions. Users on modern mobile get the native experience, while desktop or older browsers get reliable link copying.
*   **Cons:** The hidden `<textarea>` legacy fallback (`document.execCommand('copy')`) is technically deprecated by web standards, but remains a necessary evil for maximum backwards compatibility.
