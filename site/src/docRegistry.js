// Maps a standard reference (as written in a <Ref code> or PageHeader sources chip)
// to the public document it refers to, so the pill becomes a clickable link.
//
// ETSI_MAP: exact public ETSI "deliver" PDF URLs (the published version we archived),
// generated from _index/download.log. Key = TYPE + number + part suffixes, no spaces.
const ETSI_MAP = {
  "EN302571": "https://www.etsi.org/deliver/etsi_en/302500_302599/302571/02.01.01_60/en_302571v020101p.pdf",
  "EN302636-1": "https://www.etsi.org/deliver/etsi_en/302600_302699/30263601/01.02.01_60/en_30263601v010201p.pdf",
  "EN302636-2": "https://www.etsi.org/deliver/etsi_en/302600_302699/30263602/01.02.01_60/en_30263602v010201p.pdf",
  "EN302636-3": "https://www.etsi.org/deliver/etsi_en/302600_302699/30263603/01.02.01_60/en_30263603v010201p.pdf",
  "EN302636-4-1": "https://www.etsi.org/deliver/etsi_en/302600_302699/3026360401/01.04.01_60/en_3026360401v010401p.pdf",
  "EN302636-5-1": "https://www.etsi.org/deliver/etsi_en/302600_302699/3026360501/02.02.01_60/en_3026360501v020201p.pdf",
  "EN302636-6-1": "https://www.etsi.org/deliver/etsi_en/302600_302699/3026360601/01.02.01_60/en_3026360601v010201p.pdf",
  "EN302637-2": "https://www.etsi.org/deliver/etsi_en/302600_302699/30263702/01.04.01_60/en_30263702v010401p.pdf",
  "EN302637-3": "https://www.etsi.org/deliver/etsi_en/302600_302699/30263703/01.03.01_60/en_30263703v010301p.pdf",
  "EN302663": "https://www.etsi.org/deliver/etsi_en/302600_302699/302663/01.03.01_60/en_302663v010301p.pdf",
  "EN302665": "https://www.etsi.org/deliver/etsi_en/302600_302699/302665/01.01.01_60/en_302665v010101p.pdf",
  "EN302890-1": "https://www.etsi.org/deliver/etsi_en/302800_302899/30289001/01.02.01_60/en_30289001v010201p.pdf",
  "EN302890-2": "https://www.etsi.org/deliver/etsi_en/302800_302899/30289002/02.01.01_60/en_30289002v020101p.pdf",
  "EN302895": "https://www.etsi.org/deliver/etsi_en/302800_302899/302895/01.01.01_60/en_302895v010101p.pdf",
  "EN303613": "https://www.etsi.org/deliver/etsi_en/303600_303699/303613/01.01.01_60/en_303613v010101p.pdf",
  "EN303797": "https://www.etsi.org/deliver/etsi_en/303700_303799/303797/02.01.01_60/en_303797v020101p.pdf",
  "TR101612": "https://www.etsi.org/deliver/etsi_tr/101600_101699/101612/01.01.01_60/tr_101612v010101p.pdf",
  "TR102638": "https://www.etsi.org/deliver/etsi_tr/102600_102699/102638/02.01.01_60/tr_102638v020101p.pdf",
  "TR102707": "https://www.etsi.org/deliver/etsi_tr/102700_102799/102707/01.01.01_60/tr_102707v010101p.pdf",
  "TR102893": "https://www.etsi.org/deliver/etsi_tr/102800_102899/102893/01.02.01_60/tr_102893v010201p.pdf",
  "TR102962": "https://www.etsi.org/deliver/etsi_tr/102900_102999/102962/02.01.01_60/tr_102962v020101p.pdf",
  "TR102965": "https://www.etsi.org/deliver/etsi_tr/102900_102999/102965/01.01.01_60/tr_102965v010101p.pdf",
  "TR103061-1": "https://www.etsi.org/deliver/etsi_tr/103000_103099/10306101/01.02.01_60/tr_10306101v010201p.pdf",
  "TR103061-2": "https://www.etsi.org/deliver/etsi_tr/103000_103099/10306102/01.02.01_60/tr_10306102v010201p.pdf",
  "TR103061-3": "https://www.etsi.org/deliver/etsi_tr/103000_103099/10306103/01.02.01_60/tr_10306103v010201p.pdf",
  "TR103061-4": "https://www.etsi.org/deliver/etsi_tr/103000_103099/10306104/01.01.01_60/tr_10306104v010101p.pdf",
  "TR103061-5": "https://www.etsi.org/deliver/etsi_tr/103000_103099/10306105/01.01.01_60/tr_10306105v010101p.pdf",
  "TR103439": "https://www.etsi.org/deliver/etsi_tr/103400_103499/103439/02.01.01_60/tr_103439v020101p.pdf",
  "TR103562": "https://www.etsi.org/deliver/etsi_tr/103500_103599/103562/02.01.01_60/tr_103562v020101p.pdf",
  "TR103576-2": "https://www.etsi.org/deliver/etsi_tr/103500_103599/10357602/01.01.01_60/tr_10357602v010101p.pdf",
  "TR103902": "https://www.etsi.org/deliver/etsi_tr/103900_103999/103902/02.01.01_60/tr_103902v020101p.pdf",
  "TR103970": "https://www.etsi.org/deliver/etsi_tr/103900_103999/103970/02.01.01_60/tr_103970v020101p.pdf",
  "TS101539-1": "https://www.etsi.org/deliver/etsi_ts/101500_101599/10153901/01.01.01_60/ts_10153901v010101p.pdf",
  "TS101539-2": "https://www.etsi.org/deliver/etsi_ts/101500_101599/10153902/01.01.01_60/ts_10153902v010101p.pdf",
  "TS101539-3": "https://www.etsi.org/deliver/etsi_ts/101500_101599/10153903/01.01.01_60/ts_10153903v010101p.pdf",
  "TS101556-1": "https://www.etsi.org/deliver/etsi_ts/101500_101599/10155601/01.01.01_60/ts_10155601v010101p.pdf",
  "TS101556-2": "https://www.etsi.org/deliver/etsi_ts/101500_101599/10155602/01.01.01_60/ts_10155602v010101p.pdf",
  "TS101556-3": "https://www.etsi.org/deliver/etsi_ts/101500_101599/10155603/01.01.01_60/ts_10155603v010101p.pdf",
  "TS102636-4-2": "https://www.etsi.org/deliver/etsi_ts/102600_102699/1026360402/01.04.01_60/ts_1026360402v010401p.pdf",
  "TS102637-2": "https://www.etsi.org/deliver/etsi_ts/102600_102699/10263702/01.02.01_60/ts_10263702v010201p.pdf",
  "TS102637-3": "https://www.etsi.org/deliver/etsi_ts/102600_102699/10263703/01.01.01_60/ts_10263703v010101p.pdf",
  "TS102687": "https://www.etsi.org/deliver/etsi_ts/102600_102699/102687/01.02.01_60/ts_102687v010201p.pdf",
  "TS102723-1": "https://www.etsi.org/deliver/etsi_ts/102700_102799/10272301/01.01.01_60/ts_10272301v010101p.pdf",
  "TS102723-10": "https://www.etsi.org/deliver/etsi_ts/102700_102799/10272310/01.01.01_60/ts_10272310v010101p.pdf",
  "TS102723-2": "https://www.etsi.org/deliver/etsi_ts/102700_102799/10272302/01.01.01_60/ts_10272302v010101p.pdf",
  "TS102723-3": "https://www.etsi.org/deliver/etsi_ts/102700_102799/10272303/01.01.01_60/ts_10272303v010101p.pdf",
  "TS102723-4": "https://www.etsi.org/deliver/etsi_ts/102700_102799/10272304/01.01.01_60/ts_10272304v010101p.pdf",
  "TS102723-5": "https://www.etsi.org/deliver/etsi_ts/102700_102799/10272305/02.00.00_60/ts_10272305v020000p.pdf",
  "TS102724": "https://www.etsi.org/deliver/etsi_ts/102700_102799/102724/01.01.01_60/ts_102724v010101p.pdf",
  "TS102731": "https://www.etsi.org/deliver/etsi_ts/102700_102799/102731/02.00.00_60/ts_102731v020000p.pdf",
  "TS102792": "https://www.etsi.org/deliver/etsi_ts/102700_102799/102792/01.02.01_60/ts_102792v010201p.pdf",
  "TS102859-1": "https://www.etsi.org/deliver/etsi_ts/102800_102899/10285901/01.03.01_60/ts_10285901v010301p.pdf",
  "TS102859-2": "https://www.etsi.org/deliver/etsi_ts/102800_102899/10285902/01.03.01_60/ts_10285902v010301p.pdf",
  "TS102859-3": "https://www.etsi.org/deliver/etsi_ts/102800_102899/10285903/01.03.01_60/ts_10285903v010301p.pdf",
  "TS102860": "https://www.etsi.org/deliver/etsi_ts/102800_102899/102860/01.01.01_60/ts_102860v010101p.pdf",
  "TS102868-1": "https://www.etsi.org/deliver/etsi_ts/102800_102899/10286801/02.01.01_60/ts_10286801v020101p.pdf",
  "TS102868-2": "https://www.etsi.org/deliver/etsi_ts/102800_102899/10286802/02.01.01_60/ts_10286802v020101p.pdf",
  "TS102868-3": "https://www.etsi.org/deliver/etsi_ts/102800_102899/10286803/02.01.01_60/ts_10286803v020101p.pdf",
  "TS102869-1": "https://www.etsi.org/deliver/etsi_ts/102800_102899/10286901/01.06.01_60/ts_10286901v010601p.pdf",
  "TS102869-2": "https://www.etsi.org/deliver/etsi_ts/102800_102899/10286902/01.06.01_60/ts_10286902v010601p.pdf",
  "TS102869-3": "https://www.etsi.org/deliver/etsi_ts/102800_102899/10286903/01.06.01_60/ts_10286903v010601p.pdf",
  "TS102870-1": "https://www.etsi.org/deliver/etsi_ts/102800_102899/10287001/01.02.01_60/ts_10287001v010201p.pdf",
  "TS102870-2": "https://www.etsi.org/deliver/etsi_ts/102800_102899/10287002/01.02.01_60/ts_10287002v010201p.pdf",
  "TS102870-3": "https://www.etsi.org/deliver/etsi_ts/102800_102899/10287003/01.02.01_60/ts_10287003v010201p.pdf",
  "TS102871-1": "https://www.etsi.org/deliver/etsi_ts/102800_102899/10287101/02.01.01_60/ts_10287101v020101p.pdf",
  "TS102871-2": "https://www.etsi.org/deliver/etsi_ts/102800_102899/10287102/02.01.01_60/ts_10287102v020101p.pdf",
  "TS102871-3": "https://www.etsi.org/deliver/etsi_ts/102800_102899/10287103/02.01.01_60/ts_10287103v020101p.pdf",
  "TS102890-1": "https://www.etsi.org/deliver/etsi_ts/102800_102899/10289001/01.01.01_60/ts_10289001v010101p.pdf",
  "TS102894-1": "https://www.etsi.org/deliver/etsi_ts/102800_102899/10289401/02.00.00_60/ts_10289401v020000p.pdf",
  "TS102894-2": "https://www.etsi.org/deliver/etsi_ts/102800_102899/10289402/02.04.01_60/ts_10289402v020401p.pdf",
  "TS102916-1": "https://www.etsi.org/deliver/etsi_ts/102900_102999/10291601/01.02.01_60/ts_10291601v010201p.pdf",
  "TS102916-2": "https://www.etsi.org/deliver/etsi_ts/102900_102999/10291602/01.02.01_60/ts_10291602v010201p.pdf",
  "TS102916-3": "https://www.etsi.org/deliver/etsi_ts/102900_102999/10291603/01.01.01_60/ts_10291603v010101p.pdf",
  "TS102917-1": "https://www.etsi.org/deliver/etsi_ts/102900_102999/10291701/01.01.01_60/ts_10291701v010101p.pdf",
  "TS102917-2": "https://www.etsi.org/deliver/etsi_ts/102900_102999/10291702/01.01.01_60/ts_10291702v010101p.pdf",
  "TS102917-3": "https://www.etsi.org/deliver/etsi_ts/102900_102999/10291703/01.01.01_60/ts_10291703v010101p.pdf",
  "TS102940": "https://www.etsi.org/deliver/etsi_ts/102900_102999/102940/02.01.01_60/ts_102940v020101p.pdf",
  "TS102941": "https://www.etsi.org/deliver/etsi_ts/102900_102999/102941/02.02.01_60/ts_102941v020201p.pdf",
  "TS102942": "https://www.etsi.org/deliver/etsi_ts/102900_102999/102942/02.00.00_60/ts_102942v020000p.pdf",
  "TS102943": "https://www.etsi.org/deliver/etsi_ts/102900_102999/102943/02.00.00_60/ts_102943v020000p.pdf",
  "TS103096-1": "https://www.etsi.org/deliver/etsi_ts/103000_103099/10309601/02.01.01_60/ts_10309601v020101p.pdf",
  "TS103096-2": "https://www.etsi.org/deliver/etsi_ts/103000_103099/10309602/02.01.01_60/ts_10309602v020101p.pdf",
  "TS103096-3": "https://www.etsi.org/deliver/etsi_ts/103000_103099/10309603/02.01.01_60/ts_10309603v020101p.pdf",
  "TS103097": "https://www.etsi.org/deliver/etsi_ts/103000_103099/103097/02.02.01_60/ts_103097v020201p.pdf",
  "TS103141": "https://www.etsi.org/deliver/etsi_ts/103100_103199/103141/02.02.01_60/ts_103141v020201p.pdf",
  "TS103175": "https://www.etsi.org/deliver/etsi_ts/103100_103199/103175/01.01.01_60/ts_103175v010101p.pdf",
  "TS103300-2": "https://www.etsi.org/deliver/etsi_ts/103300_103399/10330002/02.03.01_60/ts_10330002v020301p.pdf",
  "TS103300-3": "https://www.etsi.org/deliver/etsi_ts/103300_103399/10330003/02.03.01_60/ts_10330003v020301p.pdf",
  "TS103301": "https://www.etsi.org/deliver/etsi_ts/103300_103399/103301/02.03.01_60/ts_103301v020301p.pdf",
  "TS103324": "https://www.etsi.org/deliver/etsi_ts/103300_103399/103324/02.01.01_60/ts_103324v020101p.pdf",
  "TS103574": "https://www.etsi.org/deliver/etsi_ts/103500_103599/103574/02.00.00_60/ts_103574v020000p.pdf",
  "TS103613": "https://www.etsi.org/deliver/etsi_ts/103600_103699/103613/01.01.01_60/ts_103613v010101p.pdf",
  "TS103695": "https://www.etsi.org/deliver/etsi_ts/103600_103699/103695/02.01.01_60/ts_103695v020101p.pdf",
  "TS103697": "https://www.etsi.org/deliver/etsi_ts/103600_103699/103697/02.01.01_60/ts_103697v020101p.pdf",
  "TS103723": "https://www.etsi.org/deliver/etsi_ts/103700_103799/103723/01.02.01_60/ts_103723v010201p.pdf",
  "TS103759": "https://www.etsi.org/deliver/etsi_ts/103700_103799/103759/02.02.01_60/ts_103759v020201p.pdf",
  "TS103831": "https://www.etsi.org/deliver/etsi_ts/103800_103899/103831/02.03.01_60/ts_103831v020301p.pdf",
  "TS103836-4-1": "https://www.etsi.org/deliver/etsi_ts/103800_103899/1038360401/02.02.01_60/ts_1038360401v020201p.pdf",
  "TS103836-4-2": "https://www.etsi.org/deliver/etsi_ts/103800_103899/1038360402/02.01.01_60/ts_1038360402v020101p.pdf",
  "TS103836-5-1": "https://www.etsi.org/deliver/etsi_ts/103800_103899/1038360501/02.01.01_60/ts_1038360501v020101p.pdf",
  "TS103836-6-1": "https://www.etsi.org/deliver/etsi_ts/103800_103899/1038360601/02.01.01_60/ts_1038360601v020101p.pdf",
  "TS103900": "https://www.etsi.org/deliver/etsi_ts/103900_103999/103900/02.03.01_60/ts_103900v020301p.pdf",
  // MCM is a draft work item — no published deliverable; link to the ETSI work programme entry.
  "TS103561": "https://portal.etsi.org/webapp/workProgram/Report_WorkItem.asp?WKI_ID=54944",
}

