- Bootstrapped .github/workflows/pages.yml to enable GitHub Pages deployment.
## Environment State Shifts
* Injected a CI-time sed replacement into the GitHub Pages deployment pipeline (`.github/workflows/pages.yml`) to remove the `<base href="/">` tag during builds. This resolves relative asset path failures on GitHub Pages while preserving the tag for local development.
