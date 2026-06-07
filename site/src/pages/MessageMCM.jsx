import React from 'react'
import { Link } from 'react-router-dom'
import {
  PageHeader, Section, Prose, Callout, Ref, Table, StatGrid, Stat,
  CardGrid, Card, Steps, Figure, LayerStack, DefList, Badge
} from '../components/ui.jsx'

export default function MessageMCM() {
  return (
    <article>
      <PageHeader
        kicker="C-ITS FACILITIES — RELEASE 2 FRONTIER"
        title="MCM &amp; Cooperative Maneuvering"
        intro="The Maneuver Coordination Message (MCM) and its associated Maneuver Coordination Service (MCS) represent the next leap in cooperative driving: vehicles no longer just broadcast their current state but actively negotiate future trajectories with each other. This is the frontier where cooperative awareness ends and cooperative automation begins — and where the standards are still being written."
        sources={['ETSI TS 103 561 (draft)', 'ETSI TR 103 578', 'C2CCC WP 2072', 'C2CCC WP 2082', 'C2CCC UC 2097']}
      />

      {/* ── Draft status warning ─────────────────────────────────────────────── */}
      <Section id="draft-status" title="Draft Status — Important Caveat">
        <Callout type="warn" title="ETSI TS 103 561 is NOT a published standard">
          As of this writing, ETSI TS 103 561 — the normative specification for the Maneuver
          Coordination Service (MCS) and the Maneuver Coordination Message (MCM) — has{' '}
          <strong>no final deliverable on the ETSI delivery server</strong>. The directory is
          absent. MCM remains a Release-2 work item / draft. The C2C-CC white papers (WP 2082,
          WP 2085, UC 2097) and the pre-standardization technical report ETSI TR 103 578
          describe the intended design, but implementers should track the ETSI work programme
          (search "103561") for the current status before building production systems.
          Everything on this page reflects the <em>intended</em> design as documented in those
          public pre-standardization sources.
        </Callout>

        <p>
          The companion pre-standardization report <Ref code="TR 103 578" kind="ETSI" /> ("Maneuver
          Coordination Service — pre-standardization") and the normative specification{' '}
          <Ref code="TS 103 561" kind="ETSI" /> are being developed under ETSI TC ITS. The
          C2C-CC "Guidance for Day 2 and beyond roadmap" (WP 2072, 2021) and the "Day-2 Use Cases"
          document (UC 2097, 2023) provide the functional rationale. The MCO Functional Requirements
          paper (WP 2082) lists the communication requirements derived for MCM.
        </p>

        <Callout type="info" title="Acronym collision: MCO vs. MCS/MCM">
          In the C2C-CC papers numbered 2082–2085, "MCO" stands for{' '}
          <strong>Multi-Channel Operation</strong> — the radio spectrum management concept needed
          to support Release-2 applications on multiple 5.9 GHz channels. This is entirely
          separate from the maneuver coordination topic. Do not confuse{' '}
          <strong>MCO (Multi-Channel Operation)</strong> with{' '}
          <strong>MCS (Maneuver Coordination Service)</strong> or{' '}
          <strong>MCM (Maneuver Coordination Message)</strong>. The C2C-CC papers discuss
          Multi-Channel Operation because MCM and other Release-2 messages will require
          additional radio channels beyond the single SCH0 channel used by Day-1.
        </Callout>
      </Section>

      {/* ── From awareness to maneuvering ───────────────────────────────────── */}
      <Section id="progression" title="The Progression: Awareness to Sensing to Maneuvering">
        <p>
          The C2C-CC roadmap (WP 2072) organizes cooperative driving into three phases, each
          adding a qualitatively new class of information exchanged over V2X:
        </p>

        <div className="grid grid-cols-1 gap-4 my-6 md:grid-cols-3">
          <div className="rounded-xl border border-slate-700 bg-ink-900 p-5">
            <div className="text-brand-300 font-bold text-sm uppercase tracking-wider mb-1">Day 1 — Awareness Driving</div>
            <div className="text-slate-300 text-sm font-semibold mb-2">Status data</div>
            <p className="text-slate-400 text-sm">
              Vehicles broadcast current position, speed, heading, and event notifications
              (CAM, DENM). Drivers and ADAS receive warnings. No automation; no prediction
              beyond basic extrapolation.
            </p>
            <div className="mt-3 flex gap-2 flex-wrap">
              <Badge tone="brand">CAM</Badge>
              <Badge tone="brand">DENM</Badge>
              <Badge tone="brand">SPATEM/MAPEM</Badge>
            </div>
          </div>

          <div className="rounded-xl border border-amber-700 bg-ink-900 p-5">
            <div className="text-amber-300 font-bold text-sm uppercase tracking-wider mb-1">Day 2 — Sensing Driving</div>
            <div className="text-slate-300 text-sm font-semibold mb-2">Sensor data</div>
            <p className="text-slate-400 text-sm">
              Vehicles share what their on-board sensors detect — other road users, obstacles,
              pedestrians around corners (CPM). Semi-automated reactions become possible.
              Extended CAMs carry safety containers for functional safety.
            </p>
            <div className="mt-3 flex gap-2 flex-wrap">
              <Badge tone="amber">CPM</Badge>
              <Badge tone="amber">CAM extensions</Badge>
              <Badge tone="amber">RTCMEM</Badge>
            </div>
          </div>

          <div className="rounded-xl border border-emerald-700 bg-ink-900 p-5">
            <div className="text-emerald-300 font-bold text-sm uppercase tracking-wider mb-1">Day 3+ — Cooperative Driving</div>
            <div className="text-slate-300 text-sm font-semibold mb-2">Intention &amp; coordination data</div>
            <p className="text-slate-400 text-sm">
              Vehicles with SAE L3+ automation share planned and desired trajectories and
              coordinate maneuvers to avoid conflicts. The driver may be out of the loop.
              MCM is the key new message type enabling this phase.
            </p>
            <div className="mt-3 flex gap-2 flex-wrap">
              <Badge tone="emerald">MCM</Badge>
              <Badge tone="emerald">VAM</Badge>
              <Badge tone="emerald">Extended IVIM</Badge>
            </div>
          </div>
        </div>

        <p>
          Each phase inherits the previous one in a backwards-compatible manner. A Day-3 vehicle
          still transmits Day-1 CAMs so that legacy vehicles and infrastructure continue to receive
          the awareness information they rely on (WP 2072, section 2).
        </p>

        <Callout type="key" title="Key insight: from broadcasting to negotiating">
          Day-1 and Day-2 C-ITS are inherently <em>one-directional sharing</em>: a vehicle
          broadcasts what it knows, others listen and react. Cooperative maneuvering (Day 3+)
          is fundamentally different: two or more vehicles exchange messages whose content
          depends on what the other vehicle has transmitted — an implicit negotiation loop.
          This requires new message semantics (planned vs. desired trajectory) and potentially
          new transport modes (unicast/multicast instead of pure broadcast).
        </Callout>
      </Section>

      {/* ── Core concepts ───────────────────────────────────────────────────── */}
      <Section id="concepts" title="Core Concepts of Cooperative Maneuvering">
        <DefList items={[
          {
            term: 'Planned trajectory',
            def: 'The trajectory a vehicle is currently committed to and actively executing. Broadcast continuously so that other vehicles know what this vehicle will do. Equivalent to "this is my confirmed plan."'
          },
          {
            term: 'Desired trajectory',
            def: 'A trajectory the vehicle wishes to execute but has not yet committed to — typically because doing so would conflict with another vehicle\'s planned trajectory. Broadcasting a desired trajectory is an implicit request for cooperation: "I want to do this, can you accommodate me?"'
          },
          {
            term: 'Alternative trajectory',
            def: 'A trajectory a vehicle offers to another as a cooperation gesture. Demonstrated in the IMAGinE research project: vehicle B detects vehicle A\'s need and broadcasts an alternative trajectory that would create a gap, offering the cooperative maneuver.'
          },
          {
            term: 'Conflict detection',
            def: 'A vehicle receiving another vehicle\'s planned or desired trajectory checks it against its own planned trajectory for spatial/temporal overlap. If the trajectories intersect within a dangerous time window, a conflict is detected and the receiving vehicle must decide whether to cooperate or maintain right-of-way.'
          },
          {
            term: 'Implicit negotiation',
            def: 'The MCS protocol uses implicit acknowledgment: when vehicle B adapts its planned trajectory in response to vehicle A\'s desired trajectory, vehicle A interprets that adapted trajectory as acceptance and promotes its desired trajectory to planned. No explicit ACK message is defined in the current concept.'
          },
          {
            term: 'Maneuver Coordination Service (MCS)',
            def: 'The facilities-layer service managing MCM generation, transmission, and consumption. Analogous to CAS for CAMs or CPS for CPMs. Standardized (in draft) in ETSI TS 103 561.'
          },
          {
            term: 'CCAM',
            def: 'Connected, Cooperative and Automated Mobility — the EU policy and R&D framework (European Commission CCAM Platform) under which MCM standardization and cooperative driving R&D is funded and directed. Successor to earlier CCAD (Connected Cooperative Automated Driving) terminology.'
          },
        ]} />

        <p>
          The MCS concept was validated in several EU H2020 projects: IMAGinE demonstrated
          V2V-only cooperative merging using planned/desired/alternative trajectory exchange;
          TransAID extended this with I2V maneuver coordination (RSU suggesting lane changes,
          ToC safe spots, and MRM advices); MAVEN demonstrated intersection optimization with
          V2I probe data and automated GLOSA. These projects fed directly into the ETSI
          standardization process for TR 103 578 and TS 103 561.
        </p>
      </Section>

      {/* ── MCM message structure ────────────────────────────────────────────── */}
      <Section id="message-structure" title="MCM Message Structure (Intended Design)">
        <p>
          Based on the pre-standardization documents (MCO-Requirements WP 2082, Fig. 11 "MCM
          message containers assumed"), the MCM is designed to carry multiple trajectory
          containers. The exact ASN.1 encoding awaits the published TS 103 561, but the
          intended container structure is:
        </p>

        <Table
          caption="MCM top-level containers (based on ETSI TR 103 578 / C2CCC WP 2082)"
          headers={['Container', 'Content', 'Notes']}
          rows={[
            [<strong>ITS PDU Header</strong>, 'Message ID, protocol version, station ID, generation time', 'Common to all ETSI ITS messages'],
            [<strong>MCM Management Container</strong>, 'Station type, generation delta time, reference position', 'Provides temporal and spatial anchor'],
            [<strong>Planned Trajectory Container</strong>, 'Sequence of future waypoints with timestamps, speed, heading', 'What the vehicle will do; transmitted continuously'],
            [<strong>Desired Trajectory Container</strong>, 'Alternative future path the vehicle wishes to execute', 'Signals intent to maneuver; triggers cooperation loop'],
            [<strong>Alternative Trajectory Container</strong>, 'Path offered to another vehicle as a cooperation gesture', 'Sender commits if recipient accepts and adapts its plan'],
            [<strong>Advice Container (I2V)</strong>, 'Lane-change, speed, ToC, safe-spot advice from RSU', 'Infrastructure-originated MCMs; receiving vehicles may comply or refuse'],
            [<strong>Advice Response Container</strong>, 'Vehicle acknowledgment of received RSU advice', 'Infrastructure adapts strategy based on compliance feedback'],
          ]}
        />

        <Callout type="tip" title="Trajectory representation">
          A trajectory in the MCM context is a time-stamped sequence of future positions
          (waypoints), each associated with a predicted speed, heading, and possibly lateral
          offset. The time horizon and spatial granularity are application-dependent. For
          cooperative merging on a highway, a horizon of several seconds at 10–25 Hz update
          rate is typical in research implementations.
        </Callout>

        <p>
          Communication requirements for MCM derived in WP 2082 (Table 5) specify demanding
          performance targets reflecting the safety-critical, time-sensitive nature of maneuver
          coordination:
        </p>

        <StatGrid cols={4}>
          <Stat value="&lt;20 ms" label="Target latency" sub="End-to-end, V2V" />
          <Stat value="10–25 Hz" label="Update rate" sub="Planned trajectory" />
          <Stat value="300–500 m" label="Range requirement" sub="V2V communication" />
          <Stat value="ASIL B/C" label="Functional safety" sub="For actuating reactions" />
        </StatGrid>

        <p>
          These are significantly more demanding than Day-1 CAM requirements (1–10 Hz, no
          mandatory ASIL). Meeting ASIL B/C targets requires "Safety Containers" in the MCM —
          explicit fields attesting the accuracy and confidence of trajectory data, certified via
          the PKI Service Specific Permissions (SSPs).
        </p>
      </Section>

      {/* ── Merge diagram ───────────────────────────────────────────────────── */}
      <Section id="merge-scenario" title="How Cooperative Merging Works">
        <Figure caption="Two vehicles resolving a highway merge conflict via MCM trajectory exchange (based on IMAGinE / TransAID concept; C2CCC UC 2097 UC_COOP_00002). Orange dashed = desired trajectory (conflict). Blue dashed = planned trajectory. Green solid = committed planned trajectory after negotiation.">
          <div className="w-full overflow-x-auto">
            <svg viewBox="0 0 720 300" className="w-full max-w-3xl mx-auto" aria-label="Cooperative merge sequence diagram">
              {/* Road background */}
              <rect x="0" y="0" width="720" height="300" rx="8" fill="#0f172a" />
              {/* Highway lane */}
              <rect x="30" y="60" width="660" height="55" rx="4" fill="#1e293b" />
              {/* On-ramp */}
              <rect x="30" y="185" width="340" height="55" rx="4" fill="#1e293b" />
              {/* Merge zone */}
              <polygon points="370,185 660,115 660,185" fill="#1e293b" />
              {/* Lane markings */}
              {[80, 160, 240, 320, 400, 480, 560, 640].map(x => (
                <rect key={x} x={x} y={86} width={30} height={4} rx="2" fill="#334155" />
              ))}
              <line x1="370" y1="115" x2="660" y2="115" stroke="#334155" strokeWidth="2" strokeDasharray="12 8" />

              {/* Labels */}
              <text x="345" y="50" textAnchor="middle" fill="#94a3b8" fontSize="12">Main highway lane</text>
              <text x="200" y="175" textAnchor="middle" fill="#94a3b8" fontSize="12">On-ramp (merging)</text>

              {/* Instant (a) */}
              <text x="110" y="25" textAnchor="middle" fill="#64748b" fontSize="11">(a) conflict detected</text>
              {/* Blue car B — main lane */}
              <rect x="60" y="68" width="50" height="38" rx="6" fill="#2563eb" />
              <text x="85" y="92" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">B</text>
              {/* Blue planned traj */}
              <line x1="110" y1="87" x2="280" y2="87" stroke="#60a5fa" strokeWidth="2" strokeDasharray="6 3" />
              <polygon points="280,83 292,87 280,91" fill="#60a5fa" />
              {/* White car A — on-ramp */}
              <rect x="60" y="193" width="50" height="38" rx="6" fill="#e2e8f0" />
              <text x="85" y="217" textAnchor="middle" fill="#1e293b" fontSize="11" fontWeight="bold">A</text>
              {/* White desired traj — merges onto main */}
              <path d="M110 212 Q 250 212 310 112" stroke="#f97316" strokeWidth="2" strokeDasharray="5 4" fill="none" />
              <polygon points="308,105 312,118 318,109" fill="#f97316" />
              {/* Conflict marker */}
              <circle cx="310" cy="112" r="14" fill="none" stroke="#ef4444" strokeWidth="2.5" />
              <text x="310" y="117" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="bold">!</text>

              {/* Instant (b) */}
              <text x="490" y="25" textAnchor="middle" fill="#64748b" fontSize="11">(b) B adapts, A commits</text>
              {/* Blue car B adapted — moved back */}
              <rect x="400" y="68" width="50" height="38" rx="6" fill="#2563eb" />
              <text x="425" y="92" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">B</text>
              {/* Blue adapted planned traj */}
              <line x1="450" y1="87" x2="620" y2="87" stroke="#60a5fa" strokeWidth="2" />
              <polygon points="620,83 632,87 620,91" fill="#60a5fa" />
              {/* White car A approaching merge */}
              <rect x="290" y="193" width="50" height="38" rx="6" fill="#e2e8f0" />
              <text x="315" y="217" textAnchor="middle" fill="#1e293b" fontSize="11" fontWeight="bold">A</text>
              {/* White committed planned traj */}
              <path d="M340 212 Q 420 212 470 112" stroke="#22c55e" strokeWidth="2.5" fill="none" />
              <polygon points="468,105 472,118 478,109" fill="#22c55e" />

              {/* Gap label */}
              <text x="540" y="108" textAnchor="middle" fill="#22c55e" fontSize="11">gap created</text>
              <line x1="455" y1="115" x2="620" y2="115" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="4 4" />

              {/* Legend */}
              <line x1="40" y1="270" x2="80" y2="270" stroke="#60a5fa" strokeWidth="2" strokeDasharray="5 3" />
              <text x="85" y="274" fill="#94a3b8" fontSize="10">B planned traj.</text>
              <line x1="180" y1="270" x2="220" y2="270" stroke="#f97316" strokeWidth="2" strokeDasharray="5 3" />
              <text x="225" y="274" fill="#94a3b8" fontSize="10">A desired traj. (conflict)</text>
              <line x1="380" y1="270" x2="420" y2="270" stroke="#22c55e" strokeWidth="2.5" />
              <text x="425" y="274" fill="#94a3b8" fontSize="10">A planned traj. (committed)</text>
            </svg>
          </div>
        </Figure>

        <Steps>
          <div>
            <strong>Both vehicles broadcast planned trajectories continuously.</strong>{' '}
            Vehicle B (blue, main lane) broadcasts its planned trajectory forward along the highway.
            Vehicle A (white, on-ramp) also broadcasts its planned trajectory on the ramp.
          </div>
          <div>
            <strong>Vehicle A identifies a desired trajectory and broadcasts it.</strong>{' '}
            Approaching the merge zone, A determines it needs to enter the main lane. It starts
            including a desired trajectory in its MCM — a path that would cross into B's lane.
            This is an implicit cooperation request.
          </div>
          <div>
            <strong>Conflict detection.</strong>{' '}
            Vehicle B receives A's desired trajectory and checks it against its own planned
            trajectory. Spatial/temporal overlap is detected — A's desired path conflicts with
            B's planned path at the merge point.
          </div>
          <div>
            <strong>Vehicle B decides to cooperate (if safe) and adapts its planned trajectory.</strong>{' '}
            B slows down or shifts lane, broadcasting an adapted planned trajectory that now
            creates a gap for A to merge. This is the implicit acceptance signal.
          </div>
          <div>
            <strong>Vehicle A receives B's acknowledgment and commits.</strong>{' '}
            Upon receiving B's adapted planned trajectory (which no longer conflicts), A promotes
            its desired trajectory to planned trajectory and begins executing the merge. All
            surrounding vehicles now see A's committed merge plan.
          </div>
        </Steps>
      </Section>

      {/* ── Use cases ───────────────────────────────────────────────────────── */}
      <Section id="use-cases" title="Key Use Cases">
        <CardGrid cols={3}>
          <Card title="Cooperative Lane Merging (CLM)" accent="emerald">
            A merging vehicle (on-ramp or lane change) and one or more highway vehicles negotiate
            trajectories so the merge happens safely and smoothly — no abrupt braking, gaps always
            above safety thresholds. Defined in C2CCC UC_COOP_00002. Can run V2V-only or
            infrastructure-assisted via RSU.
          </Card>
          <Card title="Cooperative Transition of Control (ToC)" accent="amber">
            Highly automated (L3+) vehicles approaching a no-AD zone use MCMs to inform
            surrounding vehicles and/or infrastructure about an imminent takeover request or
            Minimum Risk Maneuver (MRM). Infrastructure can spatially distribute ToC events to
            prevent dangerous clustering. Demonstrated in H2020 TransAID.
          </Card>
          <Card title="Advanced C-ACC String" accent="brand">
            Multiple vehicles in a cooperative ACC string share planned trajectories via MCM
            in addition to CAM dynamics. Lateral control (lane changes) is coordinated, not just
            longitudinal spacing. Infrastructure can suggest string formation points and break-up
            locations via extended IVIM.
          </Card>
          <Card title="Cooperative Lane Change (CLC)" accent="violet">
            A vehicle wishing to change lanes broadcasts a desired trajectory covering the target
            lane. Vehicles in the target lane receive it and can adapt gaps. Resolves the same
            conflict pattern as CLM but in free-flow traffic rather than at merge zones.
          </Card>
          <Card title="Intersection Crossing Coordination" accent="cyan">
            At unsignalized or cooperative intersections, vehicles approaching from different
            directions exchange planned trajectories. The infrastructure (ISAD Level A RSU) can
            run a centralized coordination application and issue lane-change or speed advices
            via I2V MCMs. Extends automated GLOSA with explicit negotiation (C2CCC UC_CrosA_00004).
          </Card>
          <Card title="Platooning" accent="rose">
            Heavy vehicle platoons use dedicated platooning control messages (PCM/PMM) alongside
            MCMs for string management — joining, leaving, and break-up maneuvers. Extensively
            studied in EU ENSEMBLE project. Platooning Level A (L1–L2), Level B (L3), Level C
            (L4) parallel the Day-2/Day-3+ roadmap.{' '}
            <Link to="/applications" className="text-rose-300 underline">Applications →</Link>
          </Card>
        </CardGrid>

        <Callout type="example" title="Cooperative Merging — protocol summary (IMAGinE / UC_COOP_00002)">
          <ol className="list-decimal list-inside space-y-1 text-sm text-slate-300">
            <li>Both vehicles run a cooperative merging ITS-S application and transmit MCMs continuously.</li>
            <li>At the merge section, Vehicle A includes a desired trajectory signalling intent to merge.</li>
            <li>Vehicle B detects A's desired trajectory conflicts with its own planned trajectory.</li>
            <li>If safely feasible, B adapts its planned trajectory to accommodate A (creates a gap).</li>
            <li>A receives B's adapted planned trajectory — no conflict — and promotes its desired to planned.</li>
            <li>A executes the merge; both vehicles' applications confirm completion and resume normal MCM broadcast.</li>
          </ol>
        </Callout>
      </Section>

      {/* ── Day-1 / Day-1.5 / Day-2 / Day-3 roadmap table ───────────────────── */}
      <Section id="roadmap" title="Service Deployment Roadmap">
        <p>
          The EU C-ITS Platform Phase 1 report introduced the "Day-1.5" terminology for services
          that were identified but not yet deployed. The C2C-CC roadmap (WP 2082, WP 2072) uses
          Day 1 / Day 2 / Day 3+. The table below maps these together with the relevant messages
          and automation levels:
        </p>

        <Table
          caption="C-ITS deployment phases — messages, services, and automation context (C2CCC WP 2072, WP 2082)"
          headers={['Phase', 'C2C-CC label', 'Data class', 'Key messages', 'Automation level', 'MCM role']}
          rows={[
            [
              <Badge tone="brand">Day 1</Badge>,
              'Awareness Driving',
              'Status data',
              'CAM, DENM, SPATEM, MAPEM, IVIM',
              'SAE L0–L1 (driver warned)',
              'None — CAM/DENM sufficient',
            ],
            [
              <Badge tone="amber">Day 1.5</Badge>,
              'EU Platform intermediate',
              'Extended status + infrastructure',
              'Extended CAM, SREM/SSEM, RTCMEM',
              'L1–L2 (driver assisted)',
              'None — extended awareness only',
            ],
            [
              <Badge tone="amber">Day 2</Badge>,
              'Sensing Driving',
              'Sensor / perception data',
              'CPM, extended CAM, VAM',
              'L2–L3 (semi-automated, C-ACC)',
              'Limited — CAM extensions for C-ACC; MCM not yet required',
            ],
            [
              <Badge tone="emerald">Day 3+</Badge>,
              'Cooperative Driving',
              'Intention &amp; coordination data',
              <><strong>MCM</strong>, VAM, extended IVIM, PCM/PMM</>,
              'L3–L4 (highly automated CAVs)',
              'Core — planned/desired trajectory exchange enables cooperative maneuvers',
            ],
          ]}
        />

        <p>
          Platooning follows a parallel sub-roadmap. The C2C-CC identifies "Platooning Level A"
          (basic longitudinal C-ACC, ITS-G5, SAE L1–L2), "Level B" (improved C-ACC string,
          L3), and "Level C" (full cooperative automation, L4) as overlapping with Day-2 through
          Day-3+. The EU H2020 ENSEMBLE project produced the foundational interoperability
          specifications for multi-brand truck platooning, underpinning ETSI TR 103 298 and
          TR 103 299 (CACC).
        </p>

        <Callout type="info" title="Multi-Channel Operation (MCO) requirement for MCM">
          MCM and the full set of Day-3+ messages cannot be accommodated on the single SCH0
          (10 MHz) channel used by Day-1 without congestion at high penetration rates. The C2C-CC
          MCO papers (WP 2082–2085) establish that Release-2 and beyond deployments require
          additional spectrum channels in the 5.9 GHz ITS band, necessitating a Multi-Channel
          Operation (MCO) architecture standardized under ETSI STF 585. Note: "MCO" here means
          Multi-Channel Operation — not Maneuver Coordination.
        </Callout>
      </Section>

      {/* ── Infrastructure role ─────────────────────────────────────────────── */}
      <Section id="infrastructure" title="Infrastructure Role in Cooperative Maneuvering">
        <p>
          The roadside infrastructure (RSU, central ITS-S) can participate in MCM-based cooperation
          in two distinct roles, defined by the ISAD (Infrastructure Support Levels for Automated
          Driving) framework referenced in WP 2072:
        </p>

        <CardGrid cols={2}>
          <Card title="Passive: V2I probe collection" accent="brand">
            Vehicles transmit extended CAMs or MCMs with intent information (planned route,
            automation level, string size) to the infrastructure. RSU collects this and optimizes
            traffic light phases, computes GLOSA speeds, or detects approaching strings. Infrastructure
            responds via updated SPATEM/MAPEM. No individualized commands — vehicles use information
            autonomously (ISAD Level B/C).
          </Card>
          <Card title="Active: I2V maneuver advice" accent="violet">
            Infrastructure issues individualized MCMs to specific vehicles: lane-change advice,
            speed advice, ToC safe spot suggestion, or MRM parking suggestion. Demonstrated in
            TransAID. Receiving vehicles can <em>accept or refuse</em> — the infrastructure
            cannot force behavior. Vehicles may include MCM AdviceResponse containers to
            acknowledge compliance (ISAD Level A).
          </Card>
        </CardGrid>

        <p>
          The infrastructure-active role requires ISAD Level A capability — sensors, computation,
          and V2X communication at the RSU able to model incoming vehicle automation states and
          run real-time coordination algorithms. This is considerably more demanding than Day-1
          RSU roles (ISAD Level C) and represents a significant deployment investment. Research
          projects MEC-View and LUKAS demonstrated this using Multi-Access Edge Computing (MEC)
          at RSU locations.
        </p>
      </Section>

      {/* ── Security and functional safety ──────────────────────────────────── */}
      <Section id="security" title="Security and Functional Safety">
        <p>
          Because MCM trajectories may directly actuate steering and braking in receiving automated
          vehicles, the security and functional safety requirements are substantially stricter than
          for Day-1 messages:
        </p>

        <CardGrid cols={2}>
          <Card title="PKI and Service Specific Permissions" accent="amber">
            MCMs must be signed with ETSI ITS pseudonym certificates. The Maneuver
            Coordination Service requires dedicated Service Specific Permissions (SSPs) in
            the certificate, certifying that the transmitting station has been validated to
            produce trajectory data meeting the required accuracy. Only certified stations
            may transmit MCMs that receiving vehicles will act on for automated reactions.
            See <Link to="/pki" className="text-amber-300 underline">PKI &amp; Trust</Link>.
          </Card>
          <Card title="Safety Containers and ASIL" accent="rose">
            MCM messages intended to trigger automated reactions must carry Safety Containers —
            data elements expressing the accuracy, confidence, and ASIL (Automotive Safety
            Integrity Level, per ISO 26262) achieved by the trajectory data. WP 2082 indicates
            ASIL B/C targets for cooperative maneuvering reactions. This is specified in C2C-CC
            work item T0019 (Technical Functional Safety Concept). The ASIL level achieved is
            declared per-field, allowing a receiving vehicle to decide if the data is of
            sufficient quality for its intended automated reaction.
          </Card>
        </CardGrid>

        <Callout type="warn" title="Misbehavior detection is a prerequisite">
          A vehicle transmitting a false planned trajectory — whether due to malfunction or
          attack — could cause cooperating vehicles to adapt dangerously. Misbehavior detection
          (C2C-CC WI D0022) checks consistency of received MCM trajectories against CPM
          sensor data and CAM positions at nearby vehicles and RSUs. Detected misbehavior
          is reported to the CCMS (Certificate and Credential Management System) and may
          trigger certificate revocation. The C2C-CC roadmap lists misbehavior detection as a
          required Day-2 supporting functionality before Day-3+ cooperative maneuvers can be
          safely deployed.
        </Callout>
      </Section>

      {/* ── CCAM vision ─────────────────────────────────────────────────────── */}
      <Section id="ccam" title="The CCAM Vision">
        <p>
          CCAM — Connected, Cooperative and Automated Mobility — is the European Commission's
          overarching strategic and funding framework for the evolution of C-ITS toward fully
          automated cooperative driving. The CCAM Platform coordinates R&amp;D projects,
          standardization inputs, and deployment pilots across the EU, directly funding the
          research that produced the cooperative maneuvering concepts behind MCM.
        </p>

        <p>
          The three-layer progression reflects increasing scope of shared information:
        </p>

        <LayerStack
          layers={[
            { name: 'Day 3+ — Cooperative Automation', sub: 'MCM trajectory negotiation · Maneuver Coordination Service · CCAM vision fulfilled', accent: 'emerald' },
            { name: 'Day 2 — Collective Sensing', sub: 'CPM object sharing · Misbehavior detection · Safety containers · C-ACC (semi-automated)', accent: 'amber' },
            { name: 'Day 1 — Cooperative Awareness', sub: 'CAM · DENM · SPATEM/MAPEM · IVIM · PKI/Security (deployed since 2019)', accent: 'brand' },
          ]}
          leftRail="V2X Standards"
          rightRail="Automation Level"
        />

        <p>
          The Declaration of Amsterdam (2016) and subsequent EU policy confirmed the direction:
          C-ITS and vehicle automation must be merged into a single coherent ecosystem. CCAM
          projects — IMAGinE, TransAID, MAVEN, MEC-View, LUKAS, ENSEMBLE — have each
          contributed prototype implementations and use-case validations that form the evidence
          base for the MCM standardization underway at ETSI TC ITS. The goal articulated in
          the C2C-CC roadmap is "accident-free road transport with optimal traffic flow" through
          cooperative automation.
        </p>
      </Section>

      {/* ── Relation to other messages ───────────────────────────────────────── */}
      <Section id="relations" title="Relation to Other C-ITS Messages">
        <Table
          caption="MCM in context of the full C-ITS message family"
          headers={['Message', 'Release', 'Relation to MCM']}
          rows={[
            [
              <Link to="/cam" className="text-brand-300 underline">CAM</Link>,
              'Day 1',
              'Foundation of awareness; planned trajectory in MCM supersedes simple CAM path prediction. MCM receivers still consume CAMs for non-equipped vehicle awareness.'
            ],
            [
              <Link to="/cpm" className="text-amber-300 underline">CPM</Link>,
              'Day 2',
              'Fills perception gap for non-equipped road users. MCM trajectory planning relies on CPM to confirm that a merge gap contains no detected non-equipped objects.'
            ],
            [
              'DENM',
              'Day 1+',
              'ToC and MRM notifications can be included in DENMs (basic) or in MCM ToC containers (Day 3+, more structured). Both may coexist.'
            ],
            [
              'VAM',
              'Day 3+',
              'VRU Awareness Message enables pedestrians / cyclists to actively announce presence. MCM-based vehicles must account for VAM-announced VRUs in trajectory planning.'
            ],
            [
              'SPATEM/MAPEM',
              'Day 1+',
              'Infrastructure MCMs extend SPATEM/MAPEM use: automated GLOSA with negotiation replaces static phase broadcasts for L3+ vehicles. MCMs carry compliance responses.'
            ],
            [
              'IVIM',
              'Day 1+',
              'Extended IVIM carries C-ACC string formation advice and lane-change suggestions from infrastructure. Complements I2V MCMs for less safety-critical advisories.'
            ],
          ]}
        />
      </Section>

      {/* ── Where next ──────────────────────────────────────────────────────── */}
      <Section id="where-next" title="Where Next">
        <CardGrid cols={3}>
          <Card title="CAM — the foundation" accent="brand">
            Understand cooperative awareness before cooperative maneuvering.{' '}
            <Link to="/cam" className="text-brand-300 underline">CAM page</Link>
          </Card>
          <Card title="CPM — collective sensing" accent="amber">
            The Day-2 sensing layer that underpins safe trajectory planning.{' '}
            <Link to="/cpm" className="text-amber-300 underline">CPM page</Link>
          </Card>
          <Card title="Applications" accent="emerald">
            Broader use-case catalogue including platooning, GLOSA, and intersection management.{' '}
            <Link to="/applications" className="text-emerald-300 underline">Applications page</Link>
          </Card>
          <Card title="CAR 2 CAR Consortium" accent="violet">
            Industry body driving Day-2+ roadmap and producing the MCO / use-case papers cited here.{' '}
            <Link to="/car2car" className="text-violet-300 underline">Car2Car page</Link>
          </Card>
          <Card title="PKI &amp; Trust" accent="rose">
            Certificate infrastructure and SSPs needed before MCM reactions can be trusted.{' '}
            <Link to="/pki" className="text-rose-300 underline">PKI page</Link>
          </Card>
          <Card title="Research" accent="cyan">
            H2020 projects IMAGinE, TransAID, MAVEN, ENSEMBLE, MEC-View — where MCM was validated.{' '}
            <Link to="/research" className="text-cyan-300 underline">Research page</Link>
          </Card>
        </CardGrid>
      </Section>

      {/* ── Key standards ───────────────────────────────────────────────────── */}
      <Section id="standards" title="Key Standards and References">
        <Prose>
          <ul>
            <li>
              <Ref code="TS 103 561" kind="ETSI" title="Maneuver Coordination Service" /> —
              normative MCM specification (draft; not yet published as of archive date)
            </li>
            <li>
              <Ref code="TR 103 578" kind="ETSI" title="MCS pre-standardization study" /> —
              pre-standardization technical report defining the MCS concept
            </li>
            <li>
              <Ref code="TR 103 298" kind="ETSI" title="Platooning pre-standardization" /> —
              platooning (PCM/PMM) pre-standardization study
            </li>
            <li>
              <Ref code="TR 103 299" kind="ETSI" title="CACC pre-standardization" /> —
              Cooperative Adaptive Cruise Control
            </li>
            <li>
              <Ref code="EN 302 637-2" kind="ETSI" title="CAM" /> — Day-1 Cooperative Awareness
              Message (foundation for MCM extensions)
            </li>
            <li>
              <Ref code="TR 103 562" kind="ETSI" title="CPM pre-standardization" /> —
              Collective Perception (Day-2 layer supporting MCM)
            </li>
            <li>
              <Ref code="TR 103 576-2" kind="ETSI" title="ITS architecture pre-standardization" /> —
              Interoperability among heterogeneous ITS systems and backward compatibility
            </li>
            <li>
              C2CCC WP 2072 v1.2 — "Guidance for Day 2 and beyond roadmap" (C2C-CC, 2021)
            </li>
            <li>
              C2CCC WP 2082 v1.1 — "MCO Functional Requirements" incl. MCM communication
              requirements Table 5 (C2C-CC, 2020)
            </li>
            <li>
              C2CCC UC 2097 v1.0 — "Use Cases: Day 2 and Beyond" incl. CLM, ToC, CACC, CACC String
              (C2C-CC, 2023)
            </li>
            <li>
              C2CCC WP 2085 v1.0 — "Multi-Channel Operation (MCO) Concept" — channel planning
              for Release-2 messages including MCM (C2C-CC, 2022)
            </li>
          </ul>
        </Prose>
      </Section>
    </article>
  )
}