// Exact links for notable non-ETSI references (matched by substring of the code, lower-cased).
const SUBSTRING_MAP = [
  ["certificate policy", "https://cpoc.jrc.ec.europa.eu/Documentation.html"],
  ["ccms", "https://cpoc.jrc.ec.europa.eu/"],
  ["cpoc", "https://cpoc.jrc.ec.europa.eu/"],
  ["its directive", "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32010L0040"],
  ["2010/40", "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32010L0040"],
  ["c-its strategy", "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52016DC0766"],
  ["766", "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52016DC0766"],
  ["delegated regulation", "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=PI_COM:C(2019)1789"],
  ["1789", "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=PI_COM:C(2019)1789"],
  ["dot hs 812", "https://rosap.ntl.bts.gov/view/dot/27999"],
  ["nhtsa", "https://rosap.ntl.bts.gov/view/dot/27999"],
  ["j2735", "https://www.sae.org/standards/content/j2735_202309/"],
  ["j2945", "https://www.sae.org/standards/content/j2945/1_202004/"],
  ["1609.2", "https://standards.ieee.org/ieee/1609.2/10258/"],
  ["1609.3", "https://standards.ieee.org/ieee/1609.3/10261/"],
  ["1609.4", "https://standards.ieee.org/ieee/1609.4/10262/"],
  ["802.11p", "https://standards.ieee.org/ieee/802.11p/3953/"],
  ["802.11bd", "https://standards.ieee.org/ieee/802.11bd/7460/"],
  ["21217", "https://www.iso.org/standard/86657.html"],
  ["19091", "https://www.iso.org/standard/86621.html"],
  ["c-roads", "https://www.c-roads.eu/platform/documents.html"],
  ["c2ccc", "https://www.car-2-car.org/documents"],
  ["car 2 car", "https://www.car-2-car.org/documents"],
  ["basic system profile", "https://www.car-2-car.org/documents"],
  ["bsp", "https://www.car-2-car.org/documents"],
]

