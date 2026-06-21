# CLAUDE.md

@AGENTS.md

## Commands

```bash
pnpm dev              # dev server (Turbopack)
pnpm build            # production build
pnpm sync             # sync content from source repos
FORCE=1 pnpm sync     # force full resync
docker build -t portfolio .
```

No tests.

## What this is

Personal portfolio + technical notes site. Two distinct subsystems:

**Portfolio** (`app/page.tsx`): single-page, all sections in one route. Section components own their data as inline arrays - no CMS, no fetch. To update content, edit the component file directly.

**Docs** (`app/docs/`): file-based docs system backed by `content/`. Content is synced from separate source repos on the local machine, not stored in this repo.

## Invariants - don't break these

**Animations**: always use `ScrollReveal` (Framer Motion `whileInView`). It respects `prefers-reduced-motion`. Don't introduce a second animation pattern.

**Styling**: use `lib/design-system.ts` for cards, buttons, and section containers. Don't write ad-hoc Tailwind for shared UI.

**Icons**: use `react-icons` throughout. No custom SVG paths.

**pnpm overrides**: go in `pnpm-workspace.yaml`, not `package.json` (pnpm 11 ignores the `pnpm` field in package.json).

**Path safety in `lib/docs.ts`**: every `path.resolve`/`path.join` is guarded by `isUnderContentDir()`. Lines carry `// nosemgrep: path-join-resolve-traversal` - don't remove the guard.

**`dangerouslySetInnerHTML` suppression**: `{/* nosemgrep: react-dangerouslysetinnerhtml */}` must be on the **same line** as the element - JSX nosemgrep comments don't work across lines.

**Directory slugs**: a slug that maps to a directory with no `index.md` redirects to parent, not 404. Logic is in `app/docs/[...slug]/page.tsx` via `isSlugDirectory()`.

## Content system

`content/<topic>/` is populated by `scripts/sync-content.sh` from `~/Projects/<RepoName>/`. The script:
- tracks last-synced git commit hash in `.sync-state` (gitignored) and skips unchanged topics
- uses `rsync --delete` so renames don't leave duplicates
- promotes `README.md` → `index.md` (drops it if `index.md` already exists)
- syncs `.md .sh .bash .yaml .yml .json .toml .conf`

Non-`.md` files are served as syntax-highlighted code pages automatically - no manual wiring needed.

To add a topic: add to `TOPICS` + `TOPIC_ORDER` in `lib/docs-config.ts`, and add a source mapping in the `SOURCES` array in `scripts/sync-content.sh`.

## Security decisions (don't revisit without reason)

- **`next`** pinned to `^16.2.9` - fixes all HIGH CVEs present in ≤16.2.5
- **`postcss`** forced to `>=8.5.10` in `pnpm-workspace.yaml` - fixes MEDIUM CVE
- **`@babel/core`** forced to `>=7.29.1` in `pnpm-workspace.yaml` - fixes LOW CVE (arbitrary file read via sourceMappingURL); transitive via next and eslint plugins
- **`js-yaml`** cannot be upgraded - `gray-matter` 4.x requires the v3 API (`safeLoad`, removed in v4). Risk accepted; content is local filesystem only, not user input.
- **Semgrep** (`semgrep scan --config auto --error .`) passes at 0 findings. `content/` is excluded via `.semgrepignore` (example credentials in tutorial docs).

## Docker

Base: `registry.access.redhat.com/ubi10/nodejs-24` (UBI 10, glibc, regularly patched).
Non-root user `nextjs:nodejs` (uid/gid 1001) created with `groupadd`/`useradd --no-create-home` - not Alpine syntax.
Standalone output (`next.config.ts`: `output: "standalone"`); runner stage copies only `.next/standalone`, `.next/static`, `public/`, `content/`.
