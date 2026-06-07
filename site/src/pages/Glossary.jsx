import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHeader, Callout } from '../components/ui.jsx'

const TERMS = [
  ['AA', 'Authorization Authority — PKI entity that issues Authorization Tickets (pseudonym certs) to enrolled ITS stations.', '/pki'],
  ['AID / ITS-AID', 'ITS Application Identifier — numeric ID of an ITS application, used in security permissions (SSP).', '/applications'],
  ['ASN.1', 'Abstract Syntax Notation One — the formal notation used to define C-ITS message and certificate structures.', '/facilities'],
  ['AT', 'Authorization Ticket — short-lived pseudonym certificate a station uses to sign messages; rotated to prevent tracking.', '/pki'],
  ['ATS', 'Abstract Test Suite — executable conformance tests (often TTCN-3) for a protocol.', '/conformance'],
  ['BSA', 'Basic Set of Applications — ETSI TR 102 638 catalogue of the first C-ITS use cases.', '/applications'],
  ['BSM', 'Basic Safety Message — the US/SAE J2735 equivalent of the European CAM.', '/global'],
  ['BSP', 'Basic System Profile — CAR 2 CAR Communication Consortium master spec for an interoperable vehicle C-ITS system.', '/car2car'],
  ['BTP', 'Basic Transport Protocol — the ETSI transport layer (ports) above GeoNetworking.', '/networking'],
  ['CAM', 'Cooperative Awareness Message — periodic vehicle status heartbeat (position, speed, heading).', '/cam'],
  ['CBF', 'Contention-Based Forwarding — a GeoNetworking multi-hop forwarding algorithm.', '/networking'],
  ['CBR', 'Channel Busy Ratio — measured channel load that drives Decentralized Congestion Control.', '/access-layer'],
  ['CCAM', 'Cooperative, Connected and Automated Mobility — the EU vision integrating automation with C-ITS.', '/mcm'],
  ['CCMS', 'C-ITS Credential/Certificate Management System — the EU public-key infrastructure & trust model.', '/pki'],
  ['CDD', 'Common Data Dictionary — ETSI TS 102 894-2 shared data elements/frames reused by all messages.', '/facilities'],
  ['CPM', 'Collective Perception Message — shares sensor-detected objects (Release 2).', '/cpm'],
  ['CPOC', 'C-ITS Point of Contact — operates the EU Trust List Manager / distributes the trust list.', '/pki'],
  ['C-ITS', 'Cooperative Intelligent Transport Systems — vehicles and infrastructure cooperating via V2X messaging.', '/overview'],
  ['C-V2X', 'Cellular V2X — 3GPP-defined V2X; PC5 = direct sidelink, Uu = network path. Rival/alternative to ITS-G5.', '/access-layer'],
  ['DCC', 'Decentralized Congestion Control — keeps the shared radio channel from saturating.', '/access-layer'],
  ['DENM', 'Decentralized Environmental Notification Message — event-driven hazard warning.', '/denm'],
  ['DSRC', 'Dedicated Short-Range Communications — generic term; in the US historically the 802.11p-based stack now shifting to C-V2X.', '/global'],
  ['EA', 'Enrolment Authority — PKI entity that issues the long-term Enrolment Credential identifying a station.', '/pki'],
  ['EC', 'Enrolment Credential — long-term certificate proving a station is a legitimate, enrolled ITS-S.', '/pki'],
  ['ECTL', 'European Certificate Trust List — signed list of trusted root CAs, distributed by the TLM.', '/pki'],
  ['EDCA', 'Enhanced Distributed Channel Access — the prioritised 802.11 MAC used by ITS-G5.', '/access-layer'],
  ['ETSI', 'European Telecommunications Standards Institute — its TC ITS writes the core C-ITS standards.', '/overview'],
  ['GLOSA', 'Green Light Optimal Speed Advisory — speed advice from SPATEM+MAPEM to catch the green.', '/infrastructure'],
  ['GeoNetworking', 'Position-based (geographic) network-layer routing for VANETs.', '/networking'],
  ['HF container', 'High-Frequency container — rapidly-changing dynamic data in a CAM/VAM.', '/cam'],
  ['HSM', 'Hardware Security Module — tamper-resistant store for keys; subject of a C2C-CC Protection Profile.', '/car2car'],
  ['ITS-G5', 'ETSI 5.9 GHz access technology based on IEEE 802.11p (OCB mode).', '/access-layer'],
  ['ITS-S', 'ITS Station — any node (vehicle, roadside, central, personal) running the ITS station architecture.', '/architecture'],
  ['IVIM', 'In-Vehicle Information Message — roadside signage/speed/roadworks info to vehicles.', '/infrastructure'],
  ['LDM', 'Local Dynamic Map — the station’s layered real-time database of its surroundings.', '/facilities'],
  ['LF container', 'Low-Frequency container — slowly-changing data in a CAM/VAM.', '/cam'],
  ['LTE-V2X', 'The LTE (Rel-14/15) flavour of C-V2X; PC5 sidelink. Successor: NR-V2X (5G).', '/access-layer'],
  ['MAPEM', 'MAP Extended Message — intersection/road topology (lanes, connections).', '/infrastructure'],
  ['MBD', 'Misbehaviour Detection — spotting and reporting faulty/malicious stations (TS 103 759).', '/security'],
  ['MCM', 'Maneuver Coordination Message — draft Release-2 message for negotiating trajectories.', '/mcm'],
  ['MCO', 'Multi-Channel Operation — using several 5.9 GHz channels in parallel. (Note: in some CAR 2 CAR papers “MCO” means Maneuver CoOrdination.)', '/access-layer'],
  ['OBU', 'On-Board Unit — the in-vehicle ITS station hardware.', '/architecture'],
  ['OCB', 'Outside the Context of a BSS — the 802.11 mode (no association) used by ITS-G5.', '/access-layer'],
  ['PICS', 'Protocol Implementation Conformance Statement — what an implementation claims to support.', '/conformance'],
  ['PKI', 'Public Key Infrastructure — the certificate hierarchy enabling trust between stations.', '/pki'],
  ['POTI', 'Position and Time management — provides the station with accurate position/time (EN 302 890-2).', '/facilities'],
  ['PSM', 'Personal Safety Message — US/SAE message for vulnerable road users (≈ European VAM).', '/global'],
  ['RSU', 'Road-Side Unit — an infrastructure ITS station at the roadside/junction.', '/architecture'],
  ['SAEM', 'Service Announcement Message — advertises available ITS services (EN 302 890-1).', '/infrastructure'],
  ['SCMS', 'Security Credential Management System — the US trust model (counterpart to the EU CCMS).', '/global'],
  ['SHB', 'Single-Hop Broadcast — GeoNetworking transport used by CAM/VAM (no forwarding).', '/networking'],
  ['SPATEM', 'Signal Phase And Timing Extended Message — live traffic-signal phase & timing.', '/infrastructure'],
  ['SREM / SSEM', 'Signal Request / Signal request Status Extended Messages — priority/preemption request & status.', '/infrastructure'],
  ['SSP', 'Service Specific Permissions — fine-grained app permissions carried in a certificate.', '/security'],
  ['TLM', 'Trust List Manager — root of the EU trust model; signs the ECTL of trusted root CAs.', '/pki'],
  ['TPC / TRC / TDC', 'Transmit Power / Rate / Data-rate Control — DCC actuators that reduce channel load.', '/access-layer'],
  ['TSS & TP', 'Test Suite Structure & Test Purposes — the conformance test design between PICS and ATS.', '/conformance'],
  ['TTCN-3', 'Testing and Test Control Notation v3 — language used to write ETSI abstract test suites.', '/conformance'],
  ['TVRA', 'Threat, Vulnerability and Risk Analysis — ETSI TR 102 893 security risk study.', '/security'],
  ['V2X', 'Vehicle-to-Everything — umbrella for V2V, V2I, V2N, V2P communication.', '/overview'],
  ['VAM', 'VRU Awareness Message — a vulnerable road user’s heartbeat (Release 2).', '/vam'],
  ['VRU', 'Vulnerable Road User — pedestrian, cyclist, motorcyclist, etc.', '/vam'],
  ['WAVE', 'Wireless Access in Vehicular Environments — the US IEEE 1609.x protocol family.', '/global'],
]

