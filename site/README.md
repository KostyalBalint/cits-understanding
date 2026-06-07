# C-ITS Explained — website

An in-depth, accessible guide to Cooperative Intelligent Transport Systems (C-ITS),
generated from the local archive of freely-published ETSI / C-Roads / CAR 2 CAR / EU
standards and reports that sits one level up in this folder.

Vite + React + Tailwind v4. 24 topic pages, **dark + light themes** (toggle in the
sidebar; remembered in localStorage), sidebar nav, **site-wide search** (⌘K / Ctrl-K
or `/`, deep-links to sections), clickable standard pills that open the source PDF,
full cross-linking between layers and messages.

## Run

```sh
cd site
npm install      # first time only
npm run dev      # dev server → http://localhost:5173
```

Build a static bundle (output in `dist/`, uses relative paths + hash routing, so it can
be opened from disk or served from any subpath):

```sh
npm run build
npm run preview  # serve the production build locally
```

## Structure

- `src/pages/*.jsx` — one component per topic (Home, Overview, Architecture, AccessLayer,
  Networking, Facilities, Management, MessageCAM/DENM/CPM/VAM/Infra/MCM, Applications,
  Security, PKITrust, Conformance, CRoads, Car2Car, EUPolicy, Global, Research,
  Standards, Glossary).
- `src/components/ui.jsx` — shared content primitives (PageHeader, Section, Callout, Ref,
  Table, StatGrid, Card, Steps, Figure, LayerStack, DefList, Badge).
- `src/components/Layout.jsx` — sidebar + mobile drawer + prev/next.
- `src/nav.js` — single source of truth for routes & sidebar grouping.
- `AUTHORING.md` — the page-authoring contract used to generate each page.

## Sourcing

Content is grounded in the extracted `.txt` of the standards in `../00_overview` …
`../13_research_projects`. Paywalled SAE/ISO/IEEE material is summarised from metadata
only (see `../12_global_us_iso`). Not an official ETSI/EU publication — a study guide.
