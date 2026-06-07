import React from 'react'
import { Link } from 'react-router-dom'
import {
  PageHeader, Section, Prose, Callout, Ref, Table, StatGrid, Stat,
  CardGrid, Card, Steps, Figure, DefList, Badge
} from '../components/ui.jsx'

export default function EUPolicy() {
  return (
    <article>
      <PageHeader
        kicker="EU REGULATORY FRAMEWORK"
        title="EU Policy &amp; Regulation for C-ITS"
        intro="European C-ITS deployment is shaped by a layered policy framework stretching from a 2010 framework directive through stakeholder expert groups, a 2016 deployment strategy, and a proposed 2019 delegated regulation that was rejected by the Council — leaving harmonised deployment in the hands of the C-Roads platform rather than binding EU law."
        sources={['ITS Directive 2010/40/EU', 'COM(2016) 766', 'C(2019) 1789 draft']}
      />

      {/* ── KEY CALLOUT ── */}
      <Section id="key-fact" title="The Core Policy Tension">
        <Callout type="key" title="No binding C-ITS delegated act exists">
          Despite years of preparation, the 2019 draft Delegated Regulation C(2019)&nbsp;1789 was
          rejected by the Council of the EU. The principal dispute was technology neutrality: the
          draft mandated ITS-G5 (ETSI&nbsp;802.11p-based) as the short-range baseline, which Member
          States supporting C-V2X/LTE-V2X considered discriminatory. As a result, EU-wide C-ITS
          proceeds without a binding regulation. Interoperability is instead achieved through
          voluntary harmonisation via the <Link to="/c-roads">C-Roads platform</Link> and
          industry consortia.
        </Callout>

        <StatGrid cols={3}>
          <Stat value="2010" label="ITS Directive" sub="Legal basis for delegated acts" />
          <Stat value="2016" label="C-ITS Strategy" sub="COM(2016) 766 — 30 Nov 2016" />
          <Stat value="2019" label="Delegated Reg. rejected" sub="Council objection — technology lock-in" />
        </StatGrid>
      </Section>

      {/* ── TIMELINE ── */}
      <Section id="timeline" title="Policy Timeline">
        <Steps>
          <div>
            <strong>August 2010 — ITS Directive 2010/40/EU</strong>: Framework Directive adopted,
            empowering the Commission to adopt delegated acts in four priority areas. Priority
            Area&nbsp;IV covers linking the vehicle with the transport infrastructure, encompassing V2V,
            V2I and I2I cooperative systems. Article&nbsp;6 grants authority to adopt specifications
            for compatibility, interoperability and continuity. This directive is the legal foundation
            for all subsequent C-ITS delegated acts.
          </div>
          <div>
            <strong>November 2014 — C-ITS Platform launched (Phase&nbsp;I)</strong>: The Commission
            established the C-ITS Platform as an expert group bringing together Member States,
            vehicle manufacturers, road operators, telecom operators, service providers, and
            local/regional authorities. Phase&nbsp;I ran until January&nbsp;2016 and produced a
            unanimous final report.
          </div>
          <div>
            <strong>January 2016 — C-ITS Platform Phase&nbsp;I Final Report</strong>: The report
            recommended a "Day&nbsp;1" service list for coordinated deployment, a common
            security/PKI trust model, a hybrid communication approach, and guiding principles for
            access to in-vehicle data. A Cost Benefit Analysis (the Ricardo&nbsp;/&nbsp;DG&nbsp;MOVE
            study) found benefit-cost ratios of 2–8 by&nbsp;2030.
          </div>
          <div>
            <strong>July 2016 — C-ITS Platform Phase&nbsp;II begins; C-Roads launched</strong>: The
            Commission starts Phase&nbsp;II of the expert group (July&nbsp;2016 – September&nbsp;2017)
            to develop concrete implementation conditions. Simultaneously, the C-Roads platform — a
            joint initiative of Member States and road operators — is launched to harmonise deployment
            specifications and test cross-border interoperability. C-Roads is co-funded through the
            Connecting Europe Facility (CEF).
          </div>
          <div>
            <strong>30 November 2016 — EU C-ITS Strategy COM(2016)&nbsp;766</strong>: The Commission
            publishes "A European strategy on Cooperative Intelligent Transport Systems, a milestone
            towards cooperative, connected and automated mobility." It defines the Day&nbsp;1 and
            Day&nbsp;1.5 service lists, endorses a hybrid communication approach (ITS-G5 + cellular),
            commits to a PKI-based security framework, and announces the intention to adopt a
            delegated act by&nbsp;2018 under the ITS Directive.
          </div>
          <div>
            <strong>September 2017 — C-ITS Platform Phase&nbsp;II Final Report</strong>: Nine working
            groups produce recommendations on security/PKI, data protection/GDPR, compliance
            assessment, hybrid communication, urban C-ITS, business models, road safety, physical and
            digital infrastructure, and enhanced traffic management. The report explicitly supports the
            forthcoming delegated act.
          </div>
          <div>
            <strong>January 2019 — Draft Delegated Regulation C(2019)&nbsp;1789</strong>: The
            Commission tables the draft regulation supplementing Directive&nbsp;2010/40/EU, mandating
            ITS-G5 system profiles for vehicle and roadside C-ITS stations, a mandatory EU C-ITS
            Security Credential Management System (EU&nbsp;CCMS) based on PKI, and CE marking for
            C-ITS stations. It would apply from 31&nbsp;December&nbsp;2019.
          </div>
          <div>
            <strong>2019 — Council Rejects the Delegated Regulation</strong>: A qualified majority of
            Member States objects, citing technology neutrality concerns. Countries and industry groups
            backing C-V2X/LTE-V2X argue the draft effectively locks in ITS-G5, pre-empting 5G
            cellular V2X and violating the principle of technology neutrality. The regulation is
            withdrawn. No binding EU C-ITS delegated act enters into force.
          </div>
          <div>
            <strong>2020 onwards — C-Roads-led voluntary harmonisation &amp; CCAM direction</strong>:
            Without a binding act, the C-Roads platform and the Car2Car Communication Consortium
            (C2CCC) publish harmonised service specifications and system profiles (C-Roads Release
            2.0, October&nbsp;2021). The Commission's Joint Research Centre (JRC) operates the
            EU&nbsp;CCMS PKI infrastructure voluntarily. The policy focus shifts toward Cooperative,
            Connected and Automated Mobility (CCAM) for the next generation.
          </div>
        </Steps>
      </Section>

      {/* ── ITS DIRECTIVE ── */}
      <Section id="its-directive" title="ITS Directive 2010/40/EU — the Legal Basis">
        <p>
          Directive 2010/40/EU of the European Parliament and of the Council (7&nbsp;July&nbsp;2010)
          provides the framework for deploying Intelligent Transport Systems in road transport and at
          interfaces with other modes. It is the primary legal instrument enabling the Commission to
          set binding technical specifications for ITS services through delegated acts.
        </p>
        <p>
          Article&nbsp;2(1) identifies four priority areas. <strong>Priority Area&nbsp;IV</strong> —
          "Linking the vehicle with the transport infrastructure" — covers V2V, V2I and I2I cooperative
          systems. The ITS Directive's Annex&nbsp;I, point&nbsp;4, specifies that actions in this area
          include defining measures to integrate ITS applications on an open in-vehicle platform and to
          progress cooperative systems.
        </p>
        <p>
          Article&nbsp;6 empowers the Commission to adopt specifications (through delegated acts under
          Article&nbsp;290&nbsp;TFEU) ensuring compatibility, interoperability and continuity for the
          deployment and operational use of ITS applications and services. The Commission stressed in
          the 2016 Strategy that it would "consider using the ITS Directive 2010/40/EU" to adopt
          delegated acts by&nbsp;2018 covering service continuity, security of communications, GDPR
          implementation in C-ITS, a hybrid communication approach, interoperability, and compliance
          assessment.
        </p>
        <p>
          Two earlier delegated regulations were already adopted under this Directive: Delegated
          Regulation (EU)&nbsp;886/2013 on road-safety-related minimum universal traffic information,
          and Delegated Regulation (EU)&nbsp;2015/962 on EU-wide real-time traffic information
          services. The C-ITS delegated act would have been the third major instrument, but it was
          never adopted.
        </p>
        <Callout type="tip" title="Relation to other legal instruments">
          The ITS Directive sits alongside the <strong>Radio Equipment Directive 2014/53/EU</strong>
          (which C-ITS stations must comply with), <strong>GDPR (EU)&nbsp;2016/679</strong>
          (applicable to personal data in C-ITS messages), and
          <strong>Commission Decision 2008/671/EC</strong> (harmonising the 5&nbsp;875–5&nbsp;905&nbsp;MHz
          frequency band for safety-related ITS applications in Europe).
        </Callout>
      </Section>

      {/* ── 2016 STRATEGY ── */}
      <Section id="strategy-2016" title="The 2016 EU C-ITS Strategy — COM(2016) 766">
        <p>
          Adopted on 30&nbsp;November&nbsp;2016, the Communication "A European strategy on
          Cooperative Intelligent Transport Systems, a milestone towards cooperative, connected and
          automated mobility" (COM(2016)&nbsp;766) is the central policy document of the EU's
          pre-deployment phase. It responds to the Declaration of Amsterdam (April&nbsp;2016) in which
          European transport ministers called for a European strategy on cooperative, connected and
          automated vehicles.
        </p>

        <h3>Vision and rationale</h3>
        <p>
          The strategy identifies a risk of a fragmented internal market: without a common EU
          framework, investments and regulatory frameworks would not converge, jeopardising the
          2019 deployment target that industry (led by the Car2Car Communication Consortium) had
          announced. The strategy estimated that Day&nbsp;1 services, if deployed interoperably across
          Europe, would produce a benefit-cost ratio of up to 3&nbsp;to&nbsp;1 based on cumulative
          costs and benefits from 2018 to 2030 — and that slow initial uptake would reduce overall
          benefits due to weak network effects.
        </p>

        <h3>Day 1 and Day 1.5 service lists</h3>
        <p>
          The strategy defines two tiers of priority services for deployment from&nbsp;2019:
        </p>
        <Table
          caption="C-ITS service deployment lists (COM(2016) 766)"
          headers={['Tier', 'Service', 'Category']}
          rows={[
            ['Day 1', 'Slow or stationary vehicle(s) & traffic ahead warning', 'Hazardous location'],
            ['Day 1', 'Road works warning', 'Hazardous location'],
            ['Day 1', 'Weather conditions', 'Hazardous location'],
            ['Day 1', 'Emergency brake light', 'Hazardous location'],
            ['Day 1', 'Emergency vehicle approaching', 'Hazardous location'],
            ['Day 1', 'Other hazards', 'Hazardous location'],
            ['Day 1', 'In-vehicle signage', 'Signage'],
            ['Day 1', 'In-vehicle speed limits', 'Signage'],
            ['Day 1', 'Signal violation / intersection safety', 'Signage'],
            ['Day 1', 'Traffic signal priority request by designated vehicles', 'Signage'],
            ['Day 1', 'Green light optimal speed advisory', 'Signage'],
            ['Day 1', 'Probe vehicle data', 'Data collection'],
            ['Day 1', 'Shockwave damping', 'Local hazard warning (ETSI)'],
            ['Day 1.5', 'Information on fuelling & charging stations for alternative fuel vehicles', 'Info services'],
            ['Day 1.5', 'Vulnerable road user protection', 'Safety'],
            ['Day 1.5', 'On-street parking management & information', 'Urban'],
            ['Day 1.5', 'Off-street parking information', 'Urban'],
            ['Day 1.5', 'Park & ride information', 'Urban'],
            ['Day 1.5', 'Connected & cooperative navigation (first/last mile, parking, route advice)', 'Urban'],
            ['Day 1.5', 'Traffic information & smart routing', 'Efficiency'],
          ]}
        />
        <p>
          Day&nbsp;1.5 services were deemed "generally mature" but lacking complete standards for
          large-scale deployment by&nbsp;2019. The strategy asked the C-Roads platform and deployment
          initiatives to define "communication profiles" for Day&nbsp;1 services and verify
          interoperability through cross-site testing.
        </p>

        <h3>Hybrid communication policy</h3>
        <p>
          The 2016 strategy endorsed a <strong>hybrid communication approach</strong>: combining
          complementary technologies to serve the full range of C-ITS use cases. The Commission
          identified the "most promising" mix as ETSI&nbsp;ITS-G5 (short-range, low-latency, operating
          in the 5.9&nbsp;GHz band) combined with existing cellular networks (wide geographic coverage,
          large user group). The strategy stated that "initial deployment for short-range V2V and V2I
          will be based on technologies already available using this band," while 5G would be
          integrated under a complementarity principle in the longer term.
        </p>
        <p>
          Fewer than 5% of public consultation respondents disagreed with basing initial deployment on
          ITS-G5, and a large majority saw 5G playing an important role long-term. This apparent
          consensus would fracture by 2019.
        </p>

        <h3>Security and PKI direction</h3>
        <p>
          The strategy called for "a common security and certificate policy for C-ITS deployment in
          Europe" based on <strong>Public Key Infrastructure (PKI)</strong>. It committed the Commission
          to publishing guidance on the European C-ITS security and certificate policy in&nbsp;2017
          and stated that the Commission would "analyse the roles and responsibilities of the European
          C-ITS Trust Model." Full PKI architecture details are covered on the{' '}
          <Link to="/pki">PKI &amp; Trust</Link> page.
        </p>

        <h3>Privacy and data protection</h3>
        <p>
          The strategy acknowledged that data broadcast by C-ITS vehicles "will, in principle, qualify
          as personal data." It pointed to the upcoming GDPR (applicable from May&nbsp;2018) and called
          for data protection by design and by default, data protection impact assessments (DPIAs),
          and transparent consent mechanisms. It committed the Commission to publishing guidance on
          C-ITS data protection by&nbsp;2018.
        </p>
      </Section>

      {/* ── C-ITS PLATFORM ── */}
      <Section id="cits-platform" title="The C-ITS Platform — Stakeholder Expert Group">
        <p>
          Launched in November&nbsp;2014 as a Commission Expert Group, the <strong>C-ITS
          Platform</strong> provided a structured dialogue between the Commission, public stakeholders
          (Member State ministries, road authorities, cities via POLIS), and private stakeholders
          (vehicle manufacturers, equipment manufacturers, road operators, telecom operators, service
          providers). It operated in two phases.
        </p>

        <h3>Phase I (November 2014 – January 2016)</h3>
        <p>
          Phase&nbsp;I produced a unanimous final report in January&nbsp;2016, recommending: a Day&nbsp;1
          service list; a common security trust model; a hybrid communication approach; guiding
          principles for access to in-vehicle data; and a detailed analysis of privacy and data
          protection as a basis for GDPR compliance work.
        </p>

        <h3>Phase II (July 2016 – September 2017)</h3>
        <p>
          Phase&nbsp;II deepened the technical and legal groundwork across <strong>nine working
          groups</strong>, divided into two tracks: "Phase&nbsp;I continued — support for deployment"
          and "Beyond C-ITS, towards CCAM." The September&nbsp;2017 Final Report is the primary
          input to the draft Delegated Regulation. The Commission published the first version of the
          European C-ITS Certificate Policy in June&nbsp;2017 as a direct output of the Security
          Working Group.
        </p>

        <Table
          caption="C-ITS Platform Phase II — working groups and key outcomes"
          headers={['Working Group', 'Track', 'Key Outcomes']}
          rows={[
            [
              'Security',
              'Phase I continued',
              'European C-ITS Certificate Policy (June 2017); security governance structure; recommendations for Commission to operate central PKI functions (CPA, TLM, CPOC)',
            ],
            [
              'Data Protection & Privacy',
              'Phase I continued',
              'Legal basis analysis under GDPR Art.6; recommendation for EU legal instrument to provide a public-interest basis for data processing; DPIA template; data protection by design requirements',
            ],
            [
              'Compliance Assessment',
              'Phase I continued',
              'Top-level methodology for testing and validation of C-ITS stations; roles and interaction framework; recommendation for progressive approach allowing Day 1 deployment while maintaining backward compatibility for future services',
            ],
            [
              'Hybrid Communication',
              'Phase I continued',
              'Endorsed four policy principles: (1) uncompromised safety services for all users; (2) technology neutrality of spectrum; (3) efficient spectrum use; (4) 5G for longer-term CCAM. Only one meeting in Phase II — no specific new recommendations.',
            ],
            [
              'Urban C-ITS',
              'Phase I continued',
              'Identified political, financial, technical and operational barriers to urban deployment; extended Day 1/1.5 services for urban use cases; urban automation scenarios',
            ],
            [
              'Business Models',
              'Phase I continued',
              'Stakeholder perspective analysis; public-private partnership models; recommendations on roles and incentives along the C-ITS value chain',
            ],
            [
              'Road Safety',
              'CCAM',
              'Priority C-ITS services from a safety perspective; Human Machine Interaction (HMI) guidelines; driver behaviour impacts; traffic rules adaptation',
            ],
            [
              'Physical & Digital Infrastructure',
              'CCAM',
              'Infrastructure requirements for automation; connectivity for automated vehicles; positioning support (Galileo/EGNOS); handling complex traffic intersections',
            ],
            [
              'Enhanced Traffic Management',
              'CCAM',
              'Cooperative Traffic Management concepts; Common Operational Picture; geo-fencing mechanisms; Network Level of Service definitions; digital Traffic Management Plans',
            ],
          ]}
        />

        <Callout type="info" title="Access to in-vehicle data">
          One contentious theme across both phases was access to in-vehicle data. The strategy
          identified "guiding principles" for this topic but acknowledged that further legal and
          technical analyses were needed. A dedicated Commission study was expected mid-2017.
          This issue intersects with the <Link to="/applications">Applications</Link> layer, OEM
          business models, and competition policy — and remained unresolved in the draft Delegated
          Regulation.
        </Callout>
      </Section>

      {/* ── DELEGATED REGULATION ── */}
      <Section id="delegated-regulation" title="The 2019 Draft Delegated Regulation C(2019) 1789">
        <p>
          On 11&nbsp;January&nbsp;2019, the Commission submitted draft Commission Delegated Regulation
          (EU)&nbsp;…/… supplementing Directive&nbsp;2010/40/EU with regard to the deployment and
          operational use of cooperative intelligent transport systems (reference
          Ares(2019)153204). Its stated purpose was to "create the minimal legal requirements for
          interoperability for C-ITS and to enable large-scale deployment of C-ITS systems and
          services from 2019."
        </p>

        <h3>What the Regulation would have mandated</h3>
        <DefList items={[
          {
            term: 'System profiles (Annex II)',
            def: 'Vehicle C-ITS stations and roadside C-ITS stations designed for short-range communication (5 855–5 925 MHz) must comply with ITS-G5-based system profiles. These are the harmonised profiles developed jointly by C-Roads and the Car2Car Communication Consortium. Each station must send messages enabling at least one C-ITS priority service (Annex I) and must be compatible with all priority services.',
          },
          {
            term: 'EU C-ITS Security Credential Management System (EU CCMS)',
            def: 'All C-ITS stations must enrol in and comply with the EU CCMS before being put in service. The EU CCMS implements PKI using pseudonym certificates (Authorisation Tickets, issued by an Authorisation Authority) and enrolment credentials (issued by an Enrolment Authority). Root CAs are listed in the European Certificate Trust List (ECTL), managed by the Trust List Manager (TLM). Until dedicated entities are established, the Commission (JRC + DG MOVE) acts as Certificate Policy Authority, TLM, and C-ITS Point of Contact (CPOC).',
          },
          {
            term: 'Certificate and security policy (Annex III + Annex IV)',
            def: 'Detailed PKI certificate policy (derived from IETF RFC 3647 framework) and information security management requirements (ISO/IEC 27001-based). Pseudonym certificates for mobile stations must ensure anonymity: Authorisation Tickets must not contain any names or information linking the station to a real identity. Certificate updates must reach C-ITS stations within one week of ECTL publication under normal operating conditions.',
          },
          {
            term: 'CE marking and conformity assessment',
            def: 'Manufacturers must draw up technical documentation, perform a conformity assessment, and affix CE marking before placing C-ITS stations on the market. Technical documentation and the EU declaration of conformity must be kept for 15 years.',
          },
          {
            term: 'GDPR alignment',
            def: 'The Regulation explicitly states it cannot by itself create a legal basis for personal data processing. Data controllers remain bound by GDPR Art.6. Personal data must not be re-used for commercial purposes or law enforcement without a separate lawful basis. The principle of data minimisation applies; data must not be stored longer than necessary.',
          },
          {
            term: 'Entry into force',
            def: 'Article 34 specified the Regulation would apply from 31 December 2019.',
          },
        ]} />

        <Callout type="warn" title="Delegated Regulation REJECTED by Council — 2019">
          The Council of the EU exercised its right of objection under Article&nbsp;290&nbsp;TFEU.
          A sufficient number of Member States voted against the draft, primarily on the grounds of
          <strong> technology neutrality</strong>. The draft's Annex&nbsp;II system profiles were
          based on ITS-G5 (ETSI 802.11p / IEEE&nbsp;802.11p), which critics argued would
          disadvantage C-V2X/LTE-V2X (3GPP Rel.&nbsp;14 and beyond) and foreclose 5G-based
          short-range C-ITS communication. France, Germany, and several automotive-sector Member
          States, along with parts of the telecom industry organised in the 5G Automotive
          Association (5GAA, formed 2016), opposed the lock-in. The Regulation was never
          published in the Official Journal and never entered into force.
          <br /><br />
          Consequence: <strong>EU C-ITS has no binding harmonisation law.</strong> Deployment
          proceeds on a voluntary basis, steered by C-Roads platform harmonised specifications,
          C2CCC system profiles, and the Commission-operated EU&nbsp;CCMS PKI infrastructure.
        </Callout>
      </Section>

      {/* ── ITS-G5 vs C-V2X ── */}
      <Section id="itsg5-vs-cv2x" title="The ITS-G5 vs C-V2X Policy Tension">
        <p>
          The technology-neutrality dispute is the defining political fault-line in EU C-ITS policy.
          Understanding it requires distinguishing the two technology families:
        </p>
        <Table
          caption="ITS-G5 vs C-V2X short-range communication — policy comparison"
          headers={['Dimension', 'ITS-G5 (ETSI / IEEE 802.11p)', 'C-V2X / LTE-V2X (3GPP)']}
          rows={[
            ['Standards basis', 'ETSI EN 302 663, ETSI ITS-G5 stack; derived from IEEE 802.11p (Wi-Fi variant)', '3GPP Release 14 (LTE-V2X PC5 interface); evolution to 5G NR-V2X in Release 16'],
            ['Frequency band', '5 875–5 925 MHz (ITS band, harmonised by Commission Decision 2008/671/EC)', 'Same 5.9 GHz ITS band for direct (sidelink, PC5) mode; cellular uplink/downlink for network mode'],
            ['Latency profile', 'Very low latency for direct V2V; no cellular infrastructure required', 'Comparable low latency in direct mode; cellular mode adds network round-trip'],
            ['Infrastructure dependency', 'None for V2V; RSU for V2I', 'None for PC5 direct mode; cellular network needed for Uu interface services'],
            ['EU deployment status (2019)', 'Deployed in C-Roads pilots, C2CCC system profiles, early OEM series production', 'Prototypes and trials; 5GAA formed 2016; deployment starting later'],
            ['Commission 2016 position', 'Endorsed as baseline for Day 1 initial deployment', 'Acknowledged as future technology; 5G complementarity principle'],
            ['Post-rejection outcome', 'Remains de facto standard in EU C-Roads deployments', 'C-Roads exploring multi-technology profiles; both coexist'],
          ]}
        />
        <p>
          The Commission's 2016 Strategy was careful to describe ITS-G5 as the choice for
          "initial deployment" only, stressing that "C-ITS messages should be unaware of, and thus
          flexible about the communication technology used, easing the inclusion of future
          technologies (e.g. 5G and satellite communication) into the hybrid communication mix."
          However, when the 2019 draft Delegated Regulation specified ITS-G5-only system profiles
          in its Annex&nbsp;II (because ITS-G5 was the only mature, tested, standardised technology
          for short-range C-ITS at the time), this was interpreted as de facto mandating ITS-G5 and
          foreclosing LTE-V2X/5G. The Council objection followed.
        </p>
        <p>
          The Phase&nbsp;II Platform report's Hybrid Communication Working Group had already
          articulated the tension: it endorsed "technology neutrality of spectrum use" as a guiding
          principle while also acknowledging that backwards interoperability with already-deployed
          ITS-G5 stations was essential, given the long lifetime of vehicles. See also the{' '}
          <Link to="/access-layer">Access Layer</Link> page for the technical comparison.
        </p>
      </Section>

      {/* ── PKI TRUST MODEL ── */}
      <Section id="pki-policy" title="Security &amp; PKI Trust Model — Policy Dimension">
        <p>
          Across both C-ITS Platform phases, security governance was the single most complex
          policy topic. The challenge was creating a pan-European PKI that is simultaneously:
          technically robust (pseudonymity, frequent key rotation, no tracking), governable
          (clear roles for public and private entities), legally sound (consistent with GDPR), and
          operationally feasible for tens of millions of vehicles.
        </p>
        <Figure caption="EU C-ITS trust model — PKI hierarchy">
          <div className="flex flex-col items-center gap-2 py-4 text-sm">
            <div className="rounded border border-brand-500 bg-ink-900 px-6 py-2 text-brand-300 font-semibold">
              C-ITS Certificate Policy Authority (CPA)
              <span className="block text-xs text-slate-400 font-normal">Governance body — Commission acts as interim CPA</span>
            </div>
            <div className="text-slate-500">▼</div>
            <div className="flex gap-4">
              <div className="rounded border border-amber-500 bg-ink-900 px-4 py-2 text-amber-300 text-center">
                Trust List Manager (TLM)
                <span className="block text-xs text-slate-400">Signs ECTL; Commission = interim TLM</span>
              </div>
              <div className="rounded border border-amber-500 bg-ink-900 px-4 py-2 text-amber-300 text-center">
                C-ITS Point of Contact (CPOC)
                <span className="block text-xs text-slate-400">Publishes ECTL; Commission = interim CPOC</span>
              </div>
            </div>
            <div className="text-slate-500">▼  European Certificate Trust List (ECTL)</div>
            <div className="flex gap-4">
              <div className="rounded border border-emerald-500 bg-ink-900 px-4 py-2 text-emerald-300 text-center">
                Root CA (national / industry)
                <span className="block text-xs text-slate-400">+ EU Root CA (operated by JRC)</span>
              </div>
            </div>
            <div className="text-slate-500">▼</div>
            <div className="flex gap-4">
              <div className="rounded border border-cyan-500 bg-ink-900 px-3 py-2 text-cyan-300 text-center text-xs">
                Enrolment Authority (EA)
                <span className="block text-slate-400">Issues Enrolment Credentials (EC)</span>
              </div>
              <div className="rounded border border-violet-500 bg-ink-900 px-3 py-2 text-violet-300 text-center text-xs">
                Authorisation Authority (AA)
                <span className="block text-slate-400">Issues Authorisation Tickets (AT) — pseudonym certs</span>
              </div>
            </div>
            <div className="text-slate-500">▼</div>
            <div className="rounded border border-slate-500 bg-ink-900 px-6 py-2 text-slate-300 text-center text-xs">
              C-ITS Station (vehicle / RSU / personal)
              <span className="block text-slate-400">Uses AT for message signing — no persistent identity visible</span>
            </div>
          </div>
        </Figure>
        <p>
          The Certificate Policy (Annex&nbsp;III of the draft Delegated Regulation, first published
          June&nbsp;2017) is structured around IETF RFC&nbsp;3647. Key policy provisions include:
        </p>
        <ul>
          <li>
            The ECTL is updated on a maximum three-month cycle; C-ITS stations must receive updates
            within one week of publication under normal operating conditions.
          </li>
          <li>
            Authorisation Tickets (pseudonym certificates) must <em>not</em> contain any name or
            information that may link the station to its real identity — ensuring unlinkability for
            privacy.
          </li>
          <li>
            Root CAs may be operated by governmental or private organisations; an EU Root CA (JRC)
            is available for entities not wishing to set up their own.
          </li>
          <li>
            Cryptographic requirements mandate signature algorithms at ECDSA level with specified
            key lengths, with a crypto-agility requirement to adapt to future algorithm changes.
          </li>
          <li>
            Compliance audits by accredited PKI auditors are mandatory for all CAs listed in the
            ECTL.
          </li>
        </ul>
        <p>
          Even without the Delegated Regulation entering into force, the Commission (JRC) operates
          the EU CCMS infrastructure voluntarily. The CPOC protocol version&nbsp;1.2 (December&nbsp;2021)
          defines Level&nbsp;0 (testing), Level&nbsp;1 (intermediate operational), and Level&nbsp;2
          (full CP compliance) enrolment tiers, allowing early deployments to participate before
          achieving full compliance. See the <Link to="/pki">PKI &amp; Trust</Link> page for full
          technical details.
        </p>
      </Section>

      {/* ── CCAM ── */}
      <Section id="ccam" title="CCAM — The Next Policy Generation">
        <p>
          Both the 2017 Phase&nbsp;II report and subsequent EU policy have reframed C-ITS within
          the broader concept of <strong>Cooperative, Connected and Automated Mobility (CCAM)</strong>.
          The Platform's Phase&nbsp;II working groups on Physical &amp; Digital Infrastructure,
          Enhanced Traffic Management, and Road Safety explicitly considered the requirements of
          higher levels of automation (SAE&nbsp;L3–L5).
        </p>
        <CardGrid cols={2}>
          <Card title="From C-ITS to CCAM" accent="brand">
            The Phase&nbsp;II Platform concluded that "the ultimate goal is the full convergence of
            all developments under CCAM, making use of the digitisation of transport." C-ITS Day&nbsp;1
            services are the foundation; CCAM extends toward sensor-sharing (collective perception),
            manoeuvre coordination, and infrastructure-guided automation. See{' '}
            <Link to="/overview">Overview</Link>.
          </Card>
          <Card title="C-Roads as the Operational Hub" accent="emerald">
            In the absence of a binding delegated act, C-Roads became the de facto harmonisation
            body. Its release process (Release&nbsp;2.0, October&nbsp;2021) governs V2I service
            specifications, test procedures, and cross-border interoperability validation. EUR&nbsp;199
            million has been invested in C-ITS across 16&nbsp;Member States (of which EUR&nbsp;107&nbsp;million
            via CEF). See <Link to="/c-roads">C-Roads</Link>.
          </Card>
          <Card title="EU EIP Recommendations (2022)" accent="amber">
            The EU EIP sub-activity on C-ITS Deployment Support (2016–2021) concluded with 12
            recommendations for road authorities: including multiyear budget planning, engagement
            with standardisation and profiling, IT security/privacy compliance, and integrating
            C-ITS into day-to-day traffic management operations.
          </Card>
          <Card title="International Dimension" accent="violet">
            The 2016 Strategy called for international cooperation with Australia, Japan, Singapore,
            the US, and through G7 transport minister declarations. The absence of a binding EU act
            complicates alignment with non-EU markets. See{' '}
            <Link to="/global">Global</Link> for US, Japanese, and Korean policy comparisons.
          </Card>
        </CardGrid>
      </Section>

      {/* ── KEY STANDARDS ── */}
      <Section id="key-standards" title="Key Legislative and Policy References">
        <ul>
          <li>
            <Ref code="2010/40/EU" title="ITS Directive" kind="EU" /> — Framework Directive; legal
            basis for C-ITS delegated acts; Priority Area&nbsp;IV covers V2V/V2I/I2I systems.
          </li>
          <li>
            <Ref code="COM(2016) 766" title="EU C-ITS Strategy" kind="EU" /> — European strategy on
            C-ITS; Day&nbsp;1/1.5 service lists; hybrid communication policy; PKI direction.
          </li>
          <li>
            <Ref code="C(2019) 1789 draft" title="Delegated Regulation C-ITS" kind="EU" /> — Draft
            regulation supplementing 2010/40/EU; rejected by Council 2019.
          </li>
          <li>
            <Ref code="2008/671/EC" title="ITS Spectrum Decision" kind="EU" /> — Harmonises the
            5&nbsp;875–5&nbsp;905&nbsp;MHz band for safety-related ITS applications.
          </li>
          <li>
            <Ref code="(EU) 2016/679" title="GDPR" kind="EU" /> — General Data Protection
            Regulation; applies to personal data in C-ITS messages.
          </li>
          <li>
            <Ref code="886/2013" title="Road Safety Min. Traffic Info" kind="EU" /> — Earlier
            delegated regulation under ITS Directive (safety traffic information).
          </li>
          <li>
            <Ref code="2015/962" title="RTTI Delegated Regulation" kind="EU" /> — Earlier delegated
            regulation under ITS Directive (real-time traffic information).
          </li>
          <li>
            <Ref code="ETSI EN 302 663" title="ITS-G5 Access Layer" kind="ETSI" /> — ITS-G5
            physical and MAC layer standard for the 5.9&nbsp;GHz band; see{' '}
            <Link to="/access-layer">Access Layer</Link>.
          </li>
          <li>
            <Ref code="ETSI EN 302 665" title="ITS Station Architecture" kind="ETSI" /> — Referenced
            in the draft Delegated Regulation for definitions of central, roadside, vehicle, and
            personal ITS stations.
          </li>
        </ul>
      </Section>

      {/* ── WHERE NEXT ── */}
      <Section id="where-next" title="Where Next">
        <p>
          Explore the technical layers and related platforms that implement this policy framework:
        </p>
        <ul>
          <li><Link to="/pki">PKI &amp; Trust</Link> — European C-ITS Certificate Policy, EU CCMS architecture, ECTL, pseudonym certificates.</li>
          <li><Link to="/c-roads">C-Roads</Link> — The harmonisation platform filling the gap left by the rejected Delegated Regulation.</li>
          <li><Link to="/access-layer">Access Layer</Link> — ITS-G5 vs C-V2X technical comparison; the 5.9&nbsp;GHz band; hybrid communication architecture.</li>
          <li><Link to="/security">Security</Link> — Misbehaviour detection, pseudonymity mechanisms, certificate lifecycle.</li>
          <li><Link to="/overview">Overview</Link> — High-level C-ITS architecture placing EU policy in the full system context.</li>
          <li><Link to="/global">Global</Link> — US, Japanese, Korean, and Australian policy and regulatory comparisons.</li>
          <li><Link to="/car2car">Car2Car</Link> — The Car2Car Communication Consortium and its role in industry-led interoperability.</li>
        </ul>
      </Section>
    </article>
  )
}
