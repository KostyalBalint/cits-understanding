// Single source of truth for routes + sidebar grouping.
// slug -> URL hash path; module -> file under src/pages (without extension).
export const NAV = [
  {
    group: 'Start here',
    items: [
      { slug: '', title: 'Home', module: 'Home' },
      { slug: 'overview', title: 'What is C-ITS?', module: 'Overview' },
      { slug: 'architecture', title: 'ITS Station Architecture', module: 'Architecture' },
    ],
  },
  {
    group: 'Communication stack',
    items: [
      { slug: 'access-layer', title: 'Access Layer (ITS-G5 / C-V2X)', module: 'AccessLayer' },
      { slug: 'networking', title: 'Networking & Transport', module: 'Networking' },
      { slug: 'facilities', title: 'Facilities Layer', module: 'Facilities' },
      { slug: 'management', title: 'Management & Interfaces', module: 'Management' },
    ],
  },
  {
    group: 'V2X messages',
    items: [
      { slug: 'cam', title: 'CAM — Awareness', module: 'MessageCAM' },
      { slug: 'denm', title: 'DENM — Hazards', module: 'MessageDENM' },
      { slug: 'cpm', title: 'CPM — Collective Perception', module: 'MessageCPM' },
      { slug: 'vam', title: 'VAM — Vulnerable Road Users', module: 'MessageVAM' },
      { slug: 'infrastructure', title: 'SPATEM / MAPEM / IVIM / SREM', module: 'MessageInfra' },
      { slug: 'mcm', title: 'MCM & Day-2 / Maneuvers', module: 'MessageMCM' },
    ],
  },
  {
    group: 'Applications & security',
    items: [
      { slug: 'applications', title: 'Applications & Use Cases', module: 'Applications' },
      { slug: 'security', title: 'Security Stack', module: 'Security' },
      { slug: 'pki', title: 'PKI, Trust & CCMS', module: 'PKITrust' },
      { slug: 'conformance', title: 'Conformance & Testing', module: 'Conformance' },
    ],
  },
  {
    group: 'Deployment & ecosystem',
    items: [
      { slug: 'c-roads', title: 'C-Roads Platform', module: 'CRoads' },
      { slug: 'car2car', title: 'CAR 2 CAR Consortium', module: 'Car2Car' },
      { slug: 'eu-policy', title: 'EU Policy & Regulation', module: 'EUPolicy' },
      { slug: 'global', title: 'Global: US / ISO / SAE', module: 'Global' },
      { slug: 'research', title: 'Research & Projects', module: 'Research' },
    ],
  },
  {
    group: 'Reference',
    items: [
      { slug: 'standards', title: 'Standards Index', module: 'Standards' },
      { slug: 'glossary', title: 'Glossary', module: 'Glossary' },
    ],
  },
]

export const ALL_ITEMS = NAV.flatMap((g) => g.items)
