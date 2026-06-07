import React from 'react'
import { Link } from 'react-router-dom'
import { PageHeader, Section, Prose, Callout, Ref, Table, StatGrid, Stat, CardGrid, Card, Steps, Figure, LayerStack, DefList, Badge } from '../components/ui.jsx'

export default function Management() {
  return (
    <article>
      <PageHeader
        kicker="ITS Station Architecture"
        title="Management &amp; Cross-Layer Interfaces"
        intro="Every ITS station contains a vertical Management entity that runs alongside the protocol stack, orchestrating communication interfaces, controlling channel access, coordinating security credentials, and mediating congestion. ETSI TS 102 723 defines the complete set of Service Access Points (SAPs) through which management touches every layer — making it the operational backbone of the ITS station."
        sources={['ETSI TS 102 723-1', 'ETSI TS 102 723-2', 'ETSI TS 102 723-3', 'ETSI TS 102 723-4', 'ETSI TS 102 723-5', 'ETSI TR 102 707', 'ETSI EN 302 665']}
      />

      {/* 1. What the Management Entity Does */}
      <Section id="role" title="What the Management Entity Does">
        <p>
          The ITS station reference architecture (defined in ETSI EN 302 665 and ISO 21217) places the
          Management entity as a cross-cutting vertical block. Unlike the communication layers — <Link to="/access-layer">Access</Link>,{' '}
          <Link to="/networking">Networking &amp; Transport</Link>, and <Link to="/facilities">Facilities</Link> — the
          Management entity does not carry user data. Instead it monitors, configures, and coordinates every
          functional block in the station.
        </p>
        <p>
          Its responsibilities span the full lifetime of the station:
        </p>
        <ul>
          <li>
            <strong>Communication interface (CI) lifecycle management</strong> — registering, waking, suspending, and
            deleting Communication Interfaces and Virtual Communication Interfaces (VCIs). Each CI transitions through
            a defined state machine (powered off → initialising → active → suspended) driven by MI-COMMAND primitives.
          </li>
          <li>
            <strong>Parameter configuration</strong> — setting and reading CI parameters (I-Params) such as transmit
            power (TxPower), receive sensitivity (Rxsensitivity), data rate (DataRate in units of 100 bit/s), MAC
            address (MACaddrTemp), and minimum user priority via the MI-SET / MI-GET service primitives.
          </li>
          <li>
            <strong>Cross-CI prioritization</strong> — when multiple radios are present, the management entity
            mediates "Request To Send" (RTS) exchanges between CIs to avoid mutual interference and ensure the
            highest-priority traffic gets air time first.
          </li>
          <li>
            <strong>DCC Profile (DP) maintenance</strong> — the Decentralized Congestion Control (DCC) profiles
            that govern channel load are stored and managed by the Management entity. The Access layer queries
            them via IM-DP-GET and receives channel-load updates via IM-DP-COMMAND.
          </li>
          <li>
            <strong>Station position tracking</strong> — the Access layer can request kinematic vector updates
            (I-Param KinematicVectorIn/Out), giving the management entity a real-time position of the ITS station
            for use in geo-networking and regulatory compliance.
          </li>
          <li>
            <strong>Security coordination</strong> — the Management entity communicates with the{' '}
            <Link to="/security">Security entity</Link> via the MS-SAP. This covers credential lifecycle coordination,
            enrolment triggers, and authorization token management — without the management entity itself
            performing cryptographic operations.
          </li>
          <li>
            <strong>Facilities and application configuration</strong> — the MF-SAP connects management to the{' '}
            <Link to="/facilities">Facilities layer</Link>, enabling configuration of local dynamic maps, service
            registration tables, and transmission profile parameters.
          </li>
        </ul>
        <Callout type="key" title="The Management Entity Is Not a Manager in a Network Sense">
          The management entity is station-local. It does not implement SNMP over-the-air sessions from an
          operations centre; rather, it exposes a local MIB that an external management system may optionally
          reach via a station-internal network link. All real-time cross-layer control happens through
          station-internal SAPs described in the TS 102 723 series.
        </Callout>
      </Section>

      {/* 2. Architecture Diagram — Management touching all layers */}
      <Section id="architecture" title="The ITS Station SAP Architecture">
        <p>
          The TS 102 723 series describes a set of Service Access Points interconnecting every block of the
          ITS station. The diagram below shows management (left rail) and security (right rail) running
          alongside the three protocol layers, with dedicated SAP labels at each junction.
        </p>
        <LayerStack
          layers={[
            { name: 'ITS Applications', sub: 'FA-SAP (Application Programming Interface)', accent: 'amber' },
            { name: 'Facilities Layer', sub: 'MF-SAP (management ↔ facilities)   NF-SAP (networking ↔ facilities)', accent: 'violet' },
            { name: 'Networking &amp; Transport Layer', sub: 'MN-SAP (management ↔ networking)   IN-SAP (access ↔ networking)', accent: 'emerald' },
            { name: 'Access Layer', sub: 'MI-SAP (management ↔ access)   SI-SAP (security ↔ access)', accent: 'brand' },
          ]}
          leftRail="Management"
          rightRail="Security"
        />
        <p className="mt-4 text-sm text-slate-400">
          Interfaces in the diagram: <strong>MI</strong> management–access, <strong>MN</strong> management–networking,
          <strong>MF</strong> management–facilities, <strong>MS</strong> management–security entity,
          <strong>SI/SN/SF</strong> security–access/networking/facilities, <strong>IN</strong> access–networking,
          <strong>NF</strong> networking–facilities, <strong>FA</strong> facilities–applications.
        </p>
        <Callout type="info" title="SAP vs. API vs. Observable Interface">
          TS 102 723-1 distinguishes three interface kinds. A <em>SAP</em> (Service Access Point) describes
          functional behaviour via service primitives and need not be externally observable or testable. An{' '}
          <em>API</em> is a well-defined software interface (e.g. the FA interface to applications). An
          <em>observable interface</em> carries protocol data units (PDUs) that can be captured on the wire.
          Most management SAPs are of the first kind — functional specifications encoded in ASN.1 that become
          testable only when an implementation exposes them.
        </Callout>
      </Section>

      {/* 3. The TS 102 723 Part Map */}
      <Section id="part-map" title="TS 102 723 Part-by-Part Reference">
        <p>
          ETSI TS 102 723 is an 11-part series. Parts 1–6 cover management interfaces; parts 7–9 cover
          security interfaces; parts 10–11 cover layer-to-layer interfaces (IN and NF). The table below
          focuses on the management-related parts.
        </p>
        <Table
          caption="ETSI TS 102 723 — management-related parts and their SAPs"
          headers={['Part', 'SAP/Interface', 'Connects', 'Key content']}
          rows={[
            [
              <><Ref code="TS 102 723-1" kind="ETSI" title="Architecture &amp; Addressing" /></>,
              'Architecture overview',
              'All blocks',
              'Interface taxonomy (SAP/API/observable), ITS-SCU unit addressing (ITS-SCU-ID), VCI/CI addressing (Link-ID), OID tree root, inter-unit management communications (IIC/IUMC)',
            ],
            [
              <><Ref code="TS 102 723-2" kind="ETSI" title="MIB" /></>,
              'MIB definition',
              'Management ↔ external',
              'Architectural approach to Management Information Base; MIB for SNMPv2 (RFC 3418/2578/2579); OID addressing of managed objects',
            ],
            [
              <><Ref code="TS 102 723-3" kind="ETSI" title="MI-SAP" /></>,
              'MI-SAP',
              'Management ↔ Access Layer',
              'MI-COMMAND / MI-REQUEST / MI-SET / MI-GET primitives; CI parameter table (I-Params 0–255 including TxPower, DataRate, MAC addresses, KinematicVector); DCC-profile services IM-DP-COMMAND / IM-DP-GET; CI state machine',
            ],
            [
              <><Ref code="TS 102 723-4" kind="ETSI" title="MN-SAP" /></>,
              'MN-SAP',
              'Management ↔ Networking &amp; Transport',
              'MN-COMMAND and MN-REQUEST service primitives for cross-layer control of the GeoNetworking / FNTP layer',
            ],
            [
              <><Ref code="TS 102 723-5" kind="ETSI" title="MF-SAP" /></>,
              'MF-SAP',
              'Management ↔ Facilities Layer',
              'Interface between management and the facilities layer (local dynamic map, service tables). R1 published 2012; Release 2 (V2.0.0, 2023) carries forward R1 provisions unchanged.',
            ],
            [
              <>TS 102 723-6 (referenced)</>,
              'MS-SAP',
              'Management ↔ Security Entity',
              'Security-management interface for credential and authorisation coordination (specified in ISO 24102-3; TS 102 723-6 provides additional ITS-specific details)',
            ],
          ]}
        />
        <p className="mt-4">
          The remaining parts cover security–layer interfaces (SI, SN, SF) and the inter-layer interfaces
          IN (TS 102 723-10) and NF (TS 102 723-11). See the{' '}
          <Link to="/architecture">Architecture overview</Link> for the complete picture.
        </p>
      </Section>

      {/* 4. MI-SAP in depth — primitives and CI parameters */}
      <Section id="mi-sap" title="MI-SAP: Management to Access Layer">
        <p>
          The MI interface (Management–access) is the most detailed of the management SAPs, specified in
          TS 102 723-3. It carries four generic services, each with a .request / .confirm pair:
        </p>
        <DefList items={[
          {
            term: 'MI-COMMAND.request / .confirm',
            def: 'Management entity triggers an action in a specific CI/VCI (e.g. change state, wake-up, create VCI, transmit a management data packet). Identified by a CommandRef (0–255) and an MI-Command.No from the command table (RegCmd=0, CistateChng=1, WakeUp=2, RTScmd=3, RTSackCmd=4, VCIcmd=9, Monitor=10, UnitDataCmd=255).',
          },
          {
            term: 'MI-REQUEST.request / .confirm',
            def: 'The CI/VCI initiates an action at the management entity — e.g. RegReq (CI registers itself), Events (event notification), PosUpdateReq (request kinematic vector updates), UnitDataReq (notify reception of a management frame). Direction is reversed: CI → Management.',
          },
          {
            term: 'MI-SET.request / .confirm',
            def: 'Management entity writes a sequence of I-Params into a CI/VCI. Error codes: ACCESS VIOLATION (7) for read-only params, INVALID PARAMETER NUMBER (2), INVALID PARAMETER VALUE (3), INVALID TYPE (8).',
          },
          {
            term: 'MI-GET.request / .confirm',
            def: 'Management entity reads a sequence of I-Params from a CI/VCI. Each parameter is identified by I-Param.No (0–255). If I-Param.No = 255 in the response, it signals an error detail in I-Param.Value.',
          },
        ]} />

        <h3 className="mt-6 text-base font-semibold text-brand-300">Key CI Parameters (I-Params)</h3>
        <p>
          TS 102 723-3 Annex D defines the full CI parameter table. A selection of important parameters:
        </p>
        <Table
          caption="Selected CI I-Params from TS 102 723-3 Annex D"
          headers={['I-Param.No', 'Name', 'Access', 'Description']}
          rows={[
            ['3', 'Rxsensitivity', 'RW', 'Medium-specific reference number of receive sensitivity (VCI)'],
            ['4', 'TxPower', 'RW', 'Medium-specific reference number of transmit power (VCI)'],
            ['5', 'DataRate', 'RW', 'Data rate in units of 100 bit/s (VCI)'],
            ['6', 'DataRateNW', 'R', 'Estimated average data rate at IN-SAP in 100 bit/s (VCI)'],
            ['10', 'BlockLength', 'RW', 'Maximum LPDU length (VCI)'],
            ['22', 'MedType', 'R', 'Enumerator for access technology type (CI)'],
            ['25', 'RegulatoryInformation', 'RW', 'Regulatory information data structure for the CI'],
            ['34', 'MACaddress', 'R', 'Globally assigned MAC address (CI)'],
            ['35', 'MACaddrTemp', 'RW', 'Currently used MAC address of CI/VCI'],
            ['40', 'KinematicVectorIn', 'W', 'Kinematic vector of ITS station as provided to CI'],
            ['41', 'KinematicVectorOut', 'R', 'Kinematic vector as estimated by CI'],
            ['42', 'Cistatus', 'R', 'Current status of the CI'],
            ['49', 'TxPowMax', 'R', 'Maximum allowed EIRP in dBm (VCI)'],
          ]}
        />

        <h3 className="mt-6 text-base font-semibold text-brand-300">DCC-Profile Services (IM-DP-*)</h3>
        <p>
          For CIs on ITS G5A and G5B channels, three additional services operate on DCC Profiles rather than
          on CI/VCI directly. Because DCC Profiles are owned by the Management layer and the Access layer
          consumes them, the prefix is reversed to <strong>IM</strong> (not MI):
        </p>
        <ul>
          <li><strong>IM-DP-COMMAND</strong> (Access → Management) — e.g. FrameTransmissionNotification (11),
            FrameReceptionNotification (12, includes RSSI), UpdateChannelLoadEstimate (13).</li>
          <li><strong>IM-DP-REQUEST</strong> (Management → Access) — e.g. Events (9) for DCC Profile event
            notifications.</li>
          <li><strong>IM-DP-GET</strong> (Access → Management) — reads D-Params from a DCC Profile (TxPower for
            DP=D-Param.No 4, VCI/ChannelId=100, PriorityQueue=101, MCS=106, ToffTime=107).</li>
        </ul>
        <Callout type="tip" title="No IM-DP-SET">
          There is deliberately no IM-DP-SET primitive. DCC Profile parameters are written only by the
          management entity; the Access layer can only read them. This enforces the architectural principle
          that congestion policy is set by management, not by the physical layer itself.
        </Callout>
      </Section>

      {/* 5. MN-SAP and MF-SAP */}
      <Section id="mn-mf-sap" title="MN-SAP and MF-SAP: Networking and Facilities">
        <p>
          The MN interface (TS 102 723-4) connects the management entity to the{' '}
          <Link to="/networking">Networking &amp; Transport layer</Link> via MN-COMMAND and MN-REQUEST
          service primitives. This allows the management entity to configure GeoNetworking protocol behaviour
          — for example adjusting geographic forwarding parameters, querying routing state, or pushing updated
          network configuration after a regulatory change.
        </p>
        <p>
          The MF interface (TS 102 723-5) connects to the <Link to="/facilities">Facilities layer</Link>
          . Release 1 (V1.1.1, 2012) established the MF-SAP baseline. Release 2 (V2.0.0, 2023) republishes
          those provisions unchanged, noting that all R2 deliverables carry version 2.Y.Z. The MF-SAP is
          important for configuring service announcement tables, local dynamic map parameters, and
          transmission profiles for application messages such as <Link to="/cam">CAM</Link> or{' '}
          <Link to="/denm">DENM</Link>.
        </p>
        <Callout type="info" title="MS-SAP: Security Coordination">
          Although TS 102 723-6 (Management ↔ Security entity MS-SAP) is referenced but not one of the
          files here, the MS interface is fundamental: it allows the management entity to coordinate
          certificate enrolment, pseudonym change schedules, and the authorisation token lifecycle with the{' '}
          <Link to="/security">Security entity</Link> and the <Link to="/pki">PKI / Trust infrastructure</Link>{' '}
          without directly performing cryptographic operations.
        </Callout>
      </Section>

      {/* 6. Management Information Base */}
      <Section id="mib" title="Management Information Base (MIB)">
        <p>
          TS 102 723-2 defines the architectural approach to MIBs for ITS. An ITS-S MIB is a structured
          set of manageable parameters for a given functionality, accessed by external management systems.
          Key design choices:
        </p>
        <Steps>
          <div>
            <strong>MIB for SNMPv2</strong>: Where SNMP management is required, the MIB is designed
            following RFC 3418 (MIB for SNMP), RFC 2578 (SMIv2 Structure of Management Information), and
            RFC 2579 (Textual Conventions). This leverages mature internet network management tooling.
          </div>
          <div>
            <strong>Non-SNMP MIBs</strong>: Where SNMP is not required, the MIB may be designed directly
            in the latest version of ASN.1 without the deprecated elements that SMIv2 relies on. Each
            standard for an ITS-S functionality decides which approach it requires.
          </div>
          <div>
            <strong>OID addressing</strong>: Every managed object in ETSI ITS standards is identified by
            an Object Identifier (OID) rooted at the ETSI ITS domain tree:{' '}
            <code className="text-brand-300 text-xs">itu-t(0) identified-organization(4) etsi(0) itsDomain(5) wg2(2)</code>.
            The OID structure below that branch encodes the standard number (e.g. 2723 for TS 102 723), part
            number, and sequential MIB number.
          </div>
          <div>
            <strong>Dynamic vs. static management</strong>: Parameter values may be set at installation
            time, updated off-line in a protected service environment, or set on-line via communication
            links into the ITS-S (e.g. over a cellular backhaul to a traffic management centre).
          </div>
        </Steps>
      </Section>

      {/* 7. OID Tree and TR 102 707 */}
      <Section id="oid-tree" title="OID Tree and Object Addressing (TR 102 707)">
        <p>
          ETSI TR 102 707 (V1.1.1, 2009) defines the structure of the ITS domain within the ETSI OID tree.
          ETSI TC ITS WG2 is the formal registration authority for the first level of the ITS domain. Each
          Working Group of TC ITS is assigned a branch:
        </p>
        <Figure caption="ETSI ITS OID domain hierarchy (TR 102 707)">
          <div className="flex flex-col items-center gap-1 font-mono text-xs text-slate-300 py-4">
            <div className="px-4 py-1 rounded bg-ink-900 border border-slate-600">itu-t(0) / identified-organization(4) / etsi(0) / itsDomain(5)</div>
            <div className="text-slate-500">|</div>
            <div className="flex gap-4">
              {['wg1(1)', 'wg2(2)', 'wg3(3)', 'wg4(4)', 'wg5(5)'].map(wg => (
                <div key={wg} className="px-3 py-1 rounded bg-ink-900 border border-slate-700 text-slate-300">{wg}</div>
              ))}
            </div>
            <div className="text-slate-500 mt-1 text-center">wg2 sub-tree example: itscl(2723) / part3(3) / version1(1)</div>
          </div>
        </Figure>
        <p>
          The OID for an ordinary ASN.1 module from TS 102 723-3 is therefore:
          <code className="ml-2 text-brand-300 text-xs">
            itu-t(0) identified-organization(4) etsi(0) itsDomain(5) wg2(2) itscl(2723) part3(3) version1(1)
          </code>.
          MIB OIDs use the same root extended with a sequential MIB number suffix. This systematic naming
          makes objects addressable from any SNMP or ASN.1-aware management tool.
        </p>
      </Section>

      {/* 8. DCC and Multi-Channel Operation */}
      <Section id="dcc-mco" title="Management, DCC, and Multi-Channel Operation">
        <p>
          Two areas where the management entity's cross-layer role is most visible are{' '}
          <strong>Decentralized Congestion Control (DCC)</strong> and{' '}
          <strong>Multi-Channel Operation (MCO)</strong>. See also the <Link to="/access-layer">Access Layer</Link> page.
        </p>
        <CardGrid cols={2}>
          <Card title="DCC Profile Management" accent="emerald">
            <p>
              The management entity holds the DCC Profile table. Each profile (identified by DP-ID, an
              integer 0–255) bundles the channel selection (VCI/ChannelId), priority queue, modulation/coding
              scheme (MCS), maximum transmit power (TxPower), and minimum inter-frame gap (ToffTime).
            </p>
            <p className="mt-2">
              When the Access layer transmits a frame, it passes the DP-ID in the IN-UNITDATA.request. The
              Access layer then resolves the DP-ID against the management entity's profile table via
              IM-DP-GET to determine the actual channel and EDCA access category to use.
            </p>
            <p className="mt-2">
              Conversely, the Access layer continuously feeds channel load estimates back to the management
              entity via IM-DP-COMMAND UpdateChannelLoadEstimate. The management entity updates the
              appropriate DCC Profile thresholds and may trigger a DCC state change, which is then
              communicated back to the Access layer as an IM-DP-REQUEST Events notification.
            </p>
          </Card>
          <Card title="Cross-CI Prioritization and MCO" accent="brand">
            <p>
              In a multi-radio ITS station (e.g. ITS-G5 + LTE + DSRC), the management entity mediates
              between Communication Interfaces via the RTS/RTSack mechanism. When CI-A wishes to transmit
              at high priority and CI-B is already active on a nearby frequency, CI-A sends an RTSreq to
              the management entity, which evaluates cross-CI priority and sends RTScmd to grant or defer
              the transmission.
            </p>
            <p className="mt-2">
              For ITS G5, TS 102 723-10 specifies the IN-SAP between the Access layer and the Networking
              &amp; Transport layer. The DP-ID parameter carried in IN-UNITDATA.request is the link between
              the networking layer's routing decision and the management entity's channel plan, ensuring that
              traffic class, channel, and congestion budget are all consistently applied end-to-end.
            </p>
          </Card>
        </CardGrid>
        <Callout type="warn" title="G5C Is Not Under DCC Control">
          TS 102 723-10 explicitly states that the IN-SAP specification restricts itself to ITS G5A and
          G5B. ITS G5C (the ITS non-safety channel) is not fully under DCC control and is therefore out
          of scope of the MI/IN DCC-profile mechanism.
        </Callout>
      </Section>

      {/* 9. Station-Internal Management Communications */}
      <Section id="iumc" title="Multi-Unit Stations and Inter-Unit Management">
        <p>
          A physical ITS station may be implemented as a set of cooperating units — for example a separate
          on-board unit (OBU) host plus one or more dedicated radio modules. Each unit contains its own
          instance of the management entity and is called an{' '}
          <strong>ITS Station Communication Unit (ITS-SCU)</strong>, identified by an ITS-SCU-ID.
        </p>
        <p>
          When an ITS station spans multiple ITS-SCUs, they must synchronize their management state.
          TS 102 723-1 refers to this as <strong>Inter ITS-SCU Communications (IIC)</strong> or{' '}
          <strong>Inter-Unit Management Communications (IUMC)</strong>, with implementation as specified in
          ISO 24102-4. IUMC allows, for example, the host's management entity to push regulatory
          information or DCC Profile updates down to a radio module's management entity over the
          station-internal network.
        </p>
        <StatGrid cols={3}>
          <Stat value="ITS-SCU" label="Unit in a multi-unit station" sub="Each has its own management entity instance" />
          <Stat value="IIC / IUMC" label="Inter-unit management channel" sub="ISO 24102-4 specifies the protocol" />
          <Stat value="Link-ID" label="CI / VCI address" sub="Used in MI-SAP primitives to identify the target interface" />
        </StatGrid>
      </Section>

      {/* 10. Release 1 vs Release 2 */}
      <Section id="releases" title="Release 1 vs. Release 2 Evolution">
        <p>
          The TS 102 723 series was first published in November 2012 as Release 1 (version 1.1.1). ETSI TC
          ITS is now developing Release 2 deliverables (version 2.Y.Z) that must be self-consistent across
          the entire standard suite.
        </p>
        <p>
          TS 102 723-5 (MF-SAP) was the first management interface part to receive a Release 2 publication
          (V2.0.0, February 2023). Its normative content is identical to the V1.1.1 release ("ETSI TS
          102 723-5 [1] shall apply altogether"). This pattern — a Release 2 wrapper referencing R1
          provisions — is the standard mechanism for bringing existing parts into the R2 framework while
          the community works on substantive R2 enhancements.
        </p>
        <Callout type="tip" title="Non-Specific References in R2">
          In Release 2 documents, a non-specific reference to an ETSI TS implicitly refers to the latest
          R2 version of that document. Engineers implementing R2-compliant stations should verify that all
          their cross-references resolve to R2 versions where available.
        </Callout>
      </Section>

      {/* 11. Where Next */}
      <Section id="where-next" title="Where Next">
        <CardGrid cols={3}>
          <Card title="Architecture" accent="brand">
            <p>The full ITS station reference model and how management fits into the five-block stack.</p>
            <p className="mt-2"><Link to="/architecture" className="text-brand-300 underline">Architecture overview →</Link></p>
          </Card>
          <Card title="Access Layer" accent="emerald">
            <p>ITS-G5 channels, DCC, EDCA queuing, and the MI-SAP from the access-layer perspective.</p>
            <p className="mt-2"><Link to="/access-layer" className="text-brand-300 underline">Access Layer →</Link></p>
          </Card>
          <Card title="Security &amp; PKI" accent="violet">
            <p>How the MS-SAP links the management entity to the certificate and pseudonym infrastructure.</p>
            <p className="mt-2"><Link to="/security" className="text-brand-300 underline">Security →</Link></p>
          </Card>
          <Card title="Facilities Layer" accent="amber">
            <p>The MF-SAP and how management configures service tables, LDM, and message profiles.</p>
            <p className="mt-2"><Link to="/facilities" className="text-brand-300 underline">Facilities →</Link></p>
          </Card>
          <Card title="Networking Layer" accent="cyan">
            <p>GeoNetworking and FNTP, controlled through the MN-SAP.</p>
            <p className="mt-2"><Link to="/networking" className="text-brand-300 underline">Networking →</Link></p>
          </Card>
          <Card title="Conformance" accent="rose">
            <p>How the SAP specifications translate into observable, testable behaviour.</p>
            <p className="mt-2"><Link to="/conformance" className="text-brand-300 underline">Conformance →</Link></p>
          </Card>
        </CardGrid>
      </Section>

      {/* 12. Key Standards */}
      <Section id="standards" title="Key Standards">
        <ul className="space-y-2">
          <li><Ref code="TS 102 723-1" kind="ETSI" title="OSI cross-layer topics — Architecture and addressing schemes" /> — Interface taxonomy, ITS-SCU addressing, OID tree, IIC/IUMC.</li>
          <li><Ref code="TS 102 723-2" kind="ETSI" title="OSI cross-layer topics — Management information base" /> — MIB architectural approach, SNMPv2 design rules.</li>
          <li><Ref code="TS 102 723-3" kind="ETSI" title="OSI cross-layer topics — MI-SAP (management ↔ access layer)" /> — MI-COMMAND/REQUEST/SET/GET primitives, I-Param table, DCC-profile IM-DP services.</li>
          <li><Ref code="TS 102 723-4" kind="ETSI" title="OSI cross-layer topics — MN-SAP (management ↔ networking)" /> — MN-COMMAND / MN-REQUEST primitives.</li>
          <li><Ref code="TS 102 723-5" kind="ETSI" title="OSI cross-layer topics — MF-SAP (management ↔ facilities)" /> — R1 (2012) and R2 (2023) baseline for the facilities-management interface.</li>
          <li><Ref code="TS 102 723-10" kind="ETSI" title="OSI cross-layer topics — IN-SAP (access ↔ networking)" /> — IN-UNITDATA service primitives, DP-ID channel selection, transmit/receive parameters.</li>
          <li><Ref code="TR 102 707" kind="ETSI" title="ETSI object identifier tree — ITS domain" /> — OID tree structure for ETSI TC ITS; WG2 as registration authority.</li>
          <li><Ref code="EN 302 665" kind="ETSI" title="ITS Communications Architecture" /> — The normative reference architecture underpinning all TS 102 723 parts.</li>
        </ul>
      </Section>
    </article>
  )
}
