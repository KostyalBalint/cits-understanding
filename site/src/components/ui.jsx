// Shared UI primitives for all C-ITS content pages.
// Import from '../components/ui.jsx'. Keep pages consistent by using these.
import React from 'react'
import { docUrl } from '../docRegistry.js'

// Small external-link glyph used on clickable standard pills.
function ExtIcon({ className = '' }) {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M14 5h5v5M19 5l-9 9M19 13v6H5V5h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ---------- Page scaffolding ---------- */

// Top-of-page hero. kicker = small label, title = h1, intro = lead paragraph(s).
export function PageHeader({ kicker, title, intro, sources }) {
  return (
    <header className="mb-10 border-b border-ink-700 pb-8">
      {kicker && (
        <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand-400">
          {kicker}
        </div>
      )}
      <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">{title}</h1>
      {intro && <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-300">{intro}</p>}
      {sources && sources.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {sources.map((s) => {
            const url = docUrl(s)
            const inner = (
              <>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" className="flex-none text-brand-400">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                  <path d="M14 2v6h6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                </svg>
                {s}
                {url && <ExtIcon className="flex-none opacity-50" />}
              </>
            )
            return url ? (
              <a
                key={s}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                title={`Open source: ${s}`}
                className="inline-flex items-center gap-1 rounded-full border border-ink-700 bg-ink-900 px-2.5 py-1 text-[11px] font-medium text-slate-400 no-underline transition hover:border-brand-600 hover:bg-brand-900/30 hover:text-brand-200"
              >
                {inner}
              </a>
            ) : (
              <span
                key={s}
                className="inline-flex items-center gap-1 rounded-full border border-ink-700 bg-ink-900 px-2.5 py-1 text-[11px] font-medium text-slate-400"
              >
                {inner}
              </span>
            )
          })}
        </div>
      )}
    </header>
  )
}

// A logical section with an anchor id (for the on-page table of contents).
export function Section({ id, title, children }) {
  return (
    <section id={id} className="prose-cits scroll-mt-24">
      {title && <h2>{title}</h2>}
      {children}
    </section>
  )
}

// Plain prose wrapper (use when you don't need a titled Section).
export function Prose({ children, className = '' }) {
  return <div className={`prose-cits ${className}`}>{children}</div>
}

/* ---------- Callouts ---------- */

const CALLOUT = {
  info:    { ring: 'border-brand-700/60', bg: 'bg-brand-900/20', dot: 'text-brand-400', label: 'text-brand-300' },
  key:     { ring: 'border-amber-600/50', bg: 'bg-amber-900/15', dot: 'text-amber-400', label: 'text-amber-300' },
  warn:    { ring: 'border-rose-700/50',  bg: 'bg-rose-900/15',  dot: 'text-rose-400',  label: 'text-rose-300' },
  tip:     { ring: 'border-emerald-700/50', bg: 'bg-emerald-900/15', dot: 'text-emerald-400', label: 'text-emerald-300' },
  example: { ring: 'border-violet-700/50', bg: 'bg-violet-900/15', dot: 'text-violet-400', label: 'text-violet-300' },
}

// type: info | key | warn | tip | example. title optional.
export function Callout({ type = 'info', title, children }) {
  const c = CALLOUT[type] || CALLOUT.info
  return (
    <div className={`my-6 rounded-xl border ${c.ring} ${c.bg} p-5`}>
      {title && (
        <div className={`mb-1.5 flex items-center gap-2 text-sm font-bold ${c.label}`}>
          <span className={c.dot}>●</span>
          {title}
        </div>
      )}
      <div className="prose-cits text-sm [&_p]:my-1.5 [&_p]:text-slate-300">{children}</div>
    </div>
  )
}

/* ---------- Standard reference chip ---------- */

// Reference an ETSI / ISO / SAE etc. standard inline or in a list.
// Renders as a link to the public document when one can be resolved.
export function Ref({ code, title, kind = 'ETSI' }) {
  const tone = {
    ETSI: 'border-brand-700 text-brand-300',
    EU: 'border-amber-600 text-amber-300',
    'C-Roads': 'border-emerald-700 text-emerald-300',
    C2CCC: 'border-violet-700 text-violet-300',
    ISO: 'border-cyan-700 text-cyan-300',
    SAE: 'border-rose-700 text-rose-300',
    IEEE: 'border-sky-700 text-sky-300',
  }[kind] || 'border-slate-600 text-slate-300'
  const url = docUrl(code, kind)
  const cls = `inline-flex items-center gap-1.5 rounded-md border ${tone} bg-ink-900/70 px-2 py-0.5 align-middle text-xs`
  const body = (
    <>
      <span className="font-mono font-semibold">{code}</span>
      {title && <span className="text-slate-400">{title}</span>}
      {url && <ExtIcon className="flex-none opacity-50" />}
    </>
  )
  if (!url) return <span className={cls}>{body}</span>
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      title={`Open source: ${code}${title ? ' — ' + title : ''}`}
      className={`${cls} no-underline transition hover:bg-brand-900/30 hover:brightness-125`}
    >
      {body}
    </a>
  )
}

