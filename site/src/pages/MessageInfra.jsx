import React from 'react'
import { Link } from 'react-router-dom'
import { PageHeader, Section, Prose, Callout, Ref, Table, StatGrid, Stat, CardGrid, Card, Steps, Figure, LayerStack, DefList, Badge } from '../components/ui.jsx'

export default function MessageInfra() {
  return (
    <article>
      <PageHeader
        kicker="Infrastructure Messages"
        title="SPATEM, MAPEM, IVIM, SREM &amp; SSEM"
        intro="Road-side ITS stations broadcast a family of five specialised messages that bridge the physical traffic infrastructure — signal controllers, road signs, and priority systems — into the C-ITS protocol world. Together they enable real-time signal-phase awareness, intersection topology, in-vehicle signage, and priority/preemption negotiation, all defined in ETSI TS 103 301 as ETSI profiles of the SAE J2735 message set."
        sources={['ETSI TS 103 301', 'CEN ISO/TS 19091', 'CEN ISO/TS 19321', 'SAE J2735', 'ETSI EN 302 890-1']}
      />

      {/* ── Overview ── */}
      <Section id="overview" title="Infrastructure Services at a Glance">
        <p>
          ETSI TS 103 301 (Release 2, current version V2.3.1 from April 2026) defines the <strong>Infrastructure Services</strong> — a set of Facilities-layer entities that manage the generation, transmission, and reception of messages flowing between fixed roadside infrastructure and mobile traffic participants (vehicles, pedestrians, cyclists). Each service wraps a payload produced by a roadside application into a standard <em>ItsPduHeader</em> and hands it to the ITS Networking &amp; Transport Layer (NTL) for dissemination.
        </p>
        <p>
          The five core message types and their Facilities-layer service names are:
        </p>
        <Table
          caption="Infrastructure message families defined in ETSI TS 103 301"
          headers={['Message', 'Abbreviation', 'Service name', 'Direction', 'Primary purpose', 'Pairs with']}
          rows={[
            [<><Badge tone="emerald">SPATEM</Badge></>, 'Signal Phase And Timing Extended Message', 'Traffic Light Manoeuvre (TLM)', 'RSU → Vehicle', 'Real-time signal phases and time-to-change per signal group', 'MAPEM'],
            [<><Badge tone="brand">MAPEM</Badge></>, 'MAP Extended Message', 'Road and Lane Topology (RLT)', 'RSU → Vehicle', 'Intersection/road topology: lanes, connections, allowed manoeuvres', 'SPATEM'],
            [<><Badge tone="amber">IVIM</Badge></>, 'In-Vehicle Information Message', 'Infrastructure to Vehicle Information (IVI)', 'RSU → Vehicle', 'Virtual road signs, speed limits, roadworks, contextual info', '—'],
            [<><Badge tone="violet">SREM</Badge></>, 'Signal Request Extended Message', 'Traffic Light Control (TLC)', 'Vehicle → RSU/TCC', 'Priority/preemption request (bus, ambulance, fire brigade)', 'SSEM'],
            [<><Badge tone="rose">SSEM</Badge></>, 'Signal request Status Extended Message', 'Traffic Light Control (TLC)', 'RSU/TCC → Vehicle', 'Acknowledgement: request granted, queued, or denied', 'SREM'],
          ]}
        />
        <Callout type="key" title="ETSI profiles of SAE J2735">
          SPATEM and MAPEM are ETSI adaptations of the North-American SAE J2735 SPaT (Signal Phase and Timing) and MAP (Map Data) message sets, as profiled in <strong>CEN ISO/TS 19091</strong> for V2I/I2V applications at signalised intersections. SREM and SSEM similarly profile the J2735 Signal Request Message and Signal Status Message. ETSI adds the <em>ItsPduHeader</em>, GeoNetworking dissemination parameters, and European SSP/security conventions. See <Link to="/global">Global Standards</Link> for the broader J2735 context.
        </Callout>
        <StatGrid cols={4}>
          <Stat value="BTP-B 2004" label="SPATEM port" sub="Safety channel (SFCH)" />
          <Stat value="BTP-B 2003" label="MAPEM port" sub="Safety channel (SFCH)" />
          <Stat value="BTP-B 2006" label="IVIM port" sub="Safety channel (SFCH)" />
          <Stat value="2007 / 2008" label="SREM / SSEM ports" sub="Safety channel (SFCH)" />
        </StatGrid>
      </Section>

      {/* ── Protocol stack position ── */}
      <Section id="stack" title="Where Infrastructure Messages Sit in the ITS Stack">
        <p>
          All five messages are <strong>Facilities-layer PDUs</strong>. The application (running on the roadside ITS-S or, for SREM, on the vehicle) supplies the payload; the Infrastructure Service merges it with the <em>ItsPduHeader</em> and forwards to the NTL. GeoNetworking carries the packet over ITS-G5 (ETSI EN 302 636) or LTE-V2X using <strong>BTP-B</strong> (Basic Transport Protocol type B — connectionless, with destination port).
        </p>
        <LayerStack
          layers={[
            { name: 'Application layer', sub: 'Traffic light controller / TCC / road-works management', accent: 'brand' },
            { name: 'Facilities layer', sub: 'Infrastructure Services: TLM · RLT · IVI · TLC (TS 103 301)', accent: 'emerald' },
            { name: 'Networking & Transport', sub: 'GeoNetworking (SHB/GBC/TSB) + BTP-B ports 2003–2008', accent: 'amber' },
            { name: 'Access layer', sub: 'ITS-G5 (802.11p) · C-V2X (LTE PC5 / NR PC5)', accent: 'violet' },
          ]}
          leftRail="Security (TS 103 097)"
          rightRail="Management (IS_Control)"
        />
        <p>
          The default communication distance is <strong>400 m radius</strong> for all five services, with maximum latency of <strong>100 ms</strong> for direct communication (CSP_MaxLat = ms100). Messages are signed with Authorization Tickets valid for <strong>2 months</strong> by default; offline traffic light controllers may negotiate up to half a year with their operator.
        </p>
        <Callout type="tip" title="SAEM service announcement">
          Roadside ITS-Ss may advertise available infrastructure services using the <strong>Services Announcement Essential Message (SAEM)</strong> defined in <Ref code="EN 302 890-1" title="SA Service" kind="ETSI" />. The SAEM is broadcast on the service announcement channel (BTP port as assigned in ETSI TS 103 248) and carries the ITS-AID of each announced service and the ProtocolType (e.g., 3 = GeoNetworking + BTP) so vehicles know where to listen. This enables a vehicle entering a new zone to discover SPATEM/MAPEM/IVIM services before any data message arrives.
        </Callout>
      </Section>

      {/* ── SPATEM ── */}
      <Section id="spatem" title="SPATEM — Signal Phase And Timing Extended Message">
        <p>
          The <strong>Traffic Light Manoeuvre (TLM) service</strong> manages SPATEM generation and dissemination. A SPATEM tells approaching vehicles the <em>current state</em> of every signal group at an intersection and, critically, <em>how long</em> that state will last — enabling applications like Green Light Optimal Speed Advisory (GLOSA) and signal-violation warning.
        </p>

        <h3 className="text-lg font-semibold mt-4 mb-2 text-slate-200">What a SPATEM contains</h3>
        <p>
          The payload (rooted at <code>SPATEM.spat</code>) carries a list of <strong>IntersectionState</strong> records, one per intersection. Each IntersectionState includes:
        </p>
        <DefList items={[
          { term: 'intersectionID / region', def: 'Unique reference identifying the intersection, matching the corresponding MAPEM.' },
          { term: 'states (MovementState list)', def: 'One entry per signal group. Each MovementState holds a list of MovementEvent records, each with: eventState (e.g. stop-and-remain, protected-Movement-Allowed, permissive-clearance), and timing — minEndTime / maxEndTime / likelyTime in tenths of a second (DSRC time units).' },
          { term: 'manoeuvreAssistList', def: 'Optional per-intersection or per-movement assist data (pedestrian counts, approach speed, etc.).' },
          { term: 'regional / activePrioritizations', def: 'Extension for public-transport prioritisation status (AddGrpC regional extension).' },
          { term: 'timeStamp / moy', def: 'Minute-of-year and optional millisecond timestamp for message ordering within the time system.' },
        ]} />

        <h3 className="text-lg font-semibold mt-4 mb-2 text-slate-200">Dissemination behaviour</h3>
        <p>
          The TLM service does <strong>not</strong> perform autonomous repetition — the application triggers a new SPATEM every time the signal controller provides updated state. In practice this means SPATEMs are emitted at the signal controller's update rate (often every 100 ms to 1 s). The service ID and BTP destination port are 2 004. Protocol version of SPATEM is set to <strong>2</strong> in the ItsPduHeader.
        </p>
        <Callout type="warn" title="No built-in repetition">
          Unlike DENM or IVIM (which have a repetition interval), SPATEM relies entirely on the application to re-trigger it. Consecutive SPATEMs may contain identical content if the signal controller has no new data — this is explicitly allowed by the standard.
        </Callout>

        <h3 className="text-lg font-semibold mt-4 mb-2 text-slate-200">GLOSA and signal-violation warning</h3>
        <p>
          The combination of <em>eventState</em> and <em>likelyTime</em> (time to next state change) allows an in-vehicle application to compute the <strong>optimal speed</strong> for a vehicle to reach the stop line during a green phase — Green Light Optimal Speed Advisory (GLOSA). Conversely, if the residual green time is shorter than the vehicle's travel time at current speed, the application can warn the driver of an impending red light. Both applications require MAPEM for lane-to-signal-group mapping (see next section).
        </p>
      </Section>

      {/* ── MAPEM ── */}
      <Section id="mapem" title="MAPEM — MAP Extended Message">
        <p>
          The <strong>Road and Lane Topology (RLT) service</strong> broadcasts a digital map of intersection geometry. MAPEM is the static counterpart to SPATEM's dynamic phase data — it changes only when the physical road layout changes, so it is retransmitted continuously with the same content.
        </p>

        <Figure caption="Schematic of MAPEM lane topology at a three-approach intersection. Ingress lanes (approaching the conflict area) connect to egress lanes (leaving it) via connection records that carry the signalGroupID, linking topology to SPATEM phases.">
          <div className="font-mono text-xs text-slate-300 bg-ink-900 rounded p-4 overflow-x-auto" style={{lineHeight:'1.6'}}>
            <div className="flex gap-8 items-start justify-center flex-wrap">
              {/* North approach */}
              <div className="flex flex-col items-center gap-1">
                <div className="text-slate-400 text-[10px] mb-1">NORTH approach</div>
                <div className="flex flex-col gap-1">
                  <div className="bg-emerald-900 border border-emerald-600 rounded px-2 py-1 text-center text-[10px]">ingress lane N1<br/><span className="text-slate-400">waypoints →</span></div>
                  <div className="bg-emerald-900 border border-emerald-600 rounded px-2 py-1 text-center text-[10px]">ingress lane N2</div>
                </div>
                <div className="text-slate-500 text-[9px] mt-1">↓ connection (signalGroupID=3)</div>
              </div>
              {/* Conflict area */}
              <div className="flex flex-col items-center justify-center self-center">
                <div className="border-2 border-amber-500 rounded-lg px-4 py-3 bg-amber-900/30 text-center">
                  <div className="text-amber-300 font-bold text-[11px]">CONFLICT</div>
                  <div className="text-amber-300 font-bold text-[11px]">AREA</div>
                  <div className="text-slate-400 text-[9px] mt-1">IntersectionID</div>
                </div>
              </div>
              {/* East approach */}
              <div className="flex flex-col items-center gap-1">
                <div className="text-slate-400 text-[10px] mb-1">EAST approach</div>
                <div className="flex flex-col gap-1">
                  <div className="bg-brand-900 border border-brand-600 rounded px-2 py-1 text-center text-[10px]">ingress lane E1<br/><span className="text-slate-400">waypoints →</span></div>
                </div>
                <div className="text-slate-500 text-[9px] mt-1">↓ connection (signalGroupID=1)</div>
                <div className="flex flex-col gap-1 mt-2">
                  <div className="bg-violet-900 border border-violet-600 rounded px-2 py-1 text-center text-[10px]">egress lane E_out</div>
                </div>
              </div>
            </div>
            <div className="mt-3 text-center text-slate-400 text-[10px]">
              Lane waypoints: node positions along lane centreline (lat/lon or offset from reference point)<br/>
              Connection: ingress → egress + signalGroupID → links to SPATEM MovementState
            </div>
          </div>
        </Figure>

        <h3 className="text-lg font-semibold mt-4 mb-2 text-slate-200">Key MAPEM structures</h3>
        <DefList items={[
          { term: 'IntersectionGeometry (map.intersections)', def: 'Describes one intersection: reference point (lat/lon), list of approaches (GenericLane records). Each lane has a laneID, laneAttributes (vehicle / pedestrian / bicycle / parking), and a list of node offsets (waypoints along the lane centreline).' },
          { term: 'Connection (connectsTo)', def: 'Links an ingress lane to one or more egress lanes; carries the signalGroupID that maps to a MovementState in SPATEM.' },
          { term: 'roadSegments', def: 'Alternative to intersections — describes road segments (e.g., a motorway section) rather than an intersection conflict area.' },
          { term: 'layerID / layerType', def: 'Used when a large MAPEM must be fragmented across multiple messages (exceeding the MTU). Each fragment is identified by layerID.' },
          { term: 'Reference point coverage', def: 'Intersection approach coverage extends approximately 200 m from the stop line; if a neighbouring intersection is closer than 400 m, coverage extends to roughly half the distance between them.' },
        ]} />

        <h3 className="text-lg font-semibold mt-4 mb-2 text-slate-200">SPATEM + MAPEM together</h3>
        <p>
          A vehicle receiving both MAPEM and SPATEM can reconstruct a complete, real-time picture of an intersection: which lanes exist, how they connect, which manoeuvres are permitted, and what the current signal state and residual time is for each permitted manoeuvre. This joint model is the foundation for GLOSA, signal-violation warning, and automated intersection negotiation. The RLT service explicitly mandates that <em>"MAPEM shall be transmitted continuously together with the SPATEM"</em>. Both use a 400 m default communication radius and the Safety Channel.
        </p>
        <Callout type="info" title="Protocol version">
          Both SPATEM and MAPEM use <strong>protocolVersion = 2</strong> in the ItsPduHeader, reflecting Release 2 of TS 103 301. The standard uses ASN.1 Packed Encoding Rules (UPER/PER unaligned) for encoding, consistent with all other ETSI ITS Facilities-layer messages.
        </Callout>
      </Section>

      {/* ── IVIM ── */}
      <Section id="ivim" title="IVIM — In-Vehicle Information Message">
        <p>
          The <strong>Infrastructure to Vehicle Information (IVI) service</strong> delivers roadside signage and road-condition data directly into the vehicle. An IVIM can represent physical signs (static or variable speed limits, warning signs), virtual signs (contextual speed advisories not physically present), or roadworks notifications. The data structures come from <Ref code="CEN ISO/TS 19321" title="IVI Data Structures" kind="ISO" />, with the ETSI wrapper and dissemination rules from TS 103 301.
        </p>

        <CardGrid cols={2}>
          <Card title="Mandatory container" accent="amber">
            <p>Every IVIM carries a mandatory part with: <code>iviIdentificationNumber</code> (unique per service provider), <code>serviceProviderId</code> (identifies the road authority), <code>iviStatus</code> (new / update / cancellation / negation), and <code>timeStamp</code>.</p>
          </Card>
          <Card title="General IVI container (gic)" accent="amber">
            <p>Road-sign codes using Vienna Convention pictograms, ISO/TS 14823-1 pictograms (danger, regulatory, informative, ambient/road conditions), or ITIS codes. Also carries lane-status and contextual speed information (GLOSA speed advisory per lane).</p>
          </Card>
          <Card title="Text container (tc)" accent="amber">
            <p>Free-text or structured text for variable message signs, in multiple languages. Includes layout information for on-board display.</p>
          </Card>
          <Card title="Road Configuration Container (rcc)" accent="amber">
            <p>Describes temporary or permanent changes to the road layout — lane closures, contraflow, roadworks zones. Complements MAPEM's static topology.</p>
          </Card>
          <Card title="Automated Vehicle Container (avc)" accent="amber">
            <p>Release 2 addition: data specifically targeting automated driving functions — more precise zone boundaries, manoeuvre constraints.</p>
          </Card>
          <Card title="Map Location Container (mlc)" accent="amber">
            <p>Geographically references the IVI's applicability zone using shape primitives; lets the vehicle determine precisely when the sign becomes relevant.</p>
          </Card>
        </CardGrid>

        <h3 className="text-lg font-semibold mt-4 mb-2 text-slate-200">IVIM lifecycle</h3>
        <Steps>
          <div><strong>new</strong>: RSU generates a fresh IVIM with iviStatus = new and a new iviIdentificationNumber. Transmitted once, then repeated at a pre-defined interval so vehicles entering the area receive it.</div>
          <div><strong>update</strong>: Content changes (e.g., end time added, speed limit revised) — iviStatus = update, same iviIdentificationNumber, new timeStamp. Vehicles use the iviIdentificationNumber + timeStamp to replace cached data.</div>
          <div><strong>cancellation</strong>: The originating service provider ends the event — iviStatus = cancellation. Must be transmitted at least once; may be repeated.</div>
          <div><strong>negation</strong>: A different organisation (e.g., the national traffic authority overriding a road-works authority) cancels the IVIM — iviStatus = negation, with the originating serviceProviderId preserved for traceability.</div>
        </Steps>

        <p>
          The BTP destination port for IVIM is <strong>2 006</strong>. The default communication distance is 400 m; for indirect (cellular) delivery the maximum latency relaxes to 10 s (CSP_MaxLat = sec(16)). Protocol version is <strong>2</strong>.
        </p>
        <Callout type="tip" title="GLOSA via IVIM">
          While SPATEM+MAPEM provide signal timing, IVIM can deliver a <em>contextual speed advisory</em> (e.g., "drive at 42 km/h to catch the next green") computed server-side and pushed as a signed road-sign message. This offloads the computation from the vehicle, useful for simpler OBUs. See <Link to="/applications">Applications</Link> for the full GLOSA use case.
        </Callout>
      </Section>

      {/* ── SREM / SSEM ── */}
      <Section id="srem-ssem" title="SREM &amp; SSEM — Priority and Preemption Protocol">
        <p>
          The <strong>Traffic Light Control (TLC) service</strong> governs the request/response protocol for signal priority and preemption. Public transport vehicles (buses, trams) request <em>priority</em> — the controller extends or advances a green phase. Emergency vehicles (ambulance, fire brigade, police) request <em>preemption</em> — the controller forces a green regardless of schedule. The SREM carries the request; the SSEM carries the controller's response.
        </p>

        <h3 className="text-lg font-semibold mt-4 mb-2 text-slate-200">SREM/SSEM sequence</h3>
        <Figure caption="SREM/SSEM request–status flow for a bus approaching a signalised intersection. The RSU may forward the SREM to a Traffic Control Centre (TCC) which makes the prioritisation decision.">
          <div className="overflow-x-auto">
            <div className="min-w-[520px] font-mono text-xs text-slate-300 bg-ink-900 rounded p-4">
              {/* Participants */}
              <div className="flex justify-between mb-2 px-4">
                <div className="text-center text-brand-300 font-bold">Bus OBU</div>
                <div className="text-center text-emerald-300 font-bold">RSU</div>
                <div className="text-center text-amber-300 font-bold">TCC</div>
              </div>
              <div className="flex justify-between px-4 mb-1">
                <div className="border-l-2 border-brand-600 h-0 w-0" />
                <div className="border-l-2 border-emerald-600 h-0 w-0" />
                <div className="border-l-2 border-amber-600 h-0 w-0" />
              </div>
              {/* Sequence lines */}
              {[
                { from: 0, to: 1, label: 'SPATEM received (detect green phase timing)', color: 'text-emerald-400', dir: '←' },
                { from: 0, to: 1, label: 'SREM (requestor.role=publicTransport, requestID, intersection list)', color: 'text-brand-400', dir: '→' },
                { from: 1, to: 2, label: 'SREM forwarded to TCC (optional)', color: 'text-emerald-400', dir: '→' },
                { from: 2, to: 1, label: 'TCC grants priority, adjusts signal plan', color: 'text-amber-400', dir: '←' },
                { from: 1, to: 0, label: 'SSEM (status=priorityRequest-Granted, requestID)', color: 'text-emerald-400', dir: '←' },
                { from: 0, to: 1, label: 'SREM update (vehicle position changes)', color: 'text-brand-400', dir: '→' },
                { from: 1, to: 0, label: 'SSEM update (status=priorityRequest-Active)', color: 'text-emerald-400', dir: '←' },
                { from: 0, to: 1, label: 'SREM termination (vehicle clears intersection)', color: 'text-slate-500', dir: '→' },
                { from: 1, to: 0, label: 'SSEM (status=priorityRequest-Cancelled)', color: 'text-slate-500', dir: '←' },
              ].map((row, i) => (
                <div key={i} className="flex items-center px-2 py-1 gap-2">
                  <div className={`flex-1 text-right ${row.dir === '←' ? row.color : 'text-transparent'} select-none`}>{'─────'}</div>
                  <div className={`text-center ${row.color} text-[10px] flex-[3] border border-slate-700 rounded px-1 py-0.5`}>{row.dir} {row.label}</div>
                  <div className={`flex-1 text-left ${row.dir === '→' ? row.color : 'text-transparent'} select-none`}>{'─────'}</div>
                </div>
              ))}
            </div>
          </div>
        </Figure>

        <h3 className="text-lg font-semibold mt-4 mb-2 text-slate-200">SREM key fields</h3>
        <DefList items={[
          { term: 'srm.requests', def: 'List of SignalRequest records, each specifying: requestID (unique per vehicle), requestType (priorityRequest / preemptRequest / cancel), intersection reference, ingress lane, egress lane, expected arrival time and duration.' },
          { term: 'srm.requestor.type.role', def: 'Requestor role bitmap — critical for security. Each role (publicTransport, emergency, ambulance, fire, police, roadWork, etc.) requires a separate SSP bit in the certificate. Separate roles exist for tram, truck, motorcycle, military, transit, slowMoving, and more.' },
          { term: 'srm.requestor.position', def: 'Current position of the requesting vehicle, allowing the controller to verify proximity and compute ETA.' },
          { term: 'srm.requestor.name (optional)', def: 'Human-readable vehicle/fleet identifier for operator logging.' },
        ]} />

        <h3 className="text-lg font-semibold mt-4 mb-2 text-slate-200">SSEM key fields</h3>
        <DefList items={[
          { term: 'ssm.status (SignalStatusList)', def: 'One entry per intersection in the original SREM, each with a list of SignalStatusPackage records: requestID (echoes SREM), status (unknown / processing / watchOtherTraffic / granted / rejected / maxPresence / reserviceLocked), inboundOn, outboundOn.' },
          { term: 'Priority vs. preemption', def: 'A higher-priority SREM (e.g., ambulance) arriving while a bus SREM is active can cause the status of the bus request to change — a revised SSEM is transmitted reflecting the new priority order.' },
        ]} />

        <p>
          SREM uses BTP port <strong>2 007</strong>; SSEM uses BTP port <strong>2 008</strong>. Both use protocol version <strong>2</strong>. The TLC service supports single or continuous transmission of both messages; a single SREM can address multiple intersections along a planned route. The SSP version for SREM is <strong>3</strong>, reflecting the rich role-based permission bitmap.
        </p>

        <Callout type="example" title="Bus requesting priority at two intersections">
          A GPS-equipped bus detects it is 300 m from intersection A and 600 m from intersection B on its route. It transmits one SREM listing both intersection requests with expected arrival times computed from current speed. The TCC for both intersections is notified. Intersection A grants priority (SSEM: granted). Intersection B queues the request (SSEM: processing). As the bus clears intersection A, it sends a cancellation SREM for that entry; intersection B's status updates to granted.
        </Callout>
      </Section>

      {/* ── GLOSA & Applications ── */}
      <Section id="applications" title="Applications: GLOSA, Signal Violation Warning &amp; More">
        <p>
          The infrastructure message family collectively enables several high-value C-ITS applications. The table below maps each application to the messages it depends on.
        </p>
        <Table
          caption="Applications enabled by infrastructure messages"
          headers={['Application', 'Messages used', 'Description']}
          rows={[
            ['GLOSA (Green Light Optimal Speed Advisory)', 'SPATEM + MAPEM (or IVIM)', 'Compute the advisory speed to reach the stop line during a green phase; reduce stop-and-go at traffic lights.'],
            ['Signal Violation Warning (SVW)', 'SPATEM + MAPEM', 'Warn driver when current speed will result in passing a red light; improves safety at urban intersections.'],
            ['Traffic Light Approach Warning', 'SPATEM + MAPEM', 'HMI indication of signal phase visible early; allows coasting rather than late braking.'],
            ['Public Transport Signal Priority (TSP)', 'SREM + SSEM + SPATEM', 'Bus/tram requests green extension or phase advance; controller confirms via SSEM; SPATEM reflects adjusted timing.'],
            ['Emergency Vehicle Preemption (EVP)', 'SREM + SSEM', 'Ambulance/fire/police forces a green corridor; highest-priority preemption overrides all other requests.'],
            ['In-Vehicle Signage / Variable Speed Limit', 'IVIM', 'Virtual road signs delivered wirelessly; speed limit display in vehicle adapts to school zone hours, roadworks, fog.'],
            ['Roadworks Warning', 'IVIM (+ DENM)', 'RSU describes roadworks zone, lane closures, and speed limit changes; IVIM provides sign codes, DENM provides dynamic hazard.'],
            ['Contextual Speed Advisory (GLOSA via infrastructure)', 'IVIM', 'Server-computed advisory speed pushed as a signed virtual sign; reduces onboard computation requirement.'],
          ]}
        />
        <p>
          The GLOSA application is one of the Day-1 C-ITS services mandated in many European deployments. Its implementation quality depends directly on the accuracy of the SPATEM timing data (<em>likelyTime</em>, <em>minEndTime</em>, <em>maxEndTime</em>) and on the vehicle having a valid MAPEM to resolve which signal group controls its lane. See <Link to="/applications">Applications</Link> and <Link to="/c-roads">C-Roads deployment profiles</Link> for real-world status.
        </p>
      </Section>

      {/* ── Security ── */}
      <Section id="security" title="Security: Signing, SSPs &amp; Certificate Validity">
        <p>
          All five messages are signed using ETSI ITS security as specified in <Ref code="TS 103 097" title="Security" kind="ETSI" />. The signing key is contained in an <strong>Authorization Ticket (AT)</strong> — a short-lived pseudonymous certificate. Infrastructure stations still rotate ATs regularly (default: 2 months) even though they are stationary, to prevent long-term tracking of the equipment identity.
        </p>
        <Table
          caption="Service-Specific Permissions (SSP) summary"
          headers={['Message', 'SSP version', 'Key permission bits']}
          rows={[
            ['SPATEM', '1 (octet 0)', 'Octet 1 bit 0: signal phase & timing; bit 1: public transport prioritisation status; bit 2: manoeuvre assist list'],
            ['MAPEM', '1 (octet 0)', 'Octet 1 bit 0: intersections geometry list; bit 1: road segments list'],
            ['IVIM', '1 (octet 0)', 'Octets 1–3: serviceProviderId; octets 4–5: sign-type permissions (Vienna Convention, ISO 14823 danger/regulatory/informative, ITIS, laneStatus, rcc, tc, lac, avc, mlc, rsc, negation)'],
            ['SREM', '3 (octet 0)', 'Octet 1–3: role bits per requestor type (publicTransport, emergency, ambulance, fire, police, roadRescue, etc.); octets 4–6: serviceProviderId'],
            ['SSEM', '1 (octet 0)', 'No service-specific bits beyond version — any valid AT with SSEM ITS-AID may sign'],
          ]}
        />
        <Callout type="warn" title="SSP consistency check">
          On reception, the ITS-S checks that the message content is consistent with the SSP encoded in the signing certificate. For example, a SREM claiming an <em>emergency</em> role must be signed by an AT whose SSP has the emergency bit set. If the check fails, the message is silently discarded. This prevents spoofed priority requests.
        </Callout>
      </Section>

      {/* ── J2735 relationship ── */}
      <Section id="j2735" title="Relationship to SAE J2735 and CEN ISO/TS 19091">
        <p>
          SAE J2735 is the foundational North-American standard defining the message set for Dedicated Short-Range Communications (DSRC) in vehicles. ETSI TS 103 301 does not re-invent these messages — it <strong>profiles</strong> them for European deployment by:
        </p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>Wrapping the J2735 payload in an ETSI <em>ItsPduHeader</em> (protocolVersion, messageID, stationID).</li>
          <li>Using ETSI GeoNetworking + BTP-B instead of WAVE WSMP for dissemination.</li>
          <li>Mandating ETSI TS 103 097 certificate/security format rather than IEEE 1609.2.</li>
          <li>Defining European SSP structures (role bits, serviceProviderId with ISO 3166-1 country code encoded as ITA-2).</li>
          <li>Adding AddGrpC regional extensions (DSRC-addGrp-C.asn) for SPATEM/MAPEM European specifics (e.g., public transport prioritisation extensions in IntersectionState).</li>
        </ul>
        <p className="mt-2">
          The formal alignment document is <Ref code="CEN ISO/TS 19091" title="V2I/I2V signalised intersections" kind="ISO" />, which specifies how to use J2735 SPaT and MAP for applications at signalised intersections and is normatively referenced by TS 103 301. The ASN.1 source files are maintained at the ETSI forge (see Annex A of TS 103 301). For the global standardisation landscape see <Link to="/global">Global Standards</Link>.
        </p>
      </Section>

      {/* ── R1 vs R2 ── */}
      <Section id="evolution" title="Release 1 vs Release 2 Evolution">
        <Table
          caption="Key changes between Release 1 and Release 2 of TS 103 301"
          headers={['Area', 'Release 1 (V1.x)', 'Release 2 (V2.x, current V2.3.1 Apr 2026)']}
          rows={[
            ['Protocol version', 'protocolVersion = 1 for SPATEM, MAPEM, IVIM, SREM, SSEM', 'protocolVersion = 2 for all five messages'],
            ['IVIM SSP', 'Octets 0–3 defined; octets 4–5 mostly unused', 'Three previously unused bits in octet 5 assigned new semantics (avc, mlc, rsc). R1 receivers can decode but ignore new bits (backwards-compatible)'],
            ['SREM SSP version', 'Earlier version', 'SSP version 3; extended role bitmap (tram, military, transit, slowMoving, cyclist, pedestrian added)'],
            ['Automated vehicles', 'Not addressed', 'Automated Vehicle Container (avc) in IVIM; Map Location Container (mlc) for precise zone referencing'],
            ['RTCMEM (GPC)', 'Introduced in R1', 'Retained; GNSS positioning correction for infrastructure-assisted high-accuracy positioning'],
            ['ASN.1 hosting', 'Inline in standard', 'Hosted on ETSI forge repository with SHA-256 hash digests published in Annex A for integrity verification'],
          ]}
        />
      </Section>

      {/* ── Deployment notes ── */}
      <Section id="deployment" title="Deployment: RSUs, Ports &amp; Real-World Notes">
        <p>
          In a typical European C-ITS deployment, a <strong>Roadside Unit (RSU)</strong> is co-located with or connected to the traffic signal controller via a proprietary or standardised interface (e.g., OCIT-C or NTCIP). The RSU runs the TLM and RLT service entities, continuously broadcasting SPATEM and MAPEM over ITS-G5 or C-V2X. A backend Traffic Control Centre (TCC) may supply IVIM content (roadworks, variable speed limits) via a separate link to the RSU.
        </p>
        <StatGrid cols={3}>
          <Stat value="~1 s" label="Typical SPATEM cycle" sub="Matches signal controller update rate; no autonomous repetition" />
          <Stat value="Continuous" label="MAPEM retransmission" sub="Same content retransmitted until topology changes" />
          <Stat value="400 m" label="Default broadcast radius" sub="All five services; geocast for wider areas" />
        </StatGrid>
        <p>
          For indirect (cellular) delivery, SPATEM and MAPEM can be delivered via unicast (CSP_DestinationType = 4, domain = global). This supports cloud-based C-ITS architectures where an ITS Application Server collects signal data and distributes it to vehicles via 5G/LTE. The IVIM cellular latency allowance is relaxed to 10 s (direct: 100 ms), reflecting less time-critical signage data.
        </p>
        <Callout type="info" title="C-Roads harmonisation">
          The C-Roads Platform harmonises SPATEM/MAPEM/IVIM deployment across European member states, defining specific Day-1 and Day-2 C-ITS services and RSU hardware/software profiles. See <Link to="/c-roads">C-Roads</Link> for corridor deployment details and interoperability test results.
        </Callout>
      </Section>

      {/* ── Key standards ── */}
      <Section id="standards" title="Key Standards">
        <ul className="space-y-2">
          <li><Ref code="ETSI TS 103 301" title="Infrastructure Services (SPATEM/MAPEM/IVIM/SREM/SSEM)" kind="ETSI" /> — normative specification (V2.3.1, April 2026)</li>
          <li><Ref code="CEN ISO/TS 19091" title="V2I/I2V Signalised Intersections" kind="ISO" /> — alignment of J2735 SPaT/MAP to ETSI ITS</li>
          <li><Ref code="CEN ISO/TS 19321" title="IVI Data Structures" kind="ISO" /> — IVIM payload data model</li>
          <li><Ref code="SAE J2735" title="DSRC Message Set Dictionary" kind="SAE" /> — origin of SPaT, MAP, SRM, SSM message definitions</li>
          <li><Ref code="ETSI EN 302 890-1" title="Services Announcement (SAEM)" kind="ETSI" /> — SAEM for discovering available infrastructure services</li>
          <li><Ref code="ETSI TS 102 894-2" title="Common Data Dictionary (CDD)" kind="ETSI" /> — ItsPduHeader and common data elements</li>
          <li><Ref code="ETSI TS 103 097" title="Security Header and Certificate Formats" kind="ETSI" /> — signing and Authorization Tickets</li>
          <li><Ref code="ETSI TS 102 965" title="ITS-AID Registration" kind="ETSI" /> — ITS Application Identifiers for all five services</li>
          <li><Ref code="ISO/TS 14823-1" title="Graphic Data Dictionary (road pictograms)" kind="ISO" /> — pictogram codes used in IVIM</li>
        </ul>
      </Section>

      {/* ── Where next ── */}
      <Section id="where-next" title="Where Next">
        <CardGrid cols={3}>
          <Card title="Facilities Layer" accent="brand" icon="🏗️">
            <p>How the Facilities layer organises all services — CA, DEN, CPM, VAM, and Infrastructure — and their interaction with LDM and security.</p>
            <p className="mt-2"><Link to="/facilities" className="text-brand-400 underline">Facilities →</Link></p>
          </Card>
          <Card title="Applications" accent="emerald" icon="🚦">
            <p>GLOSA, signal violation warning, emergency vehicle preemption, and other applications that consume SPATEM/MAPEM/IVIM/SREM/SSEM.</p>
            <p className="mt-2"><Link to="/applications" className="text-emerald-400 underline">Applications →</Link></p>
          </Card>
          <Card title="Networking" accent="amber" icon="📡">
            <p>GeoNetworking, BTP-B ports, and how SFCH/GPCH channel assignments govern infrastructure message delivery.</p>
            <p className="mt-2"><Link to="/networking" className="text-amber-400 underline">Networking →</Link></p>
          </Card>
          <Card title="C-Roads" accent="violet" icon="🛣️">
            <p>European corridor deployments of SPATEM/MAPEM/IVIM with harmonised RSU profiles and interoperability testing.</p>
            <p className="mt-2"><Link to="/c-roads" className="text-violet-400 underline">C-Roads →</Link></p>
          </Card>
          <Card title="Global Standards" accent="rose" icon="🌐">
            <p>SAE J2735, WAVE, and how North-American and European signal-phase standards relate and diverge.</p>
            <p className="mt-2"><Link to="/global" className="text-rose-400 underline">Global →</Link></p>
          </Card>
          <Card title="Security &amp; PKI" accent="cyan" icon="🔐">
            <p>Authorization Tickets, SSPs, pseudonym rotation, and the ETSI ITS PKI that underpins signed infrastructure messages.</p>
            <p className="mt-2"><Link to="/security" className="text-cyan-400 underline">Security →</Link></p>
          </Card>
        </CardGrid>
      </Section>
    </article>
  )
}
