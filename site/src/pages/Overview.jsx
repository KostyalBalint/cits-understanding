import React from 'react'
import { Link } from 'react-router-dom'
import { PageHeader, Section, Prose, Callout, Ref, Table, StatGrid, Stat, CardGrid, Card, Steps, Figure, LayerStack, DefList, Badge } from '../components/ui.jsx'

export default function Overview() {
  return (
    <article>
      <PageHeader
        kicker="Foundations"
        title="What is C-ITS?"
        intro="Cooperative Intelligent Transport Systems (C-ITS) enable vehicles, road infrastructure, and network services to exchange secured, trusted messages in real time — without any prior knowledge of each other. The result is a shared awareness of the road that no single sensor can provide alone, enabling safety warnings, traffic efficiency services, and the stepping stone toward automated driving."
        sources={['ETSI TR 101 607', 'ETSI TR 103 903', 'Directive 2010/40/EU', 'Directive (EU) 2023/2661']}
      />

      {/* ── 1. Definition & Core Concept ── */}
      <Section id="definition" title="Definition and core concept">
        <p>
          The EU regulatory framework defines C-ITS as <em>"intelligent transport systems that enable ITS users
          to interact and cooperate by exchanging secured and trusted messages, without any prior knowledge of
          each other and in a non-discriminatory manner"</em> (Directive (EU) 2023/2661). In practice this
          means any compliant road user — a car, a truck, a motorcycle, a pedestrian with a phone — or any
          piece of road infrastructure can broadcast and receive standardised messages that all participants
          understand, verify, and trust.
        </p>
        <p>
          The broader term <strong>V2X</strong> (Vehicle-to-Everything) captures the full range of
          communication directions: V2V (vehicle-to-vehicle), V2I (vehicle-to-infrastructure), V2N
          (vehicle-to-network / cloud), and V2P (vehicle-to-pedestrian / vulnerable road user). C-ITS is the
          European standardised realisation of V2X, grounded in ETSI, CEN, and ISO specifications and backed
          by EU mandate M/453.
        </p>
        <Callout type="key" title="The cooperative difference">
          A camera or radar only sees what is in its field of view. A C-ITS station shares its own state —
          position, speed, heading, brake status, detected hazard — with every station within radio range,
          extending each participant's situational awareness far beyond its own sensors and around blind
          corners.
        </Callout>
        <p>
          C-ITS information sharing is classified as <strong>tactical</strong> when the information demands a
          direct course of action within around one second (e.g. emergency brake warning, intersection
          collision risk). It is <strong>strategical</strong> when the information is intended for awareness
          of a situation several seconds or more ahead (e.g. road works ahead sign, weather warning). Tactical
          information imposes stricter data-quality, latency, and security requirements; strategic information
          can tolerate slightly looser constraints and may travel via cellular or cloud paths.
        </p>
      </Section>

      {/* ── 2. The problem it solves ── */}
      <Section id="problem" title="The problems C-ITS solves">
        <StatGrid cols={3}>
          <Stat value="~1.19 M" label="Road deaths in EU (2001–2023)" sub="Road safety remains a top EU priority" />
          <Stat value="~25 %" label="Accidents at intersections" sub="Where V2I warnings add most value" />
          <Stat value="~30 %" label="CO₂ reduction potential" sub="From smoother, cooperative traffic flow" />
        </StatGrid>
        <p>
          Road transport faces two intertwined challenges: <strong>safety</strong> and <strong>efficiency</strong>.
          Human reaction time averages around 1.5 seconds; a car at 130 km/h travels 54 metres in that time.
          C-ITS compresses the effective warning window by delivering machine-to-machine alerts before a
          hazard enters the driver's field of view. Simultaneously, coordinated signal-phase information from
          traffic lights (via SPATEM/MAPEM messages) lets vehicles approach junctions at the right speed,
          reducing stop-and-go waves and therefore fuel consumption and emissions.
        </p>
        <CardGrid cols={2}>
          <Card title="Safety use cases" accent="rose">
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Emergency Electronic Brake Light (EEBL) — V2V, &lt;100 ms</li>
              <li>Intersection Collision Risk Warning (ICRW)</li>
              <li>Longitudinal Collision Risk Warning (LCRW)</li>
              <li>Road Hazard Signalling (RHS) — slippery road, obstacle</li>
              <li>Emergency Vehicle Approaching</li>
              <li>Vulnerable Road User (pedestrian, cyclist) warnings</li>
            </ul>
          </Card>
          <Card title="Efficiency use cases" accent="emerald">
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Green Light Optimal Speed Advisory (GLOSA)</li>
              <li>In-Vehicle Signage (speed limits, variable signs)</li>
              <li>Road Works Warning</li>
              <li>Probe Vehicle Data for traffic management</li>
              <li>Electric Vehicle charging spot notification</li>
              <li>Tyre pressure and tyre information services</li>
            </ul>
          </Card>
        </CardGrid>
      </Section>

      {/* ── 3. Communication directions ── */}
      <Section id="v2x-directions" title="V2X communication directions">
        <DefList items={[
          {
            term: 'V2V — Vehicle to Vehicle',
            def: 'Direct short-range radio exchange between moving vehicles. The primary bearer is ITS-G5 (5.9 GHz, based on IEEE 802.11p/bd) or C-V2X (LTE/5G PC5 sidelink). No network infrastructure required; latency is typically under 10 ms over the air.',
          },
          {
            term: 'V2I — Vehicle to Infrastructure',
            def: 'Exchange between vehicles and Road-Side Units (RSUs) deployed at junctions, tunnels, variable message signs, or motorway gantries. RSUs bridge local radio with the road operator backend, enabling traffic management centre instructions to reach vehicles in real time.',
          },
          {
            term: 'V2N — Vehicle to Network',
            def: 'Cellular (3G/4G/5G) path to OEM backends, service providers, or central ITS platforms. Used for strategical information (map updates, weather, route-level hazards) and for C-Roads Hybrid deployments that carry C-ITS packets "sealed in an envelope" over IP networks.',
          },
          {
            term: 'V2P — Vehicle to Pedestrian / Vulnerable Road User',
            def: 'Warnings targeting pedestrians, cyclists, and power two-wheelers (PTWs). Covered by the Vulnerable road user Awareness Message (VAM) introduced in Release 2 (ETSI TS 103 300 series).',
          },
        ]} />
        <Callout type="info" title="Direct vs. indirect communications">
          C-ITS direct communication is <em>constellation-based</em>: no dynamic network configuration
          occurs; ITS stations broadcast into the shared radio medium and every station within range can
          receive. This contrasts with IP-configured (indirect) networks used by DFRS, NAPCORE, and OEM
          cloud backends. For tactical safety data, the constellation model is preferred because it requires
          no prior connection setup.
        </Callout>
      </Section>

      {/* ── 4. Actors / stakeholders ── */}
      <Section id="actors" title="Actors in the C-ITS ecosystem">
        <p>
          The C-ITS ecosystem (as framed by ETSI TR 103 903) has a deliberately small number of active
          actors compared to the broader internet ecosystem. Each actor operates one or more
          <strong> ITS Stations (ITS-S)</strong> — the hardware/software component that implements the
          standardised protocol stack.
        </p>
        <CardGrid cols={3}>
          <Card title="Vehicles (OBUs)" icon="🚗" accent="brand">
            On-Board Units in passenger cars, trucks, motorcycles, buses. The primary source of CAM
            (Cooperative Awareness Message) broadcasts at up to 10 Hz. OEM backends connect via V2N for
            software updates and map services.
          </Card>
          <Card title="Road-Side Units (RSUs)" icon="🚦" accent="amber">
            Fixed infrastructure at junctions, road-works zones, tunnels. Broadcast DENM hazard alerts,
            SPATEM signal-phase data, MAPEM intersection maps, and IVIM in-vehicle information messages.
            Typically operated by road authorities.
          </Card>
          <Card title="Central Stations" icon="🏢" accent="emerald">
            Traffic management centres and road operator backends. Aggregate probe data, issue road-works
            warnings, manage the RSU network, and interface to national access points (NAPs) for SRTI
            (Safety Related Traffic Information).
          </Card>
          <Card title="Road Operators" icon="🛣️" accent="violet">
            Motorway and urban road authorities responsible for deploying RSUs, configuring C-ITS services,
            and complying with Directive (EU) 2023/2661. C-Roads is the EU coordination project for
            harmonised road operator deployment.
          </Card>
          <Card title="OEMs &amp; Tier-1 Suppliers" icon="🔧" accent="cyan">
            Vehicle manufacturers implementing OBU hardware and software to C-Roads / C2C-CC profiles.
            Responsible for certificate provisioning via the EU CCMS (C-ITS Security Credential Management
            System) and for vehicle type approval.
          </Card>
          <Card title="Vulnerable Road Users" icon="🚶" accent="rose">
            Pedestrians, cyclists, and PTW riders. Their devices (smartphones, smart helmets) act as
            ITS-S stations, sending VAM messages and receiving hazard alerts in Release 2.
          </Card>
        </CardGrid>
      </Section>

      {/* ── 5. Service phases Day-1 / Day-1.5 / Day-2 ── */}
      <Section id="service-phases" title="Service deployment phases: Day-1, Day-1.5, Day-2">
        <p>
          The industry and regulators have structured C-ITS service rollout into phased "Days" that reflect
          increasing capability, complexity, and automation level:
        </p>
        <Steps>
          <div>
            <strong>Day-1 — Cooperative awareness and hazard warning</strong>: The foundational services
            standardised in Release 1. Every equipped vehicle broadcasts a CAM up to 10 Hz (position, speed,
            heading, vehicle dimensions). RSUs broadcast DENM hazard alerts. Applications include EEBL, road
            hazard signalling, road works warning, and slow/stationary vehicle warning. These services operate
            purely on ITS-G5 direct V2X in the 5.9 GHz band and require no cloud connectivity.
          </div>
          <div>
            <strong>Day-1.5 — Infrastructure-assisted and extended services</strong>: Builds on Day-1 with
            more message types (SPATEM/MAPEM for green-light advisory, IVIM for in-vehicle signs) and the
            hybrid V2I + V2N architecture of C-Roads. Road operators deploy RSUs at priority corridors;
            vehicles begin receiving traffic management centre data. Security credential management (EU CCMS)
            is activated for production deployments.
          </div>
          <div>
            <strong>Day-2 — Cooperative perception and automated driving support</strong>: Introduced
            conceptually in Release 2. Collective Perception Messages (CPM) let vehicles share sensor
            detections (detected objects, free-space maps) with each other and with infrastructure. Vulnerable
            road user Awareness Messages (VAM) protect pedestrians and cyclists. Manoeuvre Coordination
            Messages (MCM) begin to support cooperative automated driving. Multi-Channel Operation (MCO) /
            Resource Management at the facilities layer handles the increased channel load. IPv6 integration
            (Release 2 profile) enables seamless roaming between direct V2X and cellular paths.
          </div>
        </Steps>
        <Callout type="tip" title="Release ≠ Day">
          "Release" is a standards concept; "Day" is a deployment concept. Day-1 services are covered by
          Release 1 standards. Day-1.5 and Day-2 services draw on Release 2 standards and, where
          backwards-compatible, can be deployed alongside Release 1 equipment.
        </Callout>
      </Section>

      {/* ── 6. Release 1 vs Release 2 ── */}
      <Section id="releases" title="ETSI Release 1 vs Release 2">
        <p>
          ETSI adopts a release-oriented development process (analogous to 3GPP releases). Each release is a
          coherent <em>toolbox</em> of standards — functionality specs, sub-system specs, testing specs, and
          framing documents — from which implementers and profiling bodies (C2C-CC, C-Roads) build
          deployable systems. A Release x+1 station must be backward-compatible with Release x: it must
          obtain the same level of service in a Release x environment, and a Release x station must maintain
          full functionality in a Release x+1 environment (a regulatory requirement for C-ITS per
          Directive (EU) 2023/2661).
        </p>
        <Table
          caption="Release 1 vs Release 2 — key differences"
          headers={['Aspect', 'Release 1 (ETSI TR 101 607 V1.x)', 'Release 2 (ETSI TR 101 607 V2.x)']}
          rows={[
            [
              'Framing document',
              'ETSI TR 101 607 V1.2.1 (2020)',
              'ETSI TR 101 607 V2.x + ETSI TR 103 903 V2.1.1 (2026)',
            ],
            [
              'Core V2V message',
              <>CAM — <Ref code="EN 302 637-2" title="CAM" kind="ETSI" /> up to 10 Hz periodic</>,
              'CAM retained; CPM (Collective Perception Message) added',
            ],
            [
              'Hazard / event message',
              <>DENM — <Ref code="EN 302 637-3" title="DENM" kind="ETSI" /> event-triggered</>,
              'DENM retained and extended',
            ],
            [
              'Vulnerable road users',
              'Not covered',
              'VAM (Vulnerable road user Awareness Message) — ETSI TS 103 300 series',
            ],
            [
              'Collective perception',
              'Not covered',
              'CPM (Collective Perception Message) — sensors share detected objects',
            ],
            [
              'Manoeuvre coordination',
              'Not covered',
              'MCM (Manoeuvre Coordination Message) — cooperative AD support',
            ],
            [
              'Multi-channel / resource mgmt',
              'DCC at access layer (ETSI TS 102 687); single-channel focus',
              'Resource Management (RM) at facilities layer (ETSI TS 103 141, ETSI TS 103 697); MCO study (ETSI TR 103 439, TR 104 073)',
            ],
            [
              'IPv6 integration',
              <>Basic IPv6 over GeoNetworking — <Ref code="EN 302 636-6-1" title="IPv6/GN" kind="ETSI" /></>,
              'Updated IPv6 profile in Release 2 standard set; hybrid V2X + cellular paths',
            ],
            [
              'Security',
              'ETSI TS 102 940 / 102 941 / TS 103 097; EU CCMS concept',
              'Security standards updated for new messages; ASIL (ISO 26262-9) compliance considered',
            ],
            [
              'Access technology',
              'ITS-G5 (IEEE 802.11p) primary; LTE-V2X defined (ETSI TS 103 613)',
              'ITS-G5 (IEEE 802.11bd included); C-V2X LTE/5G-NR sidelink profiles (ETSI TS 103 723)',
            ],
            [
              'Architecture docs',
              <>ETSI EN 302 665 Communications Architecture</>,
              'ETSI TR 103 903 Framework (ecosystem, architectural guidance, release principles)',
            ],
          ]}
        />
        <Callout type="info" title="How to spot a Release 2 document">
          Release 1 documents carry no "Release" statement in their title. Release 2 documents explicitly
          include "Release 2" in the title — for example "Intelligent Transport Systems (ITS); Facilities
          Layer; Multi-Channel Operation (MCO) for Cooperative ITS (C-ITS); Release 2". The version number
          major digit also encodes the release (V2.x.x = Release 2).
        </Callout>
      </Section>

      {/* ── 7. Standards ecosystem ── */}
      <Section id="standards-ecosystem" title="The standards ecosystem — who makes what">
        <p>
          C-ITS interoperability is the product of coordinated work across several Standards Developing
          Organizations (SDOs), industry consortia, and regulatory bodies. No single organisation owns the
          full stack:
        </p>
        <CardGrid cols={2}>
          <Card title="ETSI TC ITS" icon="🇪🇺" accent="brand">
            European Telecommunications Standards Institute, Technical Committee ITS. Produces the normative
            EN and TS specifications covering the full protocol stack: access layer (ITS-G5, C-V2X), GeoNetworking,
            BTP, facilities messages (CAM, DENM, CPM, VAM…), security formats, and management. Releases are
            catalogued in ETSI TR 101 607.
          </Card>
          <Card title="CEN / ISO" icon="🌐" accent="amber">
            CEN TC 278 and ISO TC 204 cover road transport informatics. Key contributions include the
            DATEX II data exchange standard (used by NAPCORE / NAPs for SRTI), cooperative ITS station
            specifications harmonised with ETSI, and EFC (Electronic Fee Collection) standards that coexist
            in the 5.8–5.9 GHz band.
          </Card>
          <Card title="IEEE / SAE" icon="🇺🇸" accent="emerald">
            IEEE 802.11p (now folded into IEEE 802.11-2025 including 802.11bd) defines the PHY/MAC
            underlying ITS-G5. SAE J2735 defines the DSRC message set (BSM, MAP, SPaT) widely deployed in
            North America. ETSI ITS is harmonised with these where technically feasible.
          </Card>
          <Card title="C-Roads Platform" icon="🛣️" accent="violet">
            EU-funded project bringing together road operators from 20+ member states. Publishes the
            harmonised C-ITS specifications profile (C-Roads Profile, "Release 2" edition) that maps ETSI
            toolbox standards to concrete, interoperable deployment requirements. The reference for European
            road operator rollout.
          </Card>
          <Card title="CAR 2 CAR Communication Consortium (C2C-CC)" icon="🏎️" accent="cyan">
            Industry consortium of vehicle manufacturers and suppliers. Publishes the Basic System Profile
            (BSP) that profiles ETSI standards for OBU implementation. Together with C-Roads, C2C-CC
            defines the interoperability baseline used in European type approval.
          </Card>
          <Card title="EU Commission &amp; Regulation" icon="⚖️" accent="rose">
            Directive 2010/40/EU (ITS Directive) and its amendment Directive (EU) 2023/2661 set the legal
            framework and mandate for C-ITS deployment. Delegated Regulations cover SRTI (No 886/2013),
            RTTI (2015/962), and NAPs (2022/670). The EU CCMS manages the root-of-trust for C-ITS security
            certificates in Europe.
          </Card>
        </CardGrid>
      </Section>

      {/* ── 8. Protocol stack preview ── */}
      <Section id="stack-preview" title="The protocol stack — a preview">
        <p>
          Every C-ITS station implements a layered protocol architecture derived from the OSI reference
          model. The ETSI ITS-S architecture maps onto OSI as follows: the Access Layer covers OSI layers 1
          and 2; the Networking &amp; Transport Layer covers OSI layers 3 and 4; the Facilities Layer covers
          OSI layers 5–7; and Applications sit above the stack. Two cross-cutting planes — Security and
          Management — interact with all layers.
        </p>
        <LayerStack
          layers={[
            { name: 'Applications', sub: 'CAM, DENM, CPM, VAM, SPATEM, MAPEM, IVIM, MCM …', accent: 'brand' },
            { name: 'Facilities Layer', sub: 'Message encoding (ASN.1), LDM, PoTi, Service Announcement, Resource Management', accent: 'violet' },
            { name: 'Networking & Transport', sub: 'GeoNetworking (EN 302 636-4-1) · BTP (EN 302 636-5-1) · IPv6/GN (EN 302 636-6-1)', accent: 'amber' },
            { name: 'Access Layer', sub: 'ITS-G5 / IEEE 802.11p/bd (EN 302 663) · C-V2X LTE/5G-NR (TS 103 723) · DCC / RM', accent: 'emerald' },
          ]}
          leftRail="Security"
          rightRail="Management"
        />
        <p className="mt-4">
          The key architectural insight is that C-ITS direct communication is <em>constellation-based</em>
          rather than configuration-based: no TCP handshake, no session establishment. A vehicle's OBU
          broadcasts its CAM message into the radio medium; all stations in range receive and decode it
          autonomously. Security (signing with a pseudonym certificate) happens at the Networking &amp; Transport
          Layer so that GeoNetworking can forward signed packets without unpacking them.
        </p>
        <Callout type="tip" title="Dive deeper">
          The full layer-by-layer breakdown — including protocol field details, timing rules, and
          message flows — is in the <Link to="/architecture" className="underline text-brand-300">Architecture</Link> page.
          Individual message pages cover <Link to="/cam" className="underline text-brand-300">CAM</Link>,{' '}
          <Link to="/denm" className="underline text-brand-300">DENM</Link>,{' '}
          <Link to="/cpm" className="underline text-brand-300">CPM</Link>,{' '}
          <Link to="/vam" className="underline text-brand-300">VAM</Link>, and{' '}
          <Link to="/mcm" className="underline text-brand-300">MCM</Link>.
        </Callout>
      </Section>

      {/* ── 9. Key standards ── */}
      <Section id="key-standards" title="Key standards referenced on this page">
        <div className="flex flex-wrap gap-3">
          <Ref code="TR 101 607" title="C-ITS Release 1" kind="ETSI" />
          <Ref code="TR 103 903" title="Framework Release 2" kind="ETSI" />
          <Ref code="EN 302 665" title="Communications Architecture" kind="ETSI" />
          <Ref code="EN 302 637-2" title="CAM (ETSI)" kind="ETSI" />
          <Ref code="EN 302 637-3" title="DENM (ETSI)" kind="ETSI" />
          <Ref code="EN 302 636-4-1" title="GeoNetworking" kind="ETSI" />
          <Ref code="EN 302 636-5-1" title="BTP" kind="ETSI" />
          <Ref code="EN 302 636-6-1" title="IPv6/GN" kind="ETSI" />
          <Ref code="EN 302 663" title="ITS-G5 Access Layer" kind="ETSI" />
          <Ref code="TS 102 687" title="DCC Access Layer" kind="ETSI" />
          <Ref code="TS 103 097" title="Security Header/Cert Formats" kind="ETSI" />
          <Ref code="TS 102 940" title="Security Architecture" kind="ETSI" />
          <Ref code="TS 103 723" title="LTE-V2X Profile" kind="ETSI" />
          <Ref code="TR 104 073" title="RM Study Release 2" kind="ETSI" />
          <Ref code="Directive 2010/40/EU" title="ITS Directive" kind="EU" />
          <Ref code="Directive (EU) 2023/2661" title="ITS Directive Amendment" kind="EU" />
          <Ref code="C-Roads Profile R2" title="Harmonised C-ITS Specs" kind="C-Roads" />
          <Ref code="BSP" title="Basic System Profile" kind="C2CCC" />
        </div>
      </Section>

      {/* ── 10. Where next ── */}
      <Section id="where-next" title="Where next?">
        <CardGrid cols={3}>
          <Card title="Architecture" accent="brand">
            Full protocol stack deep-dive: layers, interfaces, message flows, and the ITS-S reference
            architecture. <Link to="/architecture" className="underline text-brand-300 text-sm">Read →</Link>
          </Card>
          <Card title="Access Layer" accent="amber">
            ITS-G5, C-V2X, the 5.9 GHz band, channel plan, and Decentralized Congestion Control.{' '}
            <Link to="/access-layer" className="underline text-brand-300 text-sm">Read →</Link>
          </Card>
          <Card title="CAM" accent="emerald">
            The Cooperative Awareness Message — generation rules, fields, 10 Hz timing, and triggering
            conditions. <Link to="/cam" className="underline text-brand-300 text-sm">Read →</Link>
          </Card>
          <Card title="DENM" accent="violet">
            Decentralised Environmental Notification Message — event detection, relevance area, and
            forwarding. <Link to="/denm" className="underline text-brand-300 text-sm">Read →</Link>
          </Card>
          <Card title="Security &amp; PKI" accent="rose">
            Pseudonym certificates, the EU CCMS, ETSI TS 103 097 security header, and privacy
            guarantees. <Link to="/security" className="underline text-brand-300 text-sm">Read →</Link>
          </Card>
          <Card title="C-Roads &amp; Deployment" accent="cyan">
            How the standards become a real road-side deployment: C-Roads profiles, interoperability
            tests, and Day-1 corridors. <Link to="/c-roads" className="underline text-brand-300 text-sm">Read →</Link>
          </Card>
        </CardGrid>
      </Section>
    </article>
  )
}