/* ---------- Tables ---------- */

export function Table({ headers, rows, caption }) {
  return (
    <figure className="my-6 overflow-x-auto rounded-xl border border-ink-700">
      <table className="w-full border-collapse text-sm">
        {headers && (
          <thead>
            <tr className="bg-ink-800">
              {headers.map((h, i) => (
                <th key={i} className="border-b border-ink-700 px-4 py-2.5 text-left font-semibold text-slate-200">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri} className={ri % 2 ? 'bg-ink-900/40' : 'bg-transparent'}>
              {r.map((c, ci) => (
                <td key={ci} className="border-b border-ink-800 px-4 py-2.5 align-top text-slate-300 [&_code]:text-xs">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {caption && <figcaption className="px-4 py-2 text-xs text-slate-500">{caption}</figcaption>}
    </figure>
  )
}

/* ---------- Stat grid ---------- */

export function StatGrid({ children, cols = 3 }) {
  const c = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' }[cols] || 'sm:grid-cols-3'
  return <div className={`my-6 grid grid-cols-1 gap-3 ${c}`}>{children}</div>
}

export function Stat({ value, label, sub }) {
  return (
    <div className="rounded-xl border border-ink-700 bg-ink-900/60 p-4">
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="mt-1 text-sm font-medium text-slate-300">{label}</div>
      {sub && <div className="mt-0.5 text-xs text-slate-500">{sub}</div>}
    </div>
  )
}

/* ---------- Cards ---------- */

export function CardGrid({ children, cols = 2 }) {
  const c = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 lg:grid-cols-3' }[cols] || 'sm:grid-cols-2'
  return <div className={`my-6 grid grid-cols-1 gap-4 ${c}`}>{children}</div>
}

export function Card({ title, icon, children, accent = 'brand' }) {
  const a = {
    brand: 'before:bg-brand-500', amber: 'before:bg-amber-500',
    emerald: 'before:bg-emerald-500', violet: 'before:bg-violet-500',
    rose: 'before:bg-rose-500', cyan: 'before:bg-cyan-500',
  }[accent] || 'before:bg-brand-500'
  return (
    <div className={`relative overflow-hidden rounded-xl border border-ink-700 bg-ink-900/60 p-5 before:absolute before:left-0 before:top-0 before:h-full before:w-1 ${a}`}>
      <div className="mb-2 flex items-center gap-2">
        {icon && <span className="text-lg">{icon}</span>}
        {title && <h4 className="text-base font-semibold text-white">{title}</h4>}
      </div>
      <div className="prose-cits text-sm [&_p]:my-1.5">{children}</div>
    </div>
  )
}

/* ---------- Steps / numbered flow ---------- */

export function Steps({ children }) {
  const items = React.Children.toArray(children)
  return (
    <ol className="my-6 space-y-4">
      {items.map((child, i) => (
        <li key={i} className="flex gap-4">
          <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
            {i + 1}
          </span>
          <div className="prose-cits pt-0.5 [&_p]:my-0">{child}</div>
        </li>
      ))}
    </ol>
  )
}

/* ---------- Figure wrapper (for custom SVG/diagrams) ---------- */

export function Figure({ caption, children }) {
  return (
    <figure className="my-7">
      <div className="overflow-x-auto rounded-xl border border-ink-700 bg-ink-900/40 p-5">{children}</div>
      {caption && <figcaption className="mt-2 text-center text-xs text-slate-500">{caption}</figcaption>}
    </figure>
  )
}

/* ---------- Layer stack diagram (reusable for the ITS station model) ---------- */
// layers: [{ name, sub, accent }] top-to-bottom. Optional side rails for security/management.
export function LayerStack({ layers, leftRail, rightRail }) {
  const tone = {
    brand: 'border-brand-600 bg-brand-900/30 text-brand-100',
    amber: 'border-amber-600 bg-amber-900/25 text-amber-100',
    emerald: 'border-emerald-600 bg-emerald-900/25 text-emerald-100',
    violet: 'border-violet-600 bg-violet-900/25 text-violet-100',
    rose: 'border-rose-600 bg-rose-900/25 text-rose-100',
    cyan: 'border-cyan-600 bg-cyan-900/25 text-cyan-100',
    slate: 'border-slate-600 bg-slate-800/40 text-slate-100',
  }
  return (
    <Figure>
      <div className="flex gap-3">
        {leftRail && (
          <div className="flex w-12 flex-none items-center justify-center rounded-lg border border-slate-600 bg-slate-800/40 [writing-mode:vertical-rl] rotate-180 py-3 text-center text-xs font-semibold text-slate-200">
            {leftRail}
          </div>
        )}
        <div className="flex-1 space-y-2">
          {layers.map((l, i) => (
            <div key={i} className={`rounded-lg border px-4 py-3 ${tone[l.accent] || tone.slate}`}>
              <div className="font-semibold">{l.name}</div>
              {l.sub && <div className="mt-0.5 text-xs opacity-80">{l.sub}</div>}
            </div>
          ))}
        </div>
        {rightRail && (
          <div className="flex w-12 flex-none items-center justify-center rounded-lg border border-slate-600 bg-slate-800/40 [writing-mode:vertical-rl] py-3 text-center text-xs font-semibold text-slate-200">
            {rightRail}
          </div>
        )}
      </div>
    </Figure>
  )
}

/* ---------- Definition / acronym list ---------- */

export function DefList({ items }) {
  return (
    <dl className="my-6 divide-y divide-ink-800 rounded-xl border border-ink-700">
      {items.map((it, i) => (
        <div key={i} className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-[160px_1fr] sm:gap-4">
          <dt className="font-mono text-sm font-semibold text-brand-300">{it.term}</dt>
          <dd className="text-sm text-slate-300">{it.def}</dd>
        </div>
      ))}
    </dl>
  )
}

/* ---------- Pill / badge ---------- */

export function Badge({ children, tone = 'slate' }) {
  const t = {
    slate: 'border-slate-600 text-slate-300',
    brand: 'border-brand-600 text-brand-300',
    amber: 'border-amber-600 text-amber-300',
    emerald: 'border-emerald-600 text-emerald-300',
    rose: 'border-rose-600 text-rose-300',
    violet: 'border-violet-600 text-violet-300',
  }[tone] || 'border-slate-600 text-slate-300'
  return (
    <span className={`inline-flex items-center rounded-full border ${t} bg-ink-900/60 px-2.5 py-0.5 text-xs font-medium`}>
      {children}
    </span>
  )
}
