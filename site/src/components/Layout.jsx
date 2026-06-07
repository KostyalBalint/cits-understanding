import React, { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { NAV, ALL_ITEMS } from '../nav.js'
import Search from './Search.jsx'
import ThemeToggle from './ThemeToggle.jsx'

function Sidebar({ onNavigate, onOpenSearch }) {
  const { pathname } = useLocation()
  return (
    <nav className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-ink-700 px-5 py-4">
        <Link to="/" onClick={onNavigate} className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 font-extrabold text-white">C</span>
          <span>
            <span className="block text-sm font-bold leading-tight text-white">C-ITS Explained</span>
            <span className="block text-[11px] leading-tight text-slate-500">Cooperative ITS, in depth</span>
          </span>
        </Link>
        <ThemeToggle />
      </div>
      <div className="px-3 pt-3">
        <button
          onClick={onOpenSearch}
          className="flex w-full items-center gap-2 rounded-lg border border-ink-700 bg-ink-950/60 px-3 py-2 text-sm text-slate-400 transition hover:border-brand-700 hover:text-slate-200"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="flex-none">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="flex-1 text-left">Search…</span>
          <kbd className="rounded border border-ink-700 px-1 text-[10px] text-slate-500">⌘K</kbd>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-4">
        {NAV.map((grp) => (
          <div key={grp.group} className="mb-5">
            <div className="px-2 pb-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
              {grp.group}
            </div>
            <ul className="space-y-0.5">
              {grp.items.map((it) => {
                const to = it.slug ? `/${it.slug}` : '/'
                const active = pathname === to
                return (
                  <li key={it.slug || 'home'}>
                    <NavLink
                      to={to}
                      onClick={onNavigate}
                      className={
                        'block rounded-lg px-3 py-1.5 text-sm transition ' +
                        (active
                          ? 'bg-brand-600/20 font-semibold text-brand-200'
                          : 'text-slate-400 hover:bg-ink-800 hover:text-slate-200')
                      }
                    >
                      {it.title}
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-ink-700 px-5 py-3 text-[11px] text-slate-600">
        Built from freely-published ETSI, C-Roads, CAR&nbsp;2&nbsp;CAR & EU sources.
      </div>
    </nav>
  )
}

function PrevNext() {
  const { pathname } = useLocation()
  const idx = ALL_ITEMS.findIndex((it) => (it.slug ? `/${it.slug}` : '/') === pathname)
  if (idx < 0) return null
  const prev = ALL_ITEMS[idx - 1]
  const next = ALL_ITEMS[idx + 1]
  return (
    <div className="mt-16 grid grid-cols-1 gap-3 border-t border-ink-700 pt-6 sm:grid-cols-2">
      {prev ? (
        <Link to={prev.slug ? `/${prev.slug}` : '/'} className="group rounded-xl border border-ink-700 bg-ink-900/50 p-4 hover:border-brand-700">
          <div className="text-xs text-slate-500">← Previous</div>
          <div className="mt-1 font-semibold text-slate-200 group-hover:text-brand-200">{prev.title}</div>
        </Link>
      ) : <div />}
      {next && (
        <Link to={next.slug ? `/${next.slug}` : '/'} className="group rounded-xl border border-ink-700 bg-ink-900/50 p-4 text-right hover:border-brand-700">
          <div className="text-xs text-slate-500">Next →</div>
          <div className="mt-1 font-semibold text-slate-200 group-hover:text-brand-200">{next.title}</div>
        </Link>
      )}
    </div>
  )
}

export default function Layout({ children }) {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    setOpen(false)
  }, [pathname])

  // Global search hotkey: ⌘K / Ctrl-K, or "/" when not typing in a field.
  useEffect(() => {
    function onKey(e) {
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setSearchOpen((v) => !v)
      } else if (e.key === '/' && !/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) && !e.target.isContentEditable) {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="min-h-screen lg:flex">
      {/* Desktop sidebar */}
      <aside className="hidden w-72 flex-none border-r border-ink-700 bg-ink-900 lg:fixed lg:inset-y-0 lg:block">
        <Sidebar onOpenSearch={() => setSearchOpen(true)} />
      </aside>

      {/* Mobile top bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-ink-700 bg-ink-900/95 px-4 py-3 backdrop-blur lg:hidden">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 font-extrabold text-white">C</span>
          <span className="font-bold text-white">C-ITS Explained</span>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button onClick={() => setSearchOpen(true)} aria-label="Search" className="rounded-lg border border-ink-700 p-2 text-slate-300">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/><path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
          <button onClick={() => setOpen((v) => !v)} aria-label="Menu" className="rounded-lg border border-ink-700 p-2 text-slate-300">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-72 bg-ink-900 shadow-xl">
            <Sidebar onNavigate={() => setOpen(false)} onOpenSearch={() => { setOpen(false); setSearchOpen(true) }} />
          </div>
        </div>
      )}

      <Search open={searchOpen} onClose={() => setSearchOpen(false)} />

      <main className="min-w-0 flex-1 lg:ml-72">
        <div className="sticky top-0 z-20 border-b border-[#a16207]/50 bg-[#2a1d06]/90 px-4 py-2 backdrop-blur">
          <p className="mx-auto flex max-w-4xl items-center gap-2 text-center text-[12px] leading-snug text-[#fcd667] sm:text-left">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="hidden flex-none text-[#f5b224] sm:block">
              <path d="M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>
              <strong className="font-semibold text-[#fde9a9]">AI-generated content.</strong> This guide may
              contain errors — <strong className="font-semibold text-[#fde9a9]">do not use it as a reference.</strong>{' '}
              Always verify against the primary ETSI / C-Roads / CAR&nbsp;2&nbsp;CAR / EU standards.
            </span>
          </p>
        </div>
        <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8 lg:px-12">
          {children}
          <PrevNext />
          <footer className="mt-10 border-t border-ink-800 pt-6 text-xs text-slate-600">
            C-ITS Explained — a study guide generated from a local archive of freely-published
            standards and reports. Not an official ETSI / EU publication.
          </footer>
        </div>
      </main>
    </div>
  )
}
