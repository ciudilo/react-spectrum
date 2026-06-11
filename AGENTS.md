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

## Task scoping — install and run only what you need

Do not default to a full monorepo install, build, and test run on every task. Read the request, identify the smallest surface area that satisfies it, and stop there.

### Decide where the change lives

| Task type | Install | Run | Skip |
| --- | --- | --- | --- |
| Standalone example app (e.g. `examples/s2-vite-project`) | `yarn install` in that example folder only | `yarn dev` in that folder | Root `yarn install`, `yarn build`, `make build`, Storybook |
| Monorepo package change (`packages/*`) | Root `yarn install` | `yarn lint`, `yarn test` for affected packages | Full `make build` unless the task requires it |
| Docs / Storybook only | Root `yarn install` | `yarn start` or `yarn start:s2-docs` | Parcel production build |

**Brand Asset Dashboard** (`examples/s2-vite-project`) is a standalone Vite app that uses the **published** `@react-spectrum/s2` npm package — it does **not** require building the monorepo. It is **not** part of the root workspaces, so root `yarn install` does not install it; it has its own `yarn.lock` and must be installed separately (`cd examples/s2-vite-project && yarn install`). Run the dev server with `yarn dev` → http://localhost:5173.

Before editing an example app, confirm which branch actually contains it (e.g. `brand-asset-dashboard` for the Brand Asset Dashboard) — it may not be on `main` yet.

### Install workflow extras only when the task needs them

| Tool | Install when… |
| --- | --- |
| Playwright browsers (`yarn playwright install chromium`) | You need to verify UI in a browser or record a demo |
| `ffmpeg` | You need to convert a screen recording to a GIF |
| `gh` | You need to open or update a pull request |
| Root monorepo `yarn install` | You are changing or testing code under `packages/*` |

If the task is code-only (no browser verification, no GIF, no PR), skip the extras entirely.

### Heavy commands to avoid unless required

- `yarn build` / `make build` — full Parcel build; slow and unnecessary for standalone examples and most lint/test work.
- `yarn start` (Storybook) — only when working on component stories or visual states.
- Root `yarn install` — only when working inside the monorepo workspaces.

For monorepo package work, `yarn lint` and `yarn test` are usually sufficient without a full build.

## Conventions

- Follow the contribution process, testing, and linting guidance in [CONTRIBUTING.md](CONTRIBUTING.md).
- Do not commit or push unless explicitly asked.
