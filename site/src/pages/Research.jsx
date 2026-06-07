import React from 'react'
import { Link } from 'react-router-dom'
import { PageHeader, Section, Prose, Callout, Ref, Table, StatGrid, Stat, CardGrid, Card, Steps, Figure, LayerStack, DefList, Badge } from '../components/ui.jsx'

export default function Research() {
  return (
    <article>
      <PageHeader
        kicker="R&D &amp; PILOTS"
        title="Research &amp; Projects"
        intro="C-ITS does not spring fully formed from standards documents alone. A rich ecosystem of EU-funded projects, national pilots, and academic research continuously feeds real-world evidence back into specifications, profiles, and deployment guidance. This page surveys the most consequential programmes — from EU-EIP implementation guidance to Horizon 2020 automation projects — and the frontier research topics that will shape the next decade of deployment."
        sources={['EU EIP D6 2021', 'EU EIP D7 2021', 'TransAID D5.1', 'arXiv:2305.19863', 'arXiv:2311.01268', 'arXiv:1510.01288', 'arXiv:2008.04379', 'arXiv:2304.02885']}
      />

      {/* ------------------------------------------------------------------ */}
      <Section id="eu-landscape" title="The EU Project Landscape">
        <p>
          European C-ITS research and deployment has been shaped by two main funding instruments: the
          Connecting Europe Facility (CEF) — which co-funds cross-border infrastructure pilots — and the
          Horizon 2020 / Horizon Europe research programmes, which support pre-competitive R&amp;D.
          Together they have produced the data, standards contributions, and harmonised profiles that underpin
          C-Roads and the broader ETSI/CEN standard suite. The common architecture is the same across
          both tracks: vehicles and roadside units exchange standardised ETSI messages (CAM, DENM, SPATEM,
          MAPEM, CPM, MCM) over a shared ETSI ITS-G5 or Cellular V2X (C-V2X) radio layer; upper layers
          — facilities, security, and management — remain identical regardless of the radio access technology
          chosen.
        </p>
        <Callout type="key" title="Why EU-funded pilots matter">
          Unlike purely simulated or lab-based studies, CEF-funded deployments involve actual road
          authorities, real traffic, and cross-border interoperability testing. Their results — hardware
          procurement lessons, PKI integration experience, operational processes, cost estimates — feed
          directly into EU EIP deliverables and C-Roads technical specifications, closing the loop between
          standardisation and deployment practice.
        </Callout>
        <p>
          Key stakeholders in this ecosystem include the EU ITS Platform (EU EIP), the C-Roads Platform,
          the Car-2-Car Communication Consortium (C2C-CC), the 5G Automotive Association (5GAA), and
          the European Road Transport Research Advisory Council (ERTRAC). Each publishes roadmap or
          guidance documents that road authorities must reconcile when planning deployments.
        </p>
      </Section>

      {/* ------------------------------------------------------------------ */}
      <Section id="eu-projects" title="Major EU Projects &amp; Platforms">
        <CardGrid cols={2}>
          <Card title="EU-EIP — European ITS Platform" accent="brand" icon="🏛️">
            <p>
              The EU ITS Platform (EU EIP) brings together National Ministries, Road Authorities, and Road
              Operators from almost all EU Member States to foster harmonised ITS deployment. Its
              Sub-activity 4.4 "Cooperative ITS Services Deployment Support" has produced a series of
              practitioner-oriented deliverables. <strong>Deliverable D6 (2021)</strong> — Implementation
              Guidance for C-ITS Services with Infrastructure Involvement — is a handbook covering C-ITS
              basics, a step-by-step implementation lifecycle (preliminaries → design → installation →
              operation → evaluation), a cost-benefit methodology, and a "Who is Who" in the European
              C-ITS landscape. <strong>Deliverable D7 (2021)</strong> sets a roadmap for C-ITS service
              implementation beyond initial deployment, synthesising the C2C-CC, 5GAA, and ERTRAC
              roadmaps from a road-operator perspective and recommending that operators start deploying
              now — as upper-layer investments are technology-agnostic and will be reusable regardless of
              whether the radio access layer is ITS-G5 or C-V2X. Together, D6 and D7 represent the most
              comprehensive publicly available guidance for a European road authority embarking on C-ITS.
            </p>
          </Card>

          <Card title="C-Roads Platform" accent="emerald" icon="🛣️">
            <p>
              C-Roads is the joint European platform for harmonising C-ITS deployment across Member
              States. Originating as a CEF-funded initiative, it links national deployment projects
              (C-Roads Germany, C-Roads France, C-Roads Austria, etc.) into a single interoperability
              framework. C-Roads publishes a <em>Service Catalogue</em> — updated twice a year — that
              lists services and use cases that have been specified, tested for cross-border
              interoperability, and verified. Deployment of any service listed in the catalogue must follow
              the agreed C-Roads specifications; the catalogue currently covers Day 1 and Day 1.5 services
              and is expanding toward Day 2 use cases. Learn more on the <Link to="/c-roads">C-Roads page</Link>.
            </p>
          </Card>

          <Card title="NordicWay 1 / 2 / 3" accent="cyan" icon="🌐">
            <p>
              Three successive CEF-funded pilots in Sweden, Norway, Finland, and Denmark demonstrating
              hybrid C-ITS (cellular + ITS-G5) over the long, sparsely populated Nordic road network.
              NordicWay 1 (2015–2017) proved that 3G/4G LTE is sufficient in latency and coverage for
              Day 1 services in Nordic conditions. NordicWay 2 (2017–2020) built a federated network of
              "Interchange Nodes" — neutral cloud servers distributing Safety-Related Traffic Information
              (SRTI) under EU Delegated Regulation 886/2013 — and ran large-scale pilots with over 30
              public and private partners. NordicWay 3 (2019–ongoing) addresses procurement processes,
              operational aspects, and ecosystem governance needed for full-scale deployment.
            </p>
          </Card>

          <Card title="InterCor" accent="amber" icon="🔗">
            <p>
              InterCor (Interoperable Corridors) connected the Dutch C-ITS Corridor (Netherlands–Germany–
              Austria), France's SCOOP@F project, and UK/Belgium C-ITS initiatives into a single
              cross-border testbed for Day 1 services. It demonstrated that harmonised technical
              specifications and a shared PKI trust domain are preconditions for seamless cross-border
              C-ITS. The project produced a sustainable network of C-ITS corridors serving as a
              living testbed for Day 1 and beyond.
            </p>
          </Card>

          <Card title="C-MobILE" accent="violet" icon="📡">
            <p>
              C-MobILE (Accelerating C-ITS Mobility Innovation and depLoyment in Europe) deployed
              C-ITS services at eight European test sites ranging from high-density urban environments
              to motorway corridors, covering services such as Road Works Warning, Vulnerable Road User
              protection, Green Light Optimal Speed Advisory (GLOSA), and SPAT/MAP. It provided
              large-scale evidence on user acceptance, safety benefits, and technical issues in
              heterogeneous urban/interurban settings.
            </p>
          </Card>

          <Card title="TransAID — Horizon 2020" accent="rose" icon="🤖">
            <p>
              TransAID (Transition Areas for Infrastructure-Assisted Driving, Horizon 2020 GA 723390)
              addressed one of the thorniest problems in mixed-traffic automation: what happens in
              "Transition Areas" where automated vehicles must hand back control to the human driver
              (Transition of Control, ToC) or execute a Minimum Risk Manoeuvre (MRM)? TransAID
              designed traffic management measures — implemented via V2X — to eliminate or mitigate
              the negative safety and traffic-flow effects of ToCs. The project defined a V2X message
              set (Deliverable D5.1) that extends standard ETSI messages: CAM with automation-level
              fields and CACC string parameters, DENM to notify of no-AD zones and lane closures,
              MAPEM with safe-spot geometry, and a proposed extension to the Manoeuvre Coordination
              Message (MCM) for infrastructure-to-vehicle suggestions. All extensions were designed for
              backward compatibility, enabling future transfer into ETSI standardisation.
            </p>
          </Card>
        </CardGrid>

        <Callout type="info" title="Day 1 / Day 1.5 / Day 2 / Day 3+ Services">
          EU EIP D7 categorises C-ITS services into deployment phases. <strong>Day 1</strong> includes
          safety-critical broadcast services: Emergency Electronic Brake Light, Slow/Stationary Vehicle,
          Traffic Jam Ahead, Hazardous Location Notification, Road Works Warning, Weather Conditions,
          In-Vehicle Signage, In-Vehicle Speed Limits, Probe Vehicle Data, Alert Wrong Way Driving, and
          Emergency Vehicle Approaching. <strong>Day 1.5</strong> adds mobility-oriented services:
          parking information, zone access control, loading zone management, Vulnerable Road User
          protection, Cooperative Collision Risk Warning, and Motorcycle Approaching Indication.
          <strong> Day 2 / Day 3+</strong> involves cooperative manoeuvres (CACC, lane changes,
          merging, cooperative intersection control) that require higher automation levels and more
          complex message flows — territory where TransAID, the 5GAA roadmap, and ERTRAC are
          actively working.
        </Callout>
      </Section>

      {/* ------------------------------------------------------------------ */}
      <Section id="transaid-detail" title="TransAID: V2X for Automated-Vehicle Transitions">
        <p>
          Automated vehicles (AVs) improve safety and efficiency under nominal conditions, but they reach
          functional limits in "Transition Areas" — e.g., roadwork zones, motorway merge points, tunnel
          entries — where the ODD (Operational Design Domain) ends and a Transition of Control is
          required. In high-density traffic, simultaneous ToCs by multiple vehicles can create secondary
          hazards (sudden decelerations, unintended lane changes). TransAID quantified and mitigated
          these effects.
        </p>

        <p>
          The TransAID vehicle taxonomy distinguishes four categories: Legacy Vehicles (LV, no
          connectivity or automation), Cooperative non-automated Vehicles (CV), non-cooperative Automated
          Vehicles (AV), and Cooperative Automated Vehicles (CAV). The road infrastructure's Traffic
          Management System (TMS) integrates sensor data and V2X messages, generates "progression plans",
          and disseminates them via Roadside Infrastructure (RSI) in V2X messages — or via Variable
          Message Signs for non-equipped vehicles.
        </p>

        <p>
          The five TransAID services address concrete scenarios:
        </p>

        <Table
          caption="TransAID traffic-management services and their V2X message types"
          headers={['Service', 'Scenario', 'Primary Messages Used']}
          rows={[
            ['Provide path around road works via bus lane', 'Roadwork zone with lane diversion', 'DENM (lane closure/speed limit), MAPEM (safe-spot geometry), IVIM'],
            ['Prevent ToC/MRM by speed/headway/lane advice', 'High-density automation corridor', 'CAM (CACC extensions), DENM, MCM (infrastructure suggestions)'],
            ['Traffic separation before motorway merge/diverge', 'Motorway merging', 'CAM, DENM, MAPEM'],
            ['Safe spot in lane of blockage', 'Lane blocked by incident', 'DENM (safe spot), MAPEM, CAM (MRM notification)'],
            ['Schedule ToCs before no-AD zone', 'Approaching tunnel or urban area', 'DENM (no-AD zone notification), MCM (ToC time/place recommendation)'],
          ]}
        />

        <p>
          The CAM extensions add: current automation level, distance to preceding/following vehicles, and
          CACC string parameters. The MCM extension proposed by TransAID adds an infrastructure-originated
          field allowing the RSI to suggest specific manoeuvres to CAVs — a concept directly relevant to
          the <Link to="/mcm">Manoeuvre Coordination Message</Link> standardisation at ETSI TC ITS.
        </p>
      </Section>

      {/* ------------------------------------------------------------------ */}
      <Section id="arxiv-frontier" title="Research Frontier: Selected Academic Findings">
        <p>
          Beyond funded projects, the academic literature provides quantitative evidence, novel frameworks,
          and technology assessments that inform future standards. The following table summarises the
          key contributions of the arXiv papers surveyed.
        </p>

        <Table
          caption="Key academic contributions to C-ITS research"
          headers={['Topic', 'Source', 'Core Contribution']}
          rows={[
            [
              'Multi-Channel Operation (MCO) — ETSI C-ITS Release 2',
              'Bazzi et al., arXiv:2305.19863 (2023)',
              'Comprehensive review of the ETSI MCO standard set (TR 103 439, TS 103 696/697/141, TS 103 836-4-1, TS 103 695) for Release 2. Release 1 uses a single 10 MHz channel (SCH0); Release 2 needs 5–7 channels to carry CPM (2 ch), MCM (2 ch), PCM (1 ch), VAM (0.5 ch), SPAT/MAP (0.5 ch) simultaneously. The paper describes the facilities-layer MCO FAC entity, functional configuration profiles (FCPs), access layer instances (ALIs), and key open issues: channel-usage-policy definition, congestion control across channels, adjacent-channel interference, and per-message priority.',
            ],
            [
              '5G Ultra-Reliable Vehicular Communication (uMTC)',
              'Ström, Popovski, Sachs, arXiv:1510.01288 (2015)',
              'Argues that 5G ultra-reliable machine-type communication (uMTC) can complement or replace 802.11p-based ITS-G5/DSRC for demanding C-ITS applications. Defines uMTC service reliability (probability of delivery before hard deadline), availability, and failure. METIS TC12 benchmark: 1600-byte messages delivered within 5 ms with 99.999% reliability at relative speeds up to 500 km/h. Proposes D2D sidelink links (for coverage independence), TDMA/CSA MAC for congestion control without ARQ, and Reliable Service Composition (RSC) for graceful degradation when the full service cannot be guaranteed.',
            ],
            [
              'Survey of CAV Deployments in the US',
              'Han, arXiv:2008.04379 (2020)',
              'Surveys 97 US V2X deployments (5.9 GHz band), 18,877 aftermarket OBUs, and 8,098 roadside RSUs from USDOT-sponsored Connected Vehicle Pilot Deployments (Michigan SPMD 2800 vehicles, NYC 4000 OBUs/550 RSUs, Tampa, Wyoming). Identifies persistent barriers: absence of federal V2V mandate (NHTSA withdrew its 2020 proposal), spectrum reallocation by FCC (only 30 MHz retained for ITS), lack of viable business models, and supply-chain immaturity. Safety analysis: V2V/V2I could address the majority of pre-crash scenarios; IMA and LTA alone could prevent 25,000–592,000 crashes and save 49–1,083 lives annually at full fleet penetration.',
            ],
            [
              'DSRC-to-C-V2X Migration: Tennessee Case Study',
              'Khattak et al., arXiv:2304.02885 (2022)',
              'Documents Tennessee DOT\'s (TDOT) transition challenge: 152 RSUs planned for the I-24 Smart Corridor using DSRC + Bluetooth; FCC ruling in 2020 repurposed 45 of 75 MHz of 5.9 GHz spectrum away from DSRC, mandating migration to C-V2X. Key findings: DSRC and C-V2X share the same upper-layer message sets (BSM/CAM, SPATEM) but differ at the PHY/MAC layer — complicating the migration to more than a simple hardware swap. LTE C-V2X testing in Chattanooga MLK corridor showed stable packet reception (better than DSRC in some urban scenarios), but channel congestion at scale remains unvalidated. Recommendation: deploy dual-mode DSRC/C-V2X RSUs as an interim strategy while research matures.',
            ],
            [
              'CAV-Readiness Framework for Road Authorities',
              'Madadi et al., arXiv:2311.01268 (2023)',
              'Proposes a structured CAV-Readiness Framework (CRF) enabling National Road Authorities (NRAs) to assess their readiness to deploy C-ITS services. The CRF decomposes C-ROADS services (IVS, HLN, RWW, Signalised Intersections, AVG, PVD) into use cases, and use cases into atomic "enablers" in five categories: Physical (RSUs, sensors), Digital (system profiles, data models), Operational (response plans, processes), Connectivity (ITS-G5, cellular backhaul), and Standards (ETSI EN 302 637-3 for DENM, ETSI TS 102 894-2, etc.). Each enabler is scored for readiness, aspiration, and feasibility threshold. A worked RWW example using the NordicWay 2 pilot demonstrates that the Digital and Operational categories are typically the weakest — not the technology itself.',
            ],
          ]}
        />
      </Section>

      {/* ------------------------------------------------------------------ */}
      <Section id="mco-detail" title="Multi-Channel Operation in ETSI C-ITS Release 2">
        <p>
          Release 1 of the ETSI C-ITS standard suite was designed around a single 10 MHz service
          channel (SCH0, historically called the Control Channel, CCH) carrying CAMs and DENMs. This
          was sufficient for Day 1 "information-only" use cases. Release 2 introduces a fundamentally
          different traffic profile.
        </p>

        <StatGrid cols={3}>
          <Stat value="~0.9" label="Channels for CAMs" sub="1–10 Hz, ~400 bytes each" />
          <Stat value="~2" label="Channels for CPMs" sub="1–10 Hz, ~1000 bytes; sensor sharing" />
          <Stat value="~1" label="Channels for PCMs" sub="50 Hz, ~400 bytes; platoon control" />
        </StatGrid>

        <p>
          To manage the resulting multi-channel complexity, ETSI approved a coordinated set of six
          standards (see Table below). The central innovation is the <strong>MCO FAC</strong> entity —
          a new component at the facilities layer that acts as a resource broker between applications
          and radio transceivers.
        </p>

        <Table
          caption="ETSI Release 2 Multi-Channel Operation standard set"
          headers={['Standard', 'Scope', 'Key Content']}
          rows={[
            ['ETSI TR 103 439', 'Technical report', 'Context, motivation, MCO approaches, adjacent-channel interference simulation results'],
            ['ETSI TS 103 696', 'Architecture extension', 'Extends ETSI EN 302 665 C-ITS architecture to add MCO components at all layers'],
            ['ETSI TS 103 697', 'MCO architecture', 'Defines MCO entities and main functionalities (BME, MHE, MGE, MRE, MCE)'],
            ['ETSI TS 103 141', 'Facilities layer', 'MCO FAC: functional configuration profiles (FCPs), bandwidth management, channel negotiation'],
            ['ETSI TS 103 836-4-1', 'Networking layer', 'GeoNetworking ALI group handler (GAGH), media-independent and media-dependent functions'],
            ['ETSI TS 103 695', 'Access layer', 'MCO ACC: ALI (Access Layer Instance) management, channel load measurement, ALI groups'],
          ]}
        />

        <p>
          An application communicates its requirements to MCO FAC via a <strong>Functional
          Configuration Profile (FCP)</strong>: estimated data rate, maximum latency, minimum one-hop
          range. MCO FAC responds with Functional Configuration Limits (FCLs) — what it can actually
          guarantee. In congestion, MCO FAC instructs the Collective Perception Service (CPS) to
          offload CPMs from SCH0 to SCH1, or to reduce message rate, or to selectively discard
          lower-priority messages — all coordinated at the facilities layer to preserve safety-critical
          message delivery. This is a marked departure from Release 1, where congestion control was
          handled purely at the access layer by rate-limiting transmission power and frequency.
        </p>

        <p>
          The MCO concept is fully compatible with both ITS-G5 (IEEE 802.11p / 802.11bd) and NR-V2X
          sidelink transceivers. A station may have one transceiver (backward-compatible Release 1 mode)
          or multiple transceivers on different channels and technologies. See the
          <Link to="/access-layer"> Access Layer page</Link> for the underlying radio technology details.
        </p>
      </Section>

      {/* ------------------------------------------------------------------ */}
      <Section id="5g-cv2x" title="5G, C-V2X, and Ultra-Reliable Vehicular Communication">
        <p>
          ITS-G5 / DSRC are based on IEEE 802.11p: a contention-based CSMA/CA MAC that provides no
          hard delivery guarantees. For Day 1 "best-effort" safety warnings this is acceptable, but
          Day 2+ cooperative manoeuvres (platooning at 50 Hz, automated lane changes) require
          deterministic latency and very high reliability.
        </p>
        <p>
          The 5G uMTC (ultra-reliable machine-type communication) service concept, formalised in the
          METIS project and later standardised by 3GPP as NR-V2X (Release 16), addresses this gap.
          The METIS Test Case 12 benchmark — 1600-byte safety messages delivered within 5 ms at
          99.999% reliability, at relative speeds up to 500 km/h — sets the design target. Key 5G
          technology components for vehicular communication are:
        </p>
        <DefList items={[
          { term: 'D2D sidelink (PC5)', def: 'Direct device-to-device links that do not traverse a base station, eliminating the uplink + downlink latency budget and maintaining connectivity when network coverage is absent.' },
          { term: 'Reliable Service Composition (RSC)', def: 'A cross-layer mechanism where the communication system informs the application of its currently achievable QoS; the application then selects a gracefully degraded service variant rather than failing entirely.' },
          { term: 'Network-assisted RRM', def: 'When cellular infrastructure is present, the base station assists radio resource management using slowly time-varying path-loss / shadow-fading measurements, allowing efficient spectrum sharing between uMTC vehicular users and eMBB broadband users.' },
          { term: 'Time-division MAC (STDMA/CSA)', def: 'Replaces CSMA with deterministic slot assignments (via GPS-assisted STDMA or coded slotted Aloha) to bound latency and support all-to-all broadcast at high vehicle densities.' },
        ]} />
        <p>
          The EU EIP D7 roadmap and 5GAA roadmap both foresee mass deployment of basic C-V2X (LTE
          Release 14/15) for Day 1/1.5 services by the mid-2020s, with 5G-NR V2X enabling the more
          demanding cooperative manoeuvre use cases from 2026 onwards. Europe's current ITS-G5
          deployments are not wasted: as Qualcomm observed, C-V2X "leverages all of the existing
          standards in [the application, facilities, security, and networking layers] and just replaces
          the PHY and the MAC (commonly called the Access layers)." Upper-layer investments are
          therefore technology-agnostic. See <Link to="/access-layer">Access Layer</Link> for spectrum
          and radio details.
        </p>
      </Section>

      {/* ------------------------------------------------------------------ */}
      <Section id="us-deployments" title="CAV Deployment Experience: US Pilots &amp; the DSRC→C-V2X Transition">
        <p>
          The US provides a large-scale natural experiment: a decade of DSRC-based Connected Vehicle
          pilot deployments (CVPDs), followed by the FCC's 2020 decision to repurpose 45 MHz of the
          5.9 GHz band for unlicensed Wi-Fi, leaving only 30 MHz for ITS — mandated to migrate to
          C-V2X. The consequences are instructive for any jurisdiction navigating a technology
          transition.
        </p>

        <Table
          caption="Major US Connected Vehicle Pilot Deployments"
          headers={['Programme', 'Scale', 'Technology', 'Key Applications']}
          rows={[
            ['Michigan SPMD (2012–14)', '2800 vehicles, 27 RSUs (75 road-miles)', 'DSRC / 802.11p', 'FCW, EEBL, LTA, IMA, Blind Spot Warning, Pedestrian Crosswalk Warning'],
            ['New York City CVPD (2015–)', '4000 OBUs, 550 RSUs, taxi/bus/cars', 'DSRC', 'RLVW, FCW, EEBL, Lane Change Warning, Speed Compliance, Emergency Comms'],
            ['Tampa CVPD (2015–)', '1000 private vehicles, 47 RSUs, streetcars', 'DSRC', 'IMA, FCW, Transit Signal Priority, Pedestrian Warning, Wrong-Way Entry'],
            ['Wyoming CVPD (2015–)', '400 fleet OBUs, 75 RSUs on I-80', 'DSRC', 'FCW, I2V Situational Awareness, Work Zone Warning, Spot Weather Impact Warning'],
            ['Tennessee I-24 Smart Corridor', '152 RSUs planned', 'DSRC → C-V2X transition', 'Transit Signal Priority, Emergency Vehicle Preemption; transitioning to dual-mode'],
          ]}
        />

        <p>
          NHTSA's assessment of the Michigan and other CVPDs concluded: V2V safety applications work
          in real-world conditions; IMA and LTA alone could prevent 25,000–592,000 crashes and save
          49–1,083 lives annually at full fleet penetration. V2V equipment cost was estimated at
          $341–$350 per vehicle in 2020.
        </p>
        <p>
          The Tennessee DSRC-to-C-V2X transition study reveals the practical complexity of any
          technology migration. DSRC and C-V2X share message formats (BSM ≈ CAM, SPATEM), but differ
          at the PHY/MAC layers — meaning hardware must be replaced, not just reprogrammed. LTE C-V2X
          testing in Chattanooga's MLK corridor showed generally stable performance, but channel
          congestion at scale (many vehicles simultaneously) is not yet validated. The Tennessee team
          recommends deploying dual-mode DSRC/C-V2X RSUs as a bridging strategy. The European
          situation is different — ITS-G5 and C-V2X must coexist in the 5.9 GHz band without a
          regulatory mandate for either — but the Tennessee experience confirms that "swapping the
          radio" is never trivial when operational infrastructure is at stake.
        </p>

        <Callout type="tip" title="Lesson for European operators">
          EU EIP D7 explicitly recommends starting C-ITS deployment now rather than waiting for
          technology consensus. Upper-layer investments (PKI enrolment, traffic management integration,
          DENM generation processes, operations centre workflows) are fully reusable regardless of
          whether the eventual radio access layer is ITS-G5, LTE-V2X, or 5G-NR V2X.
        </Callout>
      </Section>

      {/* ------------------------------------------------------------------ */}
      <Section id="cav-readiness" title="CAV-Readiness Frameworks for Road Authorities">
        <p>
          National Road Authorities (NRAs) face a multi-dimensional investment decision: which C-ITS
          services to deploy, in which road environments, at what cost, and with what expected safety
          or efficiency benefit? The CAV-Readiness Framework (CRF) proposed by Madadi et al. (2023)
          provides a structured methodology for answering these questions.
        </p>

        <LayerStack
          layers={[
            { name: 'C-ITS Services', sub: 'IVS, HLN, RWW, SI, AVG, PVD (C-Roads catalogue)', accent: 'brand' },
            { name: 'Use Cases', sub: 'e.g. RWW → Lane Closure, Road Closure, Mobile Works, Winter Maintenance', accent: 'cyan' },
            { name: 'Enabler Categories', sub: 'Physical | Digital | Operational | Connectivity | Standards', accent: 'emerald' },
            { name: 'Scoring', sub: 'Readiness × Importance → use-case, service, and overall NRA readiness score', accent: 'amber' },
          ]}
          leftRail="Top-down decomposition"
          rightRail="Bottom-up aggregation"
        />

        <p>
          A worked Road Works Warning (RWW) example using the NordicWay 2 pilot architecture
          identified nine enablers: ETSI EN 302 637-3 (DENM standard), ETSI TS 102 894-2 (data
          dictionary), a stationary R-ITS-S, a mobile V-ITS-S on a Truck-Mounted Attenuator, an NRA
          response plan, R-ITS-S and V-ITS-S system profiles, cellular connectivity (RSU-to-cloud
          backhaul), and short-range ITS-G5 (TMA-to-RSU). The scoring revealed that the
          <strong> Digital</strong> (system profiles) and <strong>Operational</strong> (response plans)
          categories were weaker than Physical or Connectivity — confirming that the technology itself
          is often not the bottleneck; institutional processes and digital data infrastructure are.
        </p>

        <p>
          The CRF is intentionally generic (applicable to any road environment) and technology-agnostic,
          so it can guide investment decisions as C-ITS evolves from Day 1 to Day 2+ services. It
          complements the EU EIP D6 lifecycle methodology and the Infrastructure Support Levels for
          Automated Driving (ISAD) concept developed in the INFRAMIX project.
        </p>
      </Section>

      {/* ------------------------------------------------------------------ */}
      <Section id="implementation-guidance" title="Road-Operator Implementation Guidance: EU EIP D6 &amp; D7">
        <p>
          EU EIP Deliverable D6 structures the C-ITS implementation challenge into three parts: C-ITS
          Basics (concepts, communication technologies, messages, PKI trust domain), Implementing
          C-ITS (a five-stage lifecycle), and the C-ITS Landscape (actors, projects, standards clusters).
          The five implementation stages are:
        </p>

        <Steps>
          <div>
            <strong>Preliminaries (before deployment):</strong> Define transport policy objectives,
            identify C-ITS services and user needs, form a cross-functional C-ITS team (technical,
            legal, organisational, procurement), perform a business case / cost-benefit analysis (CBA
            / BCR), and establish pre-go-live evaluation methodology.
          </div>
          <div>
            <strong>Plan and Design:</strong> Functional design (service logic, message types, trigger
            conditions, relevant ETSI standards), organisational design (roles, contracts, data-sharing
            agreements), and technical design (RSU placement, backhaul topology, PKI enrolment
            strategy, system profiles for ITS-G5 or C-V2X).
          </div>
          <div>
            <strong>Install and Commission:</strong> Procurement (ETSI-compliant OBUs / R-ITS-S units,
            PKI certificates from an enrolled Enrolment Authority), installation, system integration
            testing, and interoperability verification against C-Roads or C2C-CC profiles.
          </div>
          <div>
            <strong>Operate and Maintain:</strong> Day-to-day operations covering DENM/IVIM generation
            workflows, RSU health monitoring, certificate lifecycle management (including revocation via
            the C-ITS Credential Management System, CCMS), incident response, and change management.
          </div>
          <div>
            <strong>Evaluate:</strong> Post-go-live evaluation using agreed KPIs (message reception
            rates, service availability, safety impact metrics), contributing results back to C-Roads
            and EU EIP for the next iteration of deployment guidance.
          </div>
        </Steps>

        <p>
          EU EIP D7's key strategic finding is that, although two competing short-range V2X radio
          technologies (ITS-G5 and C-V2X) create uncertainty, the upper protocol stack — facilities,
          security, networking — is identical for both. Road operators should invest in the full
          ecosystem (PKI, traffic management integration, operations processes) now, treating the radio
          access layer as a commodity component that can be swapped later. D7 also highlights that
          moving from one deployment phase to the next "takes at least five years" — underscoring the
          urgency of starting Day 1 deployments now to be ready for Day 2 use cases by the 2030s.
        </p>

        <p>
          See <Link to="/eu-policy">EU Policy</Link> for the regulatory context (ITS Directive,
          Delegated Acts, CCAM Platform) and <Link to="/c-roads">C-Roads</Link> for the
          interoperability and testing framework.
        </p>
      </Section>

      {/* ------------------------------------------------------------------ */}
      <Section id="open-challenges" title="Open Research Challenges">
        <Callout type="warn" title="Key open challenges for C-ITS R&amp;D">
          <p>The following challenges are actively discussed in the literature and in standards bodies, and remain without fully deployed solutions as of 2024–2025:</p>
          <ul className="mt-2 space-y-2">
            <li>
              <strong>Channel congestion at scale (MCO):</strong> Release 2 MCO defines the framework
              for multiple channels, but the assignment of applications to specific channels —
              and the interaction between congestion control at the facilities layer and at the
              access layer — is left to future profiles. Adjacent-channel interference (up to 40%
              reduction in reception range between two loaded channels separated by only 10 MHz)
              remains an open engineering problem.
            </li>
            <li>
              <strong>Security at scale:</strong> The ETSI C-ITS PKI (CCMS) with pseudonym
              certificates provides privacy-preserving authentication, but revocation at the scale
              of tens of millions of vehicles, misbehaviour detection across jurisdictions, and the
              cross-border trust of the European Certificate Trust List (ECTL) require continued
              operational and governance work. See <Link to="/security">Security</Link> and{' '}
              <Link to="/pki">PKI &amp; Trust</Link>.
            </li>
            <li>
              <strong>Mixed traffic and ODD management:</strong> As TransAID demonstrated, Transition
              Areas in mixed conventional/cooperative/automated traffic are the most safety-critical
              locations. The message set (MCM, DENM no-AD zone notifications) exists in embryonic form,
              but traffic management algorithms that optimally schedule ToCs across an entire
              motorway section remain research topics.
            </li>
            <li>
              <strong>ITS-G5 / C-V2X coexistence:</strong> In Europe, both technologies are allowed
              in the 5.9 GHz ITS band without a regulatory mandate for either. ETSI has studied
              co-channel coexistence (ETSI TR 103 667, TR 103 766) but an agreed coexistence mechanism
              has not been standardised. This creates a "chicken-and-egg" problem for OEMs deciding
              which radio chipset to fit.
            </li>
            <li>
              <strong>Business models and governance:</strong> Both EU EIP D7 and the US CVPD
              experience confirm that the hardest problem is not technical: it is who pays for RSU
              infrastructure, who operates it, who is liable when a C-ITS message is wrong, and how
              public road authorities and private OEMs share data under GDPR and national road traffic
              laws.
            </li>
            <li>
              <strong>Scalability for Day 2 perception sharing:</strong> CPMs (Collective Perception
              Messages) generated at 1–10 Hz and carrying up to ~1000 bytes of sensor object lists
              will multiply channel load dramatically as vehicle penetration grows. Intelligent
              redundancy suppression, semantic compression, and infrastructure-assisted sensor fusion
              are active research topics. See <Link to="/mcm">MCM</Link> and the
              <Link to="/access-layer"> Access Layer</Link> page for congestion control details.
            </li>
          </ul>
        </Callout>
      </Section>

      {/* ------------------------------------------------------------------ */}
      <Section id="key-standards" title="Key Standards &amp; References">
        <p>
          The following standards underpin the projects and research topics discussed on this page:
        </p>
        <div className="flex flex-wrap gap-2">
          <Ref code="ETSI TR 101 607" title="C-ITS Release 1 Standards List" kind="ETSI" />
          <Ref code="ETSI TR 103 439" title="MCO Technical Report" kind="ETSI" />
          <Ref code="ETSI TS 103 697" title="MCO Architecture" kind="ETSI" />
          <Ref code="ETSI TS 103 141" title="MCO Facilities Layer" kind="ETSI" />
          <Ref code="ETSI TS 103 695" title="MCO Access Layer" kind="ETSI" />
          <Ref code="ETSI TS 103 324" title="Collective Perception Service (CPM)" kind="ETSI" />
          <Ref code="ETSI TS 103 561" title="Manoeuvre Coordination Service (MCM)" kind="ETSI" />
          <Ref code="ETSI TS 103 300-3" title="VAM — VRU Awareness" kind="ETSI" />
          <Ref code="ETSI EN 302 637-2" title="CAM — Cooperative Awareness" kind="ETSI" />
          <Ref code="ETSI EN 302 637-3" title="DENM — Decentralised Notifications" kind="ETSI" />
          <Ref code="ETSI TS 102 894-2" title="Common Data Dictionary" kind="ETSI" />
          <Ref code="SAE J3016" title="Levels of Driving Automation" kind="SAE" />
          <Ref code="SAE J3216" title="Cooperative Driving Automation" kind="SAE" />
          <Ref code="3GPP Release 14" title="LTE-V2X (C-V2X sidelink)" kind="ISO" />
          <Ref code="3GPP Release 16" title="NR-V2X (5G sidelink)" kind="ISO" />
          <Ref code="IEEE 802.11p" title="WAVE PHY/MAC (ITS-G5 / DSRC basis)" kind="IEEE" />
          <Ref code="EU EIP D6 2021" title="Implementation Guidance for C-ITS" kind="EU" />
          <Ref code="EU EIP D7 2021" title="Roadmap beyond Initial Deployment" kind="EU" />
          <Ref code="TransAID D5.1" title="Definition of V2X Message Sets" kind="EU" />
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      <Section id="where-next" title="Where Next">
        <p>
          Explore the related pages to go deeper on specific topics raised here:
        </p>
        <ul>
          <li><Link to="/access-layer">Access Layer</Link> — ITS-G5, C-V2X, spectrum, DCC congestion control, and multi-channel operation in detail.</li>
          <li><Link to="/mcm">Manoeuvre Coordination Message (MCM)</Link> — the Day 2 message enabling cooperative automated manoeuvres, directly informed by TransAID research.</li>
          <li><Link to="/c-roads">C-Roads Platform</Link> — the European deployment and interoperability testing platform that translates R&amp;D into certified service profiles.</li>
          <li><Link to="/eu-policy">EU Policy</Link> — ITS Directive, Delegated Acts, CCAM Partnership, and the regulatory framework governing C-ITS deployment.</li>
          <li><Link to="/global">Global Perspectives</Link> — how US DSRC/C-V2X experience, Japanese ETC2.0, and Chinese V2X compare with European C-ITS.</li>
          <li><Link to="/security">Security</Link> and <Link to="/pki">PKI &amp; Trust</Link> — the C-ITS Credential Management System, pseudonym certificates, and the ECTL.</li>
        </ul>
      </Section>
    </article>
  )
}
