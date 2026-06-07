import React from 'react'
import { Link } from 'react-router-dom'
import { PageHeader, Section, Prose, Callout, Ref, Table, StatGrid, Stat, CardGrid, Card, Steps, Figure, LayerStack, DefList, Badge } from '../components/ui.jsx'

export default function CRoads() {
  return (
    <article>
      <PageHeader
        kicker="HARMONISATION &amp; DEPLOYMENT"
        title="C-Roads Platform"
        intro="C-Roads is the joint initiative of European Member States and road operators that turns ETSI standards into harmonised, tested, cross-border C-ITS services. It does not invent new protocols — it profiles the existing ETSI stack into concrete, interoperable deployment specifications, then validates them in live pilot corridors across Europe."
        sources={[
          'C-Roads WG2 TF3 Message Profiles v1.7',
          'C-Roads WG2 TF2 Service Definitions v1.7',
          'C-Roads Infrastructure Functions & Specs v1.5',
          'C-Roads Backend Hybrid Interoperability v1.5',
          'C-Roads Roadmap v1.0 2024',
          'C-Roads Annual Deployment Report 2024',
        ]}
      />

      {/* 1. What is C-Roads */}
      <Section id="what-is-c-roads" title="What is C-Roads?">
        <p>
          The C-Roads Platform is a joint initiative of European Member States, road operators and the European Commission,
          co-funded by the Connecting Europe Facility (CEF). Launched in 2016, its founding purpose is to link national C-ITS
          deployment activities, jointly develop and share technical specifications, and verify cross-border interoperability
          through coordinated test campaigns.
        </p>
        <p>
          By 2024, representatives from twenty-one European states were committed to the platform, with more than 50 cities
          actively deploying C-ITS infrastructure. Motorway deployment — which was the original focus — now coexists with
          growing urban pilots at signalised intersections and bus corridors.
        </p>

        <Callout type="key" title="C-Roads in one sentence">
          C-Roads does not write new radio or network standards — it profiles the ETSI ITS station architecture into a common
          European specification set and verifies that implementations from different member states actually interoperate on the road.
        </Callout>

        <p>
          C-Roads operates as an open platform. National road authorities and motorway operators bring their pilot experience;
          working groups harmonise the learnings into shared specification releases; those releases become the normative baseline
          for procurement tenders and cross-border testing across the EU. The platform also maintains a close cooperation with
          the <Link to="/car2car">CAR 2 CAR Communication Consortium (C2C-CC)</Link> on the vehicle-side specifications, ensuring
          that roadside profiles and on-board-unit profiles are mutually consistent.
        </p>

        <StatGrid cols={4}>
          <Stat value="21+" label="Member states" sub="committed as of 2024" />
          <Stat value="50+" label="Cities" sub="deploying urban C-ITS" />
          <Stat value="2016" label="Platform launched" sub="CEF co-funded" />
          <Stat value="2.1.0" label="Latest C-Roads release" sub="December 2024" />
        </StatGrid>
      </Section>

      {/* 2. Role and structure */}
      <Section id="role-and-structure" title="Role: Profiling Standards into Deployable Specs">
        <p>
          ETSI produces the underlying ITS standards — EN 302 637-2 (CAM), EN 302 637-3 (DENM), TS 103 301 (infrastructure
          facilities), TS 103 097 (security). These standards define message syntax and semantics but deliberately leave many
          parameters open so that they can be applied across a wide range of use cases. A vehicle manufacturer and a road
          authority in different countries will both correctly implement ETSI DENM and yet produce incompatible messages if they
          choose different cause codes, repetition intervals, or GeoNet parameters for the same event type.
        </p>
        <p>
          C-Roads closes this gap by profiling. For every Day-1 service and use case, the C-Roads specification set answers:
        </p>
        <ul>
          <li>Which ETSI message type carries this service (DENM, IVIM, MAPEM/SPATEM, SREM/SSEM)?</li>
          <li>Which data elements are mandatory vs. optional, and what values or value ranges are permitted?</li>
          <li>What are the repetition interval, validity duration, and GeoNet lifetime for this service?</li>
          <li>What cause code / sub-cause code combination signals this specific hazard?</li>
          <li>How is location referenced (map projections, carriageway centre points, maximum 1/4-carriageway-width deviation)?</li>
        </ul>

        <Callout type="info" title="Relationship to ETSI">
          C-Roads specifications are normatively subordinate to ETSI. They restrict or select from what ETSI permits — they
          never override a SHALL in an ETSI standard. The C-Roads profile is the implementation guide that makes ETSI-compliant
          equipment from different vendors genuinely interoperable.
        </Callout>

        <p>
          The profiling work is organised through Working Group 2 (Technical Aspects), which contains five task forces:
        </p>

        <DefList items={[
          { term: 'TF1 — Security', def: 'European security mechanism, PKI requirements, ECTL (European Certificate Trust List) governance, cross-border trust for pilot and operational phases.' },
          { term: 'TF2 — Service Harmonisation', def: 'Functional service and use-case definitions: what each Day-1 service does, who the actors are, what gets displayed to the driver, and the triggering conditions. Produces the Common Service and Use Case Definitions document.' },
          { term: 'TF3 — Infrastructure Communication', def: 'Technical message profiles and parameters: the exact DENM, IVIM, MAPEM, SPATEM, SREM, SSEM field tables. Also produces the Roadside ITS-G5 System Profile (RSP) and the Infrastructure Functions and Specifications document.' },
          { term: 'TF4 — Hybrid Communication', def: 'IP-based backend interface (Basic Interface, BI) for long-range hybrid C-ITS delivery. Defines AMQP-over-TLS protocol, filtering headers, latency requirements, and security for cross-operator message exchange.' },
          { term: 'TF5 — Testing', def: 'Test case specifications for conformance and interoperability, used in the mandatory C-Roads cross-border test campaigns.' },
        ]} />
      </Section>

      {/* 3. Harmonised specification set */}
      <Section id="specification-set" title="The Harmonised Specification Set">
        <p>
          The C-Roads specification set is the collection of documents that together constitute the C-Roads profile. Every
          deployment claiming C-Roads compliance must implement all normative requirements across these documents.
        </p>

        <Table
          caption="Core C-Roads specification documents (TF2 / TF3 / TF4)"
          headers={['Document', 'Produced by', 'Content', 'Current version']}
          rows={[
            [
              'Common C-ITS Service and Use Case Definitions',
              'WG2 TF2',
              'Functional service descriptions for IVS, HLN, RWW, SI, PVD — use-case actors, triggering logic, display principles, technology-agnostic scenarios.',
              'v1.7.0',
            ],
            [
              'C-ITS Message Profiles and Parameters',
              'WG2 TF3',
              'Per-field DENM / IVIM / MAPEM / SPATEM / SREM / SSEM profiles; cause codes per hazard type; repetition and validity duration tables; national choices.',
              'v1.7.0',
            ],
            [
              'C-ITS Infrastructure Functions and Specifications',
              'WG2 TF3',
              'Full technical spec for roadside I2V/V2I: DEN basic service, IVI service, TLM/RLT service, TLC service, triggering conditions, management and security principles.',
              'v1.5 (R1.5)',
            ],
            [
              'ITS-G5 Roadside System Profile (RSP)',
              'WG2 TF3',
              'Radio and protocol stack requirements for fixed and mobile roadside ITS stations (R-ITS-S): channel, power, GeoNet parameters, PKI integration.',
              'Referenced from TF3',
            ],
            [
              'Specification for Interoperability of Backend Hybrid C-ITS Communication',
              'WG2 TF4',
              'AMQP 1.0 / TLS 1.3 Basic Interface (BI) for backend C-ITS message exchange; filtering header schema; quadtree geo-index; latency and integrity requirements.',
              'v1.5',
            ],
            [
              'European Security Mechanism Report',
              'WG2 TF1',
              'ECTL governance, PKI requirements for pilot and operational phases, certificate policy alignment with EU C-ITS CP/SP.',
              'v1.4',
            ],
            [
              'C-ITS Roadmap',
              'WG2 TF2',
              'Overview of operational use cases, OEM integration timelines, ADAS / automated driving support trajectory, deployment synergies.',
              'v1.0 (April 2024)',
            ],
          ]}
        />

        <Callout type="tip" title="Release cadence">
          C-Roads releases are numbered (R1.0, R1.1, … R1.7, R2.1.0). Each release is accepted by the Steering Committee
          after cross-border testing confirms that all member states can implement and interoperate with the new profile.
          Only specifications that have been implemented and tested in the field can be included in a release.
          The latest baseline for motorway deployments is Release 2.1.0 (December 2024).
        </Callout>
      </Section>

      {/* 4. Day-1 services */}
      <Section id="day-1-services" title="Day-1 Services: The Harmonised Use-Case Catalogue">
        <p>
          The C-Roads Day-1 service catalogue covers the use cases that are mature enough for operational deployment.
          All have been tested in pilot corridors; their message profiles are fully specified. The services are organised
          into five families, each corresponding to a set of ETSI message types.
        </p>

        <Table
          caption="C-Roads Day-1 service catalogue with use cases and primary message type"
          headers={['Service', 'Use Cases (abbreviated)', 'Message type', 'First C-Roads release']}
          rows={[
            [
              <><strong>In-Vehicle Signage (IVS)</strong></>,
              'Dynamic Speed Limit (IVS-DSLI), Embedded VMS Free Text (IVS-EVFT), Dynamic Lane Management (IVS-DLM), Shock Wave Damping (IVS-SWD), Other Signage (IVS-OSI)',
              <><Link to="/infrastructure">IVIM</Link> (Infrastructure to Vehicle Information Message)</>,
              'R1.0 (DSLI); R1.1 (EVFT, OSI); R1.4 (DLM); R1.6 (SWD)',
            ],
            [
              <><strong>Hazardous Location Notification (HLN)</strong></>,
              'Accident Zone (AZ), Traffic Jam Ahead (TJA), Stationary Vehicle (SV), Weather Condition Warning (WCW), Temporarily Slippery Road (TSR), Animal/Person on Road (APR), Obstacle on Road (OR), Emergency Vehicle Approaching (EVA), Emergency Vehicle in Intervention (EVI), Railway Level Crossing (RLX), Unsecured Blockage (UBR), Wrong Way Driving (AWWD), Public Transport Crossing (PTVC), PT at Stop (PTVS)',
              <><Link to="/denm">DENM</Link> (Decentralized Environmental Notification Message)</>,
              'R1.0 (AZ); R1.1 (TJA, SV, WCW, TSR, APR, OR); R1.5 (EVA, RLX); R1.6 (EVI, UBR, AWWD, PTVC, PTVS)',
            ],
            [
              <><strong>Road Works Warning (RWW)</strong></>,
              'Lane Closure (LC), Road Closure (RC), Mobile Road Works (RM), Winter Maintenance (WM), Road Operator Vehicle in Intervention (ROVI), Road Operator Vehicle Approaching (ROVA)',
              <><Link to="/denm">DENM</Link>, optionally also <Link to="/infrastructure">IVIM</Link></>,
              'R1.0 (LC); R1.1 (RC, RM); R1.5 (WM, ROVI, ROVA)',
            ],
            [
              <><strong>Signalized Intersections (SI)</strong></>,
              'Signal Phase and Timing Information (SPTI), Green Light Optimal Speed Advisory (GLOSA), Imminent Signal Violation Warning (ISVW), Traffic Light Prioritisation (TLP), Emergency Vehicle Priority (EVP)',
              <><Link to="/infrastructure">MAPEM + SPATEM</Link> (topology + signal phase); SREM/SSEM for priority requests</>,
              'R1.3 (GLOSA, TLP); R1.4 (SPTI, ISVW, EVP)',
            ],
            [
              <><strong>Probe Vehicle Data (PVD)</strong></>,
              'Vehicle Data Collection (VDC), Event Data Collection (EDC)',
              <><Link to="/cam">CAM</Link> (vehicle position / kinematic data uploaded V2I)</>,
              'R1.5 (VDC, EDC)',
            ],
          ]}
        />

        <Callout type="example" title="RWW message profile detail">
          For a Roadworks Warning — Lane Closure (RWW-LC) sent from a stationary trailer (standalone mode), the C-Roads
          profile mandates: causeCode = 3 (road works), stationType = 9 or 15 (roadSideUnit),
          relevanceTrafficDirection = upStreamTraffic (1), validityDuration = 20 s for standalone mode (updated via DENM
          repetition), repetitionInterval = 500 ms (Austria) / 200 ms (Germany) / 250–1000 ms (Netherlands / France).
          The eventPosition locates the start of the physical blockage; traces must cover at least 1.5 km upstream
          (Belgium/France/NL/UK requirement).
        </Callout>

        <p>
          The Day-1 catalogue is not static. C-Roads continuously adds use cases through its change-request process.
          Use cases targeting Advanced Driver Assistance Systems (ADAS) and automated driving — such as Automated Vehicle
          Guidance (AVG), Collective Perception (CPM), and complex roadworks zone topology — are classified as Day-2 services
          and are currently in pre-deployment evaluation.
        </p>
      </Section>

      {/* 5. ITS-G5 vs hybrid / backend communication */}
      <Section id="hybrid-communication" title="ITS-G5 vs Cellular and the Hybrid Communication Approach">
        <p>
          C-Roads started with ITS-G5 — the IEEE 802.11p / ETSI ITS-G5 short-range radio standard operating in the 5.9 GHz
          band — as its primary access technology. ITS-G5 offers low-latency, infrastructure-independent broadcast over
          approximately 300 m to 2 km depending on environment. Roadside ITS Stations (R-ITS-S) broadcast DENM, IVIM,
          MAPEM, and SPATEM directly to passing vehicles.
        </p>
        <p>
          However, ITS-G5 alone has limitations: it only reaches vehicles in radio range of a deployed RSU,
          it cannot deliver long-range advance warning, and cellular infrastructure can extend service coverage
          significantly. C-Roads therefore adopted a <strong>hybrid communication architecture</strong> that combines
          ITS-G5 short-range broadcast with IP-based (cellular or fixed-line) backend delivery of the same C-ITS messages.
        </p>

        <Figure caption="Hybrid C-ITS communication architecture — short-range ITS-G5 at the roadside plus IP-based backend interconnect between C-ITS actors">
          <div className="grid grid-cols-1 gap-4 text-sm">
            <div className="flex items-center gap-2 justify-center flex-wrap">
              <div className="rounded border border-amber-600 bg-amber-900/30 px-4 py-3 text-center min-w-[130px]">
                <div className="font-bold text-amber-300">C-ITS Actor A</div>
                <div className="text-slate-400 text-xs">TCC / Road Operator</div>
                <div className="text-slate-400 text-xs">Country A</div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="text-xs text-slate-400">BI (AMQP 1.0 / TLS 1.3)</div>
                <div className="text-amber-400 font-mono text-lg">{'<-->'}</div>
                <div className="text-xs text-slate-400 italic">signed DENM / IVIM / MAPEM…</div>
              </div>
              <div className="rounded border border-violet-600 bg-violet-900/30 px-4 py-3 text-center min-w-[130px]">
                <div className="font-bold text-violet-300">AMQP Broker</div>
                <div className="text-slate-400 text-xs">pub/sub routing</div>
                <div className="text-slate-400 text-xs">quadtree geo-filter</div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="text-xs text-slate-400">BI (AMQP 1.0 / TLS 1.3)</div>
                <div className="text-amber-400 font-mono text-lg">{'<-->'}</div>
              </div>
              <div className="rounded border border-amber-600 bg-amber-900/30 px-4 py-3 text-center min-w-[130px]">
                <div className="font-bold text-amber-300">C-ITS Actor B</div>
                <div className="text-slate-400 text-xs">TCC / Road Operator</div>
                <div className="text-slate-400 text-xs">Country B</div>
              </div>
            </div>

            <div className="flex justify-center gap-32 text-slate-500 text-xl">
              <span>|</span>
              <span>|</span>
            </div>

            <div className="flex items-start justify-center gap-8 flex-wrap">
              <div className="flex flex-col items-center gap-2">
                <div className="rounded border border-brand-600 bg-brand-900/30 px-4 py-3 text-center min-w-[120px]">
                  <div className="font-bold text-brand-300">R-ITS-S (RSU)</div>
                  <div className="text-slate-400 text-xs">ITS-G5 5.9 GHz</div>
                  <div className="text-slate-400 text-xs">300 m – 2 km range</div>
                </div>
                <div className="text-xs text-slate-400 text-center">ITS-G5 broadcast I2V / V2I</div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="rounded border border-brand-600 bg-brand-900/30 px-4 py-3 text-center min-w-[120px]">
                  <div className="font-bold text-brand-300">R-ITS-S (RSU)</div>
                  <div className="text-slate-400 text-xs">ITS-G5 5.9 GHz</div>
                  <div className="text-slate-400 text-xs">300 m – 2 km range</div>
                </div>
                <div className="text-xs text-slate-400 text-center">ITS-G5 broadcast I2V / V2I</div>
              </div>
            </div>

            <div className="flex justify-center gap-4 flex-wrap">
              {['OBU (ITS-G5)', 'OBU (ITS-G5)', 'OBU (cellular)', 'OBU (cellular)'].map((label, i) => (
                <div key={i} className="rounded border border-emerald-700 bg-emerald-900/20 px-3 py-2 text-center text-xs">
                  <div className="font-bold text-emerald-300">{label}</div>
                  <div className="text-slate-400">Vehicle</div>
                </div>
              ))}
            </div>
          </div>
        </Figure>

        <h3>ITS-G5: the short-range layer</h3>
        <p>
          ITS-G5 uses the 5.9 GHz band (IEEE 802.11p / ETSI EN 302 663) and the ETSI ITS protocol stack
          (GeoNetworking, BTP, facilities layer). Roadside stations broadcast messages via GeoBroadcast or
          GeoUnicast to vehicles within radio range. No cellular network infrastructure is required for I2V delivery:
          if a vehicle drives past an RSU, it receives the message. This makes ITS-G5 the preferred channel
          for safety-critical, low-latency warnings.
        </p>

        <h3>The hybrid approach: same messages, multiple channels</h3>
        <p>
          In the hybrid architecture, the <em>same</em> C-ITS messages — signed according to the EU PKI — are made
          available both over ITS-G5 (direct short-range) and over IP (via cellular networks or fixed broadband
          to an end-user app). Austria's national deployment explicitly specifies "hybrid" as a contractual requirement:
          ITS-G5 VANET and IP-based delivery coexist, providing identical content via different media. The Central ITS
          Station (C-ITS-S) distributes signed messages to RSUs for ITS-G5 broadcast and simultaneously exposes the same
          messages on the BI interface for IP delivery.
        </p>

        <h3>The Basic Interface (BI) — backend interoperability</h3>
        <p>
          TF4 specifies the <strong>Basic Interface (BI)</strong>, the harmonised protocol for C-ITS message exchange
          between C-ITS actors (road operators, TCCs, service providers) across backend networks.
        </p>

        <Table
          caption="C-Roads Basic Interface (BI) protocol stack"
          headers={['Layer', 'Specification', 'Key parameters']}
          rows={[
            ['Transport', 'TCP / IPv4', 'Standard Internet Protocol'],
            ['Security', 'TLS 1.3 (RFC 8446)', 'Mutual authentication; TLS certificates for transport security'],
            ['Messaging', 'AMQP 1.0 (ISO/IEC 19464)', 'Pub/sub broker pattern; minimum queue length 200 messages'],
            ['Payload', 'Signed C-ITS messages (ETSI TS 103 097)', 'Original ETSI signatures preserved end-to-end; broker must not alter payload (HYB_014)'],
            ['Filtering', 'AMQP message headers', 'publisherId, originatingCountry, messageType, quadtree geo-index; causeCode for DENM; iviType / pictogramCategoryCode for IVIM'],
            ['Geo-indexing', 'Quadtree spatial index', 'Publishers encode at minimum zoom level 18; consumers filter at maximum zoom 18'],
            ['Time sync', 'Stratum 1 equivalent', 'All actors must be time-synchronised to stratum 1 accuracy (HYB_007)'],
            ['Latency', 'Single msg: &lt;30 ms; 5000 msgs: &lt;1000 ms', 'Broker-to-client queue latency SLA (HYB_012, HYB_013)'],
          ]}
        />

        <Callout type="warn" title="Signature preservation in hybrid delivery">
          A key requirement (HYB_042 / HYB_047) is that the original ETSI cryptographic signature — created by the
          originating ITS station using its EU-PKI certificate — must be preserved intact throughout backend transport.
          The AMQP broker routes the binary payload without touching it. Receivers verify the ETSI signature against
          the ECTL, not a transport-level certificate. This ensures the security model of the C-ITS station architecture
          is upheld even when messages travel via IP networks.
        </Callout>

        <p>
          C-ITS actors must register under EN ISO 14816 to obtain a unique <code>publisherId</code> (format: two-letter
          ISO 3166-1 country code + numerical identifier, e.g. "AT00001", "DE15608"). This identifier is included in every
          AMQP message header, enabling subscribers to filter by origin country and message type without decoding the signed payload.
        </p>
      </Section>

      {/* 6. Cross-border interoperability testing */}
      <Section id="cross-border-testing" title="Cross-Border Interoperability Testing">
        <p>
          Interoperability testing is a mandatory element of C-Roads membership. Before a new release is accepted by the
          Steering Committee, member states must demonstrate that their implementations can exchange messages correctly
          across national borders — at least in a controlled cross-test event.
        </p>

        <Steps>
          <div>
            <strong>Specification review</strong>: TF2 and TF3 agree on new or revised service profiles. National choices
            (e.g. repetition interval values) are documented per country. Change requests are submitted and resolved before
            a release candidate is prepared.
          </div>
          <div>
            <strong>National implementation</strong>: Each member state implements the profile in their pilot system. RSUs,
            C-ITS-S, OBUs, and backend infrastructure are updated to the new release. Pilot PKI certificates (non-operational)
            are used during testing.
          </div>
          <div>
            <strong>Cross-border test campaign</strong>: Vehicles from one country drive through pilot corridors of another
            country. Messages generated by foreign RSUs must be correctly decoded, authenticated (PKI trust), and displayed
            by visiting vehicles. Known cross-test corridors include the NL–DE–AT "C-ITS Corridor" (Rotterdam–Frankfurt–Vienna)
            and the InterCor corridors (BE/Fla–FR–NL–UK).
          </div>
          <div>
            <strong>Steering Committee acceptance</strong>: If cross-tests succeed, the release is formally accepted. Member
            states that cannot implement a specific use case may note exceptions (e.g. Finland and Spain did not accept
            Release 1.3 for certain features).
          </div>
          <div>
            <strong>Operational deployment</strong>: After acceptance, RSUs can be deployed under operational PKI (ECTL L1).
            Austria's RSUs and trailers achieved successful ECTL L1 evaluation in early 2024.
          </div>
        </Steps>

        <Callout type="info" title="Bilateral trust as a stepping stone">
          Before ECTL L1 (the full European Certificate Trust List) became available, several member states ran bilateral
          trust relationships. For example, Austria and Volkswagen operated on bilateral PKI trust from 2022, reaching
          1.5 million Volkswagen vehicles in operational mode. The move to ECTL L1 removes this bilateral dependency and
          opens interoperability to any manufacturer joining the ECTL.
        </Callout>
      </Section>

      {/* 7. Deployment status */}
      <Section id="deployment-status" title="Deployment Status Across Member States (2024)">
        <p>
          The 2024 Annual C-ITS Deployment Overview Report documents the status of C-Roads pilots and operational
          deployments across Europe. Motorway deployments are maturing; urban deployments — particularly at signalised
          intersections for public transport priority — are expanding rapidly.
        </p>

        <Table
          caption="Selected C-Roads member state deployment status by end of 2024"
          headers={['Member state / region', 'RSUs installed', 'Key services operational', 'Notes']}
          rows={[
            [
              <><Badge tone="emerald">Austria</Badge></>,
              '471 inter-urban + 263 urban (Graz, Vienna, Salzburg, Klagenfurt, Linz)',
              'RWW, HLN, IVS (inter-urban); SPAT/MAP, SI-TLP, SI-GLOSA, PVD, multiple HLN (urban)',
              '525 RSUs planned by end 2025 (full motorway coverage ~2250 km). 18 C-ITS trailers. 105 road operator OBUs. Hybrid ITS-G5 + IP. ECTL L1 achieved (roadside/trailers, 2024).',
            ],
            [
              <><Badge tone="brand">Germany</Badge></>,
              'Multiple pilot sites (A9 corridor and others)',
              'RWW (standalone, augmented), HLN',
              'Part of original C-ITS Corridor (Rotterdam–Frankfurt–Vienna). Standalone RWW repetition interval 200 ms.',
            ],
            [
              <><Badge tone="brand">France (SCOOP@F)</Badge></>,
              '~400+ RSUs across motorways',
              'RWW (TCC-triggered, standalone), HLN, IVS',
              'SCOOP@F was one of the largest European C-ITS pilots. Cross-border testing with NL, BE, UK via InterCor.',
            ],
            [
              <><Badge tone="brand">Netherlands</Badge></>,
              'Motorway network including A16',
              'RWW, HLN (causeCode 97 / subCauseCode 1), GLOSA',
              'Part of C-ITS Corridor and InterCor. itsGnMaxGeoAreaSize = Managed (1) for DENM.',
            ],
            [
              <><Badge tone="amber">Spain</Badge></>,
              '298 RSUs (2021 total); planning expansion via SCALE 2024–2025',
              'RWW, HLN, IVS, GLOSA, EVP, PVD (SISCOGA); hybrid services via DGT 3.0 cellular (~12,270 km network)',
              'Five distinct pilots; cellular DGT 3.0 platform covers national road network. New deployments planned on AP9, A2, A8/AP8 corridors.',
            ],
            [
              <><Badge tone="amber">Belgium / Flanders</Badge></>,
              'RSUs on motorway core network + Antwerp-Helmond pilot',
              'RWW, IVS, HLN, GLOSA (Antwerp-Helmond combining C-ITS with ISA)',
              'Cloud-based "virtual infrastructure" using 4G/LTE; InterCor partner. Antwerp pilot integrates C-ITS with Intelligent Speed Assistance.',
            ],
            [
              <><Badge tone="brand">Czech Republic</Badge></>,
              'Motorway network RSUs',
              'RWW, HLN',
              'Pilot site operational. RSUs covering key motorway corridors.',
            ],
            [
              <><Badge tone="brand">Slovenia</Badge></>,
              '62 RSUs (approx. 35% of motorway network)',
              'RWW, HLN, SPAT/MAP',
              'Tunnel system event integration. Ljubljana motorway ring equipped 2024 (25 RSUs + 5 trailers). ~150 more RSUs planned.',
            ],
            [
              <><Badge tone="brand">Nordic countries (NordicWay 3)</Badge></>,
              'Denmark, Finland, Norway, Sweden — interurban and urban',
              'Day-1 and Day-1.5 hybrid services',
              'NordicWay 3 (2019–2023): large-scale hybrid C-ITS demonstrating C-Roads-compliant specs at motorway, urban, and interurban level.',
            ],
            [
              <><Badge tone="amber">UK</Badge></>,
              '33 RSUs (A2/M2 InterCor, pilot ended March 2020)',
              'RWW, IVS, PVD, GLOSA',
              'InterCor project completed. UK remains active but unfunded C-Roads member. Learnings feeding UK connected vehicle strategy.',
            ],
          ]}
        />

        <Callout type="key" title="Urban acceleration since 2019">
          More than 50 cities are now participating in C-Roads. The main urban driver is SPAT/MAP transmission at
          signalised intersections for public transport priority and emergency vehicle preemption. Vienna deployed 127
          RSUs (40 within C-Roads funding, 87 self-funded). Graz commenced a city-wide rollout in 2024, equipping
          200 buses and 100 trams with OBUs for C-ITS-based priority using SREM/SSEM.
        </Callout>
      </Section>

      {/* 8. C-Roads Roadmap */}
      <Section id="roadmap" title="C-Roads Roadmap: From Day-1 to Automated Driving">
        <p>
          The C-Roads Roadmap (v1.0, April 2024) is not a projection of future specifications — it describes use cases
          that have already been implemented and tested, giving OEMs and infrastructure managers a view of what is
          "ready to market" and what is coming next. All published C-Roads use cases have been validated in real-world
          pilot deployments before publication.
        </p>

        <CardGrid cols={3}>
          <Card title="Now operational" accent="emerald" icon="✅">
            Road Works Warning (all variants), Hazardous Location Notifications (14 use cases), In-Vehicle Signage
            (5 use cases), Signalized Intersection services (GLOSA, SPTI, TLP, ISVW, EVP), Probe Vehicle Data.
            These are in regular operational use across multiple member states.
          </Card>
          <Card title="ADAS integration" accent="brand" icon="🚗">
            The same Day-1 services feed Advanced Driver Assistance Systems. Digitalisation of (1) hazard warnings,
            (2) regulatory traffic signs including VMS, and (3) traffic signals makes these available as structured
            inputs to ADAS and L2+ automation functions — not just for driver information.
          </Card>
          <Card title="Automated driving (Day-2)" accent="amber" icon="🤖">
            Complex roadworks zone topology (detailed work zone layout for automated vehicles), Automated Vehicle
            Guidance (AVG), Collective Perception Message (CPM) integration, and Topology Information (TI) are in
            pre-deployment evaluation. These require higher-precision IVIM content and/or CPM from infrastructure.
          </Card>
        </CardGrid>

        <p>
          The roadmap emphasises <strong>deployment synergies</strong>: a city that installs RSUs at intersections for
          public transport priority has already deployed the physical and logical infrastructure to support emergency
          vehicle priority, GLOSA for private vehicles, and VRU warnings — each additional service requires only
          software configuration, not new hardware. This layered approach lowers the marginal cost of adding use cases
          once the first deployment is in place.
        </p>

        <p>
          Trust between infrastructure and vehicles is managed via the C-ITS <Link to="/pki">Public Key Infrastructure
          (PKI)</Link>. The ECTL (European Certificate Trust List) is the root of cross-border trust: an RSU's pseudonym
          certificate, issued by an Authorisation Authority (AA) enrolled in the ECTL, is trusted by any vehicle whose
          OBU root certificate is also in the ECTL. Austria's 2024 ECTL L1 achievement — covering all RSUs and trailers —
          is the first major member state to reach this operational milestone.
        </p>
      </Section>

      {/* 9. Relationships */}
      <Section id="relationships" title="Relationships: ETSI, CAR 2 CAR, and EU Policy">
        <p>
          C-Roads does not operate in isolation. It sits at the intersection of standards bodies, industry consortia,
          and EU regulatory frameworks:
        </p>

        <DefList items={[
          {
            term: 'ETSI (profiling relationship)',
            def: 'C-Roads profiles ETSI EN 302 637-2 (CAM), EN 302 637-3 (DENM), TS 103 301 (infrastructure facilities), TS 103 097 (security), and the ITS Data Dictionary (TS 102 894-2). Every C-Roads data element is defined in the ETSI standards; C-Roads restricts or selects values. When ETSI updates a standard, C-Roads aligns its profile in the next release.',
          },
          {
            term: 'CAR 2 CAR Communication Consortium (C2C-CC)',
            def: 'The vehicle-side counterpart. C2C-CC produces the Basic System Profile (BSP) and vehicle OBU specifications. C-Roads and C2C-CC coordinate closely: the C-Roads Message Profiles document was explicitly "aligned with BSP 1.4" in Release 1.6. This alignment ensures that RSU-broadcast messages conform to what OEM vehicles expect, and vice versa.',
          },
          {
            term: 'EU Commission / EU Policy',
            def: 'The EU C-ITS Platform (Phase I and II) defined the initial Day-1 service list and the European Certificate Policy (CP) and Security Policy (SP). C-Roads operationalises these: it deploys the Day-1 services the Commission identified and implements the EU CP in its PKI architecture. The ITS Delegated Regulation (which stalled in 2019 before finally progressing) created uncertainty for deployments; C-Roads provided continuity during that period.',
          },
          {
            term: 'ISO (data standards)',
            def: 'IVI messages use CEN ISO/TS 19321 data elements (IVIM message content) and ISO 14823 pictogram codes for sign types (e.g. code 557 = Maximum speed limit). The AMQP publisherId registration uses EN ISO 14816. C-Roads profiles reference these ISO standards where the ETSI message content itself draws on ISO.',
          },
        ]} />

        <Figure caption="C-Roads in the European C-ITS ecosystem — standards above, deployed systems below">
          <div className="grid grid-cols-3 gap-3 text-sm text-center">
            <div className="rounded border border-slate-600 bg-ink-800 p-3">
              <div className="font-bold text-brand-300 mb-1">ETSI / ISO / CEN</div>
              <div className="text-slate-400 text-xs">CAM, DENM, IVIM, MAPEM, SPATEM, SREM/SSEM, TS 103 097 security, GeoNet</div>
            </div>
            <div className="rounded border border-amber-600 bg-amber-900/20 p-3">
              <div className="font-bold text-amber-300 mb-1">EU Commission</div>
              <div className="text-slate-400 text-xs">EU C-ITS Platform, Day-1 service list, EU Certificate Policy / Security Policy, ITS Delegated Regulation</div>
            </div>
            <div className="rounded border border-violet-600 bg-violet-900/20 p-3">
              <div className="font-bold text-violet-300 mb-1">CAR 2 CAR Consortium</div>
              <div className="text-slate-400 text-xs">Vehicle OBU specs, Basic System Profile (BSP), OEM vehicle integration</div>
            </div>

            <div className="col-span-3 text-center text-slate-500 text-xs py-1">
              profiles / implements / aligns with
            </div>

            <div className="col-span-3 rounded border-2 border-brand-500 bg-brand-900/20 p-4">
              <div className="font-bold text-brand-200 text-base mb-1">C-Roads Platform (WG2: TF1–TF5)</div>
              <div className="text-slate-300 text-xs">
                Harmonised profile set (TF2 use-case definitions + TF3 message profiles + TF4 BI + TF1 security).
                Cross-border interoperability testing. Release acceptance by Steering Committee.
              </div>
            </div>

            <div className="col-span-3 text-center text-slate-500 text-xs py-1">
              deployed by
            </div>

            <div className="rounded border border-emerald-600 bg-emerald-900/20 p-3">
              <div className="font-bold text-emerald-300 mb-1">Road Operators</div>
              <div className="text-slate-400 text-xs">RSU procurement, deployment, C-ITS-S integration, ECTL enrolment</div>
            </div>
            <div className="rounded border border-emerald-600 bg-emerald-900/20 p-3">
              <div className="font-bold text-emerald-300 mb-1">OEM Vehicles</div>
              <div className="text-slate-400 text-xs">ITS-G5 OBU, BSP-aligned firmware, EU-PKI certificates, display / ADAS integration</div>
            </div>
            <div className="rounded border border-emerald-600 bg-emerald-900/20 p-3">
              <div className="font-bold text-emerald-300 mb-1">Service Providers</div>
              <div className="text-slate-400 text-xs">Backend BI subscribers, cellular C-ITS app delivery, fleet management systems</div>
            </div>
          </div>
        </Figure>
      </Section>

      {/* 10. Key standards */}
      <Section id="key-standards" title="Key Standards Referenced">
        <Prose>
          <p>The following ETSI, ISO, and C-Roads documents underpin this page:</p>
        </Prose>
        <div className="flex flex-wrap gap-2 mt-3">
          <Ref code="ETSI EN 302 637-2" title="CAM" kind="ETSI" />
          <Ref code="ETSI EN 302 637-3" title="DENM" kind="ETSI" />
          <Ref code="ETSI TS 103 301" title="Infrastructure facilities (IVI, MAPEM, SPATEM, SREM, SSEM)" kind="ETSI" />
          <Ref code="ETSI TS 103 097" title="ITS Security header and certificate formats" kind="ETSI" />
          <Ref code="ETSI EN 302 665" title="ITS-S architecture" kind="ETSI" />
          <Ref code="ETSI EN 302 663" title="ITS-G5 access layer" kind="ETSI" />
          <Ref code="ETSI TS 102 894-2" title="ITS Data Dictionary (CDD)" kind="ETSI" />
          <Ref code="ETSI TS 102 792" title="5.8 / 5.9 GHz coexistence" kind="ETSI" />
          <Ref code="CEN ISO/TS 19321" title="IVIM data elements" kind="ISO" />
          <Ref code="ISO 14823" title="Pictogram catalogue" kind="ISO" />
          <Ref code="EN ISO 14816" title="publisherId numbering" kind="ISO" />
          <Ref code="ISO/IEC 19464" title="AMQP 1.0" kind="ISO" />
          <Ref code="C-Roads WG2 TF2 Service Definitions v1.7" title="Common Service and Use Case Definitions" kind="C-Roads" />
          <Ref code="C-Roads WG2 TF3 Message Profiles v1.7" title="C-ITS Message Profiles and Parameters" kind="C-Roads" />
          <Ref code="C-Roads Infrastructure Functions v1.5" title="Infrastructure Functions and Specifications" kind="C-Roads" />
          <Ref code="C-Roads Backend Hybrid BI v1.5" title="Specification for Backend Hybrid C-ITS Interoperability" kind="C-Roads" />
          <Ref code="C-Roads Roadmap v1.0 2024" title="C-ITS Roadmap" kind="C-Roads" />
        </div>
      </Section>

      {/* 11. Where next */}
      <Section id="where-next" title="Where Next">
        <CardGrid cols={3}>
          <Card title="DENM" accent="brand" icon="⚠️">
            The primary message for hazardous events and road works warnings. Understand how causeCode, subCauseCode,
            eventPosition, and traces are structured and sent. <Link to="/denm">Go to DENM</Link>
          </Card>
          <Card title="Infrastructure messages" accent="violet" icon="🚦">
            IVIM, MAPEM, SPATEM, SREM, SSEM — the messages that RSUs send for signage, topology, and signal phase.
            <Link to="/infrastructure">Go to Infrastructure messages</Link>
          </Card>
          <Card title="PKI &amp; Security" accent="amber" icon="🔐">
            How the EU Certificate Trust List, Authorisation Authorities, and pseudonym certificates secure C-ITS
            message exchange. <Link to="/pki">Go to PKI</Link>
          </Card>
          <Card title="Applications" accent="emerald" icon="📱">
            End-to-end application flow: how Day-1 services reach drivers and ADAS systems in production vehicles.
            <Link to="/applications">Go to Applications</Link>
          </Card>
          <Card title="EU Policy" accent="rose" icon="🇪🇺">
            The regulatory context: the EU C-ITS Platform, Delegated Regulation, and the mandate driving harmonised deployment.
            <Link to="/eu-policy">Go to EU Policy</Link>
          </Card>
          <Card title="CAR 2 CAR" accent="cyan" icon="🚗">
            The vehicle-side consortium whose Basic System Profile (BSP) is kept aligned with C-Roads roadside profiles.
            <Link to="/car2car">Go to CAR 2 CAR</Link>
          </Card>
        </CardGrid>
      </Section>
    </article>
  )
}
