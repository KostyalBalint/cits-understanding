import React from 'react'
import { Link } from 'react-router-dom'
import { PageHeader, Section, Prose, Callout, Ref, Table, StatGrid, Stat, CardGrid, Card, Steps, Figure, LayerStack, DefList, Badge } from '../components/ui.jsx'

export default function Architecture() {
  return (
    <article>
      <PageHeader
        kicker="CORE STANDARD"
        title="ITS Station Architecture"
        intro="Every C-ITS device — whether a car, a roadside unit, a traffic-management centre, or a smartphone — is modelled as an ITS Station (ITS-S). The ITS-S reference architecture, defined in ETSI EN 302 665 (equivalent to ISO 21217), specifies a layered OSI-based protocol stack augmented by two cross-cutting vertical entities — Management and Security — that span all layers. Understanding this architecture is the prerequisite for everything else in C-ITS."
        sources={['ETSI EN 302 665', 'ISO 21217', 'ETSI TR 103 902', 'ETSI TS 103 697']}
      />

      {/* ── Section 1: Why a Reference Architecture ── */}
      <Section id="rationale" title="Why a Reference Architecture?">
        <p>
          Cooperative ITS must work across an enormous range of contexts: a vehicle travelling at motorway speed, a roadside
          gantry with a fixed backhaul, a traffic-management centre receiving data from thousands of sensors, and a pedestrian
          with a smartphone. The communication technologies also vary — ITS-G5 (DSRC-derived 5 GHz radio), LTE/5G-NR,
          infrared, satellite broadcast, and more. Without a common framework, interoperability would be impossible.
        </p>
        <p>
          ETSI EN 302 665 solves this by defining a single <strong>ITS Station Reference Architecture</strong> that every
          conformant ITS-S must follow. The architecture is deliberately a <em>tool-box</em>: conformance does not require
          implementing every element, but every implemented element must follow the defined structure and interfaces.
          The design follows the OSI layered model extended to include ITS applications above the stack, plus the two
          cross-cutting entities.
        </p>
        <Callout type="key" title="One architecture, all station types">
          The same ITS-S reference architecture applies to vehicle OBUs, roadside RSUs, central servers, and personal
          devices. What differs is which functional components are present and how many physical units implement them.
        </Callout>
        <p>
          The architecture is aligned with the parallel ISO TC204 WG16 CALM (Communications Access for Land Mobiles)
          work — ISO 21217 covers the same architecture at the international level, while ETSI EN 302 665 is the European
          transposition.
        </p>
      </Section>

      {/* ── Section 2: The Layered Stack ── */}
      <Section id="layers" title="The Four Horizontal Layers">
        <p>
          The protocol stack in the ITS-S reference architecture has three communication layers, extended upward by an
          applications block. From bottom to top:
        </p>

        <LayerStack
          layers={[
            { name: 'Applications', sub: 'ITS-S applications — road safety, traffic efficiency, other', accent: 'violet' },
            { name: 'Facilities', sub: 'OSI layers 5–7 · LDM · encoding · HMI · session support', accent: 'emerald' },
            { name: 'Networking & Transport', sub: 'OSI layers 3–4 · GeoNetworking · IPv6 · BTP · UDP/TCP', accent: 'brand' },
            { name: 'Access', sub: 'OSI layers 1–2 · ITS-G5 · LTE-V2X · IR · DSRC · PHY + MAC/LLC', accent: 'amber' },
          ]}
          leftRail="Management"
          rightRail="Security"
        />

        <p className="mt-6">
          Each layer exposes a <strong>Service Access Point (SAP)</strong> upward and downward, and also connects to the
          Management and Security entities through named interfaces (see the Interfaces section below).
        </p>

        <h3 className="text-lg font-semibold mt-6 mb-2 text-slate-200">Access Layer (AL)</h3>
        <p>
          The Access Layer (AL) covers OSI layers 1 and 2 — the Physical Layer (PHY) and Data Link Layer (DLL). The DLL
          is subdivided into a Medium Access Control (MAC) sub-layer and a Logical Link Control (LLC) sub-layer. The AL
          is technology-agnostic in the architecture: the same layer management framework wraps ITS-G5, LTE-V2X,
          infrared, and legacy DSRC technologies.
        </p>
        <p>
          To accommodate legacy access technologies a Communication Adaptation Layer (CAL) may sit at the top of the DLL,
          together with a Management Adaptation Entity (MAE) and a Security Adaptation Entity (SAE). The AL provides
          upward services via the IN-interface to Networking &amp; Transport, connects to Management via the MI-interface,
          and to Security via the SI-interface.
        </p>
        <p>
          Logical Channels (LCHs) are numbered sequentially (LCH0 to LCH255) and mapped onto physical channels by the
          access technology standard. LCH0 is reserved for management communications between ITS stations; LCH1 for
          service advertisement / session initialization; LCH2 for data exchange in sessions.
        </p>
        <p>
          Prioritization operates at two levels: just below the IN-interface (DLL priority queues per-station) and inside the
          PHY (channel contention classes, e.g. the four IEEE 802.11p access categories AC_VO, AC_VI, AC_BE, AC_BK).
        </p>
        <p>
          <Link to="/access-layer" className="text-brand-400 underline">See the Access Layer page</Link> for full protocol details.
        </p>

        <h3 className="text-lg font-semibold mt-6 mb-2 text-slate-200">Networking &amp; Transport Layer (N&amp;T)</h3>
        <p>
          The Networking &amp; Transport Layer covers OSI layers 3 and 4. It supports multiple networking protocols
          simultaneously, including:
        </p>
        <ul className="list-disc list-inside space-y-1 text-slate-300 my-3">
          <li>GeoNetworking (GN) — topology-free geographic addressing and forwarding</li>
          <li>IPv6 with mobility support (ISO 21210)</li>
          <li>IPv6 over GeoNetworking (ETSI TS 102 636-6-1)</li>
          <li>CALM FAST protocol (non-IP single-hop, ISO 29281)</li>
          <li>Other protocols as needed</li>
        </ul>
        <p>
          Transport protocols available include UDP, TCP, and ITS-specific dedicated transport protocols such as BTP
          (Basic Transport Protocol). Each networking protocol may pair with its own dedicated transport protocol or with
          a standard one. The layer connects upward to Facilities via the NF-interface, to Access via the IN-interface,
          to Management via the MN-interface, and to Security via the SN-interface.
        </p>
        <p>
          <Link to="/networking" className="text-brand-400 underline">See the Networking &amp; Transport page</Link> for GeoNetworking and BTP details.
        </p>

        <h3 className="text-lg font-semibold mt-6 mb-2 text-slate-200">Facilities Layer (FL)</h3>
        <p>
          The Facilities Layer covers OSI layers 5, 6, and 7 for ITS. It provides shared infrastructure services to
          ITS-S applications, removing the need for every application to re-implement common functionality. Key facilities
          include:
        </p>
        <ul className="list-disc list-inside space-y-1 text-slate-300 my-3">
          <li>Local Dynamic Map (LDM) — a spatially and temporally indexed store of dynamic objects</li>
          <li>Position and time support (GNSS integration, timestamping)</li>
          <li>Data presentation — ASN.1 encoding/decoding</li>
          <li>Addressing support — selection of lower-layer addressing mode</li>
          <li>Generic HMI support — presenting information to drivers or automated systems</li>
          <li>Message management — CAMs (periodic), DENMs (event), service messages</li>
          <li>Relevance checking — whether a received message applies to the current context</li>
          <li>Station capabilities management — station type, supported channels</li>
          <li>SOA application protocol support — session establishment, mobility handover</li>
          <li>Support for DSRC legacy applications</li>
          <li>Channel selection / CI selection manager</li>
        </ul>
        <p>
          The Facilities Layer connects upward to Applications via the FA-interface, downward to Networking &amp; Transport
          via the NF-interface, to Management via the MF-interface, and to Security via the SF-interface.
        </p>
        <p>
          <Link to="/facilities" className="text-brand-400 underline">See the Facilities Layer page</Link> for LDM, encoding, and service details.
        </p>

        <h3 className="text-lg font-semibold mt-6 mb-2 text-slate-200">Applications</h3>
        <p>
          ITS-S applications reside above the Facilities Layer. An <em>ITS application</em> is defined as an association of
          two or more complementary ITS-S application fragments — for example, a server-side fragment in a central ITS
          station and a client-side fragment in a vehicle ITS station. Together they provide an <em>ITS service</em> to the
          user. Applications are initially grouped into: Road Safety, Traffic Efficiency, and Other Applications.
        </p>
        <p>
          Every ITS application must be registered with an ITS application identifier (ITS-AID) and assigned both a
          priority (which governs the maximum channel access priority at the AL) and a logical channel type for data
          transmission.
        </p>
        <p>
          <Link to="/applications" className="text-brand-400 underline">See the Applications page</Link> for CAM, DENM, CPM, and other services.
        </p>
      </Section>

      {/* ── Section 3: Management & Security Verticals ── */}
      <Section id="verticals" title="The Two Vertical Entities: Management and Security">
        <p>
          Two entities span the entire stack vertically, interfacing with every layer. This makes them cross-layer by
          definition, which is why they appear as side rails rather than horizontal layers.
        </p>

        <CardGrid cols={2}>
          <Card title="Management Entity" accent="brand">
            <p className="text-slate-300 text-sm mb-2">
              The Communication and Station Management Entity (often called simply the Management entity) is responsible
              for managing all aspects of communications within the ITS station. It maintains a Management Information
              Base (MIB) and provides:
            </p>
            <ul className="list-disc list-inside text-slate-400 text-sm space-y-1">
              <li>Cross-interface management</li>
              <li>Inter-Unit Management Communication (IUMC)</li>
              <li>Networking management</li>
              <li>Communications service management</li>
              <li>ITS application management (install, update, remove)</li>
              <li>Station management (identity, capabilities)</li>
              <li>General congestion control coordination</li>
              <li>ITS service advertisement management (FAST)</li>
              <li>CI / ITS-S application mapping</li>
              <li>Local Node Map maintenance</li>
              <li>Regulatory information management</li>
            </ul>
            <p className="text-slate-400 text-sm mt-2">
              Interfaces: MA (to Applications), MF (to Facilities), MN (to Networking &amp; Transport), MI (to Access), MS (to Security).
            </p>
          </Card>
          <Card title="Security Entity" accent="rose">
            <p className="text-slate-300 text-sm mb-2">
              The Security Entity provides security services to all layers and to the Management entity. It maintains a
              Security Information Base (SIB) and may include Hardware Security Modules (HSMs). Functions include:
            </p>
            <ul className="list-disc list-inside text-slate-400 text-sm space-y-1">
              <li>Firewall and intrusion management</li>
              <li>Authentication and authorisation</li>
              <li>Identity, crypto key and certificate management</li>
              <li>Security profile management</li>
              <li>Hardware Security Module (HSM) support</li>
            </ul>
            <p className="text-slate-400 text-sm mt-2">
              Interfaces: SA (to Applications), SF (to Facilities), SN (to Networking &amp; Transport), SI (to Access), MS (to Management).
            </p>
          </Card>
        </CardGrid>

        <Callout type="info" title="Security as a sub-entity of Management">
          EN 302 665 notes that Security "can also be considered as a specific part of the management entity." In practice,
          the two are always shown as distinct entities because their SAP interfaces are specified independently, and an
          implementation may separate them physically (e.g. a dedicated HSM chip).
        </Callout>

        <p>
          <Link to="/management" className="text-brand-400 underline">See the Management page</Link> for congestion control, service advertisement, and MIB details.
          {' '}<Link to="/security" className="text-brand-400 underline">See the Security page</Link> for PKI, certificates, and the CCMS.
        </p>
      </Section>

      {/* ── Section 4: Interfaces between Layers ── */}
      <Section id="interfaces" title="Named Inter-Layer Interfaces (SAPs)">
        <p>
          The connections between architectural blocks are formally named interfaces. These names appear throughout all
          ETSI ITS standards and must be understood to read any specification correctly. The naming convention encodes the
          two entities being connected: the first letter(s) are an entity abbreviation, the second letter is another entity
          abbreviation.
        </p>

        <Table
          caption="ITS-S reference architecture named interfaces (SAPs)"
          headers={['Interface', 'Between', 'Direction', 'Specified in']}
          rows={[
            ['IN', 'Access Layer ↔ Networking & Transport', 'Data services upward, requests downward', 'ETSI TS 102 723-10'],
            ['NF', 'Networking & Transport ↔ Facilities', 'Data services upward, requests downward', 'ETSI TS 102 723-11'],
            ['FA', 'Facilities ↔ Applications', 'Services upward to applications', '(in Facilities spec)'],
            ['MI', 'Management ↔ Access Layer', 'Management services', 'ETSI TS 102 723-3'],
            ['MN', 'Management ↔ Networking & Transport', 'Management services', 'ETSI TS 102 723-4'],
            ['MF', 'Management ↔ Facilities', 'Management services', 'ETSI TS 102 723-5'],
            ['MA', 'Management ↔ Applications', 'Management services to applications', '(in Management spec)'],
            ['MS', 'Management ↔ Security', 'Security management services', 'ETSI TS 102 723-6'],
            ['SI', 'Security ↔ Access Layer', 'Security services to/from AL', 'ETSI TS 102 723-7'],
            ['SN', 'Security ↔ Networking & Transport', 'Security services to/from N&T', 'ETSI TS 102 723-8'],
            ['SF', 'Security ↔ Facilities', 'Security services to/from FL', 'ETSI TS 102 723-9'],
            ['SA', 'Security ↔ Applications', 'Security services to applications', '(in Security spec)'],
          ]}
        />

        <Callout type="tip" title="SAP specifications are informative, but ASN.1 types are normative">
          EN 302 665 clarifies: the specification of SAPs shall be informative functional specifications; however,
          the type and parameters of service primitives shall be specified using ASN.1 PER so that they can be
          uniquely embedded in testable Protocol Data Units (PDUs).
        </Callout>

        <Figure caption="Interface naming pattern: first letter = source entity, second letter = destination entity. E.g. MN = Management to Networking&Transport; SN = Security to Networking&Transport.">
          <div className="grid grid-cols-3 gap-3 text-sm font-mono">
            {[
              { code: 'IN', desc: 'Access ↔ N&T' },
              { code: 'NF', desc: 'N&T ↔ Facilities' },
              { code: 'FA', desc: 'Facilities ↔ Apps' },
              { code: 'MI', desc: 'Mgmt ↔ Access' },
              { code: 'MN', desc: 'Mgmt ↔ N&T' },
              { code: 'MF', desc: 'Mgmt ↔ Facilities' },
              { code: 'MA', desc: 'Mgmt ↔ Apps' },
              { code: 'MS', desc: 'Mgmt ↔ Security' },
              { code: 'SI', desc: 'Sec ↔ Access' },
              { code: 'SN', desc: 'Sec ↔ N&T' },
              { code: 'SF', desc: 'Sec ↔ Facilities' },
              { code: 'SA', desc: 'Sec ↔ Apps' },
            ].map(({ code, desc }) => (
              <div key={code} className="flex items-center gap-2 bg-ink-900 border border-ink-700 rounded p-2">
                <Badge tone="brand">{code}</Badge>
                <span className="text-slate-400 text-xs">{desc}</span>
              </div>
            ))}
          </div>
        </Figure>
      </Section>

      {/* ── Section 5: ITS Station Types ── */}
      <Section id="station-types" title="Types of ITS Stations and Sub-systems">
        <p>
          Four ITS sub-systems are defined, each containing an ITS station of the corresponding type. The same reference
          architecture applies to all; what changes is the deployment context and the functional components that are
          present.
        </p>

        <CardGrid cols={2}>
          <Card title="Vehicle ITS Station" icon="🚗" accent="brand">
            <p className="text-slate-300 text-sm">
              Deployed in cars, trucks, motorcycles, and other road vehicles — whether in motion or parked.
              The vehicle ITS-S typically includes:
            </p>
            <ul className="list-disc list-inside text-slate-400 text-sm mt-2 space-y-1">
              <li>An ITS-S host (full stack + applications)</li>
              <li>A vehicle ITS-S gateway — bridges the proprietary in-vehicle network (ECU / CAN bus) to the ITS
                  station-internal network</li>
              <li>An ITS-S router — connects to ITS ad hoc networks (V2V, V2I via ITS-G5)</li>
            </ul>
            <p className="text-slate-400 text-sm mt-2">
              Access to ECUs is out of scope for EN 302 665; it is implementation-specific.
            </p>
          </Card>
          <Card title="Roadside ITS Station" icon="🚦" accent="amber">
            <p className="text-slate-300 text-sm">
              Fixed installations on gantries, poles, and at intersections. Roadside ITS-Ss typically have:
            </p>
            <ul className="list-disc list-inside text-slate-400 text-sm mt-2 space-y-1">
              <li>An ITS-S host</li>
              <li>A roadside ITS-S gateway — bridges sensors (inductive loops, variable message signs) to the
                  ITS station-internal network</li>
              <li>An ITS-S router — ITS ad hoc (V2I / I2V)</li>
              <li>An ITS-S border router — connects to core networks / Internet</li>
            </ul>
          </Card>
          <Card title="Central ITS Station" icon="🏢" accent="emerald">
            <p className="text-slate-300 text-sm">
              Traffic-management centres, cloud back-ends, and map providers. Central ITS-Ss typically include:
            </p>
            <ul className="list-disc list-inside text-slate-400 text-sm mt-2 space-y-1">
              <li>An ITS-S host</li>
              <li>A central ITS-S gateway — bridges the central system to the ITS station-internal network</li>
              <li>An ITS-S border router — connects to infrastructure / Internet</li>
            </ul>
          </Card>
          <Card title="Personal ITS Station" icon="📱" accent="violet">
            <p className="text-slate-300 text-sm">
              Hand-held devices such as smartphones, PDAs, or wearables carried by pedestrians or cyclists
              (Vulnerable Road Users). A personal ITS-S:
            </p>
            <ul className="list-disc list-inside text-slate-400 text-sm mt-2 space-y-1">
              <li>Contains the full ITS-S host</li>
              <li>May also perform HMI functionality for another ITS sub-system, connecting via the ITS
                  station-internal network</li>
              <li>Sends VAM (VRU Awareness Messages) to warn nearby vehicles</li>
            </ul>
          </Card>
        </CardGrid>

        <Callout type="info" title="ITS station-internal network">
          When a single ITS station is implemented across multiple physical units (e.g. a separate OBU and antenna unit in
          a vehicle), they are interconnected via the <em>ITS station-internal network</em>. This internal network may be
          wired (Ethernet) or wireless (Bluetooth). From a protocol perspective there is no difference between an internal
          and an external communication interface — the same management and security frameworks apply.
        </Callout>
      </Section>

      {/* ── Section 6: Functional Components ── */}
      <Section id="functional-components" title="Functional Components within an ITS Station">
        <p>
          Within a single ITS-S sub-system, different <em>functional components</em> may be present. These define the
          functional role and protocol depth of each unit:
        </p>

        <DefList items={[
          {
            term: 'ITS-S Host',
            def: 'Implements the full ITS station reference architecture including ITS-S applications. This is the minimal entity that can originate or terminate ITS application data. Every ITS station contains at least one ITS-S host.',
          },
          {
            term: 'ITS-S Router',
            def: 'Implements all layers of the reference architecture except Applications and Facilities. Interconnects two different ITS protocol stacks at layer 3 (networking layer). May convert protocols. Typically connects the ITS station-internal network to an ITS ad hoc network.',
          },
          {
            term: 'ITS-S Border Router',
            def: 'Same function as an ITS-S router but the external protocol stack may not follow ITS management and security principles. Used to connect the ITS domain to the generic domain (e.g. Internet, cellular). One side is the ITS stack; the other side is a generic OSI stack (layers 1–3).',
          },
          {
            term: 'ITS-S Gateway',
            def: 'Interconnects two different OSI protocol stacks at layers 5–7. Converts protocols between the proprietary network (e.g. CAN bus with ECUs, roadside sensor networks) and the ITS station-internal network. Used in vehicle, roadside, and central sub-systems.',
          },
          {
            term: 'ITS-S Interceptor',
            def: 'Generic term covering ITS-S gateway, ITS-S router, ITS-S border router, or any implementation-specific connector between the ITS station-internal network and another network.',
          },
        ]} />

        <Figure caption="Networking view: an ITS station connects to ITS ad hoc networks via ITS-S routers, to access/core networks via ITS-S border routers, and to proprietary local networks via ITS-S gateways.">
          <div className="flex flex-col gap-3 items-center text-sm">
            <div className="flex gap-4 items-end justify-center flex-wrap">
              <div className="flex flex-col items-center gap-1">
                <div className="bg-brand-900 border border-brand-700 rounded px-3 py-1 text-brand-300 font-mono text-xs">ITS ad hoc network</div>
                <div className="w-px h-4 bg-slate-600" />
                <div className="bg-ink-800 border border-ink-600 rounded px-2 py-1 text-slate-400 text-xs">ITS-S Router</div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="bg-amber-900 border border-amber-700 rounded px-3 py-1 text-amber-300 font-mono text-xs">Core / Internet</div>
                <div className="w-px h-4 bg-slate-600" />
                <div className="bg-ink-800 border border-ink-600 rounded px-2 py-1 text-slate-400 text-xs">ITS-S Border Router</div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="bg-emerald-900 border border-emerald-700 rounded px-3 py-1 text-emerald-300 font-mono text-xs">Proprietary Network (ECU/sensors)</div>
                <div className="w-px h-4 bg-slate-600" />
                <div className="bg-ink-800 border border-ink-600 rounded px-2 py-1 text-slate-400 text-xs">ITS-S Gateway</div>
              </div>
            </div>
            <div className="w-full max-w-lg border-2 border-brand-600 rounded-lg bg-ink-900 px-6 py-3 text-center">
              <div className="text-brand-300 font-semibold text-sm mb-1">ITS Station-Internal Network</div>
              <div className="text-slate-500 text-xs">ITS-S host(s) · ITS-S routers · ITS-S gateways · ITS-S border routers</div>
            </div>
          </div>
        </Figure>
      </Section>

      {/* ── Section 7: Domains ── */}
      <Section id="domains" title="ITS Domain vs. Generic Domain">
        <p>
          ITSC distinguishes two domains:
        </p>
        <DefList items={[
          {
            term: 'ITS Domain',
            def: 'All elements of ITSC specified in ITS/ITSC standards. Corresponds to what ISO TC204 WG16 calls "CALM-aware." The full reference architecture with Management and Security entities applies within this domain.',
          },
          {
            term: 'Generic Domain',
            def: 'Legacy or non-ITS elements used for ITSC — e.g. the public Internet, a cellular network, a CAN bus. Corresponds to "Non-CALM-aware" in CALM terminology. ITS-S border routers sit at the boundary between the two domains.',
          },
        ]} />

        <p>
          The ITS-S border router exists specifically to bridge these two domains. On the ITS side it implements the full
          ITS management and security framework; on the generic side it speaks standard OSI layers 1–3 without the
          ITS-specific overhead.
        </p>

        <Callout type="warn" title="Management and security do not cross the border router">
          The ITS management entity and security entity apply only within the ITS domain. On the far side of an ITS-S
          border router, standard network security mechanisms (TLS, IPsec, etc.) must be used instead. This boundary is
          critical to understand when designing V2N (Vehicle-to-Network) deployments.
        </Callout>
      </Section>

      {/* ── Section 8: Release 2 Architecture Changes ── */}
      <Section id="release2" title="Release 2 Architecture Evolution">
        <p>
          The original EN 302 665 (Release 1, 2010) defined the single-channel baseline. ETSI ITS Release 2, driven by the
          need to support a much larger number of use cases and messages simultaneously, introduced significant
          architectural additions. Key Release 2 principles, as collected in ETSI TR 103 902:
        </p>

        <StatGrid cols={3}>
          <Stat value="R1" label="Single-channel" sub="One channel, limited use cases; Release 1 baseline" />
          <Stat value="R2" label="Multi-channel" sub="Multiple simultaneous channels via MCO architecture" />
          <Stat value="BCK" label="Backward compatible" sub="R2 stations interoperate with R1 in mixed deployments" />
        </StatGrid>

        <h3 className="text-lg font-semibold mt-6 mb-2 text-slate-200">Backward Compatibility Requirements</h3>
        <p>
          A Release 2 ITS-S must be able to provide the same level of service as a Release 1 station when operating in a
          Release 1 environment (REQ_APP_001 to REQ_APP_003 in TS 103 697). Release 2 applications that use a channel
          configuration shared with Release 1 must ensure backward compatibility. Release-specific applications must not
          interfere with Release 1 applications running on the same channel.
        </p>

        <h3 className="text-lg font-semibold mt-6 mb-2 text-slate-200">New Terminology in Release 2 (TR 103 902)</h3>
        <Table
          caption="Selected Release 2 terms from ETSI TR 103 902"
          headers={['Term', 'Definition']}
          rows={[
            ['C-ITS Ecosystem', 'Cooperative ITS specific ecosystem — the totality of standards, regulations, and stakeholders'],
            ['C-ITS-S', 'Cooperative ITS Station — an ITS-S that is part of the C-ITS ecosystem and its trust model'],
            ['ITS Constellation (ITS-C)', 'Group of ITS-Ss actively exchanging information'],
            ['Direct V2X (Short V2X)', 'Localized V2X without intermediary IP networks, base-stations, or Internet routing'],
            ['Indirect V2X', 'V2X using IP-based protocols over cellular/fixed-line networks'],
            ['Networked V2X (V2N2X)', 'Data sourcing ITS-S provides data to intermediary networks which transfer it to sinking ITS-Ss'],
            ['ALI (Access Layer Instance)', 'A fully parameterised (service channel, technology, TX power) transceiver entity'],
            ['Backward compatibility', 'Rx+1 station provides same service level as Rx station in Rx environment'],
          ]}
        />
      </Section>

      {/* ── Section 9: MCO Architecture ── */}
      <Section id="mco" title="Multi-Channel Operation (MCO) Architecture">
        <p>
          Multi-Channel Operation (MCO) is the key Release 2 architectural addition defined in
          {' '}<strong>ETSI TS 103 697</strong>. In Release 1, a single channel is used and applications statically share it.
          In Release 2, multiple channels (and multiple access technologies) operate simultaneously, requiring a coordinating
          mechanism to allocate bandwidth fairly among competing applications.
        </p>
        <Callout type="key" title="MCO is a cross-layer functionality">
          MCO sub-functionalities exist at three layers simultaneously — Facilities (MCO_FAC), Networking &amp; Transport
          (MCO_NET), and Access (MCO_ACC) — making it a true cross-layer architecture element.
        </Callout>

        <LayerStack
          layers={[
            { name: 'Applications', sub: 'Message Triggering Entities (MTEs) · provide Functional Configuration Profiles (FCPs)', accent: 'violet' },
            { name: 'Facilities — MCO_FAC', sub: 'BME · MHE · MCE · Bandwidth management · channel selection decisions', accent: 'emerald' },
            { name: 'Networking & Transport — MCO_NET', sub: 'GN Core · ALI Group Handlers (GAGHs) · MPU · NU · ARH', accent: 'brand' },
            { name: 'Access — MCO_ACC', sub: 'ALI Operations · TRX info Collection · multiple simultaneous transceivers', accent: 'amber' },
          ]}
          leftRail="Management Plane"
          rightRail="Data Plane"
        />

        <h3 className="text-lg font-semibold mt-6 mb-2 text-slate-200">MCO Entities at the Facilities Layer (MCO_FAC)</h3>
        <DefList items={[
          {
            term: 'Bandwidth Management Entity (BME)',
            def: 'Collects application requirements and lower-layer capabilities; sends feedback to applications to adapt their transmission rate; configures lower layers to use the most adequate channel/technology combination.',
          },
          {
            term: 'Message Handling Entity (MHE)',
            def: 'Transmits messages toward the Networking & Transport layer; configures per-message parameters considering available radio interfaces and channels. Decides which Access Layer Instance (ALI) to use per message.',
          },
          {
            term: 'Message Collecting Entity (MCE)',
            def: 'Collects received messages from the Networking & Transport layer and forwards them to the appropriate Message Receiving Entity (MRE) at the Facilities layer.',
          },
        ]} />

        <h3 className="text-lg font-semibold mt-6 mb-2 text-slate-200">MCO Mechanisms</h3>
        <h4 className="text-base font-medium mt-4 mb-1 text-slate-300">1. Functional Configuration Profiles (FCPs)</h4>
        <p>
          Each application characterises its communication needs as a Functional Configuration Profile (FCP), identified
          by a unique FcpID. FCPs may specify primary and secondary channels, priority, and other parameters. In Release 1,
          dissemination configurations are statically defined (e.g. CAS always uses one fixed channel; if congested, CAMs
          are simply dropped). In Release 2, the BME evaluates all active FCPs and returns Functional Configuration Limits
          (FCLs) — telling each application what the actual allowed configuration is given current network conditions and
          competing applications. The FcpID is then passed per-message at the data plane so the MHE can apply the correct
          configuration.
        </p>
        <h4 className="text-base font-medium mt-4 mb-1 text-slate-300">2. Access Layer Instances (ALIs)</h4>
        <p>
          An Access Layer Instance (ALI) is a fully parameterised instantiation of a transceiver — combining access
          technology (e.g. ITS-G5 or LTE-V2X), service channel, TX power, and other parameters into a single identifier
          (AliID). Groups of ALIs using the same service channel and technology form ALI Groups (identified by AliGroupID).
          The MHE selects the AliID per message and passes it downward via the NL-PDU header. This allows the Access layer
          to route each frame to the correct transceiver with the correct parameters without higher-layer involvement.
        </p>

        <Figure caption="MCO data flow: headers are added at each layer as data moves downward. A-PDU + FH = FL-PDU; FL-PDU + TH/NH = NL-PDU; NL-PDU + AH = AL-PDU (transmitted frame).">
          <div className="flex flex-col items-center gap-1 text-xs font-mono">
            {[
              { label: 'Application Data Unit', tag: 'A-PDU', color: 'bg-violet-900 border-violet-700 text-violet-300' },
              { label: 'Facilities Header (FH) added', tag: 'FL-PDU', color: 'bg-emerald-900 border-emerald-700 text-emerald-300' },
              { label: 'Transport + Network Headers (TH/NH) added', tag: 'NL-PDU', color: 'bg-brand-900 border-brand-700 text-brand-300' },
              { label: 'Access Header (AH) added — transmitted frame', tag: 'AL-PDU', color: 'bg-amber-900 border-amber-700 text-amber-300' },
            ].map(({ label, tag, color }) => (
              <div key={tag} className={`${color} border rounded px-4 py-2 w-96 text-center`}>
                <span className="font-bold">{tag}</span>
                <span className="text-slate-400 ml-2 font-sans text-xs">{label}</span>
              </div>
            ))}
          </div>
        </Figure>

        <h3 className="text-lg font-semibold mt-6 mb-2 text-slate-200">MCO Application Requirements (TS 103 697, Clause 7)</h3>
        <Table
          caption="Key MCO application requirements (REQ_APP_xxx)"
          headers={['Req. ID', 'Requirement']}
          rows={[
            ['REQ_APP_001', 'R2 applications extending R1 shall provide the same user experience as R1 in mixed environments'],
            ['REQ_APP_002', 'Any R2 application using an R1 channel configuration shall ensure backward compatibility'],
            ['REQ_APP_003', 'R2 applications shall not interfere with R1 applications in the same environment'],
            ['REQ_APP_004', 'Applications shall consider bandwidth usage relative to other applications and provide optional flexible allocations to MCO'],
            ['REQ_APP_005', 'When MCO is used, applications shall trigger message generation via MCO interfaces (TS 103 141, TS 103 836-4-1, TS 103 695)'],
            ['REQ_APP_006', 'SAM shall use SCH4 (non-safety) or SCH1 (safety) per regional spectrum rules (EU: ECC/DEC/(08)01)'],
            ['REQ_APP_007', 'Applications shall not use C-ITS channels for SAEM dissemination or interfere with C-ITS applications'],
          ]}
        />

        <p>
          <Link to="/access-layer" className="text-brand-400 underline">Access layer MCO details</Link> are specified in ETSI TS 103 695.
          {' '}<Link to="/networking" className="text-brand-400 underline">Networking &amp; Transport MCO details</Link> are in ETSI TS 103 836-4-1.
          {' '}<Link to="/facilities" className="text-brand-400 underline">Facilities layer MCO details</Link> are in ETSI TS 103 141.
        </p>
      </Section>

      {/* ── Section 10: Key Standards ── */}
      <Section id="standards" title="Key Standards">
        <p>The following standards define the ITS Station architecture and its Release 2 extensions:</p>
        <div className="flex flex-wrap gap-3 mt-2">
          <Ref code="EN 302 665" title="ITS Communications Architecture" kind="ETSI" />
          <Ref code="ISO 21217" title="CALM Architecture" kind="ISO" />
          <Ref code="TS 103 697" title="MCO Architecture R2" kind="ETSI" />
          <Ref code="TR 103 902" title="ITS Framework Terms R2" kind="ETSI" />
          <Ref code="TS 103 141" title="Facilities MCO R2" kind="ETSI" />
          <Ref code="TS 103 695" title="Access Layer MCO R2" kind="ETSI" />
          <Ref code="TS 103 836-4-1" title="GeoNetworking MCO R2" kind="ETSI" />
          <Ref code="TS 102 723-3" title="MI Interface (Mgmt–Access)" kind="ETSI" />
          <Ref code="TS 102 723-6" title="MS Interface (Mgmt–Security)" kind="ETSI" />
        </div>
      </Section>

      {/* ── Section 11: Where Next ── */}
      <Section id="where-next" title="Where Next">
        <p>Explore each layer and vertical entity in detail:</p>
        <div className="flex flex-wrap gap-3 mt-2 text-sm">
          {[
            { to: '/access-layer', label: 'Access Layer (ITS-G5, LTE-V2X)' },
            { to: '/networking', label: 'Networking & Transport (GeoNetworking, BTP)' },
            { to: '/facilities', label: 'Facilities Layer (LDM, encoding, message services)' },
            { to: '/applications', label: 'Applications (CAM, DENM, CPM, VAM, MCM)' },
            { to: '/management', label: 'Management Entity (DCC, service advertisement, MIB)' },
            { to: '/security', label: 'Security Entity (PKI, certificates, CCMS)' },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="bg-ink-800 border border-ink-600 rounded px-3 py-1.5 text-brand-400 hover:border-brand-600 hover:bg-ink-700 transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </Section>
    </article>
  )
}
