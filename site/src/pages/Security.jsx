import React from 'react'
import { Link } from 'react-router-dom'
import { PageHeader, Section, Prose, Callout, Ref, Table, StatGrid, Stat, CardGrid, Card, Steps, Figure, LayerStack, DefList, Badge } from '../components/ui.jsx'

export default function Security() {
  return (
    <article>
      <PageHeader
        kicker="ITS Security"
        title="The Security Stack"
        intro="Every C-ITS message broadcast on the air is digitally signed, its sender authenticated, and its authority to send that message type verified — all before the payload influences any vehicle decision. This page walks through the ETSI ITS security architecture: the threat model that shaped it, the layered standard stack that implements it, the on-wire secured-message and certificate formats, pseudonym privacy, and the misbehaviour detection loop that catches bad actors after deployment."
        sources={['ETSI TS 102 940', 'ETSI TS 102 941', 'ETSI TS 103 097', 'ETSI TR 102 893', 'ETSI TS 103 759']}
      />

      {/* ── 1. Security goals ───────────────────────────────────────────── */}
      <Section id="goals" title="Security Goals">
        <Callout type="key" title="Signed, not encrypted — for safety broadcasts">
          Cooperative awareness broadcasts (CAM, DENM) are sent to any ITS station within radio range.
          They carry no confidentiality requirement — encrypting them would prevent every receiver from processing the safety data.
          Instead the requirement is <strong>authenticity and integrity</strong>: the receiver must be able to verify that the
          message came from a legitimately enrolled station and has not been tampered with in transit.
          Privacy is achieved through <strong>pseudonymity</strong>, not encryption.
          Confidentiality services (TS 102 943) exist only for unicast sessions containing personal or commercial data.
        </Callout>

        <p>
          ETSI TR 102 893 (the ITS Threat, Vulnerability and Risk Analysis, TVRA) identifies five security objective categories for ITS:
        </p>

        <DefList items={[
          {
            term: 'Authenticity (Au)',
            def: 'Only authorised ITS stations may pose as senders. An ITS-S should reject messages from unauthorised sources. Only specially authorised stations may claim priority rights (e.g. emergency vehicle).',
          },
          {
            term: 'Integrity (In)',
            def: 'Transmitted information must be protected against modification during transit. Both application payloads and security management messages need integrity protection.',
          },
          {
            term: 'Availability (Av)',
            def: 'Authorised users must not be prevented from accessing ITS services by Denial-of-Service or jamming attacks.',
          },
          {
            term: 'Confidentiality (Co)',
            def: "Restricted information (unicast sessions, personal data) must not be revealed to unauthorised parties. For broadcast safety messages, the sender's true identity (rather than message content) is what must remain confidential.",
          },
          {
            term: 'Accountability (Ac)',
            def: 'All changes to security parameters and applications should be auditable. Misbehaving stations must be identifiable to the PKI infrastructure so they can be revoked.',
          },
        ]} />

        <p>
          The overarching principle from TS 102 940 §4.3.1.2 is explicit: "As CAMs are broadcasts to any possible receiver there are no confidentiality requirements."
          Privacy is handled through pseudonymity: the ITS-S broadcasts under a temporary pseudonym certificate (Authorization Ticket, AT)
          that cannot be linked to the vehicle's real identity by observers on the air.
        </p>
      </Section>

      {/* ── 2. Threat model (TVRA) ──────────────────────────────────────── */}
      <Section id="tvra" title="Threat Model — TVRA (TR 102 893)">
        <p>
          ETSI TR 102 893 V1.2.1 applies the ETSI TVRA method to 5.9 GHz ITS communications,
          defining a Target of Evaluation (ToE) as a single ITS-S (Vehicle) or ITS-S (Roadside)
          with all attack interfaces exposed. The analysis covers vehicle-to-vehicle (V2V) and
          vehicle-to-infrastructure (V2I) communications across the ITS Basic Set of Applications.
        </p>

        <Table
          caption="Key ITS threats identified in TR 102 893 and their primary countermeasures"
          headers={['Threat', 'Attack vector', 'Impact', 'Primary countermeasure']}
          rows={[
            [
              <><Badge tone="rose">Spoofing / Masquerade</Badge></>,
              'Attacker transmits crafted messages pretending to be a legitimate ITS-S or emergency vehicle',
              'False safety warnings; unwarranted priority claims; incorrect LDM data',
              'PKI digital signatures — every message signed with an Authorization Ticket; receivers verify signature and certificate chain',
            ],
            [
              <><Badge tone="amber">Replay attack</Badge></>,
              'Captured valid signed message re-broadcast later or at a different location',
              'Stale hazard events re-triggered; emergency braking caused in unaffected areas',
              'Timestamp (generationTime) in header info; replay protection service validates freshness',
            ],
            [
              <><Badge tone="rose">Sybil attack</Badge></>,
              'Attacker controls many pseudonyms simultaneously to simulate a large number of independent ITS-Ss',
              'Traffic density manipulation; false consensus on road events',
              'PKI enrolment rate-limiting; Misbehaviour Authority correlation; butterfly AT provisioning limits batch sizes',
            ],
            [
              <><Badge tone="amber">Tracking / Location privacy</Badge></>,
              'Passive listener correlates beacon transmissions by pseudonym over time to track vehicle route',
              'Surveillance; profiling of vehicle occupants',
              'Pseudonym change strategy (AT rotation) with synchronous ID change across all stack layers',
            ],
            [
              <><Badge tone="brand">Data injection / Bogus information</Badge></>,
              'Enrolled but malicious or malfunctioning station sends false position, speed, or hazard data',
              'Incorrect decisions by other ITS-Ss; near-crash events',
              'Plausibility checks; Misbehaviour Detection (TS 103 759); revocation by Misbehaviour Authority',
            ],
            [
              <><Badge tone="amber">Denial of Service (DoS)</Badge></>,
              'Radio flooding; channel saturation; certificate chain exhaustion',
              'Legitimate messages lost; safety service unavailable',
              'Frequency agility; message rate limits; station deactivation via Remote management service',
            ],
          ]}
        />

        <p>
          The TVRA concludes that a PKI-like signed-message approach (countermeasure CM11.3.7) is the most cost-effective
          countermeasure set for integrity and authenticity threats, combined with pseudonym rotation (CM11.3.18) for privacy,
          and plausibility checks (CM11.3.20) plus remote deactivation (CM11.3.21) for residual risks.
        </p>
      </Section>

      {/* ── 3. Standard stack ───────────────────────────────────────────── */}
      <Section id="stack" title="The ETSI Security Standard Stack">
        <p>
          The Security Entity in the ITS station architecture (defined in ETSI EN 302 665) is a <em>vertical</em> entity
          that spans all four horizontal processing layers — Access, Networking &amp; Transport, Facilities, and Applications.
          Security services operate layer-by-layer; the Security Entity also contains a Security Management sub-part and
          a Security Defense layer (IDS/IPS, misbehaviour detection).
        </p>

        <LayerStack
          leftRail="Security Entity"
          rightRail="Management"
          layers={[
            { name: 'TS 102 940 — Security Architecture & Management', sub: 'Overall architecture; PKI roles (Root CA, EA, AA, MA); trust model; reference points S1–S12', accent: 'brand' },
            { name: 'TS 102 941 — Trust & Privacy Management', sub: 'Enrolment, authorization, butterfly AT provisioning; CTL/CRL generation & distribution; key lifecycle', accent: 'violet' },
            { name: 'TS 102 942 — Access Control', sub: 'Credential requirements; enrolment trust levels; authorization ticket grant criteria', accent: 'emerald' },
            { name: 'TS 102 943 — Confidentiality Services', sub: 'Encryption of unicast point-to-point sessions containing personal or commercial data', accent: 'cyan' },
            { name: 'TS 103 097 — Security Header & Certificate Formats', sub: 'On-wire EtsiTs103097Data (SignedData / EncryptedData); certificate ASN.1 profiles; ECDSA + AES-128', accent: 'amber' },
            { name: 'TS 102 731 — Security Services & Architecture', sub: 'Catalogue of communication security services (authentication, integrity, replay protection, identity management)', accent: 'rose' },
            { name: 'TR 102 893 — TVRA', sub: 'Threat, Vulnerability and Risk Analysis — motivates the above specifications', accent: 'amber' },
            { name: 'TS 103 759 — Misbehaviour Reporting Service', sub: 'On-vehicle detection, signed-and-encrypted MR format, upload to Misbehaviour Authority', accent: 'violet' },
          ]}
        />

        <Table
          caption="What each security standard does"
          headers={['Standard', 'Title (short)', 'Core function']}
          rows={[
            [<Ref code="TS 102 731" kind="ETSI" title="Security Services" />, 'Security Services & Architecture', 'Defines the catalogue of ITS communication security services: security associations, single-message signing/encryption, integrity, replay protection, identity management, misbehaviour logging. Release 2 (V2.0.0, 2022) references V1.1.1 (2010).'],
            [<Ref code="TS 102 940" kind="ETSI" title="Security Architecture" />, 'Security Architecture & Management', 'Maps services to the ITS station architecture; defines functional entities (EA, AA, Root CA, MA, TLM, CPOC) and reference points S1–S12; specifies guidelines for enrolment trust, identity management, and confidentiality. V2.1.1 (2021).'],
            [<Ref code="TS 102 941" kind="ETSI" title="Trust & Privacy" />, 'Trust & Privacy Management', 'The main PKI protocol spec: enrolment request/response; authorization request/response; butterfly key AT provisioning; CTL/CRL generation and distribution; unicast/multicast security associations. V2.2.1 (2022).'],
            [<Ref code="TS 102 942" kind="ETSI" title="Access Control" />, 'Access Control', 'Specifies the access control requirements enforced through the enrolment and authorization credential system. V2.0.0 (2022) re-endorses V1.1.1.'],
            [<Ref code="TS 102 943" kind="ETSI" title="Confidentiality" />, 'Confidentiality Services', 'Specifies encryption services for unicast sessions carrying personal or commercial data. V2.0.0 (2022) re-endorses V1.1.1.'],
            [<Ref code="TS 103 097" kind="ETSI" title="Sec. Header & Cert Formats" />, 'Security Header & Certificate Formats', 'The on-wire format: defines EtsiTs103097Data as a profile of IEEE 1609.2; specifies SignedData, EncryptedData, certificate (EtsiTs103097Certificate) with appPermissions, validity period, region; security profiles for CAM/DENM/encrypted/signed-and-encrypted messages. V2.2.1 (2026).'],
            [<Ref code="TR 102 893" kind="ETSI" title="TVRA" />, 'Threat, Vulnerability & Risk Analysis', 'Systematic threat analysis of 5.9 GHz ITS: identifies attack interfaces, threat agents, vulnerabilities, and countermeasures. Provides the risk-based justification for the PKI security design. V1.2.1 (2017).'],
            [<Ref code="TS 103 759" kind="ETSI" title="Misbehaviour Reporting" />, 'Misbehaviour Reporting Service', 'Specifies the on-vehicle misbehaviour detection and reporting service: MR format (signed and encrypted), dissemination protocol (HTTPS POST to MA URL), certificate profiles for ITS-S and MA. V2.2.1 (2026).'],
          ]}
        />
      </Section>

      {/* ── 4. Secured message structure ────────────────────────────────── */}
      <Section id="message-format" title="Secured Message Structure (TS 103 097)">
        <p>
          Every ITS safety message on the air is wrapped in an <code>EtsiTs103097Data</code> structure,
          defined by TS 103 097 as a profile of IEEE Std 1609.2. The outermost choice for broadcast
          safety messages is <code>signedData</code>, producing a <code>SignedData</code> PDU.
        </p>

        <Figure caption="Structure of a signed ITS message (EtsiTs103097Data-Signed), as specified in TS 103 097">
          <div className="font-mono text-sm leading-relaxed space-y-1 bg-ink-900 rounded p-4 border border-ink-700 text-slate-300 overflow-x-auto">
            <div><span className="text-brand-300">EtsiTs103097Data</span> {'{'}</div>
            <div className="pl-4"><span className="text-amber-300">protocolVersion</span>: 3</div>
            <div className="pl-4"><span className="text-amber-300">content</span>: <span className="text-brand-300">SignedData</span> {'{'}</div>
            <div className="pl-8"><span className="text-amber-300">hashId</span>: sha256  <span className="text-slate-500">-- hash algorithm for the signature</span></div>
            <div className="pl-8"><span className="text-amber-300">tbsData</span>: <span className="text-brand-300">ToBeSignedData</span> {'{'}</div>
            <div className="pl-12"><span className="text-amber-300">payload</span>: {'{ data: <CAM | DENM | ...> }'}</div>
            <div className="pl-12"><span className="text-amber-300">headerInfo</span>: <span className="text-brand-300">HeaderInfo</span> {'{'}</div>
            <div className="pl-16"><span className="text-emerald-300">psid</span>: &lt;ITS-AID, e.g. 36 for CAM&gt;  <span className="text-slate-500">-- application ID</span></div>
            <div className="pl-16"><span className="text-emerald-300">generationTime</span>: &lt;Time64, always present&gt;</div>
            <div className="pl-16"><span className="text-emerald-300">generationLocation</span>: &lt;present for DENM&gt;</div>
            <div className="pl-16"><span className="text-emerald-300">expiryTime</span>: &lt;optional&gt;</div>
            <div className="pl-12">{'}'}</div>
            <div className="pl-8">{'}'}</div>
            <div className="pl-8"><span className="text-amber-300">signer</span>: <span className="text-rose-300">digest</span> | <span className="text-rose-300">certificate</span>  <span className="text-slate-500">-- HashedId8 digest or full AT cert</span></div>
            <div className="pl-8"><span className="text-amber-300">signature</span>: <span className="text-brand-300">Signature</span>  <span className="text-slate-500">-- ECDSA over tbsData</span></div>
            <div className="pl-4">{'}'}</div>
            <div>{'}'}</div>
          </div>
        </Figure>

        <DefList items={[
          {
            term: 'hashId',
            def: 'Hash algorithm used: SHA-256 or SHA-384. TS 103 097 §4.2 specifies ECDSA as the digital signature algorithm and SHA-256/SHA-384 as hash algorithms.',
          },
          {
            term: 'tbsData (To-Be-Signed data)',
            def: 'The portion that is cryptographically signed. Contains the payload (the actual ITS message) and the headerInfo. Receivers hash this field and verify against the signature.',
          },
          {
            term: 'headerInfo.psid (ITS-AID)',
            def: 'ITS Application Identifier — uniquely identifies the application (e.g. 36 for CAM, 37 for DENM, values registered in TS 102 965). The AT carried in signer must have appPermissions that include this ITS-AID; if not, the message is rejected.',
          },
          {
            term: 'headerInfo.generationTime',
            def: 'Always present in ETSI ITS signed messages (TS 103 097 §5.2). Used for replay protection — receivers reject messages with timestamps outside an acceptable window.',
          },
          {
            term: 'signer',
            def: 'Either digest (HashedId8 of the Authorization Ticket certificate, the normal case to save bandwidth) or certificate (the full AT embedded, required once per second per CAM profile so receivers can build the certificate chain). For DENMs the full certificate is always included.',
          },
          {
            term: 'signature',
            def: 'ECDSA signature over the hash of tbsData, computed with the private key whose corresponding public key is in the Authorization Ticket.',
          },
        ]} />

        <Callout type="tip" title="CAM vs DENM signing profiles">
          TS 103 097 §7.1.1 (CAM profile): the <code>signer</code> defaults to <code>digest</code>; the full certificate is
          included once per second and also when the receiver requests it via <code>inlineP2pcdRequest</code>.
          §7.1.2 (DENM profile): the <code>signer</code> is always <code>certificate</code> (full AT embedded) and
          <code>generationLocation</code> is mandatory — because DENM can be forwarded by intermediate ITS-Ss
          that need to verify the origin independently.
        </Callout>

        <p>
          For unicast sessions carrying personal data, TS 103 097 provides the <code>EtsiTs103097Data-Encrypted</code> and{' '}
          <code>EtsiTs103097Data-SignedAndEncrypted</code> profiles, using ECIES (Elliptic Curve Integrated Encryption Scheme)
          with AES-128 symmetric keys. Enrolment and authorization management messages use{' '}
          <code>EtsiTs103097Data-SignedAndEncrypted</code> to protect both integrity and confidentiality of the PKI dialogue.
        </p>
      </Section>

      {/* ── 5. Certificate format ────────────────────────────────────────── */}
      <Section id="certificate" title="Certificate Format — EtsiTs103097Certificate">
        <p>
          The ITS certificate format is defined in TS 103 097 §6 as <code>EtsiTs103097Certificate</code>,
          a profile of IEEE 1609.2 <code>Certificate</code>. Unlike X.509 certificates, ITS certificates are compact,
          binary-encoded (COER — Canonical Octet Encoding Rules), and carry ITS-specific application permissions.
          Both explicit certificates (with full verification key) and implicit certificates (with reconstruction value)
          are supported from TS 103 097 V2.2.1 onwards.
        </p>

        <Table
          caption="Key fields of an EtsiTs103097Certificate (TS 103 097 §6)"
          headers={['Field', 'Description']}
          rows={[
            ['id', "CertificateId — set to name (a string) for CA and EC certificates; set to none for Authorization Tickets (anonymous)"],
            ["cracaId / crlSeries", "Set to 000000'H and 0 respectively — indicates ETSI-defined revocation mechanisms are used, not IEEE 1609.2 mechanisms"],
            ['validityPeriod', 'Start time + duration interval (e.g. a few days for ATs, months for EA/AA certs, years for Root CA)'],
            ['region', 'Optional geographic constraint (GeographicRegion) — limits where the certificate is valid; value 65535 = EU 27 countries as of 31 January 2020'],
            ['assuranceLevel', 'SubjectAssurance — encodes the trust level of the ITS-S platform'],
            ['appPermissions (PSID/SSP)', 'Sequence of ITS-AID + Service Specific Permissions (SSP) bitmask — lists exactly which ITS applications and which sub-permissions the holder may exercise. Must be present in Authorization Tickets.'],
            ['certIssuePermissions', 'For CA certificates — permissions the CA may grant to sub-certificates. Must be absent in Authorization Tickets.'],
            ['encryptionKey', 'Optional public encryption key (for EA/AA/MA certificates, allows ITS-Ss to encrypt requests to them)'],
            ['verifyKeyIndicator', 'For explicit certs: verificationKey (EC public key); for implicit certs: reconstructionValue'],
            ['signature', 'ECDSA signature by the issuing CA, computed over the toBeSigned portion'],
          ]}
        />

        <Callout type="example" title="Authorization Ticket (AT) — the pseudonym certificate">
          An AT is an <code>EtsiTs103097Certificate</code> where: <code>id</code> is set to <code>none</code>
          (no linkable name), <code>certIssuePermissions</code> is absent (it cannot sign sub-certificates),
          <code>appPermissions</code> lists the ITS-AIDs the vehicle may sign messages for (e.g. CAM, DENM),
          and the <code>validityPeriod</code> is short (typically a week). The vehicle holds a pool of ATs and
          rotates through them. Observers on the air see only an opaque short-lived certificate with no persistent name.
        </Callout>
      </Section>

      {/* ── 6. Pseudonymity & pseudonym change ──────────────────────────── */}
      <Section id="pseudonymity" title="Pseudonymity &amp; Pseudonym Change">
        <p>
          ISO/IEC 15408-2 (referenced in TS 102 941 §5) identifies four privacy attributes: anonymity, pseudonymity,
          unlinkability, and unobservability. For ITS, full anonymity is unsuitable — ITS-Ss must be observable to provide safety.
          The chosen solution is <strong>pseudonymity</strong> (TS 102 941 §5): an ITS-S uses temporary identifiers
          that cannot be linked to its canonical identity or to each other across time.
        </p>

        <p>
          Two dimensions of privacy protection are specified:
        </p>

        <CardGrid cols={2}>
          <Card title="Privacy of provisioning" accent="brand">
            The canonical identity of the ITS-S is known only to the Enrolment Authority (EA).
            The Authorization Authority (AA) that issues ATs must have <em>no knowledge</em> of the long-term identity (EC).
            The EA and AA must not be able to link a short-term AT to the long-term Enrolment Credential —
            enforced by the butterfly key provisioning protocol (TS 102 941 §6.2.3.5) which adds cryptographic unlinkability
            between the EC request and the resulting ATs.
          </Card>
          <Card title="Privacy of communications" accent="violet">
            At runtime, the ITS-S uses an AT from its pool as the <code>signer</code> in each broadcast.
            When the AT is changed, <em>all</em> layer-identifiers are changed synchronously in a two-phase commit:
            the MAC address, GeoNetworking Source Address (GN address), and stationID are all derived from the
            HashedId8 of the new AT. This prevents cross-layer correlation attacks.
          </Card>
        </CardGrid>

        <p>
          The ITS-S security entity provides the <strong>ID Change service</strong> (TS 102 940 §6.5, Table 4a).
          For <code>[Itss_WithPrivacy]</code> stations (personal vehicles): all registered layers subscribe to
          ID Change Notifications and must complete a synchronous commit before the change takes effect.
          The GeoNetworking address update (ETSI EN 302 636-4-1) changes the last 48-bit MAC-ID field derived from the pseudonym.
          After an AT change, the ITS-S must perform an ID Change before the next AT request to the AA, to avoid
          linkage between successive AT requests.
        </p>

        <Callout type="warn" title="Unlinkability requires simultaneous change">
          Changing only the AT while keeping the MAC address or GeoNetworking address constant completely defeats
          pseudonymity — a passive listener can correlate transmissions by the unchanged lower-layer identifier.
          TS 102 940 §6.5 is explicit: "Changing authorization tickets in the communication stack may only provide
          unlinkable pseudonymity, if all identifiers are changed at the same time."
        </Callout>

        <p>
          For roadside units and special vehicles (RSUs, emergency vehicles designated <code>[Itss_NoPrivacy]</code>),
          pseudonymity may not be required — these stations may use a persistent identity and are re-identifiable by the AA.
        </p>

        <p>
          The full PKI hierarchy and certificate lifecycle (how ATs are actually issued by the AA, the enrolment
          credential lifecycle, the EU CCMS trust model, and the European Certificate Trust List) are covered in detail on the{' '}
          <Link to="/pki" className="text-brand-300 hover:underline">PKI page</Link>.
        </p>
      </Section>

      {/* ── 7. PKI trust hierarchy — brief overview ──────────────────────── */}
      <Section id="pki-roles" title="PKI Trust Hierarchy — Overview">
        <p>
          The Cooperative-ITS Security Certificate Management System (CCMS) is the backend PKI.
          TS 102 940 §7 defines its functional entities. At a high level, there are three layers of trust:
        </p>

        <Steps>
          <div>
            <strong>Root CA (RCA)</strong> — the apex of trust within a national or regional domain.
            Always operated offline. Issues certificates to EA and AA. Publishes Certificate Revocation Lists for CAs (CRL CA).
            Publishes Certificate Trust Lists (CTL) listing trusted subordinate CAs.
          </div>
          <div>
            <strong>Enrolment Authority (EA)</strong> — authenticates an ITS-S at manufacture and issues
            long-term Enrolment Credentials (ECs). The EA knows the canonical identity of each ITS-S.
            It verifies that the ITS-S is entitled to request ATs before forwarding (or mediating) authorization requests.
          </div>
          <div>
            <strong>Authorization Authority (AA)</strong> — issues short-lived Authorization Tickets (ATs / pseudonym
            certificates) encoding specific ITS-AID + SSP application permissions. The AA must not learn the ITS-S's
            long-term identity — enforced by the butterfly key protocol or by the EA acting as intermediary.
          </div>
          <div>
            <strong>Trust List Manager (TLM) + CPOC</strong> — at the European level, the TLM signs the European
            Certificate Trust List (ECTL) listing all approved Root CAs. The C-ITS Point of Contact (CPOC) distributes
            the ECTL to all PKI participants. This enables cross-border interoperability of multiple national PKIs.
          </div>
          <div>
            <strong>Misbehaviour Authority (MA)</strong> — receives misbehaviour reports, investigates detected
            anomalies, and triggers revocation of Enrolment Credentials or stops AT issuance to misbehaving ITS-Ss.
          </div>
        </Steps>

        <p>
          For the complete PKI protocol details — enrolment message flows, butterfly AT provisioning, CTL/CRL distribution,
          the EU CCMS certificate policy, and conformance requirements — see the{' '}
          <Link to="/pki" className="text-brand-300 hover:underline">PKI &amp; CCMS page</Link>.
        </p>
      </Section>

      {/* ── 8. Misbehaviour Detection ───────────────────────────────────── */}
      <Section id="misbehaviour" title="Misbehaviour Detection &amp; Reporting (TS 103 759)">
        <p>
          Cryptographic authentication prevents outsiders from injecting messages, but it cannot stop a legitimately
          enrolled ITS-S from sending <em>incorrect</em> data — whether through malfunction or malice.
          Misbehaviour Detection (MBD) closes this gap.
        </p>

        <p>
          ETSI TS 103 759 V2.2.1 (2026) specifies the Misbehaviour Reporting Service (MRS), the on-vehicle component
          that detects suspicious messages and sends reports to the Misbehaviour Authority (MA).
          The full Misbehaviour Detection Management (MDM) system comprises:
        </p>

        <CardGrid cols={2}>
          <Card title="Local detection (on ITS-S)" accent="amber">
            The ITS-S runs a probe that applies individual detectors to incoming messages (CAM, DENM, etc.)
            and checks them for plausibility against sensor data, maps, and other ground-truth sources.
            Individual detectors are extensible; Annex D of TS 103 759 gives examples for CAMs and DENMs.
            A detected event triggers the MRS decision component.
          </Card>
          <Card title="Misbehaviour Report (MR)" accent="rose">
            The MR is signed with the reporting vehicle's current AT and <em>encrypted</em> to the MA's public key
            (HTTPS POST to the MA URL). It includes the suspicious messages as evidence (with their ATs),
            plus observation metadata. Privacy: the MA cannot link the reporter's AT to their long-term identity.
          </Card>
          <Card title="Misbehaviour Authority (backend)" accent="violet">
            The MA collects MRs, validates their structure, correlates reports from multiple stations,
            and investigates whether actual misbehaviour occurred. Responses range from no action to
            alerting the manufacturer's Security Operational Center (SOC) to initiating revocation
            (blocking the reported ITS-S's EA from issuing further ATs).
          </Card>
          <Card title="Remediation" accent="emerald">
            Revocation is passive — the EA stops issuing new ATs to the offending ITS-S. Since ATs have
            short validity periods (days to weeks), the station naturally loses the ability to sign messages
            when its current pool expires. There is no active real-time revocation of individual ATs on the air.
          </Card>
        </CardGrid>

        <p>
          The MR dissemination protocol (TS 103 759 §5.3) uses TLS 1.2 or 1.3 over HTTPS with the endpoint format{' '}
          <code>https://&lt;HOST&gt;:443/uploadMR-v1</code>. The MR content is{' '}
          <code>EtsiTs103759Mbr-SignedAndEncrypted-Unicast</code> — signed with the reporter's AT and
          encrypted to the MA's certificate. The reporting ITS-S uses its AT (pseudonym) to communicate with the MA,
          preserving privacy from the MA's perspective regarding long-term identity.
        </p>

        <Callout type="tip" title="ITS-S certificate for misbehaviour reporting">
          A vehicle must hold an AT with the ITS-AID value for the Misbehaviour Detection Management (MDM)
          service (as registered in TS 102 965) in its <code>appPermissions</code> in order to send MRs.
          The MA's certificate also carries this ITS-AID in its <code>appPermissions</code> plus an{' '}
          <code>encryptionKey</code> allowing ITS-Ss to encrypt reports to it (TS 103 097 §7.2.6).
        </Callout>
      </Section>

      {/* ── 9. Cross-links ──────────────────────────────────────────────── */}
      <Section id="related" title="Related Pages">
        <p>
          Security is a cross-cutting concern across the entire ITS stack:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <Link to="/pki" className="text-brand-300 hover:underline">PKI &amp; CCMS</Link>
            {' '}— full certificate lifecycle, enrolment/authorization protocols, EU trust model, butterfly keys, ECTL.
          </li>
          <li>
            <Link to="/architecture" className="text-brand-300 hover:underline">Architecture</Link>
            {' '}— the ITS station layered model where the Security Entity sits as a vertical spanning all layers.
          </li>
          <li>
            <Link to="/cam" className="text-brand-300 hover:underline">CAM</Link>
            {' '}— the Cooperative Awareness Message: signed with an AT per the CAM security profile (TS 103 097 §7.1.1).
          </li>
          <li>
            <Link to="/conformance" className="text-brand-300 hover:underline">Conformance</Link>
            {' '}— PICS and conformance test specs for ITS security (TS 103 096-1) are referenced by TS 103 097.
          </li>
        </ul>
      </Section>

      {/* ── 10. Key standards ───────────────────────────────────────────── */}
      <Section id="standards" title="Key Standards">
        <ul className="space-y-2">
          <li><Ref code="TS 102 731" kind="ETSI" title="Security Services and Architecture" /> V2.0.0 (2022) — security service catalogue.</li>
          <li><Ref code="TS 102 940" kind="ETSI" title="ITS Security Architecture and Management" /> V2.1.1 (2021) — architecture, PKI entities, reference points.</li>
          <li><Ref code="TS 102 941" kind="ETSI" title="Trust and Privacy Management" /> V2.2.1 (2022) — PKI protocols, enrolment, authorization, butterfly keys, CTL/CRL.</li>
          <li><Ref code="TS 102 942" kind="ETSI" title="Access Control" /> V2.0.0 (2022) — access control normative provisions.</li>
          <li><Ref code="TS 102 943" kind="ETSI" title="Confidentiality Services" /> V2.0.0 (2022) — confidentiality normative provisions.</li>
          <li><Ref code="TS 103 097" kind="ETSI" title="Security Header and Certificate Formats" /> V2.2.1 (2026) — on-wire EtsiTs103097Data; certificate profiles; IEEE 1609.2 ETSI profile.</li>
          <li><Ref code="TR 102 893" kind="ETSI" title="TVRA" /> V1.2.1 (2017) — threat, vulnerability and risk analysis.</li>
          <li><Ref code="TS 103 759" kind="ETSI" title="Misbehaviour Reporting Service" /> V2.2.1 (2026) — MR format, detection architecture, dissemination protocol.</li>
        </ul>
      </Section>
    </article>
  )
}
