import React, { useEffect, useState } from 'react'

function getInitial() {
  if (typeof document !== 'undefined') {
    return document.documentElement.classList.contains('light') ? 'light' : 'dark'
  }
  return 'dark'
}

export default function ThemeToggle({ className = '' }) {
  const [theme, setTheme] = useState(getInitial)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('light', theme === 'light')
    try {
      localStorage.setItem('cits-theme', theme)
    } catch (e) {}
  }, [theme])

  const next = theme === 'light' ? 'dark' : 'light'
  return (
    <button
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      className={
        'inline-flex h-9 w-9 items-center justify-center rounded-lg border border-ink-700 text-slate-400 transition hover:border-brand-700 hover:text-slate-200 ' +
        className
      }
    >
      {theme === 'light' ? (
        // moon (click → dark)
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      ) : (
        // sun (click → light)
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}
    </button>
  )
}
