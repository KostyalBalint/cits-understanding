import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

let cachedIndex = null
let cachedPromise = null
function loadIndex() {
  if (cachedIndex) return Promise.resolve(cachedIndex)
  if (!cachedPromise) {
    const url = `${import.meta.env.BASE_URL}search-index.json`
    cachedPromise = fetch(url)
      .then((r) => r.json())
      .then((d) => {
        // precompute lowercased haystack for matching
        cachedIndex = d.map((r) => ({
          ...r,
          hay: ((r.pageTitle || '') + ' ' + (r.sectionTitle || '') + ' ' + (r.text || '')).toLowerCase(),
          titleHay: ((r.pageTitle || '') + ' ' + (r.sectionTitle || '')).toLowerCase(),
        }))
        return cachedIndex
      })
      .catch(() => {
        cachedIndex = []
        return cachedIndex
      })
  }
  return cachedPromise
}

function scoreRecord(rec, terms) {
  let score = 0
  for (const t of terms) {
    if (!rec.hay.includes(t)) return -1 // AND: every term must appear
    if (rec.titleHay.includes(t)) score += 10
    // count occurrences in text (capped)
    let idx = 0,
      n = 0
    while ((idx = rec.hay.indexOf(t, idx)) !== -1 && n < 6) {
      n++
      idx += t.length
    }
    score += n
  }
  // prefer section hits (deep-linkable) over whole-page hits
  if (rec.id) score += 3
  // exact section/page title match bonus
  const joined = terms.join(' ')
  if (rec.titleHay.includes(joined)) score += 8
  return score
}

function makeSnippet(text, terms) {
  const low = text.toLowerCase()
  let pos = -1
  for (const t of terms) {
    const p = low.indexOf(t)
    if (p !== -1 && (pos === -1 || p < pos)) pos = p
  }
  if (pos === -1) pos = 0
  const start = Math.max(0, pos - 60)
  let snip = text.slice(start, start + 200)
  if (start > 0) snip = '… ' + snip
  if (start + 200 < text.length) snip = snip + ' …'
  // split for highlight
  const parts = []
  const re = new RegExp('(' + terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')', 'ig')
  let last = 0,
    m
  while ((m = re.exec(snip))) {
    if (m.index > last) parts.push({ t: snip.slice(last, m.index), hit: false })
    parts.push({ t: m[0], hit: true })
    last = m.index + m[0].length
  }
  if (last < snip.length) parts.push({ t: snip.slice(last), hit: false })
  return parts
}

export default function Search({ open, onClose }) {
  const [q, setQ] = useState('')
  const [index, setIndex] = useState(cachedIndex)
  const [active, setActive] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (open) {
      loadIndex().then(setIndex)
      setTimeout(() => inputRef.current?.focus(), 20)
    } else {
      setQ('')
      setActive(0)
    }
  }, [open])

  const results = useMemo(() => {
    if (!index) return []
    const terms = q.toLowerCase().split(/\s+/).filter((t) => t.length >= 2)
    if (terms.length === 0) return []
    const scored = []
    for (const rec of index) {
      const s = scoreRecord(rec, terms)
      if (s >= 0) scored.push([s, rec])
    }
    scored.sort((a, b) => b[0] - a[0])
    // dedup: at most 2 hits per page (best section + maybe page)
    const perPage = {}
    const out = []
    for (const [, rec] of scored) {
      perPage[rec.path] = (perPage[rec.path] || 0) + 1
      if (perPage[rec.path] > 2) continue
      out.push(rec)
      if (out.length >= 24) break
    }
    return out.map((rec) => ({ rec, snippet: makeSnippet(rec.text, terms) }))
  }, [q, index])

  useEffect(() => setActive(0), [q])

  function go(rec) {
    onClose()
    navigate(rec.path)
    if (rec.id) {
      // wait for the target page to mount, then scroll to the section
      let tries = 0
      const tick = () => {
        const el = document.getElementById(rec.id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else if (tries++ < 20) {
          setTimeout(tick, 50)
        }
      }
      setTimeout(tick, 60)
    } else {
      window.scrollTo(0, 0)
    }
  }

  function onKeyDown(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (results[active]) go(results[active].rec)
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-i="${active}"]`)
    el?.scrollIntoView({ block: 'nearest' })
  }, [active])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Search">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative mx-auto mt-[8vh] w-[92%] max-w-2xl overflow-hidden rounded-2xl border border-ink-700 bg-ink-900 shadow-2xl">
        <div className="flex items-center gap-3 border-b border-ink-700 px-4">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="flex-none text-slate-500">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search the whole site… (e.g. pseudonym, CBR, GeoBroadcast, cause code)"
            className="w-full bg-transparent py-4 text-slate-100 placeholder-slate-500 outline-none"
          />
          <button onClick={onClose} className="flex-none rounded-md border border-ink-700 px-2 py-0.5 text-xs text-slate-400 hover:text-slate-200">
            Esc
          </button>
        </div>

        <div ref={listRef} className="max-h-[62vh] overflow-y-auto">
          {q.trim().length > 0 && results.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-slate-500">No matches for “{q}”.</div>
          )}
          {results.length === 0 && q.trim().length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-slate-500">
              Type to search across all {index ? new Set(index.map((r) => r.path)).size : ''} pages and their sections.
            </div>
          )}
          {results.map(({ rec, snippet }, i) => (
            <button
              key={rec.path + (rec.id || '') + i}
              data-i={i}
              onMouseEnter={() => setActive(i)}
              onClick={() => go(rec)}
              className={
                'block w-full border-b border-ink-800 px-4 py-3 text-left transition ' +
                (i === active ? 'bg-brand-600/15' : 'hover:bg-ink-800/60')
              }
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-100">
                <span>{rec.pageTitle}</span>
                {rec.sectionTitle && (
                  <>
                    <span className="text-slate-600">›</span>
                    <span className="text-brand-300">{rec.sectionTitle}</span>
                  </>
                )}
              </div>
              <div className="mt-1 text-xs leading-relaxed text-slate-400">
                {snippet.map((p, j) =>
                  p.hit ? (
                    <mark key={j} className="rounded bg-amber-400/25 px-0.5 text-amber-200">
                      {p.t}
                    </mark>
                  ) : (
                    <span key={j}>{p.t}</span>
                  ),
                )}
              </div>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-ink-700 px-4 py-2 text-[11px] text-slate-500">
          <span>
            <kbd className="rounded border border-ink-700 px-1">↑</kbd>{' '}
            <kbd className="rounded border border-ink-700 px-1">↓</kbd> navigate ·{' '}
            <kbd className="rounded border border-ink-700 px-1">↵</kbd> open
          </span>
          <span>{results.length} result{results.length === 1 ? '' : 's'}</span>
        </div>
      </div>
    </div>
  )
}
