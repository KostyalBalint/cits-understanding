import React from 'react'
import { Link } from 'react-router-dom'
import { PageHeader, Section, Prose, Callout, Ref, Table, StatGrid, Stat, CardGrid, Card, Steps, Figure, DefList, Badge } from '../components/ui.jsx'

export default function PKITrust() {
  return (
    <article>
      <PageHeader
        kicker="SECURITY"
        title="PKI, Trust &amp; Credential Management"
        intro="Every V2X message in Europe is signed with a short-lived pseudonym certificate. Verifying that signature across brands, borders and operators requires a shared chain of trust — the EU C-ITS Credential Management System (EU CCMS) and the Certificate Policy that governs it."
        sources={['EU CCMS CP R3.0 2024', 'ETSI TS 102 941', 'ETSI TS 103 097', 'C-Roads TF1 v1.4']}
      />

      {/* 1. Why PKI */}
      <Section id="why-pki" title="Why V2X Needs a PKI">
        <p>
          Cooperative ITS messages — CAMs, DENMs, CPMs and others — are broadcast over the air to every station within radio range.
          Any device with the right radio can transmit them. Without authentication, a malicious actor could inject false warnings, spoof road-works,
          or impersonate an emergency vehicle. At the same time, vehicles must not be trackable by their certificate identifiers,
          or privacy law and public acceptance are both violated.
        </p>
        <p>
          The European solution uses Public Key Infrastructure (PKI) with <strong>pseudonym certificates</strong>:
          each ITS station (ITS-S) signs its outgoing messages with a short-lived Authorization Ticket (AT) that carries no name,
          no vehicle identifier, and no link to the owner. The receiving station verifies the signature by chasing the certificate chain
          up to a trusted Root CA, whose certificate it knows because it appears in the signed European Certificate Trust List (ECTL).
          Message integrity and authenticity are guaranteed; long-term identity is hidden.
        </p>
        <Callout type="key" title="The core privacy guarantee">
          The Enrolment Authority (EA) knows who a station is. The Authorization Authority (AA) knows which certificates
          a station received. But the AA never learns the real identity, and the EA never learns which ATs were actually used —
          the roles are organizationally and cryptographically separated so that no single entity can link a signed message back
          to a specific vehicle.
        </Callout>
      </Section>

      {/* 2. PKI hierarchy figure */}
      <Section id="hierarchy" title="The PKI Hierarchy at a Glance">
        <Figure caption="EU C-ITS trust hierarchy — trust flows downward; certificates are verified bottom-up to the ECTL.">
          <div className="flex flex-col items-center gap-2 py-4 text-sm">
            {/* TLM + CPA */}
            <div className="flex gap-4">
              <div className="rounded border border-brand-400 bg-ink-900 px-4 py-2 text-brand-300 text-center min-w-36">
                <div className="font-bold">CPA</div>
                <div className="text-xs text-slate-400">C-ITS Certificate Policy Authority</div>
              </div>
            </div>
            <div className="h-4 w-px bg-slate-500" />
            <div className="flex gap-4">
              <div className="rounded border border-brand-400 bg-ink-900 px-4 py-2 text-brand-300 text-center min-w-36">
                <div className="font-bold">TLM</div>
                <div className="text-xs text-slate-400">Trust List Manager</div>
                <div className="text-xs text-slate-500">signs the ECTL</div>
              </div>
              <div className="rounded border border-amber-500 bg-ink-900 px-4 py-2 text-amber-300 text-center min-w-36">
                <div className="font-bold">CPOC</div>
                <div className="text-xs text-slate-400">C-ITS Point of Contact</div>
                <div className="text-xs text-slate-500">publishes ECTL &amp; CTL</div>
              </div>
            </div>
            <div className="h-4 w-px bg-slate-500" />
            <div className="rounded border border-emerald-500 bg-ink-900 px-5 py-2 text-emerald-300 text-center min-w-52">
              <div className="font-bold">Root CA</div>
              <div className="text-xs text-slate-400">self-signed; listed in ECTL</div>
              <div className="text-xs text-slate-500">national or EU root CA</div>
            </div>
            <div className="flex gap-12 items-start">
              <div className="h-4 w-px bg-slate-500" />
              <div className="h-4 w-px bg-slate-500" />
            </div>
            <div className="flex gap-8">
              <div className="flex flex-col items-center gap-2">
                <div className="rounded border border-violet-500 bg-ink-900 px-4 py-2 text-violet-300 text-center min-w-36">
                  <div className="font-bold">EA</div>
                  <div className="text-xs text-slate-400">Enrolment Authority</div>
                  <div className="text-xs text-slate-500">issues ECs</div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="rounded border border-rose-500 bg-ink-900 px-4 py-2 text-rose-300 text-center min-w-36">
                  <div className="font-bold">AA</div>
                  <div className="text-xs text-slate-400">Authorization Authority</div>
                  <div className="text-xs text-slate-500">issues ATs (pseudonyms)</div>
                </div>
              </div>
            </div>
            <div className="h-4 w-px bg-slate-500" />
            <div className="rounded border border-slate-400 bg-ink-900 px-5 py-2 text-slate-300 text-center min-w-52">
              <div className="font-bold">ITS-S</div>
              <div className="text-xs text-slate-400">Vehicle, RSU, or other C-ITS station</div>
              <div className="text-xs text-slate-500">holds EC + pool of ATs; signs messages with AT</div>
            </div>
          </div>
        </Figure>

        <p>
          The hierarchy has four operational levels. The TLM is the apex of machine-verifiable trust:
          its self-signed certificate is the root-of-roots that every station must know.
          Root CAs sit one level below — their certificates are listed in the ECTL signed by the TLM.
          Each Root CA certifies one or more sub-CAs: an Enrolment Authority (EA) and an Authorization Authority (AA).
          The ITS-S is the leaf — it holds credentials issued by these sub-CAs and uses them in every message it sends.
        </p>
      </Section>

      {/* 3. Roles table */}
      <Section id="roles" title="PKI Entity Roles">
        <Table
          caption="Roles in the EU C-ITS trust model (EU CCMS CP Release 3.0, section 1.3)"
          headers={['Entity', 'Instantiation', 'Core responsibility', 'Key output']}
          rows={[
            [<><Badge tone="brand">CPA</Badge> C-ITS Certificate Policy Authority</>, 'Unique — composed of Member States, vehicle mfrs, operators', 'Governs the CP; approves Root CAs and TLM; commissions audits', 'Policy updates, approval/rejection decisions'],
            [<><Badge tone="brand">TLM</Badge> Trust List Manager</>, 'Unique — appointed by CPA; operated by EC JRC', 'Collects Root CA certificates from CPOC; signs and publishes ECTL', 'Signed ECTL (root-of-trust list)'],
            [<><Badge tone="amber">CPOC</Badge> C-ITS Point of Contact</>, 'Unique — appointed by CPA', 'Secure communication hub; receives Root CA certs; publishes TLM cert + ECTL', 'Public ECTL repository; REST-API for PKI participants'],
            [<><Badge tone="emerald">Root CA</Badge> Root Certification Authority</>, 'Multiple — national or European, governmental or private', 'Issues EA/AA certificates; publishes CRL and CTL; undergoes periodic audit', 'EA/AA certificates, CTL, CRL'],
            [<><Badge tone="violet">EA</Badge> Enrolment Authority</>, 'One or more per Root CA', 'Authenticates ITS-S identity; issues Enrolment Credentials (EC); validates AT requests from AA', 'Enrolment Credentials (EC)'],
            [<><Badge tone="rose">AA</Badge> Authorization Authority</>, 'One or more per Root CA', 'Issues short-lived Authorization Tickets (ATs); blind to long-term station identity', 'Authorization Tickets (AT / pseudonym certificates)'],
            [<><Badge>ITS-S</Badge> ITS Station</>, 'Millions — vehicles, RSUs, OBUs', 'Holds EC; requests ATs; signs all outgoing C-ITS messages with an AT; rotates ATs for privacy', 'Signed V2X messages (CAM, DENM, CPM, …)'],
            [<><Badge>Manufacturer / Operator</Badge></>, 'Per fleet / infrastructure', 'Installs canonical key material at production; registers station at EA; manages station lifecycle', 'Canonical public key, station registration at EA'],
          ]}
        />
        <Callout type="tip" title="Sub-CAs = EA + AA">
          In the CP language, EA and AA are collectively called "sub-CAs." Both are subscribers of the Root CA and
          subjects of their own CA certificate. A single organisation may operate both an EA and an AA,
          but organisational and process separation is mandatory so they cannot correlate station identity with message content.
        </Callout>
      </Section>

      {/* 4. ECTL and root-of-trust */}
      <Section id="ectl" title="European Certificate Trust List (ECTL) &amp; Root-of-Trust">
        <p>
          The <strong>European Certificate Trust List (ECTL)</strong> is a signed document produced by the TLM.
          It lists the public-key certificates of all approved Root CAs in the European trust domain.
          An ITS-S that has the ECTL can verify any message signed by any leaf AT in the entire EU domain,
          by chasing: AT ← AA certificate ← Root CA certificate ← present-in-ECTL ← TLM self-signed certificate (pre-installed trust anchor).
        </p>
        <StatGrid cols={3}>
          <Stat value="Max 3 months" label="ECTL update cadence" sub="C-ITS stations must receive updates within 1 week of publication under normal connectivity" />
          <Stat value="5 years" label="Root CA max validity" sub="Private key usage period equals validity period" />
          <Stat value="4 years / 3 yr key" label="TLM certificate validity" sub="3-year private key usage period; 4-year certificate validity" />
        </StatGrid>
        <p>
          The TLM distributes two certificates: a current self-signed certificate and a <em>link certificate</em>
          that bridges the old and new key pairs during re-keying, ensuring continuity for stations that received
          the previous ECTL. Re-keying must place the new certificate in the ECTL at least one month — and at
          most three months — before the old private key expires.
        </p>
        <p>
          The CPOC publishes the ECTL, TLM certificate, and Root CA certificates via a public REST API
          repository standardised in ETSI TS 102 941. ITS-S manufacturers are responsible for pre-installing
          the TLM trust anchor and implementing an update mechanism so that ECTL and CRL changes reach
          the station within one week under normal operating conditions (e.g. cellular connectivity when
          parked or in depot).
        </p>
        <Callout type="info" title="Multiple ECTL levels">
          Release 3.0 of the CP references ECTL Level 1 and Level 2 as defined in the CPOC Protocol.
          Level 1 is the production trust domain used by deployed stations.
          Level 2 and higher levels are planned for future evolution (referenced in C2C-CC Release 2 trustworthiness planning).
        </Callout>

        <h3 className="mt-6 mb-2 font-semibold text-slate-100">Trust establishment across domains</h3>
        <p>
          The multiple Root CA architecture allows national and private root CAs to co-exist.
          At least one EU Root CA (operated by the EC/JRC) acts as a shared Root CA for organisations
          that do not wish to run their own. A Root CA from Germany, France, or a vehicle manufacturer
          can all be trusted simultaneously — because each appears in the same ECTL signed by the single TLM.
          Cross-border trust therefore requires no bilateral agreements between operators;
          trust flows through the ECTL alone.
        </p>
      </Section>

      {/* 5. Credential lifecycle */}
      <Section id="credentials" title="How an ITS-S Gets Its Credentials">
        <p>
          The credential lifecycle for a vehicle ITS-S has three distinct phases: factory provisioning,
          enrolment, and ongoing authorization. Each phase involves different entities and different cryptographic operations.
        </p>

        <h3 className="mt-4 mb-2 font-semibold text-slate-100">Phase 1 — Factory provisioning</h3>
        <p>
          At manufacture, the ITS-S is given a <strong>canonical key pair</strong>. The canonical private key
          never leaves the station's Secure Hardware Module (HSM). The manufacturer securely transmits
          the canonical public key plus a unique <strong>canonical ID</strong> to the EA (flow 33 in the CP),
          registering the station as a subscriber. The canonical ID contains a manufacturer-identifying substring
          to ensure global uniqueness within the EA.
        </p>

        <h3 className="mt-4 mb-2 font-semibold text-slate-100">Phase 2 — Enrolment (EC issuance)</h3>
        <Steps>
          <div>
            <strong>Generate EC key pair.</strong> The ITS-S generates a new key pair for its Enrolment Credential (EC). The private key is stored in the HSM.
          </div>
          <div>
            <strong>Sign EC request.</strong> The station creates an EC certificate request, signed with the canonical private key (to prove identity) and encrypted to the EA's public key (for confidentiality of the long-term identity link).
          </div>
          <div>
            <strong>EA validates.</strong> The EA looks up the canonical public key that was registered by the manufacturer, verifies the signature, checks that the station type is compliant and that the requested permissions are valid.
          </div>
          <div>
            <strong>EC issued.</strong> On positive validation the EA issues an Enrolment Credential — an X.509-like certificate in the ETSI TS 103 097 format, containing the EC public key and the station's permitted ITS Application Identifiers (ITS-AIDs) and Service Specific Permissions (SSPs).
          </div>
          <div>
            <strong>EC delivered.</strong> The EC response is signed by the EA and sent back to the ITS-S. The station verifies the response against its request and discards it if verification fails.
          </div>
        </Steps>

        <h3 className="mt-6 mb-2 font-semibold text-slate-100">Phase 3 — Authorization (AT / pseudonym issuance)</h3>
        <Steps>
          <div>
            <strong>Generate AT key pair(s).</strong> The ITS-S generates one or more AT key pairs. Each AT key pair is ephemeral — used for a short validity period only.
          </div>
          <div>
            <strong>Send AT request to AA.</strong> The station signs the AT request with its current EC private key. The request is encrypted to the AA's public key. Critically, the AT request does not contain the station's name or any persistent identifier visible to the AA.
          </div>
          <div>
            <strong>AA forwards to EA for validation.</strong> The AA cannot authenticate the station directly — it does not know the station's real identity. The AA forwards the request (or a derivative) to the EA (flow 25a). When using the butterfly key mechanism, the EA authenticates the station and sends individual AT seed requests to the AA (flow 25b), so the AA never sees the EC.
          </div>
          <div>
            <strong>EA validates — blind to future AT use.</strong> The EA checks: (a) station is enrolled and not blocklisted; (b) EC signature is valid; (c) requested ITS-AIDs and SSPs are within the station's authorised scope; (d) the AA is a valid service provider. The EA returns a positive or negative response to the AA (flow 23a).
          </div>
          <div>
            <strong>AA issues AT.</strong> On positive EA response, the AA generates the Authorization Ticket — a short-lived certificate containing the AT public key and the permitted ITS-AIDs/SSPs, but no station name, no canonical ID, and no link to the EC. The AT response is encrypted and sent to the ITS-S (flow 26a/26b).
          </div>
          <div>
            <strong>Station rotates ATs.</strong> The ITS-S holds a pool of ATs. For each signed message it selects one AT from the pool and signs with the corresponding AT private key. The station regularly rotates to a different AT — coupled with MAC address randomisation — to prevent long-term tracking of a single pseudonym.
          </div>
        </Steps>

        <Callout type="example" title="AT validity and pool limits (Itss_WithPrivacy)">
          <ul className="list-disc pl-5 space-y-1">
            <li>AT validity period: maximum <strong>1 week</strong>.</li>
            <li>Preloading period: maximum <strong>3 months</strong> (stations may fetch ATs before their validity starts).</li>
            <li>Maximum parallel ATs: <strong>200 per station</strong>; the EA alerts the operator if more than 100 are active simultaneously.</li>
            <li>ATs are <strong>not revoked</strong> — their short lifetime achieves the same effect. The EA maintains an internal blocklist of ECs; blocklisted stations cannot obtain new ATs.</li>
          </ul>
        </Callout>

        <Callout type="info" title="Butterfly key mechanism">
          Release 3.0 standardises the butterfly key mechanism (flows 25b, 23b, 32b, 26b). In this protocol,
          the ITS-S sends a single butterfly authorization request to the EA rather than to the AA.
          The EA authenticates the station and generates many individual AT seeds, then forwards them to the AA.
          The AA derives the final ATs and returns them. The AA therefore processes many AT issuances
          without ever learning the station's identity — enhancing the privacy separation further.
        </Callout>
      </Section>

      {/* 6. Revocation */}
      <Section id="revocation" title="Certificate Revocation &amp; Distrust">
        <p>
          The EU CCMS uses a layered approach to certificate invalidation that reflects the different nature of each certificate type.
        </p>
        <Table
          caption="Revocation mechanisms by certificate type"
          headers={['Certificate', 'Revocation mechanism', 'Distribution', 'Notes']}
          rows={[
            ['Root CA certificate', 'Removed from ECTL by TLM upon CPA instruction', 'New ECTL via CPOC', 'All descendant EA/AA certs and ATs become untrusted'],
            ['EA / AA certificate', 'Certificate Revocation List (CRL) issued by Root CA; also removed from Certificate Trust List (CTL)', 'Root CA repository (REST-API); CTL update', 'CRL must be signed by the same Root CA; published ASAP after revocation decision'],
            ['Enrolment Credential (EC)', 'Blocklisting — EA maintains an internal confidential blocklist; blocklisted ECs cannot obtain ATs or new ECs', 'EA-internal only; not published', 'Subscriber (manufacturer/operator) may request blocklisting via flow 34'],
            ['Authorization Ticket (AT)', 'Not revoked — validity limited to max 1 week; expiry achieves the same effect', 'N/A', 'Preloading period capped at 3 months to bound the exposure window'],
          ]}
        />
        <Callout type="warn" title="Revocation-by-expiry risk">
          Because ATs are not individually revocable, a compromised station can continue signing messages
          with its current AT pool until all ATs expire. The maximum preloading period of 3 months is a
          deliberate policy limit to bound this exposure. The C-Roads TF1 report (v1.4) identified this
          as an accepted trade-off and recommended careful management of the preloading window.
        </Callout>
        <p>
          If a Root CA is revoked — for example due to a severe security breach or failed audit — the TLM
          removes it from the ECTL. From that point, any message signed by any AT issued under that Root CA
          fails trust-chain verification and is discarded by relying parties. Expired certificates are removed
          from the CRL and CTL. The CP requires CRLs to be published within a three-month maximum cycle,
          with stations required to update within one week of publication.
        </p>
      </Section>

      {/* 7. Certificate Policy evolution */}
      <Section id="policy-evolution" title="The EU Certificate Policy — Release History">
        <p>
          The Certificate Policy (CP) is the legal and technical foundation for the entire EU CCMS. It is
          administered by the C-ITS Certificate Policy Authority (CPA) and follows a structured change-management
          process. Every Root CA listed on the ECTL must maintain a Certificate Practice Statement (CPS) that
          is compliant with the CP, audited by an accredited PKI auditor, and updated within defined timeframes
          whenever the CP changes.
        </p>
        <Table
          caption="EU C-ITS Certificate Policy release history"
          headers={['Release', 'Date', 'Context &amp; key changes']}
          rows={[
            ['Release 1', 'June 2017', 'First release — output of the C-ITS Platform Phase II. Established the basic trust model, hierarchy, EC/AT lifecycle, and ECTL concept.'],
            ['Release 1.1', 'June 2018', 'Updated after broad stakeholder consultation. Refined naming rules, authentication flows, cryptographic algorithm requirements (NIST P-256 and Brainpool P-256/P-384), validity periods. First version used in C-Roads pilots.'],
            ['Release 2.0', 'March 2019', 'Prepared for the C-ITS Delegated Act proposal. Aligned with ETSI TS 102 941 v1.2.1 and TS 103 097 v1.3.1. Introduced butterfly key mechanism references.'],
            ['Release 3.0', 'May 2024', 'Heavily revised by the Commission Expert Group (E01941). Formalises ECTL Level 1/Level 2; adds Itss_WithPrivacy / Itss_NoPrivacy AT profiles; raises AT parallel limit to 200; strengthens EA blocklisting language; adds CPOC Protocol as normative reference; updates cryptographic algorithm tables; aligns with C-ITS Delegated Regulation.'],
          ]}
        />
        <Callout type="key" title="Delegated Regulation basis">
          The EU CP is the technical specification underpinning EU law on C-ITS security.
          It maps to the Commission Delegated Regulation on the deployment of C-ITS (COM 2016/766 strategy).
          National authorities, vehicle manufacturers, and infrastructure operators must comply with the CP
          as a prerequisite for their C-ITS stations to be accepted in the European trust domain.
          See <Link to="/eu-policy" className="text-brand-300 underline">EU Policy page</Link> for regulatory context.
        </Callout>

        <h3 className="mt-4 mb-2 font-semibold text-slate-100">What changed from R1.1 (2018) to R3.0 (2024)</h3>
        <DefList items={[
          { term: 'Privacy classification', def: 'R3.0 formally defines two station types: Itss_WithPrivacy (vehicles, max 200 parallel ATs, max 1-week validity) and Itss_NoPrivacy (road-side units, max 2 parallel ATs). R1.1 had a single regime capped at 100 parallel ATs.' },
          { term: 'Butterfly key mechanism', def: 'R3.0 adds explicit protocol flows (25b, 23b, 32b, 26b) for the butterfly key approach, which was only referenced informally in earlier releases.' },
          { term: 'ECTL levels', def: 'R3.0 introduces ECTL Level 1 and Level 2 as defined in the CPOC Protocol, supporting future multi-level trust domains.' },
          { term: 'Blocklisting vs revocation', def: 'R3.0 uses "blocklisting" for ECs (replacing the earlier term "revocation") to clarify that EC invalidation is internal to the EA and not published, preserving privacy.' },
          { term: 'Cryptographic requirements', def: 'R3.0 mandates ECDSA_brainpoolP384r1_with_SHA384 for TLM and Root CA signing (previously optional); maintains ECDSA_nistP256 and ECDSA_brainpoolP256r1 for EAs, AAs and ITS-S.' },
          { term: 'CPS connectivity requirement', def: 'R3.0 explicitly requires that stations have connectivity mechanisms to update ECTL, CTL/AA certificates, and CRLs within one week of publication.' },
        ]} />
      </Section>

      {/* 8. C-Roads TF1 operational deployment */}
      <Section id="c-roads-deployment" title="C-Roads TF1 — Operational Deployment of the Trust Model">
        <p>
          The C-Roads platform (Working Group 2, Task Force 1) was responsible for implementing the EU trust model
          in the European pilot network. TF1's security report (v1.4, January 2019) documented how Member States
          deployed — or planned to deploy — each element of the PKI during the pilot phase (up to 2020) and
          the subsequent operational phase.
        </p>
        <Callout type="info" title="Gap analysis finding">
          TF1 identified two central entities as missing at the start of the piloting phase: the TLM and the CPOC.
          These were to be developed in collaboration with the European Commission (EC DG JRC) based on
          ETSI TS 103 097 v1.3.1 and ETSI TS 102 941 v1.2.1. France provisionally hosted a national-level CPOC
          during the SCOOP@F project; most other Member States planned to use the EU central elements
          once they became available from the EC (target: Q1/2019 TBC).
        </Callout>
        <p>
          Key agreed security elements for the C-Roads pilot phase included:
        </p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>ECTL format per ETSI TS 102 941 v1.2.1 (requiring TS 103 097 v1.3.1 certificate format)</li>
          <li>Provisional CTL/CRL format for pilots still using the older TS 103 097 v1.2.1 (Annex A/B of TF1 report)</li>
          <li>An interoperable C-ITS station security layer with secure key storage per ETSI standards</li>
          <li>A common TLM to be operated by the EC as soon as practicable</li>
        </ul>
        <p className="mt-4">
          The operational phase (beyond 2020) envisaged all Member States routing their trust through the EU-level
          TLM and CPOC, while national or commercial entities continued to operate their own Root CAs, EAs, and AAs.
          Germany and France had already established national Root CAs, EAs, and AAs;
          most other countries were using contracted PKI providers for the pilot period.
        </p>
        <p>
          TF1 also documented the functional security requirements that apply equally to vehicle and road-side stations:
          certificate chain verification, data retention in accordance with GDPR (max 5 minutes for personally
          identifiable information in infrastructure messages), Service Specific Permissions (SSPs), and
          the separation of EA/AA roles as the organisational privacy mechanism.
        </p>
        <p>
          See <Link to="/c-roads" className="text-brand-300 underline">C-Roads page</Link> for broader deployment context.
        </p>
      </Section>

      {/* 9. Trustworthiness beyond PKI */}
      <Section id="trustworthiness" title="Trustworthiness Beyond the Certificate">
        <p>
          PKI provides authenticity and integrity — the receiver knows the message was not altered and was signed
          by a station holding a valid AT from a trusted AA. But a valid certificate does not prove the
          <em> data itself</em> is correct. A malfunctioning sensor, a misbehaving station, or a compromised
          vehicle can sign and broadcast plausible but wrong information entirely within the PKI framework.
        </p>
        <p>
          The C2C-CC Trustworthiness white paper (WP 2320, 2025) identifies trustworthiness as spanning
          sixteen dimensions defined by ISO 5723 — including accuracy, availability, controllability, integrity,
          privacy, reliability, resilience, robustness, safety, and security. The current EU CCMS addresses
          primarily <strong>authenticity</strong>, <strong>integrity</strong>, and <strong>privacy</strong>.
        </p>
        <CardGrid cols={2}>
          <Card title="Current PKI coverage" accent="emerald">
            <ul className="list-disc pl-4 space-y-1 text-sm">
              <li>Message authenticity and integrity via AT signatures</li>
              <li>Pseudonymity and privacy via short-lived ATs and EA/AA separation</li>
              <li>Root-of-trust via ECTL and audit regime</li>
              <li>Crypto-agility via CPA-managed algorithm transitions</li>
            </ul>
          </Card>
          <Card title="Gaps — future directions" accent="amber">
            <ul className="list-disc pl-4 space-y-1 text-sm">
              <li>Misbehaviour detection: identifying stations sending valid but false data</li>
              <li>Compliance: Release 1 relies on self-declaration; Release 2 aims for third-party certification</li>
              <li>Post-quantum cryptography: addressed in future CP updates (crypto-agility clause)</li>
              <li>Accountability vs privacy: reconciling traceability with anonymity remains an open research problem</li>
            </ul>
          </Card>
        </CardGrid>
        <Callout type="warn" title="Misbehaviour detection is out of scope of the current CP">
          The CP Release 3.0 and TF1 explicitly note that misbehaviour detection of single ITS stations,
          misuse of certificates, and intrusion detection are outside the current certificate policy scope.
          These are active research and standardisation topics. For security threats and countermeasures,
          see <Link to="/security" className="text-brand-300 underline">Security page</Link>.
        </Callout>
      </Section>

      {/* 10. Cryptographic algorithms */}
      <Section id="crypto" title="Cryptographic Algorithms">
        <p>
          All PKI participants must support the algorithms defined in the CP. The CP mandates support
          for ECDSA-based signature algorithms using NIST and Brainpool curves, and ECIES-based encryption
          for enrolment and authorization request confidentiality. Algorithm selection is documented per CA in its CPS.
        </p>
        <Table
          caption="Mandatory signature algorithm support (Release 3.0, Table 5/6)"
          headers={['Algorithm', 'TLM', 'Root CA', 'EA', 'AA', 'ITS-S']}
          rows={[
            ['ECDSA_nistP256_with_SHA256', '—', 'Mandatory', 'Mandatory', 'Mandatory', 'Mandatory'],
            ['ECDSA_brainpoolP256r1_with_SHA256', '—', 'Mandatory', 'Mandatory', 'Mandatory', 'Mandatory'],
            ['ECDSA_brainpoolP384r1_with_SHA384', 'Mandatory', 'Mandatory', 'Mandatory', '—', '—'],
          ]}
        />
        <p className="mt-4">
          For enrolment and authorization request encryption, EA, AA, and ITS-S must support
          <code className="mx-1 text-brand-300">ECIES_nistP256_with_AES128_CCM</code> and
          <code className="mx-1 text-brand-300">ECIES_brainpoolP256r1_with_AES128_CCM</code> (Table 7/8 of Release 3.0).
          All private keys must be generated inside and stored in a cryptographic module (HSM);
          backups are required for TLM, Root CA, EA, and AA but are <em>prohibited</em> for EC and AT key pairs.
        </p>
        <Callout type="tip" title="Crypto-agility">
          The CP mandates crypto-agility: the CPA monitors cryptographic weakness disclosures and can deprecate
          algorithms by publishing a CP update. All participants must stop using deprecated algorithms
          as soon as possible and implement hardware/software capable of algorithm changeover.
          Post-quantum cryptography is identified by C2C-CC as a critical future direction (Release 2 planning).
        </Callout>
      </Section>

      {/* 11. Key standards */}
      <Section id="standards" title="Key Standards">
        <ul className="space-y-2">
          <li><Ref code="EU CCMS CP R3.0" title="EU C-ITS Certificate Policy Release 3.0" kind="EU" /> — May 2024 (EC JRC, JRC137554). Governing document for the entire EU trust model.</li>
          <li><Ref code="EU CCMS CP R1.1" title="EU C-ITS Certificate Policy Release 1.1" kind="EU" /> — June 2018. First broadly deployed version; basis for C-Roads pilots.</li>
          <li><Ref code="ETSI TS 102 941" title="C-ITS Security; Trust and Privacy Management" kind="ETSI" /> — PKI management protocols for EC/AT request/response, CTL/CRL formats, ECTL format.</li>
          <li><Ref code="ETSI TS 103 097" title="C-ITS Security; Security Header and Certificate Formats" kind="ETSI" /> — IEEE 1609.2-aligned certificate and signed-message ASN.1 format used throughout the EU CCMS.</li>
          <li><Ref code="C-Roads TF1 v1.4" title="European Security Mechanism Report" kind="C-Roads" /> — January 2019. Operational deployment of the trust model in C-Roads pilots; gap analysis and recommendations.</li>
          <li><Ref code="C2CCC WP 2320" title="Trustworthiness in C-ITS" kind="C2CCC" /> — 2025. Sixteen-dimension trustworthiness framework; gaps between Release 1 and Release 2.</li>
          <li><Ref code="ISO/IEC 27001" title="Information Security Management" kind="ISO" /> — Mandatory compliance reference for physical, personnel, and procedural controls of all PKI entities.</li>
        </ul>
      </Section>

      {/* 12. Where next */}
      <Section id="where-next" title="Where Next">
        <p>The EU CCMS sits at the intersection of several broader topics covered on this site:</p>
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li><Link to="/security" className="text-brand-300 underline">Security</Link> — threat model, misbehaviour detection, attack categories, and countermeasures beyond the PKI.</li>
          <li><Link to="/c-roads" className="text-brand-300 underline">C-Roads</Link> — deployment of the trust model in European pilot corridors and interoperability testing.</li>
          <li><Link to="/eu-policy" className="text-brand-300 underline">EU Policy</Link> — the Delegated Regulation and legal framework that makes the CP binding.</li>
          <li><Link to="/conformance" className="text-brand-300 underline">Conformance</Link> — how ITS-S devices are tested for compliance with the security and certificate profiles.</li>
        </ul>
      </Section>
    </article>
  )
}