export default function Glossary() {
  const [q, setQ] = useState('')
  const filtered = TERMS.filter(
    ([t, d]) => t.toLowerCase().includes(q.toLowerCase()) || d.toLowerCase().includes(q.toLowerCase()),
  ).sort((a, b) => a[0].localeCompare(b[0]))

  return (
    <article>
      <PageHeader
        kicker="Reference"
        title="Glossary"
        intro="The acronym soup of C-ITS, decoded. Search and follow the link to the page that explains each term in context."
      />
      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Filter terms… (e.g. CAM, PKI, DCC)"
        className="mb-6 w-full rounded-xl border border-ink-700 bg-ink-900 px-4 py-3 text-slate-200 placeholder-slate-500 outline-none focus:border-brand-600"
      />
      <dl className="divide-y divide-ink-800 rounded-xl border border-ink-700">
        {filtered.map(([term, def, to]) => (
          <div key={term} className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-[150px_1fr] sm:gap-4">
            <dt className="font-mono text-sm font-bold text-brand-300">
              {to ? <Link to={to}>{term}</Link> : term}
            </dt>
            <dd className="text-sm text-slate-300">{def}</dd>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="px-4 py-6 text-center text-sm text-slate-500">No terms match “{q}”.</div>
        )}
      </dl>
      <Callout type="tip" title="Acronym collision to watch">
        <p>
          <strong>MCO</strong> usually means <em>Multi-Channel Operation</em> (access layer), but in
          some CAR 2 CAR maneuver papers it means <em>Maneuver CoOrdination</em>. Context decides —
          see <Link to="/mcm">MCM &amp; Day-2</Link>.
        </p>
      </Callout>
    </article>
  )
}
