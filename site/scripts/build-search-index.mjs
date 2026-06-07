// Builds public/search-index.json by SSR-rendering every route and extracting
// the page title + per-section text. Run via `npm run search-index` (also runs
// automatically before `npm run build`).
import React from 'react'
import { renderToString } from 'react-dom/server'
import { createServer } from 'vite'
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

function stripTags(html) {
  return html
    .replace(/<svg[\s\S]*?<\/svg>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ').replace(/&#39;/g, "'").replace(/&quot;/g, '"')
    .replace(/&[a-z]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' })
const records = []
try {
  const { StaticRouter } = await vite.ssrLoadModule('react-router-dom/server')
  const App = (await vite.ssrLoadModule('/src/App.jsx')).default
  const { ALL_ITEMS } = await vite.ssrLoadModule('/src/nav.js')

  for (const it of ALL_ITEMS) {
    const path = it.slug ? '/' + it.slug : '/'
    const html = renderToString(
      React.createElement(StaticRouter, { location: path }, React.createElement(App)),
    )
    // page title: first <h1>
    const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)
    const pageTitle = h1 ? stripTags(h1[1]) : it.title

    // full page text (catches content outside <section>, e.g. glossary, intros)
    const fullText = stripTags(html)
    records.push({ path, pageTitle, id: null, sectionTitle: null, text: fullText.slice(0, 12000) })

    // per-section records (deep-linkable)
    const secRe = /<section\b[^>]*\bid="([^"]+)"[^>]*>([\s\S]*?)<\/section>/g
    let m
    while ((m = secRe.exec(html))) {
      const id = m[1]
      const inner = m[2]
      const h2 = inner.match(/<h[23][^>]*>([\s\S]*?)<\/h[23]>/)
      const sectionTitle = h2 ? stripTags(h2[1]) : null
      const text = stripTags(inner)
      if (text.length < 8) continue
      records.push({ path, pageTitle, id, sectionTitle, text: text.slice(0, 6000) })
    }
  }
} finally {
  await vite.close()
}

const out = resolve(root, 'public', 'search-index.json')
writeFileSync(out, JSON.stringify(records))
const kb = (JSON.stringify(records).length / 1024).toFixed(0)
console.log(`wrote ${records.length} records (${kb} KB) -> public/search-index.json`)
process.exit(0)
