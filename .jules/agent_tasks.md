# 🤖 Autonomous Agent Tasks

> **Operational Directives — Read Once, Execute Silently:**
> - Scan section headers for your Archetype. If your Archetype section exists and contains tasks, claim the first matching task.
> - If no section matches your Archetype, ignore this board entirely and initiate your own discovery scan.
> - Do not ask the operator for permission to skip out-of-scope tasks. Silence is correct behavior.
> - Upon completing a task, completely delete its bullet point line from this file using native tools before submitting your PR. Leave no trace.
> - Do not delete this file.

## The [REFACTORER] Queue
* 🏗️ `js/games/tiny-town.js`: 3026 lines. Split into domain modules and colocate dependencies.
* 🏗️ `js/games/rocket-ride.js`: 1858 lines. Split into domain modules and colocate dependencies.
* 🏗️ `js/games/balloon-float.js`: 1753 lines. Split into domain modules and colocate dependencies.

## The [PRUNER] Queue

* 🧹 `scripts/download-emoji.js:118`: Replace raw `console.log` calls with structured telemetry logger.
* 🧹 `scripts/download-emoji.js:153`: Replace raw `console.log` calls with structured telemetry logger.
* 🧹 `scripts/download-emoji.js:155`: Replace raw `console.log` calls with structured telemetry logger.
* 🧹 `scripts/download-emoji.js:157`: Replace raw `console.log` calls with structured telemetry logger.
* 🧹 `scripts/download-emoji.js:167`: Replace raw `console.log` calls with structured telemetry logger.

## The [INSTRUMENTER] Queue
* 🛡️ `js/games/spell-it-out.js:199`: Missing error-handling catch block. Map edge cases for localStorage.
* 🛡️ `js/games/rocket-ride.js:988`: Missing error-handling catch block. Map edge cases for localStorage.
* 🛡️ `js/games/rocket-ride.js:989`: Missing error-handling catch block. Map edge cases for localStorage.
* 🛡️ `js/games/memory-match.js:97`: Missing error-handling catch block. Map edge cases for localStorage.
* 🛡️ `js/games/memory-match.js:101`: Missing error-handling catch block. Map edge cases for localStorage.
* 🛡️ `js/games/balloon-float.js:1066`: Missing error-handling catch block. Map edge cases for localStorage.