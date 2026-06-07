import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHeader, Section, Callout, Badge } from '../components/ui.jsx'

// [code, title, page-slug, kind]
const GROUPS = [
  {
    group: 'Architecture & overview',
    rows: [
      ['EN 302 665', 'ITS communications architecture (ITS station ref model)', 'architecture', 'ETSI'],
      ['TR 103 902', 'Release 2 architecture aspects', 'architecture', 'ETSI'],
      ['TS 103 697', 'Multi-Channel Operation (MCO) architecture, R2', 'architecture', 'ETSI'],
      ['TR 101 607', 'C-ITS Release 1 — overview', 'overview', 'ETSI'],
      ['TR 103 903', 'C-ITS Release 2 — framework', 'overview', 'ETSI'],
      ['TR 104 073', 'ITS standards catalogue', 'overview', 'ETSI'],
      ['ISO 21217', 'ITS station architecture (basis of EN 302 665)', 'global', 'ISO'],
    ],
  },
  {
    group: 'Access layer',
    rows: [
      ['EN 302 663', 'ITS-G5 access layer (IEEE 802.11p / OCB)', 'access-layer', 'ETSI'],
      ['EN 303 797', 'ITS-G5 access layer, Release 2', 'access-layer', 'ETSI'],
      ['EN 303 613 / TS 103 613', 'LTE-V2X access layer @ 5 GHz', 'access-layer', 'ETSI'],
      ['EN 302 571', '5.9 GHz radio equipment (harmonised / RED)', 'access-layer', 'ETSI'],
      ['TS 102 724', 'Harmonised channel specifications @ 5 GHz', 'access-layer', 'ETSI'],
      ['TS 102 687', 'Decentralized Congestion Control (DCC)', 'access-layer', 'ETSI'],
      ['TS 103 175', 'Cross-layer DCC management', 'access-layer', 'ETSI'],
      ['TS 103 574', 'Congestion control enhancement', 'access-layer', 'ETSI'],
      ['TS 102 792', 'Mitigation: ITS-G5 vs CEN-DSRC tolling coexistence', 'access-layer', 'ETSI'],
      ['IEEE 802.11p / 802.11bd', 'WLAN V2X PHY/MAC and its evolution', 'global', 'IEEE'],
    ],
  },
  {
    group: 'Networking & transport',
    rows: [
      ['EN 302 636-3/-4-1', 'GeoNetworking — architecture & media-independent', 'networking', 'ETSI'],
      ['EN 302 636-5-1', 'Basic Transport Protocol (BTP)', 'networking', 'ETSI'],
      ['EN 302 636-6-1', 'IPv6 over GeoNetworking', 'networking', 'ETSI'],
      ['TS 103 836-x', 'GeoNetworking / BTP / IPv6 — Release 2', 'networking', 'ETSI'],
      ['IEEE 1609.3 / 1609.4', 'WAVE networking (WSMP) & multi-channel (US)', 'global', 'IEEE'],
    ],
  },
  {
    group: 'Facilities & common data',
    rows: [
      ['TS 102 894-1', 'Facilities layer — applications & requirements', 'facilities', 'ETSI'],
      ['TS 102 894-2', 'Common Data Dictionary (CDD)', 'facilities', 'ETSI'],
      ['EN 302 895', 'Local Dynamic Map (LDM)', 'facilities', 'ETSI'],
      ['TS 102 890-1', 'Facilities — position & speed management', 'facilities', 'ETSI'],
      ['EN 302 890-2', 'Position and Time management (POTI)', 'facilities', 'ETSI'],
      ['TS 103 141', 'Facilities-layer Multi-Channel Operation', 'access-layer', 'ETSI'],
    ],
  },
  {
    group: 'Messages',
    rows: [
      ['EN 302 637-2 / TS 103 900', 'Cooperative Awareness Message (CAM) — R1 / R2', 'cam', 'ETSI'],
      ['EN 302 637-3 / TS 103 831', 'Decentralized Environmental Notification (DENM) — R1 / R2', 'denm', 'ETSI'],
      ['TS 103 324', 'Collective Perception Service (CPM)', 'cpm', 'ETSI'],
      ['TR 103 562', 'Collective perception — analysis', 'cpm', 'ETSI'],
      ['TS 103 300-2/-3', 'VRU awareness — architecture & VAM', 'vam', 'ETSI'],
      ['TS 103 301', 'Infrastructure: SPATEM/MAPEM/IVIM/SREM/SSEM', 'infrastructure', 'ETSI'],
      ['EN 302 890-1', 'Service Announcement (SAEM)', 'infrastructure', 'ETSI'],
      ['TS 103 561', 'Maneuver Coordination (MCM) — draft / not published', 'mcm', 'ETSI'],
      ['SAE J2735', 'Message set dictionary (BSM/SPaT/MAP/TIM…) (US)', 'global', 'SAE'],
    ],
  },
  {
    group: 'Applications & use cases',
    rows: [
      ['TR 102 638', 'Basic Set of Applications (BSA)', 'applications', 'ETSI'],
      ['TS 101 539-1/-2/-3', 'RHW / ICRW / LCRW application requirements', 'applications', 'ETSI'],
      ['TS 101 556-1/-2/-3', 'EV charging / tyre pressure / refuelling apps', 'applications', 'ETSI'],
      ['TR 102 965', 'Application Object Identifier (ITS-AID)', 'applications', 'ETSI'],
      ['TR 103 970', 'Release 2 use cases study', 'applications', 'ETSI'],
      ['TR 103 576-2', 'Platooning pre-standardization', 'mcm', 'ETSI'],
      ['SAE J2945/x', 'Application performance requirements (US)', 'global', 'SAE'],
    ],
  },
  {
    group: 'Security, trust & PKI',
    rows: [
      ['TS 102 940', 'Security architecture & management', 'security', 'ETSI'],
      ['TS 102 941', 'Trust & privacy management (PKI protocols)', 'security', 'ETSI'],
      ['TS 102 942 / 102 943', 'Access control / confidentiality', 'security', 'ETSI'],
      ['TS 102 731', 'Security services & architecture', 'security', 'ETSI'],
      ['TS 103 097', 'Security header & certificate formats', 'security', 'ETSI'],
      ['TR 102 893', 'Threat, Vulnerability & Risk Analysis (TVRA)', 'security', 'ETSI'],
      ['TS 103 759', 'Misbehaviour detection (MBD)', 'security', 'ETSI'],
      ['EU Certificate Policy', 'EU C-ITS Certificate Policy (R1.1 → R3.0)', 'pki', 'EU'],
      ['IEEE 1609.2', 'Security services for WAVE (US)', 'global', 'IEEE'],
    ],
  },
  {
    group: 'Management',
    rows: [
      ['TS 102 723-x', 'OSI cross-layer management interfaces', 'management', 'ETSI'],
      ['TR 102 707', 'Capabilities / host management study', 'management', 'ETSI'],
    ],
  },
  {
    group: 'Conformance & testing',
    rows: [
      ['TS 102 868 / 102 869', 'CAM / DENM conformance (PICS, TSS&TP, ATS)', 'conformance', 'ETSI'],
      ['TS 102 870 / 102 871', 'GeoNetworking / BTP-IPv6 conformance', 'conformance', 'ETSI'],
      ['TS 102 916 / 102 917 / 103 096', 'Security conformance & test', 'conformance', 'ETSI'],
      ['TS 102 859', 'GeoNetworking media-dependent conformance', 'conformance', 'ETSI'],
      ['TR 103 061-x', 'ITS-G5 RF test methods', 'conformance', 'ETSI'],
    ],
  },
  {
    group: 'Deployment, policy & ecosystem',
    rows: [
      ['C-Roads harmonised specs', 'Message profiles, use-case defs, infra functions, hybrid comms', 'c-roads', 'C-Roads'],
      ['C2CCC BSP', 'Basic System Profile + white papers', 'car2car', 'C2CCC'],
      ['EU C-ITS Strategy 2016', 'COM(2016) 766 — European C-ITS strategy', 'eu-policy', 'EU'],
      ['Delegated Regulation 2019', 'C(2019) 1789 — supplementing the ITS Directive (rejected)', 'eu-policy', 'EU'],
      ['ITS Directive 2010/40/EU', 'Legal basis for ITS delegated acts', 'eu-policy', 'EU'],
      ['DOT HS 812 014', 'NHTSA V2V readiness report (US)', 'global', 'SAE'],
    ],
  },
]

