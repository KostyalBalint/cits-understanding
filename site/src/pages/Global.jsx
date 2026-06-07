import React from 'react'
import { Link } from 'react-router-dom'
import { PageHeader, Section, Prose, Callout, Ref, Table, StatGrid, Stat, CardGrid, Card, Steps, Figure, LayerStack, DefList, Badge } from '../components/ui.jsx'

export default function Global() {
  return (
    <article>
      <PageHeader
        kicker="Global Standards"
        title="Global C-ITS: US, ISO &amp; SAE"
        intro="Vehicle-to-everything (V2X) communication is not a purely European invention. The United States built a parallel — and in many ways earlier — ecosystem on SAE message sets, IEEE WAVE protocols, and a 5.9 GHz DSRC radio layer that predates ITS-G5 by several years. International standardisation through ISO TC 204 bridges both worlds. This page maps the US/global stack against the European one, explains the security architectures, and traces the FCC's controversial 2020 decision to reallocate DSRC spectrum and mandate a transition to C-V2X."
        sources={['SAE J2735_202409', 'SAE J2945/1', 'IEEE 1609.2', 'IEEE 1609.3', 'IEEE 1609.4', 'IEEE 802.11p', 'IEEE 802.11bd', 'ISO 21217', 'ISO 19091', 'DOT HS 812 014']}
      />

      {/* ── Section 1: Why a parallel ecosystem? ── */}
      <Section id="why-parallel" title="Two Roads to V2X">
        <p>
          The US and Europe attacked the same problem — cooperative road safety — from almost the same
          starting point (5.9 GHz spectrum, ad-hoc broadcast, low latency) but through separate standards
          bodies and with different institutional histories. The result is two ecosystems that are{' '}
          <em>functionally equivalent</em> at the application level yet <em>wire-incompatible</em> at
          the radio security and message-encoding layers.
        </p>
        <p>
          Understanding the differences matters for three practical reasons:
        </p>
        <ul>
          <li><strong>Vehicle OEMs</strong> sell globally and must decide which stack (or both) to equip.</li>
          <li><strong>Infrastructure operators</strong> in border regions or on internationally operating corridors face interoperability gaps.</li>
          <li><strong>Standards bodies</strong> (ISO, CEN, ETSI, SAE, IEEE) are actively harmonising — knowing the seams is prerequisite to closing them.</li>
        </ul>

        <Callout type="key" title="Same physics, different protocols">
          Both ecosystems transmit at 5.9 GHz, generate cooperative awareness approximately 10 times
          per second, and rely on PKI-signed certificates to authenticate messages. The divergence lies
          in message encoding (ASN.1 UPER formats differ), certificate formats (IEEE 1609.2 profiles vs.
          ETSI TS 103 097 profiles), and security management infrastructure (SCMS vs. CCMS).
        </Callout>
      </Section>

      {/* ── Section 2: SAE J2735 message set ── */}
      <Section id="sae-j2735" title="SAE J2735: The US Message Set Dictionary">
        <p>
          <Ref code="SAE J2735_202409" kind="SAE" title="V2X Message Set Dictionary" /> (latest release September 2024,
          preceded by 2023 and 2020 editions) is the normative ASN.1 specification for every V2X
          message in the US. It covers messages for vehicles, pedestrians, infrastructure, and
          emergency services — the rough equivalent of all ETSI facility-layer specifications combined
          into one document.
        </p>
        <p>
          A note on compatibility: J2735-2024 is backwards-compatible with the 2020 edition, but the 2023
          release introduced a break, so care is needed when mixing firmware versions on RSUs and OBUs.
        </p>

        <Table
          caption="Key SAE J2735 messages and their ETSI equivalents"
          headers={['Message', 'Acronym', 'US function', 'ETSI equivalent']}
          rows={[
            ['Basic Safety Message', <Badge tone="brand">BSM</Badge>, 'Periodic vehicle kinematic broadcast (position, speed, heading, acceleration, size)', <Link to="/cam">CAM</Link>],
            ['Signal Phase and Timing', <Badge tone="amber">SPaT</Badge>, 'Current and future signal states per movement at an intersection', <Link to="/infrastructure">SPATEM</Link>],
            ['Map Data', <Badge tone="amber">MAP</Badge>, 'Intersection geometry: lanes, approaches, egresses, connectivity', <Link to="/infrastructure">MAPEM</Link>],
            ['Traveler Information Message', <Badge tone="emerald">TIM</Badge>, 'General road-user advisories: speed limits, closures, events; anchored to geographic region', 'IVIM / DENM (partial)'],
            ['Roadside Alert', <Badge tone="rose">RSA</Badge>, 'Hazard and event notifications from RSUs (analogue of event-triggered DENM)', <Link to="/denm">DENM</Link>],
            ['Personal Safety Message', <Badge tone="violet">PSM</Badge>, 'VRU (pedestrian, cyclist) periodic awareness broadcast', <Link to="/vam">VAM</Link>],
            ['Signal Request / Status Message', <Badge tone="cyan">SRM / SSM</Badge>, 'In-vehicle request to extend/hold a green phase; RSU status reply', 'SREM / SSEM'],
            ['Collective Perception Message (SAE J3224 SDSM)', <Badge tone="brand">CPM</Badge>, 'Object list from sensor-equipped vehicle or RSU (emerging — SAE J3224 Sensor Data Sharing Message)', <Link to="/cpm">CPM (ETSI)</Link>],
          ]}
        />

        <h3>BSM structure highlights</h3>
        <p>
          The BSM is the SAE analogue of the <Link to="/cam">CAM</Link>. It is transmitted at up to 10 Hz.
          Part I (mandatory) carries: message count, temporary ID (128-bit pseudonym, rotated for privacy),
          DSRC seconds-of-minute, latitude/longitude (1/10 microdegree resolution), elevation, positional
          accuracy (semi-major/minor axes), transmission state, speed (0.02 m/s LSB), heading
          (0.0125{'°'} LSB), steering angle, acceleration set (longitudinal, lateral, vertical, yaw rate),
          brake system status, vehicle size. Part II (optional extensions) adds event flags, path history,
          path prediction, exterior lights, and additional sensor data. The temporary ID rotation interval
          is security-policy-driven (SCMS pseudonym certificate lifetime, typically minutes to hours).
        </p>

        <Callout type="info" title="BSM vs. CAM: key structural differences">
          The CAM uses ETSI ASN.1 UPER encoding with explicit container nesting (ITS PDU Header
          {' → '} CoopAwareness {' → '} BasicContainer + HighFrequencyContainer + optional
          LowFrequencyContainer). The BSM uses SAE ASN.1 encoding with a flat Part I + optional Part II
          blob. Field precision is similar but not identical (e.g. heading resolution differs).
          Neither message is on-wire compatible with the other, even though they carry largely the
          same vehicle physics.
        </Callout>

        <h3>SPaT and MAP</h3>
        <p>
          <Ref code="ISO 19091" kind="ISO" title="V2I intersection using SPaT/MAP" /> adopts SAE J2735
          SPaT and MAP as its normative payload — making these messages a genuine international standard
          for signalised intersection communication, not just a US one. The EU MAPEM and SPATEM facility
          messages are built on the same conceptual model; ETSI adapted the message containers for the
          ITS-S architecture but the intersection geometry and signal-state encoding are directly
          derived from J2735.
        </p>
      </Section>

      {/* ── Section 3: SAE J2945 series ── */}
      <Section id="sae-j2945" title="SAE J2945: System &amp; Application Requirements">
        <p>
          Where J2735 defines message syntax, the <Ref code="SAE J2945/1" kind="SAE" title="On-Board System Requirements for V2V Safety" /> series
          defines system-level performance requirements — how often to transmit, minimum receiver
          sensitivity, congestion control, security credential handling, and application logic.
          J2945/1 (On-Board System Requirements for V2V Safety Communications, light vehicles) is the
          primary reference for BSM generation and corresponds functionally to{' '}
          <Ref code="ETSI EN 302 637-2" kind="ETSI" title="CAM" /> in the EU.
        </p>

        <DefList items={[
          { term: 'J2945/1', def: 'On-board requirements for BSM transmission and reception; congestion control (DCC-like); security credential lifecycle for light vehicles.' },
          { term: 'J2945/2', def: 'Safety awareness applications built on BSM.' },
          { term: 'J2945/3', def: 'Weather-related CV applications.' },
          { term: 'J2945/4', def: 'Road safety applications (work zone, school zone, emergency).' },
          { term: 'J2945/5', def: 'Service-specific permissions (SSP) framework — what a certificate is authorised to sign.' },
          { term: 'J2945/6', def: 'Performance requirements for cooperative adaptive cruise control (CACC) and platooning.' },
          { term: 'J2945/9', def: 'Vulnerable road user (VRU) safety using PSM.' },
        ]} />
      </Section>

      {/* ── Section 4: IEEE WAVE stack ── */}
      <Section id="ieee-wave" title="IEEE WAVE: The US Protocol Stack">
        <p>
          The <strong>Wireless Access in Vehicular Environments (WAVE)</strong> standard family (IEEE 1609.x)
          plays the same role in the US that{' '}
          <Ref code="ETSI EN 302 663" kind="ETSI" title="ITS-G5 access layer" /> +{' '}
          <Ref code="ETSI EN 302 636-4" kind="ETSI" title="GeoNetworking" /> +{' '}
          <Ref code="ETSI EN 302 636-5" kind="ETSI" title="BTP" /> play in Europe: it sits between
          the 802.11p radio and the SAE J2735 application messages.
        </p>

        <LayerStack
          layers={[
            { name: 'SAE J2735 Applications', sub: 'BSM, SPaT, MAP, TIM, RSA, PSM, SRM/SSM, CPM', accent: 'brand' },
            { name: 'IEEE 1609.3 — WSMP', sub: 'WAVE Short Message Protocol: Provider Service Identifier (PSID) routing; no IP overhead', accent: 'amber' },
            { name: 'IEEE 1609.4 — Multi-Channel Operation', sub: 'CCH (ch 172) control channel + SCH service channels; channel switching every 50 ms', accent: 'emerald' },
            { name: 'IEEE 1609.2 — Security Services', sub: 'Certificate formats; message signing; encryption; CRL distribution', accent: 'violet' },
            { name: 'IEEE 802.11p / 802.11bd — PHY/MAC', sub: '5.9 GHz, 10 MHz channels, OCB (Outside the Context of a BSS), up to 27 Mbit/s (11p)', accent: 'cyan' },
          ]}
          leftRail="Security (1609.2)"
          rightRail="Management (1609.1)"
        />

        <Table
          caption="IEEE 1609 WAVE family at a glance"
          headers={['Standard', 'Role', 'ETSI analogue']}
          rows={[
            [<><strong>IEEE 1609.0</strong> — WAVE Architecture</>, 'Reference architecture for the family', 'ETSI EN 302 665 / ISO 21217 ITS-S architecture'],
            [<><strong>IEEE 1609.2</strong> — Security Services</>, 'Certificate format (implicit/explicit certs), message signing, encryption, CRL distribution', 'ETSI TS 103 097'],
            [<><strong>IEEE 1609.2.1</strong> — Certificate Management</>, 'SCMS interfaces: enrolment, pseudonym issuance, revocation protocol', 'ETSI TS 102 941 / CCMS'],
            [<><strong>IEEE 1609.3</strong> — Networking Services (WSMP)</>, 'WAVE Short Message Protocol; provider service table; optional IPv6 over WAVE', 'GeoNetworking + BTP (EN 302 636-4/5)'],
            [<><strong>IEEE 1609.4</strong> — Multi-Channel Operation</>, 'CCH/SCH channel alternation, EDCA access priorities, guard intervals', '(ITS-G5 uses single-channel or managed multi-channel)'],
            [<><strong>IEEE 1609.11</strong> — OTA Electronic Payment</>, 'Toll and parking payment over WAVE', 'ISO 15628 / CEN-DSRC (tolling)'],
            [<><strong>IEEE 1609.12</strong> — Identifier Allocations</>, 'Provider Service Identifier (PSID) registry for US applications', 'ITS-AID registry (ISO 17419)'],
          ]}
        />

        <h3>IEEE 802.11p and 802.11bd</h3>
        <p>
          <strong>IEEE 802.11p</strong> (now absorbed into IEEE 802.11-2012 and later) is the original
          5.9 GHz OCB (Outside the Context of a BSS) amendment. It uses 10 MHz channels (half-clocked
          802.11a OFDM) to tolerate the fast Doppler spreads of vehicular channels. The maximum data
          rate is 27 Mbit/s (64-QAM, 3/4 coding); typical safety message operation uses 6 Mbit/s BPSK.
          This is the radio basis of both US DSRC and European ITS-G5 — the two are interoperable at
          the PHY/MAC level. It is the upper layers (security, networking, messages) where they diverge.
        </p>
        <p>
          <strong>IEEE 802.11bd</strong> (Next-Generation V2X, NGV) is the 802.11p successor. It adds
          LDPC coding, MIMO support, extended range mode, and 20 MHz channel operation while maintaining
          backward interoperability with 802.11p devices on 10 MHz channels. 802.11bd is the WLAN
          counterpart to 5G NR-V2X (3GPP Rel-16 PC5 sidelink), giving the DSRC/ITS-G5 ecosystem a
          future technology path analogous to C-V2X's NR-V2X roadmap.
        </p>

        <StatGrid cols={3}>
          <Stat value="10 MHz" label="802.11p channel width" sub="5.850–5.925 GHz (US original 75 MHz band)" />
          <Stat value="27 Mbit/s" label="802.11p peak data rate" sub="6 Mbit/s BPSK typical for BSM safety messages" />
          <Stat value="300–500 m" label="Typical DSRC/ITS-G5 range" sub="Up to 1 km line-of-sight; C-V2X ~20–30% more" />
        </StatGrid>
      </Section>

      {/* ── Section 5: SCMS vs CCMS ── */}
      <Section id="security-trust" title="Security Trust Models: US SCMS vs. EU CCMS">
        <p>
          Both regions require PKI-backed signed certificates so that every received V2X message can
          be cryptographically verified as coming from a legitimate device. The <em>architecture</em>
          of each trust model is very similar in principle. The <em>implementation</em>,{' '}
          <em>governance</em>, and <em>certificate format</em> differ significantly. See also{' '}
          <Link to="/pki">PKI &amp; CCMS</Link> for the EU side and{' '}
          <Link to="/security">Security</Link> for the cryptographic foundations.
        </p>

        <Table
          caption="SCMS (US) vs. CCMS (EU) trust model comparison"
          headers={['Dimension', 'US — SCMS', 'EU — CCMS']}
          rows={[
            ['Full name', 'Security Credential Management System', 'C-ITS Credential Management System'],
            ['Governing standard', 'IEEE 1609.2.1 (certificate management); SAE J2945/5 (SSPs)', 'ETSI TS 102 941; C-Roads PKI Policy'],
            ['Certificate format', 'IEEE 1609.2 implicit / explicit certificates; ECC (NIST P-256 / P-384)', 'ETSI TS 103 097 (profile of IEEE 1609.2); ECC (Brainpool P-256 or NIST P-256)'],
            ['Root trust', 'Elective Root CA (EROCA) — voluntary, multi-stakeholder; no single government root mandated by law', 'EU CPOC (C-ITS Point of Contact); national Trust Lists anchored in federated PKI'],
            ['Enrolment credential', 'Long-Term Certificate (LTC) issued by Enrolment CA (ECA)', 'Enrolment Credential (EC) issued by Enrolment Authority (EA)'],
            ['Pseudonym credential', 'Pseudonym Certificate (PC) from Pseudonym CA — batch of ~20 issued per week', 'Authorisation Ticket (AT) from Authorisation Authority (AA) — similar batch model'],
            ['Privacy / linkability', 'Linkage Authorities (LA1 + LA2) provide butterfly-key-based revocation without linkability to honest devices', 'Butterfly key expansion used in R2 AT profiles; earlier R1 used direct AT issuance'],
            ['Revocation', 'Certificate Revocation List (CRL) + misbehaviour reporting to Misbehaviour Authority (MA)', 'CTL / ECTL-based revocation; misbehaviour detection authority emerging in EU R2'],
            ['Application permission', 'Provider Service Identifier (PSID) + Service Specific Permissions (SSP) encoded in certificate', 'ITS-AID + SSP in AT; same concept, different registry (ISO 17419 vs. IEEE 1609.12)'],
            ['Deployment model', 'Centralised US-national SCMS operators; CV pilots (NYC, Tampa, Wyoming) used shared SCMS', 'Federated: each member state or road operator runs own EA/AA, rooted in EU CPOC trust list'],
            ['Interoperability', 'IEEE 1609.2 cert format can be used globally; SCMS not interoperable with CCMS without a gateway', 'CCMS certs not readable by WAVE stack without adaptation; cross-recognition requires bilateral agreements'],
          ]}
        />

        <Callout type="warn" title="Cross-Atlantic certificate incompatibility">
          A vehicle with a CCMS Authorisation Ticket cannot authenticate its messages to a US RSU
          running the WAVE stack, and vice versa. The certificate formats share the same underlying
          ASN.1 structure (IEEE 1609.2) but differ in profile choices and trust-anchor registries.
          Harmonisation is an active topic in ISO TC 204 and ETSI TC ITS.
        </Callout>

        <h3>SCMS component architecture</h3>
        <p>
          The SCMS was designed and described in the NHTSA V2V Readiness Report (DOT HS 812 014,
          August 2014) and subsequently refined through the three US Connected Vehicle Pilot
          programmes (New York City, Tampa FL, Wyoming). Key components:
        </p>
        <DefList items={[
          { term: 'Root CA', def: 'Apex trust anchor; offline; signs intermediate CA certificates.' },
          { term: 'Enrolment CA (ECA)', def: 'Issues Long-Term Certificates to authenticated OBUs/RSUs during device provisioning.' },
          { term: 'Pseudonym CA (PCA)', def: 'Issues batches of short-lived Pseudonym Certificates to vehicles; certificates rotated to prevent tracking.' },
          { term: 'Linkage Authorities (LA1, LA2)', def: 'Two independent authorities that jointly compute linkage values enabling revocation of misbehaving devices without revealing device identity to either authority alone (butterfly-key scheme).' },
          { term: 'Misbehaviour Authority (MA)', def: 'Receives misbehaviour reports, decides on revocation, coordinates with LAs.' },
          { term: 'Policy Generator (PG)', def: 'Maintains certificate policy, SSP definitions, and approved PSID values.' },
          { term: 'Location Obscurer Proxy (LOP)', def: 'Prevents the PCA from learning the geographic location implied by certificate requests.' },
        ]} />
      </Section>

      {/* ── Section 6: FCC reallocation ── */}
      <Section id="fcc-reallocation" title="FCC 5.9 GHz Reallocation &amp; the DSRC-to-C-V2X Shift">
        <p>
          The US originally allocated the entire 75 MHz band from 5.850 to 5.925 GHz exclusively to
          DSRC for ITS safety (1999 FCC order). After more than 20 years of limited DSRC deployment —
          the FCC noted that "DSRC has barely been deployed, in the more than 20 years since the
          adoption of DSRC, meaning this spectrum has been largely unused" — the FCC issued a major
          reallocation in November 2020 (FCC-20-164).
        </p>

        <Callout type="key" title="FCC 2020 spectrum reallocation — the key numbers">
          The FCC repurposed <strong>45 MHz</strong> (5.850–5.895 GHz) from DSRC to unlicensed Wi-Fi
          (UNII-4), retaining only <strong>30 MHz</strong> (5.895–5.925 GHz) for ITS operations.
          Critically, the rules mandate that this 30 MHz band must use <strong>C-V2X technology</strong>
          at the end of a transition period, effectively retiring DSRC/802.11p in the US.
        </Callout>

        <h3>Transition timeline</h3>
        <Steps>
          <div><strong>Pre-2020 — DSRC era:</strong> 75 MHz reserved exclusively for DSRC; three major USDOT-funded CV pilot programmes (NYC 4,000 OBUs + 550 RSUs; Tampa 1,000 vehicles + 47 RSUs; Wyoming 400 fleet OBUs + 75 RSUs) deployed 802.11p / SAE J2735 / IEEE 1609 hardware. Michigan Safety Pilot 2012-2014 put V2X devices in 2,800 vehicles across 75 miles of roadway.</div>
          <div><strong>November 2020 — FCC-20-164:</strong> Lower 45 MHz reallocated to unlicensed use. Upper 30 MHz retained for ITS; DSRC operators given 12 months to vacate the lower band, then a further period to migrate upper-band operations to C-V2X. Guard band between unlicensed Wi-Fi and new ITS band removed, raising OOBE interference concerns.</div>
          <div><strong>2021–2022 — Dual-mode bridge:</strong> Existing DSRC RSU/OBU hardware not software-upgradeable to C-V2X (different chipsets). Dual-mode DSRC/C-V2X devices (e.g. Applied Information AI-500) emerged. Tennessee DOT deployed them on the MLK Smart Corridor in Chattanooga. UTC experiments showed C-V2X achieved 514 m max range vs. 427 m for DSRC, with lower packet loss under reduced line-of-sight.</div>
          <div><strong>Ongoing concern — 30 MHz sufficiency:</strong> The US DOT 5.9 GHz Spectrum Team conducted real-world LTE-V2X radio performance tests. Early results showed potential congestion issues vs. DSRC in dense traffic. The current 30 MHz may not be sufficient for fully cooperative automated vehicle scenarios; a FCC Second Report and Order is expected to address this.</div>
        </Steps>

        <h3>DSRC vs. C-V2X technology comparison</h3>
        <Table
          caption="DSRC (IEEE 802.11p / WAVE) vs. C-V2X (LTE-V2X PC5) — key differences"
          headers={['Property', 'DSRC / IEEE 802.11p', 'C-V2X (LTE-V2X Rel-14/15 PC5)']}
          rows={[
            ['Radio standard', 'IEEE 802.11p — OFDM, 10 MHz channels, 5.9 GHz', '3GPP LTE PC5 sidelink — SC-FDM, 10 MHz channels, 5.9 GHz'],
            ['MAC access', 'CSMA/CA — contention-based, fully decentralised', 'Sensing-Based Semi-Persistent Scheduling (SB-SPS) — autonomous resource selection (Mode 4)'],
            ['Latency (direct comm)', '1–5 ms', '1–20 ms (varies with scheduling period)'],
            ['Range (line-of-sight)', '300–1000 m (DSRC)', '~20–30% greater than DSRC per UTC Chattanooga tests'],
            ['Synchronisation', 'Loose asynchronous; 8 µs symbol duration', 'Tight synchronous; ~70 µs symbol duration; GNSS sync required for Mode 4'],
            ['Error correction coding', 'Convolutional code', 'Turbo code + HARQ — better performance in multipath fading'],
            ['Concurrent transmissions', 'Cannot do concurrent transmissions (CSMA contention)', 'SC-FDM supports concurrent transmissions'],
            ['Message set', 'SAE J2735 (shared)', 'SAE J2735 (same — technology-agnostic)'],
            ['Security', 'IEEE 1609.2 / SCMS (same for both)', 'IEEE 1609.2 / SCMS (same — technology-agnostic)'],
            ['V2N (network path)', 'Not supported by 802.11p itself', 'Supported via LTE/5G uplink to network in indirect mode'],
            ['OEM adoption examples', 'Toyota (Japan 2015), GM Cadillac (US 2017), VW Golf 8 (EU 2019)', 'Ford, Daimler, Stellantis endorsing C-V2X; Qualcomm C-V2X chipsets shipping 2021+'],
          ]}
        />

        <Callout type="tip" title="Dual-mode devices as a bridge strategy">
          Dual-mode RSUs and OBUs (supporting both 802.11p DSRC and LTE-V2X on the same hardware)
          allow agencies to serve legacy DSRC vehicles while accepting C-V2X devices. TDOT tested
          Applied Information AI-500 dual-mode RSUs on the MLK Smart Corridor in Chattanooga with
          promising results. Hawaii DOT deployed dual-radio DSRC/C-V2X units at 36 traffic signals
          on a 5-mile arterial in Honolulu.
        </Callout>
      </Section>

      {/* ── Section 7: NHTSA ── */}
      <Section id="nhtsa-readiness" title="NHTSA V2V Readiness Work — DOT HS 812 014">
        <p>
          <strong>DOT HS 812 014</strong> (August 2014, ~327 pages) is the foundational US government
          readiness assessment for V2V deployment. Published by the National Highway Traffic Safety
          Administration (NHTSA), it evaluated technical, legal, policy, privacy, and economic
          dimensions of a potential V2V mandate based on data from the Michigan Safety Pilot Model
          Deployment (2012–2014, 2,800 vehicles, Ann Arbor MI).
        </p>

        <StatGrid cols={4}>
          <Stat value="2,800" label="Vehicles in Michigan Safety Pilot" sub="2012–2014, Ann Arbor, 27 RSUs, 75 miles roadway" />
          <Stat value="49–1,083" label="Lives potentially saved annually" sub="IMA + LTA applications alone at fleet saturation" />
          <Stat value="$341–350" label="Estimated OBU cost per vehicle" sub="2020 forecast at production scale" />
          <Stat value="25,000–592,000" label="Crashes preventable annually" sub="IMA + LTA at full fleet penetration" />
        </StatGrid>

        <p>Key findings from NHTSA's assessment (DOT HS 812 014):</p>
        <ul>
          <li>V2V functions work: BSM transmit/receive demonstrated at scale; SCMS provided trusted communications.</li>
          <li>Safety applications — Intersection Movement Assist (IMA), Left Turn Assist (LTA), Forward Collision Warning (FCW), Electronic Emergency Brake Light (EEBL) — proved effective in mitigating potential crashes but needed refinement before performance standards could be finalised.</li>
          <li>NHTSA confirmed legal authority to mandate V2V devices in new light vehicles and commercial vehicles already on the road.</li>
          <li>Privacy is addressable through pseudonym certificate rotation; the report endorsed the SCMS butterfly-key approach.</li>
          <li>SCMS identified as critical shared infrastructure requiring governance decisions on liability and long-term funding.</li>
        </ul>

        <CardGrid cols={3}>
          <Card title="New York City CVPD" accent="brand">
            4,000 OBUs on taxis, buses, cars; 550 RSUs in Manhattan and Brooklyn CBD. Applications
            include vehicle-turning warning, red-light violation warning, pedestrian mobile signal, and
            oversize vehicle compliance.
          </Card>
          <Card title="Tampa (THEA) CVPD" accent="amber">
            1,000 privately-owned vehicles, 8 streetcars, 10 regional buses; 47 RSUs. Six use-cases
            including wrong-way entry detection, pedestrian safety, Transit Signal Priority, and
            streetcar conflict warnings.
          </Card>
          <Card title="Wyoming (WYDOT) CVPD" accent="emerald">
            400 fleet OBUs on I-80 — one of the busiest freight corridors (30–55% truck traffic);
            75 RSUs. Applications: Forward Collision Warning, Work Zone Warning, Spot Weather Impact
            Warning, Distress Notification.
          </Card>
        </CardGrid>
      </Section>

      {/* ── Section 8: ISO TC 204 ── */}
      <Section id="iso-tc204" title="ISO TC 204: International ITS Standards">
        <p>
          ISO Technical Committee 204 (Intelligent Transport Systems) is the primary international
          standards body for ITS architecture, protocols, and applications. Its work provides the
          conceptual and architectural framework that both the EU (via ETSI and CEN) and the US (via SAE
          and IEEE) reference — often adopting ISO specs as normative references rather than rewriting them.
        </p>

        <Table
          caption="Key ISO TC 204 standards relevant to C-ITS / V2X"
          headers={['Standard', 'Scope', 'EU / US relevance']}
          rows={[
            [<Ref code="ISO 21217" kind="ISO" title="ITS-S Architecture" />, 'ITS station (ITS-S) reference architecture; management, security, and facilities layers; CALM (Communications Access for Land Mobiles) framework', 'Normative basis for ETSI EN 302 665 ITS-S architecture; referenced by US WAVE architecture (IEEE 1609.0)'],
            [<Ref code="ISO 19091" kind="ISO" title="V2I SPaT/MAP" />, 'Using V2I communications for signalised intersection management; normatively adopts SAE J2735 SPaT and MAP messages', 'International adoption of US SAE messages; ETSI SPATEM/MAPEM are EU profiles of ISO 19091'],
            ['ISO/TS 19321', 'In-Vehicle Information (IVI) data structures for sign / speed limit content', 'Basis of EU IVIM payload (ETSI TS 103 301)'],
            ['ISO 17419', 'ITS Application Identifier (ITS-AID) registry — globally unique application identifiers', 'Parallels IEEE 1609.12 PSID registry; cross-mapping between ITS-AID and PSID is an active harmonisation topic'],
            ['ISO 21210', 'IPv6 networking for ITS stations; router discovery and addressing', 'Used in ETSI GeoNetworking IPv6 adaptation'],
            ['ISO 21218', 'Access technology support interfaces for ITS-S (ITS-G5, C-V2X, GNSS)', 'Multi-access framework in EU hybrid V2X deployments'],
            ['ISO 24102-x', 'ITS station management plane: configuration, monitoring, software update', 'ETSI TS 102 636-6 management; WAVE station management'],
            ['ISO/SAE 21434', 'Road vehicles cybersecurity engineering (threat analysis, risk assessment, V-model process)', 'Applies alongside C-ITS PKI in both regions; EU mandated via UNECE WP.29 R155'],
            ['ISO 29281', 'Fast Networking and Transport Protocol (FNTP) — non-IP messaging for ITS-S', 'EU non-IP path in GeoNetworking stack; less prevalent in US WAVE'],
          ]}
        />

        <h3>The ISO / ETSI / SAE relationship</h3>
        <p>
          ETSI and ISO operate under the Vienna Agreement (via CEN) for collaboration. In practice:
        </p>
        <ul>
          <li>ISO TC 204 produces the <em>architectural</em> and <em>conceptual</em> framework (ISO 21217 ITS-S architecture, ISO 19091 intersection management).</li>
          <li>ETSI TC ITS produces the <em>European profile</em>: concrete message encodings, parameter constraints, and deployment rules (EN 302 637-2 for CAM, TS 103 097 for security).</li>
          <li>SAE and IEEE produce the <em>US profile</em>: J2735 messages, J2945 performance requirements, 1609.x protocols.</li>
          <li>The ISO standard often references both: ISO 19091 normatively adopts J2735 SPaT/MAP; ISO 21217 is the normative basis for EN 302 665.</li>
        </ul>

        <Callout type="info" title="ISO 21217 as the common root">
          ETSI EN 302 665 and the US WAVE architecture (IEEE 1609.0) both claim alignment with
          ISO 21217. The layered model — access, networking and transport, facilities, applications,
          management, security — is the same across all three. Implementations diverge at the
          networking layer and below. ISO 21217 is the closest thing to a shared design document
          for V2X worldwide.
        </Callout>
      </Section>

      {/* ── Section 9: EU↔US mapping table ── */}
      <Section id="eu-us-mapping" title="EU ↔ US Message Equivalence">
        <p>
          Despite wire incompatibility, every EU <Link to="/cam">facility message</Link> has a functional
          US counterpart and vice versa. The table below shows the full cross-region mapping.
          Understanding these equivalences is essential for cross-border deployments, simulator
          interoperability testing, and future harmonisation work.
        </p>

        <Table
          caption="Full EU (ETSI) ↔ US (SAE/IEEE) message equivalence"
          headers={['Function', 'ETSI EU message', 'SAE / US message', 'Harmonisation notes']}
          rows={[
            [
              'Periodic vehicle awareness',
              <><Link to="/cam"><Badge tone="brand">CAM</Badge></Link>{' '}— EN 302 637-2</>,
              <><Badge tone="brand">BSM</Badge>{' '}— SAE J2735 + J2945/1</>,
              'Both ~10 Hz; both use pseudonym certs; field precision similar but not identical; encoding incompatible on-wire'
            ],
            [
              'Event / hazard notification',
              <><Link to="/denm"><Badge tone="rose">DENM</Badge></Link>{' '}— EN 302 637-3</>,
              <><Badge tone="rose">RSA</Badge>{' '}(RSU-sourced) / <Badge tone="rose">TIM</Badge>{' '}— SAE J2735</>,
              'DENM is more richly structured (cause/sub-cause codes, geo-repetition rules); TIM/RSA cover similar event types with simpler structure'
            ],
            [
              'Signal phase and timing',
              <><Link to="/infrastructure"><Badge tone="amber">SPATEM</Badge></Link>{' '}— ETSI TS 103 301 / ISO 19091</>,
              <><Badge tone="amber">SPaT</Badge>{' '}— SAE J2735, ISO 19091</>,
              'SPATEM is an EU profile of SAE J2735 SPaT; closest to direct equivalence of any cross-region pair; a gateway needs only to re-encode the header'
            ],
            [
              'Intersection topology',
              <><Link to="/infrastructure"><Badge tone="amber">MAPEM</Badge></Link>{' '}— ETSI TS 103 301 / ISO 19091</>,
              <><Badge tone="amber">MAP</Badge>{' '}(MapData) — SAE J2735, ISO 19091</>,
              'MAPEM is an EU profile of SAE J2735 MAP; essentially the same ASN.1 structure with an ETSI ITS PDU header'
            ],
            [
              'Infrastructure / static road info',
              <><Badge tone="emerald">IVIM</Badge>{' '}— ETSI TS 103 301 / ISO/TS 19321</>,
              <><Badge tone="emerald">TIM</Badge>{' '}— SAE J2735</>,
              'IVIM uses ISO/TS 19321 IVI data structures; TIM covers speed limits, closures, advisories with geographic anchoring'
            ],
            [
              'Signal request / status',
              <><Badge tone="cyan">SREM</Badge>{' '}/ <Badge tone="cyan">SSEM</Badge>{' '}— ETSI TS 103 301</>,
              <><Badge tone="cyan">SRM</Badge>{' '}/ <Badge tone="cyan">SSM</Badge>{' '}— SAE J2735</>,
              'EU SREM/SSEM are direct profiles of SAE SRM/SSM; among the most directly harmonised pairs'
            ],
            [
              'VRU / pedestrian awareness',
              <><Link to="/vam"><Badge tone="violet">VAM</Badge></Link>{' '}— ETSI TS 103 300-3</>,
              <><Badge tone="violet">PSM</Badge>{' '}(Personal Safety Message) — SAE J2735, J2945/9</>,
              'VAM carries VRU cluster and motion prediction info; PSM is simpler; not interoperable on-wire; functionally equivalent'
            ],
            [
              'Collective perception',
              <><Link to="/cpm"><Badge tone="brand">CPM</Badge></Link>{' '}— ETSI TS 103 324</>,
              <><Badge tone="brand">SDSM</Badge>{' '}(Sensor Data Sharing Message) — SAE J3224 (emerging, 2024)</>,
              'Both carry perceived object lists from on-board sensors; SAE J3224 SDSM is still being standardised; functional alignment with ETSI CPM expected'
            ],
            [
              'Security certificate format',
              <><Link to="/security"><Badge tone="violet">ETSI TS 103 097</Badge></Link>{' '}certificate</>,
              <><Badge tone="violet">IEEE 1609.2</Badge>{' '}certificate</>,
              'ETSI TS 103 097 is a profile of IEEE 1609.2 — same ASN.1 base, different profile choices and trust registries; not directly interoperable without gateway adaptation'
            ],
          ]}
        />

        <Callout type="example" title="SPaT/MAP: the closest cross-Atlantic pair">
          SPaT and MAP messages are the most harmonised across regions. ISO 19091 adopted SAE J2735
          SPaT/MAP normatively; ETSI TS 103 301 SPATEM/MAPEM then wraps the same ASN.1 payload in an
          ITS PDU header. A conversion gateway needs only to re-encode the header and adjust minor field
          constraints — far simpler than BSM{' ↔ '}CAM conversion, which requires remapping
          structurally different kinematic containers.
        </Callout>
      </Section>

      {/* ── Section 10: Stack comparison ── */}
      <Section id="stack-comparison" title="US vs. EU Protocol Stack Side-by-Side">
        <Figure caption="US WAVE stack (left) vs. EU ITS-G5 / C-ITS stack (right) — layer-by-layer">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-brand-300 font-semibold mb-2 text-center">US Stack (WAVE / DSRC)</div>
              {[
                { layer: 'Applications', detail: 'FCW, IMA, BSM apps, SPaT consumers, SCMS clients', bg: 'bg-brand-900' },
                { layer: 'SAE J2735 Messages', detail: 'BSM, SPaT, MAP, TIM, RSA, PSM, SRM/SSM', bg: 'bg-amber-900' },
                { layer: 'IEEE 1609.3 — WSMP', detail: 'WAVE Short Message Protocol (PSID-keyed routing)', bg: 'bg-emerald-900' },
                { layer: 'IEEE 1609.4', detail: 'Multi-Channel Operation (CCH ch 172 / SCH)', bg: 'bg-violet-900' },
                { layer: 'IEEE 1609.2 Security', detail: 'Signed / encrypted msgs; certificate verification', bg: 'bg-rose-900' },
                { layer: 'IEEE 802.11p PHY/MAC', detail: '5.9 GHz, 10 MHz OCB channels, OFDM, up to 27 Mbit/s', bg: 'bg-cyan-900' },
              ].map(({ layer, detail, bg }) => (
                <div key={layer} className={`${bg} border border-ink-700 rounded px-3 py-2 mb-1`}>
                  <div className="font-medium text-slate-200">{layer}</div>
                  <div className="text-slate-400 text-xs">{detail}</div>
                </div>
              ))}
            </div>
            <div>
              <div className="text-amber-300 font-semibold mb-2 text-center">EU Stack (ITS-G5 / C-ITS)</div>
              {[
                { layer: 'Applications', detail: 'ETSI Day 1/2 apps, GLOSA, EEBL, traffic light assist', bg: 'bg-brand-900' },
                { layer: 'ETSI Facility Messages', detail: 'CAM, DENM, CPM, VAM, SPATEM, MAPEM, IVIM', bg: 'bg-amber-900' },
                { layer: 'BTP + GeoNetworking', detail: 'EN 302 636-4/5; GeoBroadcast / Topologically Scoped', bg: 'bg-emerald-900' },
                { layer: 'ITS-G5 Channel Mgmt / DCC', detail: 'ETSI TS 102 724; Decentralised Congestion Control', bg: 'bg-violet-900' },
                { layer: 'ETSI TS 103 097 Security', detail: 'Profile of IEEE 1609.2; CCMS AT-signed messages', bg: 'bg-rose-900' },
                { layer: 'ITS-G5 / IEEE 802.11p PHY/MAC', detail: 'EN 302 663; 5.9 GHz, 10 MHz OCB, OFDM', bg: 'bg-cyan-900' },
              ].map(({ layer, detail, bg }) => (
                <div key={layer} className={`${bg} border border-ink-700 rounded px-3 py-2 mb-1`}>
                  <div className="font-medium text-slate-200">{layer}</div>
                  <div className="text-slate-400 text-xs">{detail}</div>
                </div>
              ))}
            </div>
          </div>
        </Figure>

        <p>
          The physical and MAC layers (802.11p) are <em>identical</em> — a US DSRC radio and an EU
          ITS-G5 radio decode each other's raw frames. The divergence begins at the networking layer:
          WSMP uses PSID-keyed broadcast; GeoNetworking uses geographic addressing. Security
          certificates share the same ASN.1 base (IEEE 1609.2) but have incompatible trust anchors and
          profile choices. Messages use different container structures. A cross-region gateway must
          therefore operate at the networking and facility layers, not the PHY/MAC.
        </p>
      </Section>

      {/* ── Section 11: Key standards ── */}
      <Section id="key-standards" title="Key Standards Referenced">
        <div className="flex flex-wrap gap-3">
          <Ref code="SAE J2735_202409" kind="SAE" title="V2X Message Set Dictionary" />
          <Ref code="SAE J2945/1" kind="SAE" title="On-Board System Requirements for V2V Safety" />
          <Ref code="SAE J2945/5" kind="SAE" title="Service-Specific Permissions" />
          <Ref code="SAE J3224" kind="SAE" title="SDSM — Sensor Data Sharing Message (emerging)" />
          <Ref code="IEEE 1609.0" kind="IEEE" title="WAVE Architecture" />
          <Ref code="IEEE 1609.2" kind="IEEE" title="Security Services for WAVE" />
          <Ref code="IEEE 1609.2.1" kind="IEEE" title="Certificate Management (SCMS)" />
          <Ref code="IEEE 1609.3" kind="IEEE" title="Networking Services — WSMP" />
          <Ref code="IEEE 1609.4" kind="IEEE" title="Multi-Channel Operation" />
          <Ref code="IEEE 802.11p" kind="IEEE" title="WLAN Vehicular PHY/MAC (DSRC / ITS-G5)" />
          <Ref code="IEEE 802.11bd" kind="IEEE" title="Next-Gen V2X (NGV)" />
          <Ref code="ISO 21217" kind="ISO" title="ITS Station Architecture (CALM)" />
          <Ref code="ISO 19091" kind="ISO" title="V2I Using SPaT/MAP at Intersections" />
          <Ref code="ISO 17419" kind="ISO" title="Globally Unique ITS Identifiers (ITS-AID)" />
          <Ref code="ISO 24102" kind="ISO" title="ITS Station Management" />
          <Ref code="ISO/SAE 21434" kind="ISO" title="Road Vehicle Cybersecurity Engineering" />
        </div>
      </Section>

      {/* ── Section 12: Where next ── */}
      <Section id="where-next" title="Where Next">
        <CardGrid cols={3}>
          <Card title="CAM — EU Awareness" accent="brand" icon="📡">
            The European periodic awareness message; contrast structure and timing with BSM.
            <div className="mt-2"><Link to="/cam" className="text-brand-300 underline">Explore CAM &rarr;</Link></div>
          </Card>
          <Card title="DENM — EU Event Notification" accent="rose" icon="⚠️">
            Event-driven hazard messages; compare with US TIM and RSA covered here.
            <div className="mt-2"><Link to="/denm" className="text-brand-300 underline">Explore DENM &rarr;</Link></div>
          </Card>
          <Card title="PKI &amp; CCMS" accent="violet" icon="🔐">
            Deep dive on the EU CCMS trust architecture; compare with SCMS described here.
            <div className="mt-2"><Link to="/pki" className="text-brand-300 underline">Explore PKI &rarr;</Link></div>
          </Card>
          <Card title="Security" accent="cyan" icon="🛡️">
            Cryptographic foundations: ITS certificates, signing, pseudonym rotation in both regions.
            <div className="mt-2"><Link to="/security" className="text-brand-300 underline">Explore Security &rarr;</Link></div>
          </Card>
          <Card title="Infrastructure &amp; RSU" accent="amber" icon="🚦">
            RSU architecture, SPaT/MAP/SPATEM/MAPEM message flows, V2I applications.
            <div className="mt-2"><Link to="/infrastructure" className="text-brand-300 underline">Explore Infrastructure &rarr;</Link></div>
          </Card>
          <Card title="Overview" accent="emerald" icon="🗺️">
            C-ITS system overview and EU deployment landscape for global context.
            <div className="mt-2"><Link to="/overview" className="text-brand-300 underline">See Overview &rarr;</Link></div>
          </Card>
        </CardGrid>
      </Section>
    </article>
  )
}
