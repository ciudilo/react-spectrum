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
