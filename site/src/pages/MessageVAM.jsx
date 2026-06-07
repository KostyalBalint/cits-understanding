import React from 'react'
import { Link } from 'react-router-dom'
import { PageHeader, Section, Prose, Callout, Ref, Table, StatGrid, Stat, CardGrid, Card, Steps, Figure, LayerStack, DefList, Badge } from '../components/ui.jsx'

export default function MessageVAM() {
  return (
    <article>
      <PageHeader
        kicker="Facilities Layer — Release 2"
        title="VAM — VRU Awareness Message"
        intro="Vulnerable Road Users (VRUs) — pedestrians, cyclists, motorcyclists, and animals — are the most at-risk participants on any road. The VRU Awareness Message (VAM) gives their personal devices (smartphones, e-bike computers, wearables) a standardised way to broadcast their presence, speed, and trajectory into the V2X network, complementing the vehicle-centric CAM and the infrastructure-centric CPM. Where a CAM asks 'here is my car', a VAM says 'here is a human being — please don't hit me'."
        sources={['ETSI TS 103 300-2', 'ETSI TS 103 300-3', 'ETSI TR 103 300-1']}
      />

      {/* ── 1. Motivation ─────────────────────────────────────────── */}
      <Section id="motivation" title="Why a Separate Message for VRUs?">
        <p>
          Vehicles already announce themselves via the <Link to="/cam">Cooperative Awareness Message (CAM)</Link>. VRUs differ from vehicles in three fundamental ways that make a dedicated message necessary:
        </p>
        <ul>
          <li><strong>No mandatory equipment:</strong> a pedestrian carries a smartphone, not an OBD-connected ITS station. The device may lack a vehicle-grade GNSS chip, have limited battery, and can be switched off.</li>
          <li><strong>Crowd density:</strong> at a busy urban crossing, hundreds of pedestrians may occupy the same area simultaneously — each sending individual CAMs would saturate the 5.9 GHz channel instantly.</li>
          <li><strong>Behaviour profile:</strong> VRUs stop, reverse, jump, and change direction far more abruptly than vehicles. Their trajectory is harder to predict and their size class differs dramatically from a car.</li>
        </ul>
        <p>
          ETSI TS 103 300-2 describes two complementary approaches to VRU protection:
        </p>
        <CardGrid cols={2}>
          <Card title="Active Awareness" accent="emerald">
            The VRU device transmits VAMs periodically. Other road users — vehicles, RSUs — receive and process them. The VRU self-reports its position, speed, heading and profile. Requires the VRU to carry an ITS-capable device. Uses short-range technologies (ITS-G5/WAVE, LTE-V2X PC5, Bluetooth LE, UWB) or cellular (4G/5G).
          </Card>
          <Card title="Passive Awareness (CPM)" accent="cyan">
            Infrastructure cameras, radar, LIDAR, or vehicle sensors detect VRUs without their cooperation. The perceiving station encodes the VRU as a perceived object in a <Link to="/cpm">Collective Perception Message (CPM)</Link>. Works for non-equipped VRUs, but depends on sensor coverage and computational resources on the perceiving side.
          </Card>
        </CardGrid>
        <Callout type="key" title="Complementary, not competing">
          VAM and CPM reinforce each other. A VRU that sends a VAM can also be detected and reported via CPM. A receiving vehicle that sees both can validate the positions against each other and increase confidence. ETSI TS 103 300-3 explicitly states that infrastructure and vehicle ITS-S should be capable of receiving VAMs, and VRU ITS-S should be capable of receiving CPMs.
        </Callout>
        <p>
          VRU profile 3 (motorcyclists) is a special case: motorcycles already send CAMs as vehicles. ETSI TS 103 300-2 specifies that profile 3 VRUs should not transmit the VAM, because the same dynamic data is already in the CAM. Similarly, bicycles (profile 2) may also send CAMs. Both, however, are still classified as VRUs and benefit from the heightened awareness VRU infrastructure provides.
        </p>
      </Section>

      {/* ── 2. VRU Profiles ───────────────────────────────────────── */}
      <Section id="profiles" title="VRU Profiles 1–4">
        <p>
          ETSI TS 103 300-2 clause 6.1 defines four VRU profiles. The profile is carried in the Low Frequency Container of every VAM. It tells receiving ITS-Ss what kind of entity is approaching and what kinematic model to apply.
        </p>

        <Figure caption="VRU Profiles 1–4 and their example sub-types (ETSI TS 103 300-2 / TS 103 300-3 Table 10)">
          <div className="grid grid-cols-2 gap-4 text-sm">
            {[
              {
                label: 'Profile 1 — Pedestrian',
                color: 'bg-brand-900 border-brand-500',
                items: ['Ordinary pedestrian', 'Road workers', 'First responders', 'Children, prams', 'Blind persons with guide dog', 'Person walking beside bicycle'],
              },
              {
                label: 'Profile 2 — Bicyclist',
                color: 'bg-emerald-900 border-emerald-500',
                items: ['Bicyclist', 'Wheelchair user', 'Horse and rider', 'Rollerskater', 'Standing e-scooter', 'Personal transporter', 'E-bicyclist / pedelec (up to 25 km/h)', 'Speed-pedelec (up to 45 km/h)'],
              },
              {
                label: 'Profile 3 — Motorcyclist',
                color: 'bg-amber-900 border-amber-500',
                items: ['Moped', 'Motorcycle', 'Motorcycle + sidecar (L/R)', 'Seated e-scooter', '(already sends CAM — VAM normally suppressed)'],
              },
              {
                label: 'Profile 4 — Animal',
                color: 'bg-rose-900 border-rose-500',
                items: ['Wild animal (highway hazard)', 'Farm animal', 'Service animal (guide dog, police horse)', 'Most will be detected passively via CPM'],
              },
            ].map(p => (
              <div key={p.label} className={`rounded border ${p.color} p-3`}>
                <div className="font-bold mb-2 text-slate-200">{p.label}</div>
                <ul className="list-disc list-inside text-slate-300 space-y-0.5">
                  {p.items.map(i => <li key={i}>{i}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </Figure>

        <Callout type="info" title="A VRU is always a living being">
          A bicycle parked without a rider is not a VRU — it is an obstacle, signalled by DENM or CPM. The VRU designation only applies when at least one person (or animal) is actively using the vehicle in a safety-critical traffic context. A combined VRU is the combination of a person (profile 1) with their vehicle (profile 2 or 3) when both carry ITS-S devices.
        </Callout>

        <p>
          Beyond the four top-level profiles, each profile has sub-profiles (Table 10, TS 103 300-3) for finer classification. The size class field (<code>VruSizeClass</code>) provides coarse physical dimensions: low / medium / high, calibrated per profile (for pedestrians: low = 1 m or less in height; medium = 1–1.5 m; high = over 1.5 m). The 1.5 m threshold is deliberately chosen as the height below which a parked car blocks the line of sight.
        </p>
      </Section>

      {/* ── 3. System Architecture ────────────────────────────────── */}
      <Section id="architecture" title="VRU Basic Service &amp; System Architecture">
        <p>
          The VRU Basic Service (VBS) lives in the <strong>facilities layer</strong> of the ITS-S architecture, exactly where the Cooperative Awareness Service (CAS) that generates CAMs lives. It is defined in ETSI TS 103 300-3 and references the architecture described in ETSI TS 103 300-2.
        </p>

        <LayerStack
          layers={[
            { name: 'ITS Applications', sub: 'Collision warning, intersection safety, road-worker protection', accent: 'brand' },
            { name: 'Facilities Layer — VRU Basic Service (VBS)', sub: 'VAM generation, clustering, reception management, LDM update', accent: 'emerald' },
            { name: 'Facilities Layer — Other (PoTi, LDM, CPS, DCC-FAC)', sub: 'Position and time, Local Dynamic Map, Collective Perception, congestion control', accent: 'cyan' },
            { name: 'Networking and Transport (GeoNetworking / BTP-B / IPv6)', sub: 'SHB dissemination, BTP port, packet lifetime 1 000 ms max', accent: 'violet' },
            { name: 'Access Layer (ITS-G5 / LTE-V2X PC5)', sub: 'DCC, 5.9 GHz DSRC or PC5 sidelink', accent: 'amber' },
          ]}
          leftRail="Security (SF-SAP)"
          rightRail="Management (MF-SAP)"
        />

        <h3 className="mt-6 text-lg font-semibold text-slate-200">VRU Device Types</h3>
        <p>Three hardware capability classes are defined in ETSI TR 103 300-1 clause 4.4:</p>
        <DefList items={[
          { term: 'VRU-Tx', def: 'Transmit-only device. Broadcasts VAMs; has no receiver. Must still comply with DCC channel congestion rules. Typical example: a simple beacon clipped to a cyclist\'s bag.' },
          { term: 'VRU-Rx', def: 'Receive-only device. Listens for VAMs and CAMs, presents warnings to the VRU via HMI. Cannot originate VAMs. Useful for impaired pedestrians or as a co-processor in a vehicle.' },
          { term: 'VRU-St', def: 'Station — the full transceiver. Combines VRU-Tx and VRU-Rx. Can send VAMs, receive VAMs and CPMs, manage cluster state. Typical example: a connected smartphone running a C-ITS app.' },
        ]} />

        <h3 className="mt-6 text-lg font-semibold text-slate-200">Internal VBS Functions</h3>
        <p>
          The VBS consists of five cooperating sub-functions. VAM reception and decoding are only available in VRU-Rx and VRU-St devices; VAM transmission management and encoding only in VRU-Tx and VRU-St:
        </p>
        <Table
          caption="VBS internal functions (ETSI TS 103 300-3 clause 5.2)"
          headers={['Function', 'Role']}
          rows={[
            ['VRU basic service management', 'Manages VRU role (ON/OFF), maintains AID/port, activates/deactivates VAM transmission, controls triggering logic, interacts with PoTi and DDP.'],
            ['VRU cluster management', 'Detects clustering conditions, creates/joins/leaves/breaks-up clusters, manages VBS state machine, activates/suppresses VAM on behalf of cluster members.'],
            ['VAM transmission management', 'Assembles VAM data elements, passes to encoding function. Only on VRU-Tx / VRU-St.'],
            ['VAM encoding', 'Encodes VAM using ASN.1 Unaligned PER, forwards to N&T layer via NF-SAP. Only on VRU-Tx / VRU-St.'],
            ['VAM reception and decoding', 'Decodes received VAMs, performs security and plausibility checks, stores data in LDM. Only on VRU-Rx / VRU-St.'],
          ]}
        />

        <h3 className="mt-6 text-lg font-semibold text-slate-200">VRU Role Management</h3>
        <p>
          The VBS always runs, but transitions between two roles driven by the VRU Profile Management Entity in the Management layer:
        </p>
        <DefList items={[
          { term: 'VRU_ROLE_ON', def: 'The device user is in a safety-critical traffic context (e.g. crossing a road). VAMs may be transmitted. Clustering is active.' },
          { term: 'VRU_ROLE_OFF', def: 'The user is in a "zero-risk" area (e.g. passenger inside a bus or inside a building). VAMs shall not be sent or received. The VBS remains operational to detect role-change notifications.' },
        ]} />
      </Section>

      {/* ── 4. VRU Clustering ─────────────────────────────────────── */}
      <Section id="clustering" title="VRU Clustering — Spectrum Efficiency at Scale">
        <p>
          At a busy pedestrian crossing, 500 or more VRUs can be present simultaneously. Sending individual VAMs at even 1 Hz from each device would generate 500 packets per second — far beyond what the 5.9 GHz channel can absorb alongside CAMs, DENMs, and CPMs. VRU clustering solves this by electing one device as <em>cluster leader</em> that transmits a single <em>cluster VAM</em> representing the entire group.
        </p>

        <Callout type="key" title="Clustering in one sentence">
          One cluster leader sends VAMs for the whole group; all other members stay silent — reducing N independent transmitters to a single transmission.
        </Callout>

        <Figure caption="VBS clustering state machine (ETSI TS 103 300-3 Figure 3 / clause 5.4.2)">
          <div className="flex flex-wrap gap-6 justify-center text-sm">
            {[
              { label: 'VRU-IDLE', sub: 'VRU role OFF', color: 'border-slate-500 bg-ink-900' },
              { label: 'VRU-ACTIVE-STANDALONE', sub: 'Individual VAMs', color: 'border-emerald-500 bg-emerald-950' },
              { label: 'VRU-ACTIVE-CLUSTER-LEADER', sub: 'Cluster VAMs', color: 'border-brand-500 bg-brand-950' },
              { label: 'VRU-PASSIVE', sub: 'Silent member / low-risk area', color: 'border-amber-500 bg-amber-950' },
            ].map(s => (
              <div key={s.label} className={`rounded border ${s.color} px-4 py-3 w-52 text-center`}>
                <div className="font-bold text-slate-200">{s.label}</div>
                <div className="text-slate-400 text-xs mt-1">{s.sub}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-xs text-slate-400 text-center space-y-1">
            <p>IDLE {'->'} STANDALONE: VRU enters traffic context</p>
            <p>STANDALONE {'->'} LEADER: device forms cluster (numCreateCluster VRUs nearby, VRU-St type, no existing cluster to join)</p>
            <p>STANDALONE {'->'} PASSIVE: device joins existing cluster (within maxClusterDistance, velocity difference {'<'}5%)</p>
            <p>LEADER {'->'} STANDALONE: cluster breaks up (cardinality drops, area change, CPM coverage received)</p>
            <p>PASSIVE {'->'} STANDALONE: cluster leader lost (no VAM for timeClusterContinuity = 2 s), safety condition, or voluntary leave</p>
          </div>
        </Figure>

        <h3 className="mt-6 text-lg font-semibold text-slate-200">Cluster Types</h3>
        <CardGrid cols={2}>
          <Card title="Homogeneous cluster" accent="emerald">
            All members share the same VRU profile (e.g. group of pedestrians, group of cyclists). Simpler trajectory and behaviour modelling.
          </Card>
          <Card title="Heterogeneous cluster" accent="amber">
            Members span multiple profiles (e.g. pedestrians + e-scooters). The cluster VAM flags which profiles are present. When the cluster breaks up, receivers know to expect diverse dynamics from the ex-members.
          </Card>
        </CardGrid>

        <h3 className="mt-6 text-lg font-semibold text-slate-200">Key Clustering Parameters</h3>
        <Table
          caption="Clustering parameters — recommended values (ETSI TS 103 300-3 Tables 14 and 15)"
          headers={['Parameter', 'Recommended value', 'Meaning']}
          rows={[
            ['numCreateCluster', '3–5 devices', 'Minimum nearby VRUs required before a leader forms a cluster'],
            ['maxClusterDistance', '3–5 m', 'Maximum distance between cluster boundary and a joining VRU'],
            ['maxClusterVelocityDifference', '5 %', 'Max speed difference within a cluster'],
            ['maxClusterSize', '20 active ITS-S', 'Hard upper limit on cluster cardinality'],
            ['minClusterSize', '1', 'Initial cardinality at cluster creation'],
            ['timeClusterBreakupWarning', '3 s', 'Leader signals breakup for this duration before disbanding'],
            ['timeClusterJoinNotification', '3 s', 'Joining device signals intent for this duration'],
            ['timeClusterContinuity', '2 s', 'Member leaves if no cluster VAM received in this window'],
            ['timeClusterLeaveNotification', '1 s', 'Leaving device signals departure for this duration'],
            ['timeClusterUniquenessThreshold', '30 s', 'Cluster ID must differ from any seen in this window'],
          ]}
        />

        <h3 className="mt-6 text-lg font-semibold text-slate-200">Cluster Join / Leave Signalling</h3>
        <p>
          Cluster operations use in-band VAM signalling — no out-of-band channel (e.g. Bluetooth) is required, though optional. The <code>VruClusterOperationContainer</code> within a VAM carries one of four operations:
        </p>
        <Steps>
          <div><strong>Join notification:</strong> a standalone VRU includes <code>clusterJoinInfo</code> in its individual VAMs for timeClusterJoinNotification (3 s), indicating the target cluster ID and when it will stop transmitting. Once silent, the leader updates its cluster VAM to reflect the new member size.</div>
          <div><strong>Leave notification:</strong> a leaving member includes <code>clusterLeaveInfo</code> with a <code>ClusterLeaveReason</code> code (e.g. outOfClusterBoundingBox, SafetyCondition) for timeClusterLeaveNotification (1 s), then resumes individual VAMs.</div>
          <div><strong>Breakup:</strong> the cluster leader includes <code>clusterBreakupInfo</code> with a <code>ClusterBreakupReason</code> (e.g. clusteringPurposeCompleted, receptionOfCPMcontainingCluster) for timeClusterBreakupWarning (3 s). All members revert to standalone.</div>
          <div><strong>ID change:</strong> the leader signals a pending cluster ID rotation via <code>clusterIdChangeTimeInfo</code> for timeClusterIdChangeNotification (3 s) without revealing the new ID — protecting privacy against passive eavesdroppers.</div>
        </Steps>

        <Callout type="tip" title="CPM-triggered cluster breakup">
          When a vehicle's Collective Perception Service reports the cluster in a CPM, the cluster leader may break up the cluster with reason <code>receptionOfCPMcontainingCluster</code>. Members may then stay passive (silent) because the CPM already provides their visibility to vehicles — achieving maximum channel efficiency.
        </Callout>
      </Section>

      {/* ── 5. VAM Structure ──────────────────────────────────────── */}
      <Section id="structure" title="VAM Message Structure">
        <p>
          A VAM is a hierarchical PDU encoded in ASN.1 Unaligned PER (UPER), consistent with ETSI TS 102 894-2 (Common Data Dictionary). The <code>messageID</code> is <code>vam(16)</code> and <code>protocolVersion</code> is 3 for this release.
        </p>

        <Figure caption="VAM PDU container hierarchy (ETSI TS 103 300-3 Figure 6 / clause 7)">
          <div className="overflow-x-auto">
            <div className="flex gap-3 text-xs min-w-max">
              <div className="flex flex-col gap-2">
                <div className="rounded border border-slate-600 bg-ink-900 px-3 py-2 text-center font-bold text-slate-200 w-32">
                  ITS PDU Header
                </div>
                <div className="rounded border border-slate-700 bg-ink-900 px-2 py-1 text-slate-400 text-center w-32">protocolVersion=3</div>
                <div className="rounded border border-slate-700 bg-ink-900 px-2 py-1 text-slate-400 text-center w-32">messageID=vam(16)</div>
                <div className="rounded border border-slate-700 bg-ink-900 px-2 py-1 text-slate-400 text-center w-32">stationID (local unique)</div>
                <div className="rounded border border-slate-700 bg-ink-900 px-2 py-1 text-slate-400 text-center w-32">generationDeltaTime</div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="rounded border border-emerald-600 bg-emerald-950 px-3 py-2 text-center font-bold text-slate-200 w-36">
                  Basic Container
                  <div className="text-xs font-normal text-slate-400">mandatory</div>
                </div>
                <div className="rounded border border-emerald-800 bg-emerald-950 px-2 py-1 text-slate-400 text-center w-36">stationType (pedestrian/bicyclist/…)</div>
                <div className="rounded border border-emerald-800 bg-emerald-950 px-2 py-1 text-slate-400 text-center w-36">referencePosition (lat/lon/alt)</div>
                <div className="rounded border border-emerald-800 bg-emerald-950 px-2 py-1 text-slate-400 text-center w-36">positionConfidenceEllipse (95%)</div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="rounded border border-brand-600 bg-brand-950 px-3 py-2 text-center font-bold text-slate-200 w-40">
                  HF Container
                  <div className="text-xs font-normal text-slate-400">mandatory — fast-changing</div>
                </div>
                <div className="rounded border border-brand-800 bg-brand-950 px-2 py-1 text-slate-400 text-center w-40">heading (WGS84)</div>
                <div className="rounded border border-brand-800 bg-brand-950 px-2 py-1 text-slate-400 text-center w-40">speed (ground speed)</div>
                <div className="rounded border border-brand-800 bg-brand-950 px-2 py-1 text-slate-400 text-center w-40">longitudinalAcceleration</div>
                <div className="rounded border border-brand-800 bg-brand-950 px-2 py-1 text-slate-400 text-center w-40">lateralAcceleration</div>
                <div className="rounded border border-brand-800 bg-brand-950 px-2 py-1 text-slate-400 text-center w-40">curvature + yawRate</div>
                <div className="rounded border border-brand-800 bg-brand-950 px-2 py-1 text-slate-400 text-center w-40">vruLanePosition</div>
                <div className="rounded border border-brand-800 bg-brand-950 px-2 py-1 text-slate-400 text-center w-40">orientation (profile 2/3)</div>
                <div className="rounded border border-brand-800 bg-brand-950 px-2 py-1 text-slate-400 text-center w-40">rollAngle (profile 2/3)</div>
                <div className="rounded border border-brand-800 bg-brand-950 px-2 py-1 text-slate-400 text-center w-40">deviceUsage (profile 1)</div>
                <div className="rounded border border-brand-800 bg-brand-950 px-2 py-1 text-slate-400 text-center w-40">movementControl (profile 2)</div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="rounded border border-violet-600 bg-violet-950 px-3 py-2 text-center font-bold text-slate-200 w-40">
                  LF Container
                  <div className="text-xs font-normal text-slate-400">conditional — slow-changing</div>
                </div>
                <div className="rounded border border-violet-800 bg-violet-950 px-2 py-1 text-slate-400 text-center w-40">profileAndSubprofile</div>
                <div className="rounded border border-violet-800 bg-violet-950 px-2 py-1 text-slate-400 text-center w-40">sizeClass (low/medium/high)</div>
                <div className="rounded border border-violet-800 bg-violet-950 px-2 py-1 text-slate-400 text-center w-40">exteriorLights</div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="rounded border border-cyan-600 bg-cyan-950 px-3 py-2 text-center font-bold text-slate-200 w-40">
                  Cluster Info
                  <div className="text-xs font-normal text-slate-400">optional — leader only</div>
                </div>
                <div className="rounded border border-cyan-800 bg-cyan-950 px-2 py-1 text-slate-400 text-center w-40">clusterID</div>
                <div className="rounded border border-cyan-800 bg-cyan-950 px-2 py-1 text-slate-400 text-center w-40">boundingBox (circle/rect/polygon)</div>
                <div className="rounded border border-cyan-800 bg-cyan-950 px-2 py-1 text-slate-400 text-center w-40">clusterCardinalitySize</div>
                <div className="rounded border border-cyan-800 bg-cyan-950 px-2 py-1 text-slate-400 text-center w-40">clusterProfiles</div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="rounded border border-amber-600 bg-amber-950 px-3 py-2 text-center font-bold text-slate-200 w-40">
                  Cluster Op
                  <div className="text-xs font-normal text-slate-400">optional — join/leave/breakup</div>
                </div>
                <div className="rounded border border-amber-800 bg-amber-950 px-2 py-1 text-slate-400 text-center w-40">clusterJoinInfo</div>
                <div className="rounded border border-amber-800 bg-amber-950 px-2 py-1 text-slate-400 text-center w-40">clusterLeaveInfo + reason</div>
                <div className="rounded border border-amber-800 bg-amber-950 px-2 py-1 text-slate-400 text-center w-40">clusterBreakupInfo + reason</div>
                <div className="rounded border border-amber-800 bg-amber-950 px-2 py-1 text-slate-400 text-center w-40">clusterIdChangeTimeInfo</div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="rounded border border-rose-600 bg-rose-950 px-3 py-2 text-center font-bold text-slate-200 w-44">
                  Motion Prediction
                  <div className="text-xs font-normal text-slate-400">optional</div>
                </div>
                <div className="rounded border border-rose-800 bg-rose-950 px-2 py-1 text-slate-400 text-center w-44">pathHistory (up to 40 points)</div>
                <div className="rounded border border-rose-800 bg-rose-950 px-2 py-1 text-slate-400 text-center w-44">pathPrediction (up to 15 pts, 10 s)</div>
                <div className="rounded border border-rose-800 bg-rose-950 px-2 py-1 text-slate-400 text-center w-44">safeDistanceIndication (up to 8 stations)</div>
                <div className="rounded border border-rose-800 bg-rose-950 px-2 py-1 text-slate-400 text-center w-44">trajectoryInterceptionIndication</div>
                <div className="rounded border border-rose-800 bg-rose-950 px-2 py-1 text-slate-400 text-center w-44">accelerationChangeIndication</div>
                <div className="rounded border border-rose-800 bg-rose-950 px-2 py-1 text-slate-400 text-center w-44">headingChangeIndication</div>
                <div className="rounded border border-rose-800 bg-rose-950 px-2 py-1 text-slate-400 text-center w-44">stabilityChangeIndication</div>
              </div>
            </div>
          </div>
        </Figure>

        <h3 className="mt-6 text-lg font-semibold text-slate-200">Container Summary</h3>
        <Table
          caption="VAM containers at a glance (ETSI TS 103 300-3 clause 7)"
          headers={['Container', 'Presence', 'Key fields']}
          rows={[
            [<Badge tone="emerald">ITS PDU Header</Badge>, 'Always', 'protocolVersion=3, messageID=vam(16), stationID, generationDeltaTime (ms mod 65 536)'],
            [<Badge tone="emerald">Basic Container</Badge>, 'Always', 'stationType (pedestrian/bicyclist/moped/motorcycle/lightVRUvehicle/animal), referencePosition + positionConfidenceEllipse (95 %)'],
            [<Badge tone="brand">VRU HF Container</Badge>, 'Always', 'heading, speed, longitudinalAcceleration, curvature, yawRate, lateralAcceleration, vruLanePosition, orientation (P2/3), rollAngle (P2/3), deviceUsage (P1), movementControl (P2)'],
            [<Badge tone="violet">VRU LF Container</Badge>, 'Conditional mandatory — at least every T_GenVamLFMin = 2 000 ms, or when cluster op container present', 'profileAndSubprofile (M), sizeClass (low/medium/high), exteriorLights (M for P2 if available)'],
            [<Badge tone="cyan">Cluster Information Container</Badge>, 'Optional — cluster leader only', 'clusterID, boundingBoxShape (circle/rectangle/polygon), clusterCardinalitySize, clusterProfiles'],
            [<Badge tone="amber">Cluster Operation Container</Badge>, 'Optional — during join/leave/breakup signalling', 'clusterJoinInfo, clusterLeaveInfo + ClusterLeaveReason, clusterBreakupInfo + ClusterBreakupReason, clusterIdChangeTimeInfo'],
            [<Badge tone="rose">Motion Prediction Container</Badge>, 'Optional', 'pathHistory (up to 40 pts), pathPrediction (up to 15 pts / up to 10 s), safeDistanceIndication (up to 8 stations, TTC), trajectoryInterceptionIndication (up to 8 stations), accelerationChangeIndication, headingChangeIndication, stabilityChangeIndication'],
          ]}
        />

        <h3 className="mt-6 text-lg font-semibold text-slate-200">Notable HF Container Fields</h3>
        <DefList items={[
          { term: 'vruLanePosition', def: 'Extended lane position that covers not just road lanes but also bicycle paths, sidewalks, and islands between lanes — absent from the vehicle CAM lane position field, which only knows road lanes.' },
          { term: 'orientation', def: 'Angle of the VRU vehicle longitudinal axis relative to WGS84 north. Distinct from heading (movement direction). Critical for profile 2/3 vehicles that may have fallen and become a static obstacle.' },
          { term: 'rollAngle', def: 'Bank angle of a two-wheeler cornering. Encoded in 0.1 degree steps; positive = rolling right. Helps receivers infer cornering radius without explicit curvature data.' },
          { term: 'deviceUsage', def: 'Optional field (profile 1 only) indicating what the pedestrian is doing with their device: idle, listeningToAudio, typing, calling, playingGames, reading, viewing. Consent required; defaults to unavailable(0).' },
          { term: 'movementControl', def: 'Describes how a bicyclist is controlling longitudinal movement: braking, hardBraking, stopPedaling, and combinations. Helps vehicles predict imminent deceleration before it appears in speed data.' },
        ]} />
      </Section>

      {/* ── 6. Generation Rules and Dissemination ─────────────────── */}
      <Section id="generation" title="Generation Rules, Frequency &amp; Dissemination">

        <StatGrid cols={4}>
          <Stat value="100 ms" label="T_GenVamMin" sub="Maximum 10 Hz generation rate" />
          <Stat value="5 000 ms" label="T_GenVamMax" sub="Minimum 0.2 Hz — keep-alive interval" />
          <Stat value="2 000 ms" label="T_GenVamLFMin" sub="LF container minimum interval" />
          <Stat value="50 ms" label="T_AssembleVAM" sub="Max PDU assembly time at facilities layer" />
        </StatGrid>

        <p className="mt-4">
          The generation interval <code>T_GenVam</code> is not fixed — it is dynamically bounded between T_GenVamMin and T_GenVamMax. On ITS-G5 the Decentralized Congestion Control (DCC) mechanism provides T_GenVam from the management entity; on LTE-V2X PC5 the access-layer congestion control defined in ETSI TS 103 574 is used. If no value is provided, the VBS defaults to T_GenVamMin.
        </p>

        <h3 className="mt-4 text-lg font-semibold text-slate-200">Individual VAM Triggering Conditions</h3>
        <p>
          The VBS checks triggering conditions every T_CheckVamGen (recommended 100 ms, at most equal to T_GenVamMin). A VAM is generated if any one of the following is true and redundancy mitigation does not suppress it:
        </p>
        <Table
          caption="Individual VAM triggering conditions (ETSI TS 103 300-3 clause 6.4.1)"
          headers={['#', 'Condition', 'Threshold']}
          rows={[
            ['1', 'Time since last VAM exceeds maximum', 'T_GenVamMax = 5 000 ms'],
            ['2', 'Position change of reference point', 'More than 4 m Euclidean distance'],
            ['3', 'Ground speed change', 'More than 0.5 m/s'],
            ['4', 'Velocity orientation (heading) change', 'More than 4 degrees'],
            ['5', 'Trajectory interception probability change with another ITS-S', 'More than 10 percentage points'],
            ['6', 'VRU decided to join a cluster', 'Immediate'],
            ['7', 'Another station entered minimum safe distance envelope (lateral × longitudinal × vertical)', 'MSLaD, MSLoD, MSVD all crossed simultaneously'],
          ]}
        />

        <h3 className="mt-4 text-lg font-semibold text-slate-200">Redundancy Mitigation</h3>
        <p>
          Even if a trigger fires, the VBS skips the transmission if all of the following hold simultaneously (and the skip counter has not exceeded <code>numSkipVamsForRedundancyMitigation</code>, recommended range 2–10):
        </p>
        <ul>
          <li>Time since last transmission does not exceed numSkipVamsForRedundancyMitigation times T_GenVamMax</li>
          <li>A peer VAM has been received reporting a position within 4 m of own position</li>
          <li>The peer reports speed within 0.5 m/s</li>
          <li>The peer reports heading within 4 degrees</li>
        </ul>
        <p>
          A VAM is also suppressed if the device is in a low-risk area (pedestrian-only zone), inside a building (zero-risk area), or is a confirmed cluster member.
        </p>

        <h3 className="mt-4 text-lg font-semibold text-slate-200">Dissemination — BTP-B / SHB</h3>
        <p>
          VAM dissemination mirrors CAM: point-to-multipoint broadcast via GeoNetworking Single-Hop Broadcast (SHB) to all stations in direct communication range. The BTP header type B is used. Key transport parameters:
        </p>
        <Table
          caption="GeoNetworking/BTP parameters for VAM (ETSI TS 103 300-3 Table 4)"
          headers={['Parameter', 'Value']}
          rows={[
            ['BTP header type', 'BTP-B (ETSI TS 103 836-5-1)'],
            ['GN packet transport type', 'SHB (Single-Hop Broadcast)'],
            ['GN traffic class', 'Same as CAM'],
            ['GN maximum packet lifetime', '1 000 ms maximum'],
            ['GN communication profile', 'Unspecified, ITS-G5, or LTE-V2X as configured'],
            ['GN security profile', 'SECURED (signed) or UNSECURED per MIB'],
          ]}
        />
        <p>
          The VAM can also use the IPv6 stack or combined IPv6/GeoNetworking stack (defined in ETSI TS 103 836-3), and can use long-range cellular communication — though specific triggering profiles for cellular are not specified in the current version of ETSI TS 103 300-3.
        </p>
      </Section>

      {/* ── 7. Security and Privacy ───────────────────────────────── */}
      <Section id="security" title="Security &amp; Privacy — The Most Sensitive Message in C-ITS">
        <Callout type="warn" title="VAM is privacy-critical">
          A VAM reveals the exact real-time position, movement, and sometimes the activity of a human being. Sustained tracking of an individual pedestrian's VAM stream creates a precise route history — far more sensitive than tracking a vehicle. The standard explicitly acknowledges this tension between safety (more data = better protection) and privacy (more data = easier to track).
        </Callout>

        <h3 className="mt-4 text-lg font-semibold text-slate-200">Authentication</h3>
        <p>
          VAMs transmitted over links that do not already provide trust services shall be signed with ITS certificates (pseudonym certificates) as specified in <Ref code="ETSI TS 103 097" kind="ETSI" title="ITS Security Header and Certificate Formats" />. Signing happens at the GeoNetworking layer. The ITS-AID for VAM is registered per ETSI TS 102 965.
        </p>

        <h3 className="mt-4 text-lg font-semibold text-slate-200">Certificate Attachment Policy</h3>
        <p>
          Attaching the full certificate to every VAM wastes channel capacity. The standard defines a frequency-limited policy:
        </p>
        <ul>
          <li><strong>Individual VAM:</strong> attach certificate if 1 second or more has passed since last certificate was included, OR if a new CAM signer (new vehicle using a previously unseen certificate) has been observed. Otherwise include only a digest (hash of the certificate).</li>
          <li><strong>Cluster VAM:</strong> attach certificate if 500 ms or more has passed since last certificate was included. This higher frequency (twice per second) is needed because the cluster represents many VRUs — a missed certificate reference affects all of them.</li>
        </ul>

        <h3 className="mt-4 text-lg font-semibold text-slate-200">Pseudonymity Mechanisms</h3>
        <p>ETSI TS 103 300-3 clause 6.5.4 documents multiple mechanisms to reduce tracking risk:</p>
        <Steps>
          <div><strong>Coordinated identifier change:</strong> StationID in the ITS PDU Header changes simultaneously with the pseudonym certificate change (via the MF-SAP identity change service, clause 5.3.5). This prevents correlation between new and old certificate using a persistent MAC address or station ID.</div>
          <div><strong>Cluster privacy bonus:</strong> members of a cluster stop transmitting individual VAMs. An eavesdropper who recorded a member's VAMs before it joined cannot correlate them to post-leave VAMs if the device changes its StationID on leaving (as recommended in clause 5.4.2.2).</div>
          <div><strong>Coarse physical attributes:</strong> the size class field uses only three values (low/medium/high) instead of exact dimensions, reducing the uniqueness of each device's fingerprint.</div>
          <div><strong>Optional fields:</strong> vruDeviceUsage and other potentially unique fields can be omitted or set to unavailable(0) at the user's discretion.</div>
          <div><strong>Cluster ID change notification:</strong> the leader signals an upcoming ID rotation without revealing the new ID, protecting against eavesdroppers who are not continually listening.</div>
        </Steps>

        <Callout type="tip" title="Residual privacy risks">
          The standard candidly lists risks that persist even after these mitigations: unique RF hardware fingerprints, persistent kinematic signatures across messages, limited pseudonym certificate pools leading to certificate reuse, and non-uniform certificate validity periods that narrow group membership. A certificate policy (out of scope for TS 103 300-3) is needed to address the last two.
        </Callout>

        <h3 className="mt-4 text-lg font-semibold text-slate-200">Identity Locking for Safety</h3>
        <p>
          If the VBS detects an elevated-hazard situation, it may lock identifier changes (SN_ID_LOCK) to maintain continuity of VAMs reaching vehicles in a collision-critical window. Once the hazard passes, the lock is released (SN_ID_UNLOCK) and the normal pseudonymization schedule resumes.
        </p>
      </Section>

      {/* ── 8. False Warnings ─────────────────────────────────────── */}
      <Section id="false-warnings" title="Preventing False Warnings">
        <p>
          False positive VRU warnings (alerting a driver about a VRU that is not actually a hazard) are dangerous because they erode driver trust and may cause distraction or unnecessary braking. The VBS applies several mitigation strategies:
        </p>
        <CardGrid cols={3}>
          <Card title="Contextual filtering" accent="cyan">
            VRUs check whether their position is inside a building, pedestrian-only zone, or non-drivable area. If so, VAM transmission is suppressed or reduced (VRU-PASSIVE state).
          </Card>
          <Card title="Kinematic consistency" accent="emerald">
            Position, speed, heading, acceleration must be mutually consistent across consecutive VAMs. Receivers cross-check these fields; implausible combinations indicate sensor error or spoofing.
          </Card>
          <Card title="DENM + VAM fusion" accent="amber">
            A road-works zone sends a DENM. When a vehicle receives both a DENM for road-works AND VAMs from road workers, it increases the safety thresholds (braking distance, TTC) because adverse conditions are confirmed.
          </Card>
        </CardGrid>
        <p className="mt-4">
          The Time To Collision (TTC) calculation uses the triple of lateral distance, longitudinal distance, and vertical distance compared against minimum safe distances (MSLaD, MSLoD, MSVD). Weather context from DENM cause codes (adverseWeatherCondition-Adhesion, ExtremeWeatherCondition, Visibility, Precipitation) can be used to dynamically increase safe distance thresholds.
        </p>
      </Section>

      {/* ── 9. VAM vs CAM vs CPM ──────────────────────────────────── */}
      <Section id="relationships" title="VAM in the Broader C-ITS Ecosystem">
        <Table
          caption="VAM vs CAM vs CPM — key distinctions"
          headers={['Aspect', 'CAM', 'VAM', 'CPM']}
          rows={[
            ['Sender', 'Vehicle ITS-S (mandatory)', 'VRU ITS-S (personal device)', 'Any ITS-S with perception sensors'],
            ['Subject', 'The sending vehicle', 'The VRU carrying the device', 'Perceived objects (including non-equipped VRUs)'],
            ['Rate', '1–10 Hz (adaptive)', '0.2–10 Hz (adaptive)', 'Up to 10 Hz per perceived object'],
            ['Clustering', 'No', 'Yes — one leader per group', 'Objects aggregated by the perceiving station'],
            ['Coverage of non-equipped users', 'No', 'No (device required)', 'Yes — sensor detects unequipped VRUs'],
            ['Privacy sensitivity', 'Medium (vehicle)', 'High (human being)', 'Low (observed objects, not the sender)'],
            ['Standard', 'ETSI TS 103 900', 'ETSI TS 103 300-3', 'ETSI TS 103 324'],
          ]}
        />
        <p>
          VAM and CPM are complementary for VRU protection. A VRU that sends a VAM increases its own visibility (active awareness). Infrastructure or vehicles that perceive a VRU via CPM provide a safety net for non-equipped users (passive awareness). Where both are available, receivers can fuse both data sources.
        </p>
        <p>
          VAM and <Link to="/denm">DENM</Link> cooperate for specific scenarios: road-worker protection (DENM announces the work zone; road workers' devices send VAMs), and weather-adaptive thresholds (DENM announces adverse conditions; VRUs adjust their safe distance calculations).
        </p>
        <p>
          The VRU PKI integration follows the same pseudonym certificate model as vehicles (see <Link to="/pki">PKI and Security</Link>). Pseudonym certificates for VRUs need special handling in the certificate policy — including number of certificates per device, update frequency, and validity period homogeneity — to achieve meaningful pseudonymity at scale.
        </p>
      </Section>

      {/* ── 10. Deployment Context ────────────────────────────────── */}
      <Section id="deployment" title="Deployment Challenges &amp; Real-World Considerations">
        <p>
          The C2CCC VRU Awareness Study (WP 2087, 2021) and research projects from 2010–2021 highlight practical obstacles that the standards themselves cannot fully solve:
        </p>
        <CardGrid cols={2}>
          <Card title="Positioning accuracy" accent="amber">
            GNSS in smartphones can have 5–15 m errors in urban canyons. VAM reference position confidence ellipses must honestly represent this uncertainty. Infrastructure-assisted positioning (roadside units, UWB) can improve accuracy.
          </Card>
          <Card title="Device availability" accent="rose">
            The device must be switched on, charged, and the app running. Beacons in backpacks reduce dependency on user action (projects INMOBS, VRUITS). Animals (profile 4) and many pedestrians will never carry a VRU ITS-S device.
          </Card>
          <Card title="Channel load at scale" accent="cyan">
            Clustering is the key mitigation for dense crowds (500 or more at a crossing). CPMs from RSUs provide a complementary path for unequipped VRUs. DCC ensures channel saturation does not eliminate safety-critical transmissions.
          </Card>
          <Card title="Driver acceptance" accent="emerald">
            Drivers reject warning systems that alert them to pedestrians they have already seen. Applications must filter VAMs intelligently — only generating HMI warnings for VRUs within reaction distance and not already in the driver's field of view. Over-warning erodes trust faster than under-warning.
          </Card>
        </CardGrid>

        <Callout type="info" title="R1 to R2 evolution">
          The VAM specification was first published under Release 1 and underwent a major revision (V2.1.2 to V2.2.1) to align with the updated Common Data Dictionary (ETSI TS 102 894-2 V2.1.1). Release 2 compliance is still being completed at the time of TS 103 300-3 V2.3.1 (2025-12). Full R2 compliance will be achieved in the next revision. VRU profile 3 (motorcyclists) is the one profile where the spec explicitly states VAMs should not be sent, because the CAM already covers them — this position has been stable since Release 1.
        </Callout>
      </Section>

      {/* ── 11. Key Standards ─────────────────────────────────────── */}
      <Section id="standards" title="Key Standards">
        <DefList items={[
          {
            term: <Ref code="ETSI TS 103 300-3" kind="ETSI" title="VRU Awareness — Part 3: VRU Basic Service (VAM)" />,
            def: 'Normative specification of the VRU Basic Service protocol: message format, containers, triggering, clustering, security. V2.3.1 (2025-12) is the latest release.'
          },
          {
            term: <Ref code="ETSI TS 103 300-2" kind="ETSI" title="VRU Awareness — Part 2: Functional Architecture" />,
            def: 'Defines VRU profiles, device types, requirements, system architecture, and security analysis. V2.3.1 (2024-08).'
          },
          {
            term: <Ref code="ETSI TR 103 300-1" kind="ETSI" title="VRU Awareness — Part 1: Use Cases" />,
            def: 'Informative document defining the use cases (UC-A through UC-F) that drove the requirements in Parts 2 and 3.'
          },
          {
            term: <Ref code="ETSI TS 102 894-2" kind="ETSI" title="ITS Common Data Dictionary (CDD)" />,
            def: 'Source of all shared data elements (position, speed, heading, etc.) used in VAM containers. V2.1.1 aligned.'
          },
          {
            term: <Ref code="ETSI TS 103 097" kind="ETSI" title="ITS Security Header and Certificate Formats" />,
            def: 'Certificate and signing format used to authenticate VAMs. Basis for pseudonym certificate mechanism.'
          },
          {
            term: <Ref code="ETSI TS 103 900" kind="ETSI" title="Cooperative Awareness Service (CAM)" />,
            def: 'The CAM specification. VAM deliberately mirrors CAM dissemination parameters (traffic class, BTP-B, SHB) for consistency.'
          },
          {
            term: <Ref code="SAE J2945/9" kind="SAE" title="VRU Safety Message Minimum Performance Requirements" />,
            def: 'North American reference; VAM is designed to be harmonised with the Personal Safety Message (PSM) defined here.'
          },
        ]} />
      </Section>

      {/* ── 12. Where Next ────────────────────────────────────────── */}
      <Section id="where-next" title="Where Next?">
        <ul className="space-y-1">
          <li><Link to="/cam">CAM — Cooperative Awareness Message</Link>: the vehicle equivalent of VAM; compare triggering rules, container structure, and dissemination.</li>
          <li><Link to="/cpm">CPM — Collective Perception Message</Link>: how infrastructure and vehicles report non-equipped VRUs detected by sensors.</li>
          <li><Link to="/facilities">Facilities Layer overview</Link>: how VBS fits alongside CAS, DENM Service, and CPS within the facilities layer.</li>
          <li><Link to="/pki">PKI and Security</Link>: pseudonym certificate lifecycle, enrolment, and privacy policy for VRU devices.</li>
          <li><Link to="/denm">DENM</Link>: how DENMs for road-works and adverse weather cooperate with VAMs.</li>
        </ul>
      </Section>
    </article>
  )
}
