import React from 'react'
import { Link } from 'react-router-dom'
import { PageHeader, Section, Prose, Callout, Ref, Table, StatGrid, Stat, CardGrid, Card, Steps, Figure, LayerStack, DefList, Badge } from '../components/ui.jsx'

export default function Applications() {
  return (
    <article>
      <PageHeader
        kicker="APPLICATIONS &amp; USE CASES"
        title="What C-ITS Is Actually For"
        intro="Cooperative ITS is not a technology in search of a purpose — it exists to save lives, reduce congestion, cut emissions, and make driving smarter. The Basic Set of Applications (BSA, ETSI TR 102 638) is the official catalogue that defines which services vehicles and infrastructure must deliver, from split-second emergency braking warnings to guiding an electric vehicle to the nearest available charging spot."
        sources={['ETSI TR 102 638', 'ETSI TS 101 539-1', 'ETSI TS 101 539-2', 'ETSI TS 101 539-3', 'ETSI TS 101 556-1', 'ETSI TS 101 556-2', 'ETSI TS 101 556-3', 'ETSI TR 102 965', 'ETSI TR 103 970']}
      />

      {/* ── 1. BSA overview ──────────────────────────────────────────────────── */}
      <Section id="bsa-overview" title="The Basic Set of Applications (BSA)">
        <p>
          ETSI TR 102 638 defines the <strong>Basic Set of Applications (BSA)</strong> — the agreed catalogue
          of ITS services that European C-ITS standardisation targets. The BSA is not a monolithic application;
          it is a structured collection of <em>ITS services</em>, each decomposed into one or more <em>ITS
          applications</em>, which in turn consist of <em>use cases</em> and <em>implementation scenarios</em>.
          Version 2.1.1 (April 2024) is the Release 2 document covering both mature Day-1 services and the
          expanded set of cooperative and automated driving functions.
        </p>
        <Callout type="key" title="BSA Release structure">
          <strong>Release 1</strong> targets human-driven vehicles: road hazard warning, intersection collision
          warning, roadworks warning, in-vehicle signage, GLOSA, and probe vehicle data.
          <br /><br />
          <strong>Release 2</strong> (TR 102 638 V2.1.1, April 2024) expands into cooperative automated
          driving: C-ACC, C-AEBS, cooperative lane change, truck platooning, VRU protection via{' '}
          <Link to="/vam">VAM</Link>, UWB-based precise positioning, and more. Release 2 builds on Release 1
          messages but adds <Link to="/cpm">CPM</Link> and <Link to="/vam">VAM</Link>.
        </Callout>

        <p>The Release 2 BSA organises services into high-level ITS service categories:</p>

        <CardGrid cols={3}>
          <Card title="Partial &amp; High Automation" icon="🚗" accent="brand">
            Hazardous Location Notification&#8209;Vehicle Assistance, C&#8209;ACC, C&#8209;ACC String,
            C&#8209;AEBS (Cooperative Automatic Emergency Braking), Advanced Pre&#8209;Crash, C&#8209;ALK
            (Active Lane Keeping), C&#8209;ISA (Intelligent Speed Adaptation), cooperative tyre pressure
            adjustment, energy&#8209;critical situation assistance, ADS infrastructure support.
          </Card>
          <Card title="CCAM Augmented Perception" icon="👁" accent="violet">
            Collective Perception for non&#8209;connected vehicles at intersections and slopes, advanced
            slow&#8209;vehicle warning, V2V/I2V VRU perception, tunnel perception, merging traffic
            perception. Uses <Link to="/cpm">CPM</Link> to share sensor data.
          </Card>
          <Card title="Vehicle Coordination" icon="🔗" accent="cyan">
            Cooperative Lane Merging, Cooperative Lane Change, advanced C&#8209;ACC string, truck
            platooning management, toll plaza guidance, cooperative transition control.
            Uses <Link to="/mcm">MCM</Link> for manoeuvre coordination.
          </Card>
          <Card title="Multi-Car Collision Avoidance" icon="⚠" accent="amber">
            Advanced signal violation warning, advanced wrong&#8209;way driving warning, intersection
            collision avoidance. Extends Day&#8209;1 ICRW/LCRW into automated contexts.
          </Card>
          <Card title="Intersection Crossing Assist" icon="🚦" accent="emerald">
            Advanced ICW, non&#8209;controlled intersections, traffic light priority vehicles, optimised
            signal info V2I, automated GLOSA, automated GLOSA with negotiation, railway level crossing.
          </Card>
          <Card title="Advanced Warning &amp; VRU" icon="🚶" accent="rose">
            Advanced slow vehicle warning, motorcycle filtering/overtaking scenarios, VRU presence
            awareness, VRU collision warning, VRU brake intervention, VRU safety beacon, VRU cluster
            management. Uses <Link to="/vam">VAM</Link>.
          </Card>
          <Card title="Dynamic Navigation" icon="🗺" accent="brand">
            Detour management — C&#8209;ITS re&#8209;routing based on live traffic and hazard data.
          </Card>
          <Card title="Contextual Corridor Management" icon="🛣" accent="violet">
            Emergency corridor, EV recharging corridor, priority vehicle corridor, hard shoulder running,
            long&#8209;term roadworks warning.
          </Card>
          <Card title="POIs &amp; Mobility Services" icon="⚡" accent="cyan">
            Parking availability and booking, automated valet parking, parking payment, EV charging spot
            notification, tyre pressure gauge, alternative fuel planning.
          </Card>
        </CardGrid>
      </Section>

      {/* ── 2. Day-1 catalogue ───────────────────────────────────────────────── */}
      <Section id="day1-catalogue" title="Day-1 Service Catalogue">
        <p>
          Day-1 (Release 1) services are the ones mandated by EU Delegated Regulation 2019/548 and deployed by
          programmes such as <Link to="/c-roads">C-Roads</Link>. They cover the most safety-critical and
          high-value traffic-efficiency scenarios achievable with the basic <Link to="/cam">CAM</Link> +{' '}
          <Link to="/denm">DENM</Link> message set, optionally extended with SPATEM/MAPEM/IVIM from roadside
          infrastructure.
        </p>

        <Table
          caption="Day-1 C-ITS Service Catalogue (TR 102 638 / C-Roads)"
          headers={['Service', 'Category', 'What it does', 'Primary messages']}
          rows={[
            [
              <strong>Emergency Electronic Brake Light (EEBL)</strong>,
              'Road safety',
              'Warns following drivers when a vehicle applies emergency braking — brake lights ON and deceleration meets or exceeds a predefined threshold.',
              <><Link to="/cam">CAM</Link> + <Link to="/denm">DENM</Link> (cause: emergency brake)</>
            ],
            [
              <strong>Hazardous Location Notification (HLN)</strong>,
              'Road safety',
              'Notifies approaching vehicles of a stationary hazard: dangerous curve, obstacle, animal, surface condition.',
              <><Link to="/denm">DENM</Link> (cause: hazardous location) + <Link to="/cam">CAM</Link></>
            ],
            [
              <strong>Wrong Way Driving Warning (WWD)</strong>,
              'Road safety',
              'Detects and warns of a vehicle travelling counter to regulated traffic flow.',
              <><Link to="/denm">DENM</Link> (cause: wrong way driving) + <Link to="/cam">CAM</Link></>
            ],
            [
              <strong>Emergency Vehicle Approaching (EVA)</strong>,
              'Road safety',
              'Emergency vehicle broadcasts approach so other vehicles can give way.',
              <><Link to="/denm">DENM</Link> (cause: emergency vehicle) + <Link to="/cam">CAM</Link></>
            ],
            [
              <strong>Slow / Stationary Vehicle Warning</strong>,
              'Road safety',
              'Vehicle moving significantly slower than traffic flow, or stopped on the carriageway, warns others.',
              <><Link to="/denm">DENM</Link> (cause: slow/stationary vehicle) + <Link to="/cam">CAM</Link></>
            ],
            [
              <strong>Roadworks Warning</strong>,
              'Road safety / Traffic efficiency',
              'Static or moving roadworks broadcast their position and extent; vehicles approaching at excessive speed are warned.',
              <><Link to="/denm">DENM</Link> (cause: roadwork) + <Link to="/infrastructure">IVIM</Link></>
            ],
            [
              <strong>Adverse Weather Condition</strong>,
              'Road safety',
              'Vehicle or RSU detects fog, ice, snow, rain or high winds and warns surrounding traffic.',
              <><Link to="/denm">DENM</Link> (cause: adverse weather / adhesion / visibility)</>
            ],
            [
              <strong>Traffic Condition Warning</strong>,
              'Road safety / Traffic efficiency',
              'Warns of traffic jams in formation or stationary traffic ahead.',
              <><Link to="/denm">DENM</Link> (cause: traffic condition) + <Link to="/cam">CAM</Link></>
            ],
            [
              <strong>Human Presence on Road</strong>,
              'Road safety',
              'Vehicle detects pedestrian, cyclist or worker on the carriageway and warns others.',
              <><Link to="/denm">DENM</Link> (cause: human presence) + <Link to="/cam">CAM</Link></>
            ],
            [
              <strong>Intersection Collision Risk Warning (ICRW)</strong>,
              'Road safety',
              'Warns driver of imminent crossing or traffic-sign-violation collision risk at intersections.',
              <><Link to="/cam">CAM</Link> + <Link to="/denm">DENM</Link> + <Link to="/infrastructure">SPATEM/MAPEM/IVIM</Link></>
            ],
            [
              <strong>Longitudinal Collision Risk Warning (LCRW)</strong>,
              'Road safety',
              'Warns driver of imminent rear-end, frontal, or side-merge collision risk.',
              <><Link to="/cam">CAM</Link> + <Link to="/denm">DENM</Link></>
            ],
            [
              <strong>In-Vehicle Signage (IVS)</strong>,
              'Traffic efficiency',
              'Delivers variable message sign content from RSUs or traffic centres into the vehicle.',
              <><Link to="/infrastructure">IVIM</Link></>
            ],
            [
              <strong>Green Light Optimal Speed Advisory (GLOSA)</strong>,
              'Traffic efficiency',
              'Advises the driver of the optimal speed to pass the next traffic light in the green phase.',
              <><Link to="/infrastructure">SPATEM / MAPEM</Link></>
            ],
            [
              <strong>Probe Vehicle Data</strong>,
              'Traffic management',
              'Vehicles periodically broadcast kinematic and environmental data for use by traffic management centres.',
              <><Link to="/cam">CAM</Link></>
            ],
          ]}
        />

        <StatGrid cols={4}>
          <Stat value="300 m" label="Typical comms range" sub="ITS-G5, line-of-sight" />
          <Stat value="300 ms" label="Max end-to-end latency" sub="Class A safety apps" />
          <Stat value="100 ms" label="DENM repeat interval" sub="Priority level 0 or 1" />
          <Stat value="10 Hz" label="DENM update rate" sub="ICRW / LCRW alert phase" />
        </StatGrid>
      </Section>

      {/* ── 3. RHS / Road Hazard Signalling ──────────────────────────────────── */}
      <Section id="rhs" title="Road Hazard Signalling (RHS) — TS 101 539-1">
        <p>
          <Ref code="TS 101 539-1" kind="ETSI" /> specifies the <strong>Road Hazard Signalling (RHS)</strong>{' '}
          application — the umbrella for ten distinct use cases that share the same mechanism: a hazard is
          detected on the originating vehicle, a DENM is triggered via the DEN basic service, and the driver
          of a receiving vehicle is notified. RHS sits in the "driver awareness" tier of the safety hierarchy:
          it increases vigilance without necessarily demanding an immediate evasive action.
        </p>

        <Callout type="info" title="Ten RHS use cases (clause 6 of TS 101 539-1)">
          Emergency vehicle approaching &middot; Slow vehicle &middot; Stationary vehicle &middot;
          Emergency electronic brake lights &middot; Wrong way driving &middot; Adverse weather
          condition &middot; Hazardous location &middot; Traffic condition &middot; Roadwork &middot;
          Human presence on the road
        </Callout>

        <h3>Performance classes</h3>
        <p>
          TS 101 539-1 defines two ITS-S performance classes governing how fresh sensor data is when it
          reaches the DEN basic service interface (T0 = sensor detection, T1 = DENM generation):
        </p>
        <DefList items={[
          {
            term: 'Class A',
            def: 'Guarantees T0–T1 latency less than 150 ms. Mandatory for collision avoidance applications (LCRW, ICRW). Indicated in CAM/DENM so receivers can bound the total age of position data.'
          },
          {
            term: 'Class B',
            def: 'T0–T1 latency up to 1.4 s. Acceptable for driver awareness applications such as general RHS hazard notifications.'
          }
        ]} />

        <h3>Warning logic and priority levels</h3>
        <p>
          RHS assigns a priority level to every DENM based on the estimated Time To Collision (TTC) and the
          criticality of the detected situation. DENM repetition interval is bounded accordingly:
        </p>
        <Table
          caption="RHS DENM priority levels (Table 5.1.1 of TS 101 539-1)"
          headers={['Priority', 'Situation', 'DENM repeat interval']}
          rows={[
            ['0 — highest / pre-crash', 'TTC under approximately 1 s; collision imminent', '≤ 100 ms'],
            ['1 — warning / assist',    'TTC 1–5 s; driver action still effective',         '≤ 100 ms'],
            ['2 — awareness (default)', 'TTC 5–30 s; advance situational awareness',        '100 ms – 1 s'],
          ]}
        />

        <h3>Key DENM data elements shared by all RHS use cases</h3>
        <Table
          caption="Common DENM data elements provided by RHS to the DEN basic service"
          headers={['Data element', 'Content']}
          rows={[
            ['detectionTime', 'UTC time at which the hazard was detected'],
            ['expiryTime', 'Estimated time the hazard will remain relevant (optional for some causes)'],
            ['informationQuality', 'Quality level of the provided data (0 = unavailable, 7 = highest)'],
            ['eventPosition', 'Longitude / latitude / altitude of the hazard location'],
            ['eventHeadingDirection', 'Heading of the originating vehicle at detection time'],
            ['trace / pathHistory', 'Sequence of waypoints preceding the hazard (for path matching)'],
            ['relevanceDistance', 'Geographical reach of the DENM (e.g. lessThan50m … moreThan5km)'],
            ['relevanceTrafficDirection', 'Which traffic flow direction is at risk (upstreamTraffic, allTraffic, …)'],
            ['causeCode + subCauseCode', 'DENM cause taxonomy — links to ETSI TS 102 894-2 data dictionary'],
          ]}
        />

        <h3>Stationary vehicle — most detailed use case</h3>
        <p>
          The stationary vehicle sub-case (clause 6.3.3) carries the most detailed cause-code taxonomy.
          SubCauseCode covers human problems (glycaemia, heart attack), vehicle breakdowns (fuel, battery,
          engine, brakes, steering, tyre puncture, tyre pressure problem), post-crash with or without eCall,
          public transport stops, and dangerous-goods data (UN class, division, tunnel restriction code,
          emergency phone number) when hazardous materials are carried.
        </p>

        <Callout type="example" title="EEBL trigger and DENM fields">
          <strong>Trigger:</strong> emergency brake lights ON AND measured deceleration &ge; OEM-defined
          threshold, OR simply: emergency brake lights ON whenever threshold is exceeded.
          <br /><br />
          <strong>DENM cause code:</strong> Emergency Electronic Brake Lights (ETSI EN 302 637-3 table).
          <br />
          <strong>Additional data element:</strong> <code>eventSpeed</code> — speed of the braking vehicle
          at detection time; aids TTC calculation in the receiving vehicle.
          <br />
          <strong>Termination:</strong> brake lights go OFF or deceleration falls below threshold.
        </Callout>
      </Section>

      {/* ── 4. ICRW ──────────────────────────────────────────────────────────── */}
      <Section id="icrw" title="Intersection Collision Risk Warning (ICRW) — TS 101 539-2">
        <p>
          <Ref code="TS 101 539-2" kind="ETSI" /> specifies the <strong>Intersection Collision Risk Warning
          (ICRW)</strong> application. ICRW is the most message-rich Day-1 application: it consumes{' '}
          <Link to="/cam">CAM</Link>, <Link to="/denm">DENM</Link>, and three infrastructure messages from{' '}
          <Link to="/infrastructure">TS 103 301</Link>: SPATEM (Signal Phase And Timing Extended Message),
          MAPEM (detailed road topology), and IVIM (Infrastructure to Vehicle Information Message).
        </p>

        <h3>Use case families</h3>
        <CardGrid cols={2}>
          <Card title="Crossing collision warning" icon="↔" accent="amber">
            <strong>Turning collision:</strong> left-turning vehicle may cross the path of a straight-on
            vehicle. Vehicles exchange CAMs; when TTC falls below the safety-shield threshold, ICRW enters
            the WATCH state and may issue a DENM if collision risk is confirmed.
            <br /><br />
            <strong>Merging collision:</strong> right-turning vehicle merges with straight-on vehicle. Both
            detect risk via CAMs; roadside RSU may independently detect and DENM both.
            <br /><br />
            <strong>Non-line-of-sight (radio obstacle):</strong> RSU with radar or camera at the intersection
            detects collision risk between vehicles that cannot see each other due to buildings or vegetation.
          </Card>
          <Card title="Traffic sign violation warning" icon="🚫" accent="rose">
            <strong>Stop sign violation:</strong> ICRW computes required stopping distance and compares
            with remaining distance to stop line; warns if braking is needed but not occurring.
            <br /><br />
            <strong>Priority sign violation:</strong> vehicle from minor road not yielding to major-road
            traffic; warning based on IVIM + CAMs from approaching vehicles.
            <br /><br />
            <strong>Traffic light violation:</strong> vehicle approaching red-phase intersection; SPATEM/MAPEM
            provides phase timing; ICRW calculates whether stopping is still possible.
            <br /><br />
            <strong>Turning regulation violation:</strong> vehicle about to make an illegal turn; detected
            via path prediction (steering wheel angle, yaw rate) vs IVIM-provided access rights.
          </Card>
        </CardGrid>

        <h3>Safety shield and warning logic</h3>
        <Figure caption="ICRW safety shield timing equation (Annex C of TS 101 539-2)">
          <div className="bg-ink-900 rounded p-4 font-mono text-brand-300 text-center text-lg">
            TTC<sub>min</sub> {'>'} MLT + MDRT + MAT + &epsilon;
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-slate-300">
            <div><strong>MLT</strong> — Maximum Latency Time: time for ICRW to process messages and render HMI to driver</div>
            <div><strong>MDRT</strong> — Maximum Driver Reaction Time: time for driver to perceive and act on warning</div>
            <div><strong>MAT</strong> — Maximum Action Time: braking time to stop (OEM-defined, depends on deceleration)</div>
            <div><strong>&epsilon;</strong> — margin for positioning inaccuracy and estimation error</div>
          </div>
        </Figure>
        <p>
          The application state machine transitions: ITS-S active &rarr; ICRW IDLE (monitoring, processing
          CAMs) &rarr; ICRW WATCH (safety-critical situation detected, priority 1 DENM) &rarr; ICRW ASSIST
          (collision risk confirmed, warning issued; priority may escalate to 0 for pre-crash phase).
        </p>

        <h3>ICRW compliance levels</h3>
        <DefList items={[
          { term: 'Level 1 — minimum receive', def: 'Processes received ICRW DENMs and warns the driver. Minimum capability.' },
          { term: 'Level 2 — full receive', def: 'Level 1 plus own collision risk assessment using CAM, DENM, SPATEM, MAPEM, IVIM.' },
          { term: 'Level 3 — originate', def: 'Level 2 plus ability to detect collision risk independently and transmit a DENM (causeCode=97 crossing, causeCode=98 violation).' },
        ]} />

        <h3>Key operational requirements (clause 7 of TS 101 539-2)</h3>
        <Table
          caption="ICRW minimum performance requirements"
          headers={['Requirement', 'Value']}
          rows={[
            ['Event position accuracy', '≥ 95 % confidence; target ≤ 2 m; must at minimum identify correct lane'],
            ['Communication range', '300 m line-of-sight, relaxed channel; ≥ 18 dBm transmit power (ITS-G5A)'],
            ['End-to-end latency', 'Class A system; T4–T6 latency ≤ 80 ms in critical alert situations'],
            ['DENM update rate (alert phase)', '10 Hz while collision or violation risk persists; validityDuration 30 s (crossing) or 5 s (violation)'],
            ['Infrastructure message rate', '≥ 1 Hz for SPATEM/MAPEM/IVIM; T2–T0 latency ≤ 800 ms'],
            ['Message processing capacity', '≥ 1 000 CAM + DENM per second'],
          ]}
        />
      </Section>

      {/* ── 5. LCRW ──────────────────────────────────────────────────────────── */}
      <Section id="lcrw" title="Longitudinal Collision Risk Warning (LCRW) — TS 101 539-3">
        <p>
          <Ref code="TS 101 539-3" kind="ETSI" /> specifies the <strong>Longitudinal Collision Risk Warning
          (LCRW)</strong> application, which addresses collisions along the vehicle's axis of travel: rear-end,
          frontal, and side-merge (overtaking). LCRW requires <strong>Class A</strong> performance (T0–T1
          latency below 150 ms) and demands 1 m position accuracy at 95 % confidence for correct lane
          assignment. Unlike ICRW, LCRW uses only <Link to="/cam">CAM</Link> and{' '}
          <Link to="/denm">DENM</Link> — no infrastructure messages are needed.
        </p>

        <h3>Use case scenarios (Table 1 of TS 101 539-3)</h3>
        <Table
          caption="LCRW longitudinal collision use cases"
          headers={['Use case', 'Scenario description']}
          rows={[
            ['Safety relevant lane change', 'First vehicle signals lane change while second vehicle approaches at high speed on the target lane (overtaking scenario). Both vehicles are warned.'],
            ['Emergency brake / traffic jam', 'Subject Vehicle (SV) heading toward Target Vehicle (TV) that is abruptly decelerating or stationary in a traffic jam. TV\'s CAM high-frequency container carries vehicle dynamics data.'],
            ['Roadworks', 'SV approaching roadworks zone at excessive speed; a DENM from the roadworks RSU triggers LCRW in the SV.'],
            ['Stationary vehicle', 'SV heading toward immobilised TV (breakdown, accident). TV\'s stationary-vehicle DENM is consumed by SV\'s LCRW.'],
            ['Stability problem', 'TV entering slippery surface loses traction; stability control status in TV\'s CAM triggers LCRW in SV.'],
            ['Wrong way driving', 'SV and TV approaching head-on on a one-directional road. Both receive priority 0 collision warnings.'],
            ['Safety relevant overtaking warning', 'SV about to overtake detects oncoming vehicle on opposing carriageway via CAM.'],
            ['Third-party warning via RSU', 'RSU or other vehicle detects collision risk between two vehicles (e.g. beyond a curve) and emits DENM on their behalf.'],
          ]}
        />

        <h3>Minimum driver warning time equation</h3>
        <Figure caption="LCRW minimum driver warning time (Annex C of TS 101 539-3)">
          <div className="bg-ink-900 rounded p-4 font-mono text-brand-300 text-center text-lg">
            DWT<sub>min</sub> = MLT + MDRT + MAT + Margin
          </div>
          <p className="text-slate-300 text-sm mt-3">
            MLT (end-to-end communication latency, 300 ms target) + MDRT (driver perception/reaction time) +
            MAT (OEM-defined deceleration time to stop) + Margin (positioning and estimation error compensation).
            A DENM from a third-party RSU resets T<sub>ev</sub> to the time the RSU detected the risk,
            not when the originating vehicle generated data — the RSU becomes the reference clock for
            the warning.
          </p>
        </Figure>

        <h3>Third-party DENM cause codes</h3>
        <p>
          When a roadside or central ITS-S transmits a collision risk DENM on behalf of two vehicles, it uses
          CauseCode = "Collision Risk" with SubCauseCode identifying the collision geometry:
        </p>
        <Table
          caption="LCRW SubCauseCode values (Table 4 of TS 101 539-3)"
          headers={['Value', 'SubCause']}
          rows={[
            ['0', 'Unavailable'],
            ['1', 'Longitudinal collision risk (same direction, same lane)'],
            ['2', 'Crossing collision risk (intersecting paths)'],
            ['3', 'Lateral collision risk (adjacent lanes)'],
            ['4', 'Collision risk involving a vulnerable road user'],
            ['5', 'Frontal collision risk (opposing directions)'],
          ]}
        />

        <Callout type="tip" title="Pseudonym management interaction">
          When LCRW enters WATCH or ASSIST state (priority 1 or higher), the application may request the
          security entity to <strong>block pseudonym changes</strong>. This prevents the tracked vehicle's
          CAMs from suddenly appearing to come from a new, unrecognised station mid-warning — which would
          break the target vehicle track and create a false-safe condition. See{' '}
          <Link to="/pki">PKI &amp; Security</Link> for the pseudonym lifecycle.
        </Callout>
      </Section>

      {/* ── 6. TS 101 556 series ─────────────────────────────────────────────── */}
      <Section id="ts101556" title="TS 101 556 Series — Infrastructure-to-Vehicle Mobility Services">
        <p>
          The TS 101 556 trilogy defines three <Link to="/infrastructure">infrastructure-to-vehicle (I2V)</Link>{' '}
          application specifications that extend C-ITS beyond road safety into mobility and energy services.
          All three share the C-ITS station architecture (Central ITS Station + Roadside ITS Station + Vehicle
          ITS Station) and can operate over ITS-G5 or cellular.
        </p>

        <CardGrid cols={3}>
          <Card title="TS 101 556-1: EV Charging Spot Notification" icon="⚡" accent="emerald">
            Broadcasts real-time availability and characteristics of EV charging spots in the vicinity.
            An RSU associated with a charging station (or a Central Exploitation Station, CES) broadcasts
            the EVCSN (Electric Vehicle Charging Spot Notification) POI message. EV vehicle ITS-Ss filter
            by battery type, provider, payment method, charging mode and receptacle type.
          </Card>
          <Card title="TS 101 556-2: Tyre Information System / Tyre Pressure Gauge" icon="🔧" accent="amber">
            Enables a vehicle's Tyre Pressure Monitoring System (TPMS) to locate a nearby Tyre Pressure
            Gauge (TPG), reserve a service slot, pair with the TPG on arrival, and exchange vehicle tyre
            placard data for fully or semi-automated pressure adjustment. Aligns with CEN EN 16661.
          </Card>
          <Card title="TS 101 556-3: EV Energy Supply Reservation" icon="🔌" accent="violet">
            Wireless reservation protocol for EV charging spots, complementing the notification service.
            Covers pre-reservation, reservation, cancellation and update transactions. Integrates with
            ISO/IEC 15118-2 (V2G interface) and IEC 61851-3 (Mode 3 recharging); supports RFID/NFC
            pairing for non-V2G vehicles.
          </Card>
        </CardGrid>

        <h3>EVCSN message structure (TS 101 556-1)</h3>
        <p>
          The EVCSN PDU is encoded in ASN.1 PER and carries up to 4 charging stations per message, each with
          up to 16 charging spots. Latency requirement: 1–10 seconds (non-safety, best-effort service).
          G5 profile: Topological Scoped Broadcast on ITS-G5B (SCH3 or SCH4).
        </p>
        <Table
          caption="EVCSN message key fields (Annex B of TS 101 556-1)"
          headers={['Field', 'Type', 'Description']}
          rows={[
            ['poiType', 'INTEGER', 'Set to 1 for "EV Charging Station"'],
            ['timeStamp', 'GenerationDeltaTime', 'Generation time of the notification message'],
            ['relayCapable', 'BOOLEAN', 'Whether this station can relay reservation messages (links to TS 101 556-3)'],
            ['chargingStationLocation', 'ReferencePosition', 'Latitude / longitude / altitude of the charging station'],
            ['accessibility', 'STRING', 'Open to all, or restricted community; free or paying'],
            ['openingDaysHours', 'STRING', 'When the station is open for service'],
            ['pricing', 'STRING', 'Current energy rates per charging type'],
            ['chargingSpotsAvailable', 'SEQUENCE', 'Per-spot: type (Mode 1–4, inductive, quick-drop), receptacle (IEC 62196-2), energy availability, parking availability'],
            ['bookingContactInfo', 'STRING (optional)', 'URL or IPv6 address for online reservation (link to TS 101 556-3 protocol)'],
          ]}
        />
        <p>
          <strong>Charging spot types</strong> are encoded as a BIT STRING: bit 0 = Mode 1 standard (AC
          single-phase 16 A), bit 2 = Mode 3 standard/fast (3.7–43 kW), bit 3 = Mode 4 DC fast
          charging ({'>'}43 kW), bit 8 = quick-drop (battery swap), bit 12 = inductive stationary, bit 14
          = inductive while driving.
        </p>

        <h3>Tyre pressure service flow (TS 101 556-2)</h3>
        <Steps>
          <div>
            <strong>Discovery:</strong> TPMS detects low pressure or driver requests service. Vehicle
            broadcasts a Discovery Request Message (DRM) over ITS-G5 (causeCode=vehicleBreakdown(91),
            subCauseCode=tyrePuncture(8) or tyrePressureProblem(9)). Nearby RSU or TPG operator replies
            with a Service Notification Message (SNM) listing available TPG stations.
          </div>
          <div>
            <strong>Reservation (optional):</strong> Driver selects a TPG. Vehicle sends a TPG Reservation
            Message (TRM) to the TPG operator; operator confirms with a TPG reservation Confirmation Message
            (TCM) containing a reservation code and slot time.
          </div>
          <div>
            <strong>Pairing:</strong> On arrival at the TPG, vehicle pairs with the specific pump using
            the confirmation code (or vehicle registration / MAC). Point-to-point unicast communication
            is established over ITS-G5 or short-range radio.
          </div>
          <div>
            <strong>Refilling:</strong> TPG sends Vehicle Data Request Message (VDRM) specifying its
            automation level (fully automated / semi-automated / manual). Vehicle responds with Vehicle Data
            Provisioning Message (VDPM) containing the tyre placard table, vehicle type code, current tyre
            pressures per axle. TPG calculates and applies recommended pressures per tyre, then sends End
            Of Filling Message (EOFM).
          </div>
        </Steps>

        <h3>EV Energy Supply Reservation security (TS 101 556-3)</h3>
        <p>
          TS 101 556-3 uses a client-server request/response model over IPv6/IPv4. All communications are
          protected: TLS v1.2 (RFC 5246) for TCP transport, DTLS v1.2 (RFC 6347) for UDP transport.
          The Pre-Reservation procedure allows a vehicle to reserve a charging spot before departure from
          home. The Reservation procedure finalises on arrival, conveying a Pairing ID for non-V2G EVs
          (RFID, NFC chip).
        </p>
      </Section>

      {/* ── 7. ITS-AID ───────────────────────────────────────────────────────── */}
      <Section id="its-aid" title="ITS Application Object Identifiers (ITS-AID) — TR 102 965">
        <p>
          Every C-ITS application needs a globally unique identifier so that:
          (a) a receiving ITS-S knows which application produced a message,
          (b) the <Link to="/pki">PKI / security</Link> system can grant correct permissions in authorisation
          tickets, and (c) service discovery messages (SAM — Service Announcement Message) can advertise
          which services are active on a given channel.
        </p>
        <p>
          <Ref code="TR 102 965" kind="ETSI" /> defines the <strong>ITS-AID (ITS Application Object
          Identifier)</strong> registration list, maintained as a coordinated online registry across ETSI,
          CEN, IEEE, ISO and SAE at <code>http://aid.its-standards.info/</code>.
        </p>

        <Callout type="key" title="ITS-AID encoding (ASN.1 Unaligned PER)">
          ITS-AID values are variable-length integers. The leading bits of the first octet determine total
          length:
          <ul className="mt-2 space-y-1">
            <li><strong>1 octet:</strong> values 0–127 (leading bit 0)</li>
            <li><strong>2 octets:</strong> 128–16 511 (leading bits 10)</li>
            <li><strong>3 octets:</strong> 16 512–2 113 663 (leading bits 110)</li>
            <li><strong>4 octets:</strong> 2 113 664–270 549 119 (leading bits 1110)</li>
          </ul>
        </Callout>

        <h3>Selected well-known ITS-AID values</h3>
        <Table
          caption="ITS-AID registry snapshot (Annex B of TR 102 965)"
          headers={['ITS-AID', 'Application name', 'Owner / SDO']}
          rows={[
            ['0', 'System (DSRC layer management)', 'CEN / ISO'],
            ['1', 'Electronic Fee Collection (EFC)', 'CEN / ISO'],
            ['2', 'Freight and fleet management', 'CEN / ISO'],
            ['3', 'Public transport', 'CEN / ISO'],
            ['5', 'Traffic control', 'CEN / ISO'],
            ['6', 'Parking management', 'CEN / ISO'],
            ['12', 'Emergency warning', 'CEN / ISO'],
            ['32', 'Vehicle-to-vehicle safety and awareness', 'SAE'],
            ['33', 'Limited sensor V2V safety', 'SAE'],
            ['34', 'Tracked vehicle safety', 'SAE'],
            ['35', 'WAVE Security Management', 'IEEE'],
            ['36', 'CAM (Cooperative Awareness Message)', 'ETSI'],
            ['37', 'DENM (Decentralised Environmental Notification Message)', 'ETSI'],
            ['127', 'Testing purposes', '—'],
            ['128', 'Differential GPS corrections, uncompressed', 'SAE'],
            ['130', 'Intersection safety and awareness', 'SAE'],
            ['132', 'Mobile probe exchanges', 'SAE'],
            ['133', 'Emergency and erratic vehicles present in roadway', 'SAE'],
            ['16 000–16 415', 'Reserved for IEEE 1609', 'IEEE'],
            ['16 416–16 479', 'Private use range', 'private'],
            ['16 480–16 511', 'Testing range', '—'],
          ]}
        />

        <p>
          The ITS-AID appears in the <code>ITS PDU Header</code> of every C-ITS message so that receivers
          can identify the protocol and route it to the correct application. In the PKI context, the ITS-AID
          is included in an <em>Authorization Ticket</em> as an <em>ITS Application Permission</em> — a vehicle
          is only permitted to sign and transmit messages of the application types listed in its active ticket.
          See <Link to="/pki">PKI &amp; Certificates</Link> for how this links to the security permission system.
        </p>

        <h3>Registration procedure</h3>
        <p>
          Organisations request a new ITS-AID from the registry authority by submitting a standardised template
          specifying: preferred octet size, human-readable application name, application object type
          (0 = class, 1 = application, 2 = message set), owner type (0 = standard body, 1 = private), owner OID,
          and maximum allowed priority (0–255). The assigned value is preliminary until a proof of certification
          from an ITS security authority is provided. Each registration record also carries a
          <code>ITSapObCertificate</code> status: active, inactive, testActive, or blocked.
        </p>
      </Section>

      {/* ── 8. Message mapping ───────────────────────────────────────────────── */}
      <Section id="message-mapping" title="Application ↔ Message Mapping">
        <p>
          Applications do not design their own on-air formats — they consume and produce the standardised
          messages defined in the facilities layer. The table below maps Day-1 and key Release 2 applications
          to the messages they depend on.
        </p>
        <Table
          caption="Application to facilities-layer message mapping"
          headers={['Application', 'CAM', 'DENM', 'SPATEM / MAPEM', 'IVIM', 'CPM', 'VAM', 'Custom PDU']}
          rows={[
            [
              'Emergency Electronic Brake Light (EEBL)',
              <Badge tone="emerald">Send</Badge>,
              <Badge tone="emerald">Send</Badge>,
              '—', '—', '—', '—', '—'
            ],
            [
              'Hazardous Location / Road Hazard Signalling',
              <Badge tone="emerald">Send</Badge>,
              <Badge tone="emerald">Send</Badge>,
              '—', '—', '—', '—', '—'
            ],
            [
              'Roadworks Warning',
              <Badge tone="brand">Recv</Badge>,
              <Badge tone="emerald">Send</Badge>,
              '—',
              <Badge tone="emerald">Send</Badge>,
              '—', '—', '—'
            ],
            [
              <>In-Vehicle Signage (<Link to="/infrastructure">TS 103 301</Link>)</>,
              '—', '—', '—',
              <Badge tone="brand">Recv</Badge>,
              '—', '—', '—'
            ],
            [
              <>ICRW (<Link to="/infrastructure">TS 103 301</Link>)</>,
              <Badge tone="amber">Both</Badge>,
              <Badge tone="amber">Both</Badge>,
              <Badge tone="brand">Recv</Badge>,
              <Badge tone="brand">Recv</Badge>,
              '—', '—', '—'
            ],
            [
              'LCRW',
              <Badge tone="amber">Both</Badge>,
              <Badge tone="amber">Both</Badge>,
              '—', '—', '—', '—', '—'
            ],
            [
              <>GLOSA (<Link to="/infrastructure">TS 103 301</Link>)</>,
              '—', '—',
              <Badge tone="brand">Recv</Badge>,
              '—', '—', '—', '—'
            ],
            [
              'Probe Vehicle Data',
              <Badge tone="emerald">Send</Badge>,
              '—', '—', '—', '—', '—', '—'
            ],
            [
              <>VRU Protection (<Link to="/vam">VAM</Link>)</>,
              <Badge tone="brand">Recv</Badge>,
              <Badge tone="amber">Both</Badge>,
              '—', '—', '—',
              <Badge tone="amber">Both</Badge>,
              '—'
            ],
            [
              <>Collective Perception (<Link to="/cpm">CPM</Link>)</>,
              <Badge tone="brand">Recv</Badge>,
              <Badge tone="brand">Recv</Badge>,
              '—', '—',
              <Badge tone="amber">Both</Badge>,
              '—', '—'
            ],
            [
              'C-ACC / Truck Platooning',
              <Badge tone="amber">Both</Badge>,
              '—', '—', '—', '—', '—',
              <Badge tone="emerald">MCM</Badge>
            ],
            [
              'EV Charging Spot Notification',
              '—', '—', '—', '—', '—', '—',
              <Badge tone="emerald">EVCSN PDU</Badge>
            ],
            [
              'Tyre Pressure Gauge (TIS/TPG)',
              '—', '—', '—', '—', '—', '—',
              <Badge tone="emerald">DRM / SNM / TRM / VDPM / EOFM</Badge>
            ],
            [
              'EV Energy Supply Reservation',
              '—', '—', '—', '—', '—', '—',
              <Badge tone="emerald">IP/TLS reservation messages</Badge>
            ],
          ]}
        />
        <p className="text-sm text-slate-400 mt-2">
          "Both" means the application both sends and receives that message type.
          SPATEM/MAPEM/IVIM are <Link to="/infrastructure">infrastructure messages</Link> defined in TS 103 301.
          MCM is defined in <Link to="/mcm">TS 103 745</Link>.
        </p>
      </Section>

      {/* ── 9. Release 2 ─────────────────────────────────────────────────────── */}
      <Section id="release2" title="Release 2 — Expanded Use Cases">
        <p>
          ETSI TR 102 638 V2.1.1 (April 2024) is the Release 2 BSA. It retains all Day-1 services and
          substantially expands the catalogue. The driving motivation is the transition from human-driven
          cooperative vehicles to <strong>Connected, Cooperative and Automated Mobility (CCAM)</strong>:
          vehicles increasingly make driving decisions autonomously, so the C-ITS application layer must
          go beyond informing human drivers and start coordinating manoeuvres between automated systems.
        </p>
        <p>
          Release 2 also brings new access technologies into scope. ETSI TR 103 970 V2.1.1 (May 2026) is
          a feasibility study on <strong>Ultra Wide Band (UWB)</strong> technology — a short-range radio
          operating in the 6–8.5 GHz band (per ECC Decision (06)04, amended 2022) with centimetre-level
          ranging accuracy — and its applicability to specific ITS use cases.
        </p>

        <CardGrid cols={2}>
          <Card title="UWB ITS Use Cases (TR 103 970)" icon="📡" accent="violet">
            <strong>VRU detection and clustering:</strong> UWB-equipped pedestrians and cyclists can be
            localised to sub-metre accuracy, enabling VAM clustering and collision avoidance where GNSS
            is unavailable (tunnels, urban canyons).
            <br /><br />
            <strong>Secure payment and tolling:</strong> ranging-based authentication prevents relay
            attacks in EFC and parking payment scenarios.
            <br /><br />
            <strong>Precise cooperative positioning:</strong> centimetre-accuracy relative positioning
            for automated lane merging, platooning and automated valet parking.
            <br /><br />
            <strong>In-cabin occupant detection:</strong> already deployed in production vehicles using
            IEEE 802.15.4a/4z UWB chipsets; distinguishes adults from children for airbag and alarm logic.
          </Card>
          <Card title="Release 2 New Applications" icon="🤖" accent="brand">
            <strong>C-ACC / C-AEBS:</strong> cooperative adaptive cruise control and cooperative emergency
            braking that use <Link to="/mcm">MCM</Link> to negotiate intent between automated systems.
            <br /><br />
            <strong>Truck platooning:</strong> close-following convoy with automated longitudinal control;
            requires MCM and high-rate CAM from all vehicles.
            <br /><br />
            <strong>Automated GLOSA:</strong> speed advice is acted upon automatically by the vehicle's
            powertrain rather than displayed to the driver.
            <br /><br />
            <strong>VRU safety beacon:</strong> personal ITS-S on bicycle or pedestrian broadcasts VAM;
            vehicles detect and avoid using <Link to="/cpm">CPM</Link> data fusion.
          </Card>
        </CardGrid>

        <h3>UWB integration with existing ITS messages</h3>
        <p>
          TR 103 970 finds that UWB ranging results can be carried inside existing message containers
          without new PDU types. For CAM, UWB data fits in the LowFrequencyContainer or
          HighFrequencyContainer as position supplements. For VAM, UWB cluster information maps to existing
          container fields. UWB would sit as an additional access layer below GeoNetworking in the ITS stack,
          alongside ITS-G5 and LTE-V2X, leaving the application layer unchanged.
        </p>

        <Callout type="tip" title="Release 1 vs Release 2 practical difference for engineers">
          Release 1 (Day-1 services) is the current deployment baseline — it operates with CAM, DENM, and
          SPATEM/MAPEM/IVIM and is the content of OBU and RSU firmware in active{' '}
          <Link to="/c-roads">C-Roads</Link> deployments. Release 2 adds CPM, VAM, MCM and heavier
          automation logic requiring enhanced sensor suites and software-defined vehicle platforms. Many
          Release 2 applications will be delivered via OTA software updates as fleets modernise.
        </Callout>
      </Section>

      {/* ── 10. Architecture view ────────────────────────────────────────────── */}
      <Section id="system-view" title="Applications in the C-ITS Architecture">
        <p>
          Applications sit at the top of the ITS-S reference architecture, above the facilities layer. They
          do not manage radio channels directly — they issue service primitives to the CA basic service or
          DEN basic service, which call on networking, access, security and management. The stack below shows
          where each application category lives.
        </p>
        <LayerStack
          leftRail="Security"
          rightRail="Management"
          layers={[
            { name: 'Applications', sub: 'RHS · ICRW · LCRW · GLOSA · EV · TIS · VRU · C-ACC · Platooning · IVS …', accent: 'brand' },
            { name: 'Facilities — CA + DEN + CPM + VAM basic services', sub: 'CAM · DENM · CPM · VAM · SPATEM · MAPEM · IVIM · MCM', accent: 'violet' },
            { name: 'Networking &amp; Transport — GeoNetworking / BTP', sub: 'Geo-broadcast · Topological broadcast · Unicast', accent: 'cyan' },
            { name: 'Access Layer', sub: 'ITS-G5 (IEEE 802.11p) · LTE-V2X (PC5) · C-V2X · UWB (Release 2 study)', accent: 'amber' },
          ]}
        />
        <p className="mt-4">
          Explore related pages:{' '}
          <Link to="/cam" className="text-brand-300 hover:underline">CAM</Link>{' · '}
          <Link to="/denm" className="text-brand-300 hover:underline">DENM</Link>{' · '}
          <Link to="/cpm" className="text-brand-300 hover:underline">CPM</Link>{' · '}
          <Link to="/vam" className="text-brand-300 hover:underline">VAM</Link>{' · '}
          <Link to="/infrastructure" className="text-brand-300 hover:underline">Infrastructure messages</Link>{' · '}
          <Link to="/pki" className="text-brand-300 hover:underline">PKI &amp; Security</Link>{' · '}
          <Link to="/c-roads" className="text-brand-300 hover:underline">C-Roads deployment</Link>{' · '}
          <Link to="/mcm" className="text-brand-300 hover:underline">MCM</Link>
        </p>
      </Section>

      {/* ── 11. Key standards ────────────────────────────────────────────────── */}
      <Section id="standards" title="Key Standards">
        <DefList items={[
          {
            term: <Ref code="ETSI TR 102 638" kind="ETSI" />,
            def: 'Basic Set of Applications — Definitions. V2.1.1 (April 2024) is the Release 2 document covering CCAM, UWB integration, and 13 expanded service areas.'
          },
          {
            term: <Ref code="ETSI TS 101 539-1" kind="ETSI" />,
            def: 'Road Hazard Signalling (RHS) application requirements. Defines 10 use cases, 2 performance classes (A/B), DENM data elements, priority levels, and termination conditions. V1.1.1 (2013-08).'
          },
          {
            term: <Ref code="ETSI TS 101 539-2" kind="ETSI" />,
            def: 'Intersection Collision Risk Warning (ICRW) application requirements. Crossing collision and traffic-sign-violation scenarios; safety shield TTC equation; uses CAM + DENM + SPATEM/MAPEM/IVIM. V1.1.1 (2018-06).'
          },
          {
            term: <Ref code="ETSI TS 101 539-3" kind="ETSI" />,
            def: 'Longitudinal Collision Risk Warning (LCRW) application requirements. Rear-end, frontal, side-merge, overtaking; Class A mandatory; 1 m position accuracy requirement; CAM + DENM only. V1.1.1 (2013-11).'
          },
          {
            term: <Ref code="ETSI TS 101 556-1" kind="ETSI" />,
            def: 'EV Charging Spot Notification. EVCSN PDU structure (up to 4 stations, 16 spots each), charging modes 1–4, IEC 62196-2 receptacle codes, G5 and 3GPP communication profiles. V1.1.1 (2012-07).'
          },
          {
            term: <Ref code="ETSI TS 101 556-2" kind="ETSI" />,
            def: 'Tyre Information System (TIS) and Tyre Pressure Gauge (TPG) interoperability. Discovery (DRM/SNM), reservation (TRM/TCM), pairing, and refilling (VDRM/VDPM/EOFM) protocols; CEN EN 16661 alignment. V1.1.1 (2016-02).'
          },
          {
            term: <Ref code="ETSI TS 101 556-3" kind="ETSI" />,
            def: 'EV Energy Supply Reservation using wireless networks. Pre-reservation, reservation, cancellation, update over IP/TLS v1.2 / DTLS v1.2; ISO/IEC 15118-2 V2G interface integration. V1.1.1 (2014-10).'
          },
          {
            term: <Ref code="ETSI TR 102 965" kind="ETSI" />,
            def: 'ITS Application Object Identifier (ITS-AID) Registration List. Variable-length integers (1–4 octets, ASN.1 PER); used in PDU headers and PKI authorization tickets for service permission control. V1.1.1 (2013-03).'
          },
          {
            term: <Ref code="ETSI TR 103 970" kind="ETSI" />,
            def: 'Feasibility study on UWB (Ultra Wide Band) for ITS. 6–8.5 GHz band; VRU detection, precise cooperative positioning, secure payment use cases; UWB as additional access layer. V2.1.1 (2026-05).'
          },
          {
            term: <Ref code="ETSI TS 103 301" kind="ETSI" />,
            def: 'Infrastructure services — SPATEM, MAPEM, IVIM. Required by ICRW, GLOSA, IVS, and Roadworks Warning applications. See Infrastructure messages page.'
          },
        ]} />
      </Section>
    </article>
  )
}
