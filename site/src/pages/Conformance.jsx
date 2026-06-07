import React from 'react'
import { Link } from 'react-router-dom'
import {
  PageHeader,
  Section,
  Prose,
  Callout,
  Ref,
  Table,
  StatGrid,
  Stat,
  CardGrid,
  Card,
  Steps,
  Figure,
  DefList,
  Badge,
} from '../components/ui.jsx'

export default function Conformance() {
  return (
    <article>
      <PageHeader
        kicker="Testing & Certification"
        title="Conformance & Interoperability Testing"
        intro="A vehicle built in Germany must exchange safety messages seamlessly with infrastructure deployed in France. Multi-vendor, cross-border V2X must simply work — and the only way to guarantee that is through rigorous, standardised conformance and interoperability testing. This page explains the methodology, the document triples that define it per protocol, and the events where the rubber meets the road."
        sources={[
          'ETSI TS 102 868',
          'ETSI TS 102 869',
          'ETSI TS 102 870',
          'ETSI TS 102 871',
          'ETSI TS 102 859',
          'ETSI TS 102 916',
          'ETSI TS 102 917',
          'ETSI TS 103 096',
          'ETSI TR 103 061',
          'ISO/IEC 9646',
        ]}
      />

      {/* ── WHY IT MATTERS ── */}
      <Section id="why" title="Why conformance testing matters for C-ITS">
        <p>
          C-ITS depends on a globally heterogeneous ecosystem: an OEM ships an on-board unit (OBU) built
          with one chipset, a national road operator deploys road-side units (RSUs) from a different vendor,
          and both must inter-operate flawlessly at highway speed with message latencies well under 100 ms.
          No amount of specification text can guarantee this without independent, repeatable testing against
          a common bar.
        </p>
        <p>
          Conformance testing answers the question <em>"does this implementation correctly implement the
          standard?"</em> — it tests a single device in a lab environment against a reference test system.
          Interoperability testing answers the complementary question <em>"do two real implementations
          work together?"</em> — it puts actual products on the air and checks end-to-end behaviour. Both
          are necessary: a product can pass conformance testing but still fail to inter-operate if
          optional features are implemented differently, and vice-versa.
        </p>
        <Callout type="key" title="The C-ITS testing imperative">
          Cross-border V2X services — roadworks warnings, hazard alerts, green-light advisories — can only
          be trusted if every node on the network has been validated against the same set of mandatory
          requirements. Conformance test specifications are what turn an ETSI standard into a pass/fail
          verdict on real hardware.
        </Callout>
        <p>
          European deployment programmes such as <Link to="/c-roads">C-Roads</Link> have made conformance
          and interoperability testing prerequisites for deployment on national motorway networks, with
          dedicated testing events run at ETSI and bilateral cross-border test sessions between member
          states. The EU Delegated Regulation (EU) 2019/2144 on vehicle type-approval references
          harmonised standards that themselves point to these test specifications.
        </p>
      </Section>

      {/* ── ISO 9646 FRAMEWORK ── */}
      <Section id="iso9646" title="The ISO/IEC 9646 conformance testing framework">
        <p>
          All C-ITS conformance test specifications are built on the <strong>ISO/IEC 9646</strong>
          {' '}conformance testing methodology, originally developed for OSI (Open Systems Interconnection)
          protocols. The framework defines:
        </p>
        <DefList items={[
          {
            term: 'Static conformance review',
            def: 'Checking the Protocol Implementation Conformance Statement (PICS) against the mandatory requirements of the standard. A mismatch here is a static non-conformance — the implementation does not even claim to support a mandatory feature.',
          },
          {
            term: 'Dynamic conformance testing',
            def: 'Running the Abstract Test Suite (ATS) against the live Implementation Under Test (IUT). The test system stimulates the IUT and observes its actual on-wire behaviour, then issues a verdict of PASS, FAIL, or INCONCLUSIVE.',
          },
          {
            term: 'Implementation Under Test (IUT)',
            def: 'The protocol layer being tested — e.g. the CAM Cooperative Awareness Basic Service within an OBU.',
          },
          {
            term: 'System Under Test (SUT)',
            def: 'The complete device or platform containing the IUT, plus any upper-tester and lower-tester hooks needed by the test harness.',
          },
          {
            term: 'PIXIT',
            def: 'Protocol Implementation eXtra Information for Testing — a set of parameters (station ID, latitude/longitude of the tester, timing tolerances, etc.) that the test lab fills in to adapt the ATS to the specific test environment.',
          },
          {
            term: 'PCTR',
            def: 'Protocol Conformance Test Report — the formal document recording the test campaign results: which test cases were selected, run, and what verdict each received.',
          },
        ]} />
        <p>
          ETSI has adapted this framework specifically for ITS in <strong>ETSI EG 202 798</strong>
          {' '}("Framework for conformance and interoperability testing") and <strong>ETSI ETS 300 406</strong>
          {' '}("Protocol and profile conformance testing specifications; Standardization methodology"). Every
          ITS test specification references these documents to ensure a consistent test methodology
          across all protocols.
        </p>
        <Callout type="info" title="TTCN-3: the language of ITS test suites">
          All C-ITS Abstract Test Suites are written in <strong>TTCN-3</strong> (Testing and Test Control
          Notation version 3, ETSI ES 201 873). TTCN-3 is a strongly typed, platform-independent language
          for specifying and running conformance tests. The CAM ATS (TS 102 868-3), for example, imports
          ASN.1 message definitions directly from the CA specification (TS 103 900) and organises test
          cases into modules such as{' '}
          <code>ItsCam_TestCases</code>, <code>ItsCam_Templates</code>, and{' '}
          <code>ItsCam_Functions</code>. ETSI publishes the source code at its Forge repository so any lab
          can compile and run the suite against their own hardware.
        </Callout>
      </Section>

      {/* ── THE THREE-DOCUMENT TRIPLE ── */}
      <Section id="triple" title="The three-part test document structure">
        <p>
          For every C-ITS protocol, ETSI publishes a <strong>three-part test specification</strong>.
          Each part has a distinct role and audience. The CAM series (TS 102 868-1/-2/-3) is the
          canonical example.
        </p>
        <CardGrid cols={3}>
          <Card title="Part 1 — PICS" accent="brand">
            <p>
              <strong>Protocol Implementation Conformance Statement pro forma.</strong> A structured
              questionnaire — tables of features, options, and timers — that the product supplier fills
              in before testing begins. Each item is marked mandatory (m), optional (o), or conditional
              (c). The completed PICS is the binding declaration of what the implementation claims to
              support.
            </p>
            <p className="mt-2 text-sm text-slate-400">
              Example (CAM, TS 102 868-1): Table A.8 lists{' '}
              <code>T_GENCAMMAX = 1 000 ms</code> (mandatory),{' '}
              <code>T_GENCAMMIN = 100 ms</code> (mandatory), and{' '}
              <code>T_GENCAMDCC</code> (conditional on DCC support).
            </p>
          </Card>
          <Card title="Part 2 — TSS &amp; TP" accent="amber">
            <p>
              <strong>Test Suite Structure and Test Purposes.</strong> Organises the tests into a
              hierarchical tree (root → group → sub-group → category) and states, in semi-formal English,
              the objective, initial conditions, and expected behaviour for every test purpose (TP).
              Each TP specifies which PICS items must be set ("Y") before the test applies.
            </p>
            <p className="mt-2 text-sm text-slate-400">
              Example: TP/CAM/MSD/GFQ/TI-01 — "Check that CAMs are not generated more frequently than
              T_GenCamMin". PICS selection: <code>PICS_CAM_GENERATION AND NOT PICS_CV2X_RADIO_COMM</code>.
            </p>
          </Card>
          <Card title="Part 3 — ATS + PIXIT" accent="emerald">
            <p>
              <strong>Abstract Test Suite and PIXIT pro forma.</strong> The executable TTCN-3 code that
              implements every test purpose defined in Part 2. Includes the abstract protocol tester
              architecture, port definitions (camPort, utPort), message templates, and the PCTR pro forma
              for recording results. PIXIT tables capture lab-specific parameters such as tester station ID
              and GPS coordinates.
            </p>
            <p className="mt-2 text-sm text-slate-400">
              The CAM ATS source is published at{' '}
              <code>forge.etsi.org/.../ats_cam_ts102868-3.git</code> (tagged v2.1.1).
            </p>
          </Card>
        </CardGrid>

        <Callout type="example" title="CAM PICS tables at a glance">
          TS 102 868-1 V2.1.1 (2025) contains eight PICS tables for the CAM service. Table A.1 declares
          Release 2 support (mandatory). Table A.2 declares ITS-Station type (Road-side or Vehicle —
          at least one mandatory). Table A.3 declares radio access (ITS-G5 or C-V2X — at least one
          mandatory). Tables A.4–A.5 list optional vehicle profiles (PublicTransport, Emergency, etc.)
          and optional CAM v2 extension containers (PathPredictionContainer,
          VehicleMovementControlContainer, etc.). Table A.6 declares mandatory CAM generation and
          reception. Table A.7 declares mandatory security mode. Table A.8 lists timing parameters with
          defaults and mandatory status.
        </Callout>
      </Section>

      {/* ── TEST LIFECYCLE (STEPS) ── */}
      <Section id="lifecycle" title="The conformance test lifecycle">
        <p>
          A conformance test campaign for one C-ITS protocol follows a reproducible sequence of steps.
          Each step produces a concrete artefact consumed by the next.
        </p>
        <Steps>
          <div>
            <strong>Complete the PICS pro forma.</strong> The product supplier fills in the Part 1
            questionnaire for the protocol under test (e.g. TS 102 868-1 for CAM). Each feature is
            answered Y/N/N-A. Answering "No" to any mandatory item immediately indicates
            non-conformance; the supplier must attach an explanation. The completed PICS is submitted
            to the test laboratory.
          </div>
          <div>
            <strong>Static conformance review.</strong> The test lab compares the completed PICS
            against the standard's static conformance requirements. This produces a Static Conformance
            Test Report (SCTR). Any discrepancy (mandatory feature declared unsupported) is a
            "static non-conformance" and is recorded before any dynamic testing begins.
          </div>
          <div>
            <strong>Select applicable test purposes.</strong> Using the PICS values as a filter, the
            lab selects which test purposes (TPs) from Part 2 are applicable to this implementation.
            A TP whose "PICS Selection" condition evaluates to FALSE for this PICS is skipped. The
            result is a campaign-specific list of selected TCs.
          </div>
          <div>
            <strong>Configure the PIXIT.</strong> The lab fills in the Part 3 PIXIT pro forma with
            lab-specific parameters: IUT station ID, tester station ID, GPS coordinates of the
            tester, timing tolerances (PX_TIME_DELTA = 1 000 ms default), certificate paths for
            security-enabled runs, and GNSS scenario support flags.
          </div>
          <div>
            <strong>Execute the Abstract Test Suite.</strong> A TTCN-3 runtime loads the compiled
            ATS, instantiates the test architecture (Main Test Component + camPort + utPort), and
            executes each selected TC against the SUT. For each TC the system initialises the IUT
            via <code>f_prInitialState()</code>, stimulates it, observes its on-wire response, and
            records a verdict (PASS / FAIL / INCONCLUSIVE). Timing tests (TI) check inter-message
            gaps against T_GenCamMin (100 ms) and T_GenCamMax (1 000 ms) thresholds.
          </div>
          <div>
            <strong>Generate the PCTR.</strong> The Protocol Conformance Test Report records the
            verdict for every TC run, any observations, and the overall IUT conformance status.
            A product with no FAIL verdicts and a consistent PICS receives a positive conformance
            assessment, which is the basis for certification or deployment approval.
          </div>
        </Steps>

        <Callout type="tip" title="Secured vs. unsecured test runs">
          Most CAM and DENM test cases can be executed in either secured or non-secured mode — the
          CAM ATS controls this via the PICS parameter <code>PICS_IS_IUT_SECURED</code>. The
          exception is Service Specific Permissions (SSP) tests, which can only be run in secured
          mode because they require signed certificates with specific bitmap SSP fields. Before a
          secured run, test certificates must be generated, installed on the IUT, and the tester's
          certificate path configured in the test adapter.
        </Callout>
      </Section>

      {/* ── PROTOCOL → TEST-SPEC TABLE ── */}
      <Section id="spec-table" title="Protocol-to-test-specification mapping">
        <p>
          The table below maps every major C-ITS protocol to its ETSI conformance test specifications.
          Each protocol follows the same Part 1 / Part 2 / Part 3 triple structure.
        </p>
        <Table
          caption="C-ITS protocol conformance test specifications"
          headers={['Protocol / Service', 'PICS (Part 1)', 'TSS &amp; TP (Part 2)', 'ATS / PIXIT (Part 3)', 'Base standard', 'Notes']}
          rows={[
            [
              <><Link to="/cam">CAM</Link> — Cooperative Awareness</>,
              <><Ref code="TS 102 868-1" kind="ETSI" title="CAM PICS" /><br />V2.1.1 (2025)</>,
              <><Ref code="TS 102 868-2" kind="ETSI" title="CAM TSS&amp;TP" /><br />V2.1.1 (2025)</>,
              <><Ref code="TS 102 868-3" kind="ETSI" title="CAM ATS" /><br />V2.1.1 (2025)</>,
              'TS 103 900 R2',
              'Full Release 2 coverage; TTCN-3 code on ETSI Forge',
            ],
            [
              <><Link to="/denm">DENM</Link> — Decentralised Environmental Notification</>,
              <><Ref code="TS 102 869-1" kind="ETSI" title="DENM PICS" /><br />V1.x</>,
              <><Ref code="TS 102 869-2" kind="ETSI" title="DENM TSS&amp;TP" /><br />V1.6.1 (2020)</>,
              <><Ref code="TS 102 869-3" kind="ETSI" title="DENM ATS" /></>,
              'EN 302 637-3',
              'Tests cover event generation, update, termination, repetition, keep-alive forwarding',
            ],
            [
              <><Link to="/networking">GeoNetworking</Link></>,
              <><Ref code="TS 102 870-1" kind="ETSI" title="GeoNet PICS" /><br />V1.2.1 (2022)</>,
              <><Ref code="TS 102 870-2" kind="ETSI" title="GeoNet TSS&amp;TP" /></>,
              <><Ref code="TS 102 870-3" kind="ETSI" title="GeoNet ATS" /></>,
              'EN 302 636-4-1',
              'BTP header types A &amp; B, packet structures, forwarding algorithms',
            ],
            [
              <><Link to="/networking">BTP &amp; IPv6</Link> over GeoNetworking</>,
              <><Ref code="TS 102 871-1" kind="ETSI" title="BTP PICS" /><br />V2.1.1 (2026)</>,
              <><Ref code="TS 102 871-2" kind="ETSI" title="BTP TSS&amp;TP" /></>,
              <><Ref code="TS 102 871-3" kind="ETSI" title="BTP ATS" /></>,
              'EN 302 636-5-1 / -6-1',
              'Transport layer above GeoNet; also covers IPv6 encapsulation',
            ],
            [
              'IP over GeoNetworking (media-dependent)',
              <><Ref code="TS 102 859-1" kind="ETSI" title="GeoNet media PICS" /><br />V1.3.1 (2022)</>,
              <><Ref code="TS 102 859-2" kind="ETSI" title="GeoNet media TSS&amp;TP" /></>,
              <><Ref code="TS 102 859-3" kind="ETSI" title="GeoNet media ATS" /></>,
              'EN 302 636-6-1',
              'Transmission of IP packets over GeoNetworking (non-ITS-G5-specific)',
            ],
            [
              <><Link to="/security">Security</Link> — ITS-G5 / DSRC interference mitigation</>,
              <><Ref code="TS 102 916-1" kind="ETSI" title="ITS-G5 DSRC coexistence PICS" /><br />V1.2.1 (2023)</>,
              <><Ref code="TS 102 916-2" kind="ETSI" title="ITS-G5 DSRC TSS&amp;TP" /></>,
              <><Ref code="TS 102 916-3" kind="ETSI" title="ITS-G5 DSRC ATS" /></>,
              'TS 102 792 / EN 302 663',
              'Coexistence of ITS-G5 with TTT (Transport Telematics) DSRC tolling systems',
            ],
            [
              <><Link to="/security">Security</Link> — channel congestion control</>,
              <><Ref code="TS 102 917-1" kind="ETSI" title="DCC PICS" /><br />V1.1.1 (2013)</>,
              <><Ref code="TS 102 917-2" kind="ETSI" title="DCC TSS&amp;TP" /></>,
              <><Ref code="TS 102 917-3" kind="ETSI" title="DCC ATS" /></>,
              'EN 302 571',
              'Decentralised Congestion Control (DCC) algorithms in the 5.9 GHz band',
            ],
            [
              <><Link to="/security">ITS Security</Link> — header &amp; certificate formats</>,
              <><Ref code="TS 103 096-1" kind="ETSI" title="ITS Security PICS" /><br />V2.1.1 (2024)</>,
              <><Ref code="TS 103 096-2" kind="ETSI" title="ITS Security TSS&amp;TP" /><br />V2.1.1 (2024)</>,
              <><Ref code="TS 103 096-3" kind="ETSI" title="ITS Security ATS" /></>,
              'TS 103 097 R2',
              'Covers certificate content (Root CA, AA, AT), CAM/DENM signed message profiles, sending and receiving behaviour',
            ],
          ]}
        />
        <p className="mt-4 text-sm text-slate-400">
          Note: TS 102 916 covers ITS-G5 coexistence mitigation (DSRC interference), not PKI security.
          TS 103 096 covers ITS security header and certificate formats (TS 103 097). These are separate
          concerns addressed by distinct test series.
        </p>
      </Section>

      {/* ── DEEP DIVE: CAM EXAMPLE ── */}
      <Section id="cam-example" title="Deep dive: the CAM test triple">
        <p>
          The Cooperative Awareness Message (CAM) test specifications (TS 102 868-1/-2/-3, all at
          V2.1.1 from July 2025) are the most mature ITS test triple and illustrate the methodology
          in full detail.
        </p>

        <h3>TSS structure</h3>
        <p>
          The CAM Test Suite Structure (TSS) is a four-level tree:
        </p>
        <div className="my-4 overflow-x-auto">
          <table className="min-w-full text-sm text-slate-300 border-collapse">
            <thead>
              <tr className="border-b border-ink-600 text-left text-xs uppercase tracking-wide text-slate-500">
                <th className="pr-6 pb-2">Root</th>
                <th className="pr-6 pb-2">Group</th>
                <th className="pr-6 pb-2">Sub-Group</th>
                <th className="pb-2">Category</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-700">
              <tr className="py-1">
                <td className="pr-6 py-1 font-mono text-brand-300">CAM</td>
                <td className="pr-6 py-1">Message Dissemination (MSD)</td>
                <td className="pr-6 py-1">Message Format (FMT)</td>
                <td className="py-1">Valid (BV)</td>
              </tr>
              <tr>
                <td className="pr-6 py-1"></td>
                <td className="pr-6 py-1"></td>
                <td className="pr-6 py-1">Information Adaptation (INA)</td>
                <td className="py-1">Valid (BV)</td>
              </tr>
              <tr>
                <td className="pr-6 py-1"></td>
                <td className="pr-6 py-1"></td>
                <td className="pr-6 py-1">Generation Frequency (GFQ)</td>
                <td className="py-1">Valid (BV) + Timer (TI)</td>
              </tr>
              <tr>
                <td className="pr-6 py-1"></td>
                <td className="pr-6 py-1"></td>
                <td className="pr-6 py-1">Lower-layer Parameters (PAR)</td>
                <td className="py-1">Valid (BV)</td>
              </tr>
              <tr>
                <td className="pr-6 py-1"></td>
                <td className="pr-6 py-1">Message Processing (MSP)</td>
                <td className="pr-6 py-1">—</td>
                <td className="py-1">Valid (BV)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Test purpose naming</h3>
        <p>
          Every TP identifier encodes its location in the tree:{' '}
          <code>TP/&lt;root&gt;/&lt;group&gt;/&lt;sub-group&gt;/&lt;category&gt;-&lt;nn&gt;</code>.
          For example <code>TP/CAM/MSD/GFQ/TI-01</code> is the first Timer test for CAM Message
          Dissemination &gt; Generation Frequency. The corresponding TTCN-3 test case is named
          <code>TC_CAM_MSD_GFQ_TI_01</code>.
        </p>

        <h3>Representative test purposes</h3>
        <Callout type="example" title="TP/CAM/MSD/GFQ/BV-04 — heading-triggered CAM">
          <p>
            <strong>Objective:</strong> Check that a CAM is generated immediately when the time elapsed
            since the last CAM is &ge; T_GenCam_Dcc <em>and</em> the absolute difference between the
            current heading and the heading in the previous CAM exceeds 4&deg;.
          </p>
          <p className="mt-1">
            <strong>Initial conditions:</strong> IUT has sent a CAM with heading HEADING_1; is alerted
            about new heading HEADING_2 where |HEADING_2 &ndash; HEADING_1| &gt; 4&deg;.
          </p>
          <p className="mt-1">
            <strong>Expected behaviour:</strong> On expiry of T_GenCam_Dcc, the IUT sends a CAM
            immediately.
          </p>
        </Callout>
        <Callout type="example" title="TP/CAM/MSD/PAR/BV-02 — SHB encapsulation">
          <p>
            <strong>Objective:</strong> Check that a CAM is encapsulated in a Single Hop Broadcast
            (SHB) GeoNetworking packet.
          </p>
          <p className="mt-1">
            <strong>Expected behaviour:</strong> When a CAM is generated, the IUT sends it encapsulated
            in a SHB packet with a GN Basic Header Lifetime field less than 1 s.
          </p>
        </Callout>
        <Callout type="example" title="TP/CAM/MSP/SSP/BV-02-X — SSP enforcement on reception">
          <p>
            <strong>Objective:</strong> Check that the IUT discards a received CAM if the SSP
            (Service Specific Permissions) bitmap in the signing certificate does not cover the
            container present in the message (e.g. bit 2 of octet 1 covers
            publicTransport/publicTransportContainer).
          </p>
          <p className="mt-1">
            This test can only run in secured mode. It validates that the security layer correctly
            enforces certificate permission constraints, not just the signature itself.
          </p>
        </Callout>

        <h3>Validation status (TR 103 061-1)</h3>
        <p>
          ETSI TR 103 061 documents the validation of each protocol's ATS against real industry
          implementations. TR 103 061-1 (CAM, V1.2.1, 2014) reports Level 3 (Rigorous) validation:
          the CAM ATS was compiled on two independent TTCN-3 tools (TestingTech TTworkbench and
          Elvior TestCast T3), then executed against SUTs from Hitachi Europe, NEC Europe, and
          Commsignia. All test cases achieved PASS verdicts. The TR series covers CAM (part 1),
          DENM (part 2), GeoNetworking (part 3), BTP (part 4), and IPv6 (part 5).
        </p>
      </Section>

      {/* ── SECURITY TEST SPECS ── */}
      <Section id="security-testing" title="Security conformance testing (TS 103 096)">
        <p>
          The <Link to="/security">ITS security</Link> layer (certificate formats, signed message
          handling — defined in TS 103 097) has its own dedicated test triple:
          TS 103 096-1/-2/-3 V2.1.1 (2024), updated for Release 2.
        </p>
        <p>
          The TSS for ITS Security (TS 103 096-2) covers both <strong>sending</strong> and{' '}
          <strong>receiving</strong> behaviour, organised by message profile:
        </p>
        <ul>
          <li>
            <strong>CAM profile</strong> — tests for signed CAM: signed flag, AID value, header
            fields, signer information (certificate vs. digest), certificate chain sending,
            certificate request handling, generation time, payload integrity, signing permissions
            (SSP), signature validity, certificate content, and certificate consistency conditions.
          </li>
          <li>
            <strong>DENM profile</strong> — same categories plus generation location checks
            (DENM carries geographic extent in the signed payload).
          </li>
          <li>
            <strong>Generic signed message profile</strong> — any other ITS-AID.
          </li>
          <li>
            <strong>Implicit certificate</strong> — tests specific to ECQV (Elliptic Curve Qu-Vanstone)
            implicit certificate structures used in some authority tiers.
          </li>
        </ul>
        <p>
          The PICS (TS 103 096-1) captures ITS-S security capabilities: which certificate tiers are
          supported (Root CA, Authorisation Authority, Authorisation Ticket), which cryptographic
          algorithms are implemented, and whether the implementation supports sending certificate
          requests.
        </p>
        <Callout type="warn" title="Two separate security test series">
          TS 102 916 and TS 102 917 are <em>not</em> PKI security test specs — they test the
          radio-layer coexistence and congestion control respectively. PKI / certificate security is
          tested by TS 103 096. Confusing these is a common mistake when navigating the ITS testing
          landscape.
        </Callout>
      </Section>

      {/* ── CONFORMANCE vs INTEROP vs PLUGTESTS ── */}
      <Section id="conformance-vs-interop" title="Conformance, interoperability, and Plugtests">
        <p>
          Three complementary testing activities give confidence that C-ITS deployments will work:
        </p>
        <CardGrid cols={3}>
          <Card title="Conformance testing" accent="brand">
            <p>
              One device, tested in a lab against a reference TTCN-3 test system. The test system
              acts as a simulated ITS-station peer, injecting stimuli and verifying responses against
              formal test purposes. Produces a PCTR with per-test-case PASS/FAIL verdicts.
              Prerequisite for type approval in many European national frameworks.
            </p>
          </Card>
          <Card title="Interoperability testing" accent="amber">
            <p>
              Two or more real devices from different vendors, tested together over the air (or over
              a link emulator). Checks end-to-end behaviour that conformance testing cannot fully
              exercise: optional feature negotiation, timing under load, edge cases in real RF
              environments. No single formal pass/fail framework — results are vendor bilateral
              agreements or multi-lateral test event reports.
            </p>
          </Card>
          <Card title="ETSI Plugtests" accent="emerald">
            <p>
              ETSI's branded multi-vendor interoperability events (PLUGTESTS™). For C-ITS, ETSI has
              run ITS Plugtests campaigns where OEMs, RSU manufacturers, PKI providers, and map
              suppliers connect their implementations and validate cross-vendor service chains.
              Results feed back into both base standards and test specifications. C-Roads also runs
              its own cross-border interoperability test sessions at border pilot sites.
            </p>
          </Card>
        </CardGrid>

        <h3>C-Roads cross-border interoperability testing</h3>
        <p>
          The <Link to="/c-roads">C-Roads Platform</Link> has established specific interoperability
          test requirements for national C-ITS deployments. Operator A's RSU must correctly generate
          and sign DENM messages that Operator B's OBU (from a different country and vendor) can
          receive, validate, and present to the driver. This requires not just protocol conformance
          but also PKI interoperability — the OBU must trust the certificate chain anchored in
          Operator A's Root CA, which must be cross-certified or listed in the C-Roads trust list.
        </p>
        <p>
          C-Roads test campaigns include bilateral cross-border test events at operational pilot
          sites (e.g. Austria–Germany border on the A8 motorway), where test vehicles from multiple
          OEMs drive through RSU coverage areas and log whether V2X messages are correctly received
          and displayed. These field tests complement lab-based conformance testing.
        </p>
      </Section>

      {/* ── ITS-G5 RF TEST METHODS ── */}
      <Section id="rf-testing" title="ITS-G5 RF and physical-layer test methods (TR 103 061)">
        <p>
          While the TS 102 868–102 871 series test upper-layer protocols, the physical and radio
          behaviour of ITS-G5 (the 5.9 GHz DSRC radio) is covered by:
        </p>
        <ul>
          <li>
            <strong>ETSI TR 103 061</strong> (parts 1–5) — the validation reports for the CAM, DENM,
            GeoNetworking, BTP, and IPv6 ATS respectively. These technical reports document which
            TTCN-3 tools were used for compilation, which SUT implementations were tested, and the
            resulting pass/fail statistics. They confirm that the abstract test suites have been
            validated against real hardware and are ready for use by test labs.
          </li>
          <li>
            <strong>ETSI TS 102 916</strong> — tests for the mitigation techniques that prevent
            ITS-G5 from interfering with older TTT (Transport and Traffic Telematics) DSRC systems
            operating in the same 5.9 GHz band (tolling, weigh-in-motion). The PICS (Part 1) declares
            which detection and mitigation methods the ITS-G5 device supports (carrier sensing,
            listen-before-talk, etc.) and antenna mounting characteristics.
          </li>
          <li>
            <strong>ETSI TS 102 917</strong> — tests for Decentralised Congestion Control (DCC)
            algorithms, which manage channel load on the ITS-G5 access layer to prevent broadcast
            storms in dense vehicle environments.
          </li>
        </ul>
        <Callout type="info" title="From lab to field: the ETSI conformance validation framework">
          ETSI TR 103 099 ("Architecture of conformance validation framework") describes how the
          TTCN-3 test adapter bridges the abstract test system to real ITS-G5 radio hardware.
          The CAM validation (TR 103 061-1) used a Cohda Wireless MK2 ITS-G5 radio as the hardware
          adapter, with the TTCN-3 runtime communicating over a VPN to reach the SUT. The
          open-source test adapter and codec are published on ETSI Forge alongside the ATS.
        </Callout>
      </Section>

      {/* ── STATS ── */}
      <Section id="stats" title="Key numbers">
        <StatGrid cols={4}>
          <Stat value="8" label="Protocol test triples" sub="CAM, DENM, GeoNet, BTP, IPv6, coexistence, DCC, security" />
          <Stat value="ISO 9646" label="Conformance framework" sub="Parts 1, 2, 6, 7 referenced" />
          <Stat value="TTCN-3" label="Test language" sub="ES 201 873; ASN.1 import" />
          <Stat value="Level 3" label="ATS validation" sub="Rigorous; multiple tools &amp; SUTs" />
        </StatGrid>
      </Section>

      {/* ── KEY STANDARDS ── */}
      <Section id="standards" title="Key standards">
        <Table
          headers={['Standard', 'Title', 'Role']}
          rows={[
            [<Ref code="TS 102 868" kind="ETSI" title="CAM conformance" />, 'Conformance test specs for CA Basic Service (Parts 1–3)', 'CAM PICS / TSS&TP / ATS'],
            [<Ref code="TS 102 869" kind="ETSI" title="DENM conformance" />, 'Conformance test specs for DEN Basic Service (Parts 1–3)', 'DENM PICS / TSS&TP / ATS'],
            [<Ref code="TS 102 870" kind="ETSI" title="GeoNetworking conformance" />, 'Conformance test specs for GeoNetworking &amp; BTP (Parts 1–3)', 'GeoNet PICS / TSS&TP / ATS'],
            [<Ref code="TS 102 871" kind="ETSI" title="BTP/IPv6 conformance" />, 'Conformance test specs for GeoNetworking (Parts 1–3, R2)', 'BTP/IPv6 PICS / TSS&TP / ATS'],
            [<Ref code="TS 102 859" kind="ETSI" title="IP over GeoNet conformance" />, 'Conformance test specs for IP packets over GeoNetworking (Parts 1–3)', 'Media-dependent GeoNet testing'],
            [<Ref code="TS 102 916" kind="ETSI" title="ITS-G5/DSRC coexistence" />, 'Test specs for ITS-G5 / TTT DSRC interference mitigation (Parts 1–2)', 'Radio coexistence PICS &amp; TSS&TP'],
            [<Ref code="TS 102 917" kind="ETSI" title="DCC testing" />, 'Test specs for channel congestion control algorithms (Parts 1–3)', 'DCC PICS / TSS&TP / ATS'],
            [<Ref code="TS 103 096" kind="ETSI" title="ITS Security conformance" />, 'Conformance test specs for ITS Security (Parts 1–3, R2)', 'Security PICS / TSS&TP / ATS'],
            [<Ref code="TR 103 061" kind="ETSI" title="ITS-G5 validation reports" />, 'Validation reports for C-ITS test suites (Parts 1–5)', 'ATS validation evidence'],
            [<Ref code="ISO/IEC 9646-1" kind="ISO" title="OSI conformance testing" />, 'Conformance testing methodology and framework — General concepts', 'Foundational testing methodology'],
            [<Ref code="EG 202 798" kind="ETSI" title="ITS testing framework" />, 'Framework for ITS conformance and interoperability testing', 'ITS-specific methodology guidance'],
          ]}
        />
      </Section>

      {/* ── WHERE NEXT ── */}
      <Section id="where-next" title="Where next">
        <p>
          Dive deeper into the protocols being tested or the deployment ecosystem that makes
          interoperability mandatory:
        </p>
        <ul>
          <li><Link to="/cam">CAM — Cooperative Awareness Messages</Link> — the most frequently tested V2X message</li>
          <li><Link to="/denm">DENM — Decentralised Environmental Notification</Link> — event-triggered safety messages</li>
          <li><Link to="/networking">GeoNetworking &amp; BTP</Link> — the transport layer under CAM/DENM</li>
          <li><Link to="/security">Security &amp; PKI</Link> — certificates, signing, and the trust infrastructure under test</li>
          <li><Link to="/c-roads">C-Roads</Link> — the European programme driving cross-border interoperability requirements</li>
        </ul>
      </Section>
    </article>
  )
}