const KIND_TONE = {
  ETSI: 'brand', EU: 'amber', 'C-Roads': 'emerald', C2CCC: 'violet',
  ISO: 'brand', SAE: 'rose', IEEE: 'brand',
}

export default function Standards() {
  const [q, setQ] = useState('')
  const ql = q.toLowerCase()
  return (
    <article>
      <PageHeader
        kicker="Reference"
        title="Standards Index"
        intro="A map of every standard family covered on this site — who writes it, what it does, and which page explains it. The local archive holds the full text (or metadata, for paywalled SAE/ISO/IEEE) of these documents."
      />
      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Filter standards… (e.g. 302 637, security, CAM, DCC)"
        className="mb-8 w-full rounded-xl border border-ink-700 bg-ink-900 px-4 py-3 text-slate-200 placeholder-slate-500 outline-none focus:border-brand-600"
      />

      {GROUPS.map((g) => {
        const rows = g.rows.filter(
          ([code, title]) => code.toLowerCase().includes(ql) || title.toLowerCase().includes(ql) || g.group.toLowerCase().includes(ql),
        )
        if (rows.length === 0) return null
        return (
          <Section key={g.group} id={g.group.replace(/\W+/g, '-').toLowerCase()} title={g.group}>
            <div className="overflow-x-auto rounded-xl border border-ink-700">
              <table className="w-full border-collapse text-sm">
                <tbody>
                  {rows.map(([code, title, slug, kind], i) => (
                    <tr key={code} className={i % 2 ? 'bg-ink-900/40' : ''}>
                      <td className="w-44 border-b border-ink-800 px-4 py-2.5 align-top">
                        <span className="font-mono font-semibold text-brand-300">{code}</span>
                      </td>
                      <td className="border-b border-ink-800 px-4 py-2.5 align-top text-slate-300">
                        {title}
                      </td>
                      <td className="w-24 border-b border-ink-800 px-3 py-2.5 align-top">
                        <Badge tone={KIND_TONE[kind] || 'slate'}>{kind}</Badge>
                      </td>
                      <td className="w-20 border-b border-ink-800 px-3 py-2.5 align-top text-right">
                        <Link to={`/${slug}`} className="text-xs font-semibold text-brand-300 hover:text-brand-200">
                          open →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        )
      })}

      <Callout type="info" title="About the archive">
        <p>
          ETSI, C-Roads, CAR 2 CAR and EU documents are freely published and held in full text in
          the local archive (with searchable <code>.txt</code> sidecars). SAE, ISO and IEEE
          standards are paywalled, so the archive holds metadata and the{' '}
          <Link to="/global">EU↔US message mapping</Link> only.
        </p>
      </Callout>
    </article>
  )
}
