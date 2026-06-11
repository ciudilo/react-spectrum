# AGENTS.md

Guidance for AI agents and automated workflows working in this repository.

## Required tools

Before building, running, or modifying anything, make sure the required toolchain is installed. The complete, authoritative list lives in CONTRIBUTING.md:

- [Required tools and prerequisites](CONTRIBUTING.md#required-tools-and-prerequisites)

That section is the source of truth — do not duplicate the full list here. It covers the **core development** tools (Node.js 24, Yarn 4 via Corepack, Git, Playwright browsers) and the **agent / contribution workflow extras** (Homebrew, GitHub CLI `gh`, ffmpeg).

## End-to-end workflow

The full contribution loop is **build → run dev server → verify in a browser → record a GIF → open a PR**. Beyond the core development tools, this loop requires the workflow extras:

- `gh` — fork the repo and open the pull request (run `gh auth login` first).
- Playwright browsers (`yarn playwright install`) — verify the running app in a real browser and capture screen recordings.
- `ffmpeg` — convert Playwright recordings into an optimized demo GIF.

These extras are frequently missing on a fresh machine; install them before starting the loop (see the CONTRIBUTING section linked above). On macOS: `brew install gh ffmpeg`.

## Conventions

- Follow the contribution process, testing, and linting guidance in [CONTRIBUTING.md](CONTRIBUTING.md).
- Do not commit or push unless explicitly asked.

## Cursor Cloud specific instructions

Standard commands live in [CONTRIBUTING.md](CONTRIBUTING.md#developing) (lint/test/build/storybook) — use those. Notes below are only the non-obvious, environment-specific gotchas.

### Node version
- The repo requires **Node 24** (`.nvmrc` = 24). It is pre-provisioned via nvm and symlinked into an early `PATH` entry, so `node -v` should report v24 in any shell. If it ever reports v22, run `nvm use 24`.

### Brand Asset Dashboard example (`examples/s2-vite-project`)
- This is a **standalone Vite app** that uses the **published** `@react-spectrum/s2` npm package — it does **not** require building the monorepo.
- It is **not** part of the root `workspaces`, so the root `yarn install` does not install it; it has its own `yarn.lock` and is installed separately (the cloud update script handles both).
- Run the dev server from that folder with `yarn dev` → http://localhost:5173.
- Gotcha: `yarn build` (`tsc && vite build`) currently fails because `src/Lazy.tsx` (an orphan file not used by the dashboard) imports `LabeledValue`, which `@react-spectrum/s2@1.3.1` does not export. The dev server is unaffected and renders the dashboard correctly.

### Monorepo dev (libraries)
- `yarn lint` runs `format:check` (oxfmt) + `check-types` (tsgo) + `oxlint` + constraints. Unit tests are run with `yarn test` (Jest); tests live under `packages/*/test/` (not colocated with `src`).
- The full `yarn build` / `make build` (Parcel) is heavy and is **not** required to run the example or to run lint/test.