// Search-page fallbacks per standards body, so every pill still lands somewhere relevant.
function kindFallback(kind, code) {
  const q = encodeURIComponent(code.trim())
  switch (kind) {
    case 'ETSI': return `https://www.etsi.org/standards-search#page=1&search=${q}`
    case 'SAE': return `https://www.sae.org/search/?qt=${q}`
    case 'IEEE': return `https://standards.ieee.org/?s=${q}`
    case 'ISO': return `https://www.iso.org/search.html?q=${q}`
    case 'EU': return `https://eur-lex.europa.eu/search.html?text=${q}&type=quick`
    case 'C-Roads': return 'https://www.c-roads.eu/platform/documents.html'
    case 'C2CCC': return 'https://www.car-2-car.org/documents'
    default: return null
  }
}

// Normalise a reference into an ETSI_MAP key, e.g. "ETSI EN 302 637-2" -> "EN302637-2".
function etsiKey(code) {
  const up = String(code).toUpperCase()
  const m = up.match(/(EN|TS|TR|EG|ES|GS)\s*0?(\d[\d ]*\d)((?:\s*-\s*\d+)*)/)
  if (!m) return null
  const digits = m[2].replace(/\s+/g, '')
  const parts = m[3].replace(/\s+/g, '')
  return m[1] + digits + parts
}

