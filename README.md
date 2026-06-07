# C-ITS Understanding

An in-depth, accessible web guide to **Cooperative Intelligent Transport Systems (C-ITS)** —
the European V2X standards stack: ITS station architecture, the protocol layers (ITS-G5 /
C-V2X, GeoNetworking, BTP, facilities), the V2X messages (CAM, DENM, CPM, VAM,
SPATEM/MAPEM/IVIM/SREM/SSEM, MCM), security & the EU PKI/CCMS trust model, conformance
testing, and European deployment (C-Roads, CAR 2 CAR, EU policy).

### 🌐 Live site: https://kostyalbalint.github.io/cits-understanding/

> ⚠️ **AI-generated content.** This guide may contain errors — **do not use it as a
> reference.** Always verify against the primary ETSI / C-Roads / CAR 2 CAR / EU standards.

## What's in this repo

- **`site/`** — the explainer web app (Vite + React + Tailwind v4). 24 topic pages,
  dark/light themes, site-wide search (⌘K), and standard "pills" that link to the source
  PDFs. See [`site/README.md`](site/README.md).

The site was written from a local archive of freely-published standards/reports (ETSI,
C-Roads, CAR 2 CAR, EU). That ~257 MB archive of third-party PDFs is **not** committed
here (it is not ours to redistribute); the documents are freely downloadable from their
originators, and every standard pill in the site links to its public source.

## Develop

```sh
cd site
npm install
npm run dev      # http://localhost:5173
npm run build    # static bundle in site/dist (also rebuilds the search index)
```

## Deployment

Pushing to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which builds `site/` and publishes `site/dist` to GitHub Pages.

---

Not an official ETSI / EU publication. A study guide.
