# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev       # start dev server with Turbopack
npm run build     # production build with Turbopack
npm run lint      # ESLint
npm run start     # serve production build
docker build -t portfolio .   # build Docker image (standalone output)
```

There are no tests in this repository.

## Architecture

**Single-page portfolio** built with Next.js 16 App Router. The entire site is one route (`app/page.tsx`) that renders all sections in sequence: Hero → Journey → Projects → Certificates → Skills → Interests → Contact → Footer.

**Section components** (`app/components/`) are self-contained — each owns its own data as inline arrays/objects (no external data fetching, no CMS). To update content, edit the data directly in the component file.

**Animation pattern**: Every section wraps animated elements in `ScrollReveal` (`app/components/ScrollReveal.tsx`), a Framer Motion component that triggers `whileInView`. It respects `prefers-reduced-motion`. This is the canonical way to add scroll animations — don't introduce a second pattern.

**Design system** (`lib/design-system.ts`) exports shared Tailwind class strings (`designSystem.components.card`, etc.), animation variants (`fadeInUp`, `staggerChildren`), and a `categoryColors` map used by Skills and Projects. Use these instead of writing inline Tailwind for cards/buttons/sections.

**SEO layer** is entirely in `app/layout.tsx`: Next.js `Metadata` export, JSON-LD `Person` schema, `robots.txt` sitemap reference, and a client-side favicon switcher script for dark/light mode. Update personal details there.

**Deployment**: `next.config.ts` sets `output: "standalone"` for Docker. The Dockerfile produces a minimal image from the standalone output. Security headers (X-Frame-Options, CSP-adjacent) are applied via `next.config.ts` `headers()`.

## Codebase Knowledge Graph (RAG)

A graphify knowledge graph lives in `graphify-out/graph.json` (115 nodes, 119 edges). Query it before searching files:

```bash
/graphify query "<question>"
/graphify . --update   # rebuild after changes
```

Outputs: `graphify-out/graph.html` (interactive viz), `graphify-out/GRAPH_REPORT.md` (audit).
