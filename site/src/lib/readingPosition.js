// Persists the reader's place across visits: last visited route + per-page scroll
// offset, stored in localStorage (matching the cits-* key convention used elsewhere).

const SCROLL_KEY = 'cits-scroll'
const LAST_PATH_KEY = 'cits-last-path'

export function loadScrollMap() {
  try {
    const raw = localStorage.getItem(SCROLL_KEY)
    const parsed = raw ? JSON.parse(raw) : {}
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch (e) {
    return {}
  }
}

export function saveScroll(path, y) {
  try {
    const map = loadScrollMap()
    map[path] = y
    localStorage.setItem(SCROLL_KEY, JSON.stringify(map))
  } catch (e) {}
}

export function getScroll(path) {
  const y = loadScrollMap()[path]
  return typeof y === 'number' ? y : 0
}

export function getLastPath() {
  try {
    return localStorage.getItem(LAST_PATH_KEY) || ''
  } catch (e) {
    return ''
  }
}

export function setLastPath(path) {
  try {
    localStorage.setItem(LAST_PATH_KEY, path)
  } catch (e) {}
}
