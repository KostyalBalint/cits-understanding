# C-ITS site — page authoring guide (READ FIRST)

You are writing ONE React content page for a Vite + React + Tailwind v4 site that
explains Cooperative Intelligent Transport Systems (C-ITS) in depth but accessibly.
Audience: an engineer/student who wants to genuinely understand the standards —
explain both the high-level "why" and the low-level "how" (bits, fields, timings,
message flows). Be thorough and correct; ground everything in the source `.txt`
files you are given. Do not invent standard numbers, field names, or values — if the
source has them, use them; if unsure, describe qualitatively.

## Hard rules
- Output exactly ONE file: a `.jsx` page at the path given to you. Overwrite the stub.
- Default-export a single React component (function, named as told).
- Use ONLY these imports:
  `import React from 'react'`
  `import { Link } from 'react-router-dom'`   // only if you cross-link other pages
  `import { PageHeader, Section, Prose, Callout, Ref, Table, StatGrid, Stat, CardGrid, Card, Steps, Figure, LayerStack, DefList, Badge } from '../components/ui.jsx'`
- Do NOT import images, fonts, CSS, or any other file. Do NOT use markdown. Pure JSX.
- Do NOT read or embed binary/PDF. Read only the `.txt` sidecars given to you.
- Keep it valid JSX: escape `<`, `>`, `&` in text as needed (e.g. write `&lt;`, `&gt;`,
  `&amp;`), close all tags, use `className` not `class`. In JSX text, raw `>` and `<`
  used as math/comparison must be written `{'>'}` / `{'<'}` or `&gt;`/`&lt;`.
- The dark theme is already applied; do not set page background or text colors at the
  top level. Components handle styling. You may add small Tailwind utility classes for
  custom diagrams (e.g. flex, grid, gap, rounded, border-ink-700, text-slate-300,
  bg-ink-900, text-brand-300, etc.).

## Page skeleton
```jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { PageHeader, Section, Callout, Ref, Table, StatGrid, Stat, CardGrid, Card, Steps, Figure, LayerStack, DefList, Badge } from '../components/ui.jsx'

export default function MyPage() {
  return (
    <article>
      <PageHeader
        kicker="SECTION LABEL"
        title="Human Title"
        intro="One strong lead paragraph: what this is and why it matters."
        sources={['ETSI EN 302 637-2', 'ETSI TS 103 900']}
      />
      <Section id="intro" title="...">
        <p>...</p>
      </Section>
      {/* more Sections */}
    </article>
  )
}
```

## Component API (from src/components/ui.jsx)
- `<PageHeader kicker title intro sources={[...]} />` — sources = array of standard codes shown as chips.
- `<Section id="kebab" title="...">…</Section>` — wraps content; gives an h2 + anchor. Put `<p>`, `<ul>`, `<h3>`, etc. inside. Section content is auto-styled (prose-cits).
- `<Prose>…</Prose>` — same styling without a title.
- `<Callout type="info|key|warn|tip|example" title="...">…</Callout>` — highlight box. Use `key` for must-know facts, `example` for worked examples, `warn` for pitfalls/limitations, `tip` for practical notes.
- `<Ref code="EN 302 637-2" title="CAM" kind="ETSI|EU|C-Roads|C2CCC|ISO|SAE|IEEE" />` — inline standard chip.
- `<Table headers={['A','B']} rows={[[<>cell</>, 'cell'], ...]} caption="..." />` — cells may be strings or JSX.
- `<StatGrid cols={3}><Stat value="10 Hz" label="CAM rate" sub="1–10 Hz adaptive" /></StatGrid>` — headline numbers.
- `<CardGrid cols={2|3}><Card title icon="🛰️" accent="brand|amber|emerald|violet|rose|cyan">…</Card></CardGrid>` — grouped concept cards.
- `<Steps><div><strong>Step</strong>: ...</div><div>...</div></Steps>` — auto-numbered; each direct child = one step.
- `<Figure caption="...">…custom SVG or divs…</Figure>` — wrapper for diagrams you build.
- `<LayerStack layers={[{name, sub, accent}]} leftRail="Security" rightRail="Management" />` — vertical layer diagram (great for protocol/architecture stacks); first layer renders on top.
- `<DefList items={[{term, def}]} />` — term/definition pairs.
- `<Badge tone="brand|amber|emerald|...">text</Badge>` — small pill.

## Style & depth expectations
- Aim for a rich, multi-section page (typically 5–9 `<Section>`s). Cover, where relevant:
  purpose & motivation → where it sits in the stack → message/PDU structure & key fields
  → triggering/generation rules, rates, timings → protocol behaviour/flows → security
  aspects → relation to other messages/standards → deployment/real-world notes → R1 vs R2
  evolution.
- Use diagrams liberally (LayerStack, Figure with flex/grid boxes, simple inline SVG for
  message flows or sequence diagrams). Visual > wall of text.
- Use Tables for field lists, parameter values, message profiles, comparisons.
- Use at least a couple of Callouts (one `key` takeaway near the top is good).
- Explain acronyms on first use. Be precise with units (Hz, ms, dBm, MHz, bytes).
- Cross-link related pages with `<Link to="/cam">CAM</Link>` etc. Known routes:
  / overview architecture access-layer networking facilities management
  cam denm cpm vam infrastructure mcm applications security pki conformance
  c-roads car2car eu-policy global research standards glossary
- End substantive pages with a short "Key standards" Section listing the `<Ref>`s used,
  and optionally a "Where next" with Links.

## Accuracy
Read the provided `.txt` files before writing. Pull real field names, value ranges,
message structures, timings, and version/release facts from them. The `.txt` are
`pdftotext -layout` dumps — layout may be messy; extract substance. Prefer the latest
release doc but note R1→R2 evolution where the sources show it.

Return only a short confirmation (one line) — your real output is the written file.