// Infer the standards body from a free-form code string (used by PageHeader chips).
export function inferKind(code) {
  const s = String(code).toLowerCase()
  if (s.startsWith('etsi') || /\b(en|ts|tr|eg|es|gs)\s*\d/.test(s)) return 'ETSI'
  if (s.includes('c-roads')) return 'C-Roads'
  if (s.includes('c2ccc') || s.includes('car 2 car') || s.includes('car2car')) return 'C2CCC'
  if (s.startsWith('sae') || s.includes('j27') || s.includes('j29')) return 'SAE'
  if (s.startsWith('ieee') || s.includes('1609') || s.includes('802.11')) return 'IEEE'
  if (s.startsWith('iso')) return 'ISO'
  if (s.startsWith('eu') || s.includes('regulation') || s.includes('directive') || s.includes('certificate policy')) return 'EU'
  return null
}

// Resolve a reference to a URL (or null). kind is optional; inferred if omitted.
export function docUrl(code, kind) {
  if (!code) return null
  const k = etsiKey(code)
  if (k && ETSI_MAP[k]) return ETSI_MAP[k]
  const low = String(code).toLowerCase()
  for (const [needle, url] of SUBSTRING_MAP) {
    if (low.includes(needle)) return url
  }
  return kindFallback(kind || inferKind(code), code)
}
