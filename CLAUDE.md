# CLAUDE.md

@AGENTS.md

## Commands

```bash
pnpm dev          # dev server (Turbopack)
pnpm build        # production build
pnpm sync         # sync content (FORCE=1 for full resync)
docker build -t portfolio .
```

No tests.

## Architecture

**Portfolio** (`app/page.tsx`): single-page. Section data is inline in each component - edit the component to update content.

**Docs** (`app/docs/`): file-based, backed by `content/` synced from local repos via `scripts/sync-content.sh`. To add a topic: `lib/docs-config.ts` (TOPICS/TOPIC_ORDER) + SOURCES array in the sync script.

## Invariants

- **Animations**: `ScrollReveal` (Framer Motion `whileInView`) only - don't add a second pattern
- **Styling**: `lib/design-system.ts` for cards, buttons, containers - no ad-hoc Tailwind for shared UI
- **Icons**: `react-icons` only - no custom SVG paths
- **pnpm overrides**: in `pnpm-workspace.yaml` only (pnpm 11 ignores the `pnpm` field in `package.json`)
- **Path safety**: `lib/docs.ts` guards every path join with `isUnderContentDir()` + `// nosemgrep` comment - don't remove either
- **nosemgrep**: `{/* nosemgrep: react-dangerouslysetinnerhtml */}` must be on the same line as the element
- **Directory slugs**: slug matching a dir with no `index.md` redirects to parent, not 404 (see `isSlugDirectory()`)

## Security overrides (`pnpm-workspace.yaml`)

- `postcss >=8.5.10` - MEDIUM CVE
- `@babel/core >=7.29.1` - LOW CVE (file read via sourceMappingURL)
- `js-yaml@^4 >=4.1.2` - MEDIUM CVE (GHSA-h67p-54hq-rp68); gray-matter stays on 3.x (v3 API) - risk accepted, content is local filesystem only
- `next ^16.2.9` - fixes HIGH CVEs in <=16.2.5
- Semgrep: `semgrep scan --config auto --error .` passes 0 findings; `content/` excluded via `.semgrepignore`

## Docker

Base: `ubi10/nodejs-24`. Non-root `nextjs:nodejs` (uid/gid 1001) via `groupadd`/`useradd --no-create-home` - not Alpine syntax. Standalone output; runner copies only `.next/standalone`, `.next/static`, `public/`, `content/`.
