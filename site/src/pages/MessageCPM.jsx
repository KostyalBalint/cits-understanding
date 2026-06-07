import React from 'react'
import { Link } from 'react-router-dom'
import { PageHeader, Section, Prose, Callout, Ref, Table, StatGrid, Stat, CardGrid, Card, Steps, Figure, LayerStack, DefList, Badge } from '../components/ui.jsx'

export default function MessageCPM() {
  return (
    <article>
      <PageHeader
        kicker="Facilities Layer — Release 2"
        title="CPM — Collective Perception Message"
        intro="The CPM lets any ITS station share what its local sensors see — vehicles, pedestrians, animals, and other collision-relevant objects — so that every receiver can extend its perception beyond line of sight. By distributing detected objects over the air, the Collective Perception Service (CPS) turns the combined sensor arrays of an entire road-traffic scene into a shared awareness layer, complementing self-description messages like the CAM and VAM with third-party object reports."
        sources={['ETSI TS 103 324 V2.1.1', 'ETSI TR 103 562 V2.1.1', 'C2C-CC TR 2089']}
      />

      {/* 1. Concept and motivation */}
      <Section id="concept" title="The Concept of Collective Perception">
        <p>
          Modern vehicles and roadside units carry a rich set of on-board sensors — radars, lidars, cameras, and
          ultrasonic arrays — that detect objects in the immediate vicinity of the ITS station (ITS-S). Those
          detections are, however, inherently local and bounded by physics: occlusion, limited sensor range, and
          the absence of sensors on non-connected road users (NRUs) all create blind spots. Collective Perception
          addresses these limitations by having each sensing ITS-S broadcast its object list so that every nearby
          receiver can populate its own Local Dynamic Map (LDM) with objects it cannot directly see.
        </p>
        <p>
          The core insight is simple but powerful: a vehicle turning left at an intersection may not see a
          cyclist approaching from behind a parked lorry; a roadside camera at the junction can. If that
          camera broadcasts a CPM, the turning vehicle learns of the cyclist in time to brake, even though
          neither vehicle nor cyclist are directly visible to each other. The same principle applies to
          highway merge scenarios, sudden obstacles hidden behind a curve, and pedestrians obscured by large
          vehicles.
        </p>

        <Callout type="key" title="What CPM adds that CAM cannot">
          A <Link to="/cam">CAM</Link> describes <em>the sending vehicle itself</em>: position, speed, heading.
          A CPM describes <em>objects detected by the sender's sensors</em>: third-party vehicles, pedestrians,
          animals, and other obstacles — including objects that are entirely non-connected and therefore unable
          to send any message on their own. This is the fundamental distinction between self-announcement and
          collective perception.
        </Callout>

        <h3>Key benefits</h3>
        <CardGrid cols={3}>
          <Card title="Beyond Line of Sight" accent="brand">
            Objects hidden behind trucks, buildings, or terrain features become visible to downstream
            receivers through the sensor view of an ITS-S that has a direct sightline.
          </Card>
          <Card title="Non-Connected Road Users" accent="amber">
            Pedestrians, cyclists, animals, and legacy vehicles carry no V2X radio. The only way
            to make them visible to connected vehicles is via CPM broadcasts from equipped stations.
          </Card>
          <Card title="Multi-Source Fusion" accent="emerald">
            When several ITS-Ss perceive the same object, receivers can fuse multiple independent
            measurements, reducing position uncertainty and improving classification confidence.
          </Card>
        </CardGrid>

        <h3>Relationship to other messages</h3>
        <Table
          headers={['Message', 'Subject', 'Sender', 'Key content']}
          rows={[
            [<><Link to="/cam">CAM</Link></>, 'Sending vehicle itself', 'Vehicle ITS-S', 'Position, speed, heading, vehicle dimensions'],
            [<><Link to="/vam">VAM</Link></>, 'Sending VRU itself', 'VRU device (phone, e-bike)', 'VRU position, speed, cluster info'],
            ['CPM', "Objects detected by sender's sensors", 'Vehicle ITS-S or RSU', 'Object list: position, velocity, class, quality'],
          ]}
          caption="Self-announcement (CAM/VAM) vs. collective perception (CPM)"
        />
        <p>
          The CPM is explicitly a <em>Release 2</em> message. It was defined and standardised in
          ETSI TS 103 324 (first published as Release 2 in 2023) after simulation studies in
          ETSI TR 103 562 validated the channel-load impact and awareness gains.
        </p>
      </Section>

      {/* 2. CPS in the ITS architecture */}
      <Section id="architecture" title="Collective Perception Service in the ITS Stack">
        <p>
          The Collective Perception Service (CPS) is a <Link to="/facilities">facilities layer</Link> entity,
          sitting between ITS applications above and the <Link to="/networking">network &amp; transport layer</Link> below.
          It interfaces with several other facilities layer components:
        </p>

        <LayerStack
          layers={[
            { name: 'ITS Applications', sub: 'collision warning, traffic management, ADAS', accent: 'violet' },
            { name: 'Collective Perception Service (CPS)', sub: 'ETSI TS 103 324 — CPM encode/decode, generation management', accent: 'brand' },
            { name: 'Data Provisioning Facilities', sub: 'POTI (position/time), DDP (device data), LDM (local dynamic map)', accent: 'emerald' },
            { name: 'Security Entity', sub: 'ETSI TS 103 097 — signing, pseudonym management', accent: 'amber' },
            { name: 'Network & Transport (GeoNetworking / BTP)', sub: 'SHB broadcast, BTP-B port, max lifetime 1 000 ms', accent: 'cyan' },
            { name: 'Access Layer', sub: 'ITS-G5 (5.9 GHz) or LTE-V2X (PC5)', accent: 'rose' },
          ]}
          leftRail="Security"
          rightRail="Management"
        />

        <p>
          The CPS collects sensor data from the Device Data Provider (DDP) and the Position and Time
          management entity (POTI), fuses it into an abstract CP object list, and manages generation
          frequency, object selection, and message segmentation. On reception it decodes incoming CPMs
          and forwards object data to the LDM and/or applications.
        </p>

        <Figure caption="Sensors to perceived objects to CPM broadcast to shared awareness">
          <div className="flex flex-col gap-3 p-4">
            <div className="flex gap-4 justify-center">
              <div className="flex flex-col items-center gap-1">
                <div className="flex gap-1 text-xs text-brand-300">
                  <span className="border border-brand-400 rounded px-1 py-0.5">radar</span>
                  <span className="border border-brand-400 rounded px-1 py-0.5">lidar</span>
                  <span className="border border-brand-400 rounded px-1 py-0.5">camera</span>
                </div>
                <div className="bg-brand-700 text-white text-xs rounded px-3 py-2 font-medium">Vehicle A (ITS-S)</div>
                <div className="text-xs text-slate-400">sees: pedestrian P1</div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="flex gap-1 text-xs text-emerald-300">
                  <span className="border border-emerald-400 rounded px-1 py-0.5">camera</span>
                  <span className="border border-emerald-400 rounded px-1 py-0.5">radar</span>
                </div>
                <div className="bg-emerald-700 text-white text-xs rounded px-3 py-2 font-medium">RSU (ITS-S)</div>
                <div className="text-xs text-slate-400">sees: vehicle V2, cyclist C1</div>
              </div>
            </div>
            <div className="flex justify-center gap-8 text-slate-400 text-lg">
              <span>&#8595; CPM</span>
              <span>&#8595; CPM</span>
            </div>
            <div className="border border-dashed border-slate-500 rounded-lg p-2 text-center text-xs text-slate-400">
              ITS-G5 / LTE-V2X broadcast — GeoNetworking SHB — BTP-B
            </div>
            <div className="flex justify-center">
              <div className="flex flex-col items-center gap-1">
                <div className="bg-amber-700 text-white text-xs rounded px-4 py-2 font-medium">Vehicle B (receiver)</div>
                <div className="text-xs text-slate-300 text-center max-w-xs">
                  LDM updated with P1, V2, C1 — collision risk assessed — HMI warning triggered
                </div>
              </div>
            </div>
          </div>
        </Figure>

        <StatGrid cols={4}>
          <Stat value="1–10 Hz" label="CPM generation rate" sub="T_GenCpmMin 100 ms, T_GenCpmMax 1 000 ms" />
          <Stat value="≤ MTU" label="Max CPM size" sub="access-layer MTU minus GeoNet + BTP headers" />
          <Stat value="1 000 ms" label="GN max packet lifetime" sub="per ETSI TS 103 836 table" />
          <Stat value="0–65 535" label="Object ID range" sub="randomly assigned; 60 s retention after last use" />
        </StatGrid>
      </Section>

      {/* 3. CPM structure */}
      <Section id="structure" title="CPM PDU Structure">
        <p>
          A CPM is a Protocol Data Unit (PDU) encoded in ASN.1 UPER (Unaligned Packed Encoding Rules,
          ITU-T X.691). It consists of a common <strong>ITS PDU Header</strong> followed by a
          <strong> payload</strong> that groups one mandatory <strong>Management Container</strong> and
          up to eight additional containers wrapped in <code>WrappedCpmContainer</code> structures:
        </p>

        <Figure caption="CPM PDU container structure (ETSI TS 103 324 V2.1.1, Figure 7)">
          <div className="flex flex-col gap-1 text-sm">
            <div className="bg-slate-700 border border-slate-500 rounded px-3 py-2 font-semibold text-center text-slate-100">
              ITS PDU Header — protocolVersion · messageId · stationId
            </div>
            <div className="text-center text-slate-500 text-xs">&#8595; payload</div>
            <div className="bg-brand-900 border border-brand-500 rounded px-3 py-2 font-semibold text-center text-brand-100">
              Management Container (mandatory) — referenceTime · referencePosition · messageSegmentInfo · messageRateRange
            </div>
            <div className="text-center text-slate-500 text-xs">&#8595; cpmContainers (1–8 WrappedCpmContainer)</div>
            <div className="grid grid-cols-2 gap-1 sm:grid-cols-4">
              <div className="bg-violet-900 border border-violet-500 rounded px-2 py-2 text-center text-xs text-violet-100">
                <div className="font-semibold mb-1">Originating Vehicle Container</div>
                <div className="text-violet-300">orientationAngle · pitchAngle · rollAngle · trailerData</div>
              </div>
              <div className="bg-emerald-900 border border-emerald-500 rounded px-2 py-2 text-center text-xs text-emerald-100">
                <div className="font-semibold mb-1">Sensor Information Container</div>
                <div className="text-emerald-300">sensorId · sensorType · perceptionRegionShape · shadowingApplies · perceptionRegionConfidence</div>
              </div>
              <div className="bg-cyan-900 border border-cyan-500 rounded px-2 py-2 text-center text-xs text-cyan-100">
                <div className="font-semibold mb-1">Perception Region Container</div>
                <div className="text-cyan-300">measurementDeltaTime · perceptionRegionShape · perceptionRegionConfidence · sensorIdList · perceivedObjectIds</div>
              </div>
              <div className="bg-amber-900 border border-amber-500 rounded px-2 py-2 text-center text-xs text-amber-100">
                <div className="font-semibold mb-1">Perceived Object Container</div>
                <div className="text-amber-300">numberOfPerceivedObjects · list of PerceivedObject instances</div>
              </div>
            </div>
            <div className="text-center text-slate-500 text-xs mt-1">
              (RSU variant replaces Originating Vehicle Container with Originating RSU Container)
            </div>
          </div>
        </Figure>

        <Table
          headers={['Container', 'Presence', 'Purpose']}
          rows={[
            ['ITS PDU Header', 'Mandatory', 'Protocol version, message type (messageId = CPM), originating station ID'],
            ['Management Container', 'Mandatory', 'Reference time (TimestampIts) and reference position; segment info if CPM is split; optional message-rate range hint'],
            ['Originating Vehicle Container', 'Mandatory for vehicle ITS-S', 'Vehicle orientation angle; optional pitch/roll; trailer hitch data for sensors mounted on trailers'],
            ['Originating RSU Container', 'Mandatory for roadside ITS-S', 'Optional map reference (IntersectionReferenceID or RoadSegmentID) linking to a MAPEM'],
            ['Sensor Information Container (SIC)', 'Conditional — see §6.1.2.2', 'One SensorInformation entry per sensor: type, field-of-view shape, shadowing flag, perception confidence'],
            ['Perception Region Container (PRC)', 'Optional', 'Dynamic overrides or refinements of SIC capabilities: sub-regions with different confidence levels or shadowing behaviour'],
            ['Perceived Object Container (POC)', 'Mandatory', 'Total object count + list of PerceivedObject entries selected for this CPM'],
          ]}
          caption="CPM containers and their roles (ETSI TS 103 324 V2.1.1, §7.1)"
        />
      </Section>

      {/* 4. Container details */}
      <Section id="containers" title="Container Details">

        <h3>Management Container</h3>
        <p>
          The Management Container is the foundation for interpreting the entire CPM. Its
          <code> referenceTime</code> is a common timestamp (TimestampIts, milliseconds since
          2004-01-01T00:00:00Z) used as the temporal anchor for all <code>measurementDeltaTime</code>
          values in the Perceived Object Container. The <code>referencePosition</code> for a vehicle
          ITS-S is the ground position at the centre of the front edge of the vehicle bounding box,
          consistent with ETSI EN 302 890-2 (POTI). For roadside ITS-Ss the position is freely chosen
          by the sender. When a large object list forces the CPS to split data across multiple CPMs,
          <code> messageSegmentInfo</code> carries the segment count and index so receivers can
          reassemble the full picture.
        </p>

        <h3>Sensor Information Container (SIC)</h3>
        <p>
          The SIC describes the sensing capabilities of the originating ITS-S at the time of CPM
          generation. Each <code>SensorInformation</code> record covers one sensor or sensor subsystem:
        </p>
        <Table
          headers={['Field', 'Description']}
          rows={[
            ['sensorId', 'Local identifier (0–15) linking back to objects via sensorIdList in the POC. After a pseudonym change, replaced with freshly randomised IDs held back for UnusedSensorIdRetentionPeriod (default 60 s).'],
            ['sensorType', 'Sensor technology: undefined (0), radar (1), lidar (2), monovideo (3), stereovision (4), nightvision (5), ultrasonic (6), pmd (7), fusion (8), inductionLoop (9), sphericalCamera (10), itssAggregation (13), and more.'],
            ['perceptionRegionShape', "Geometric shape (polygon, circle, ellipse, rectangle, or 3-D extrusion) of the sensor's field of view (FoV) in the vehicle body-fixed coordinate system (ISO 8855) for vehicle ITS-Ss, or East-North-Up for RSUs. Mandatory except for sensor types undefined, localAggregation, itssAggregation."],
            ['shadowingApplies', 'Boolean: TRUE if the given perceptionRegionConfidence does NOT apply to shadowed sub-regions behind detected objects (i.e. there may be occluded, undetected objects). FALSE if the confidence applies uniformly including shadows.'],
            ['perceptionRegionConfidence', 'Probability with which objects or unoccupied regions within the FoV are correctly detected.'],
          ]}
          caption="SensorInformation fields (ETSI TS 103 324 V2.1.1, §7.1.6)"
        />
        <Callout type="tip" title="Shadowing and ray-tracing">
          A receiver that knows a sensor's FoV shape and gets an object's bounding-box geometry can apply
          ray-tracing from the sensor's mounting point to the object corners, computing the shadow region
          behind the object. The <code>shadowingApplies</code> flag tells the receiver whether to treat
          that shadow as potentially occupied (TRUE) or confirmed-clear (FALSE).
        </Callout>

        <h3>Perception Region Container (PRC)</h3>
        <p>
          The PRC refines or overrides what the SIC describes. Each <code>PerceptionRegion</code> is a
          sub-area or overlay that can carry a different <code>perceptionRegionConfidence</code> level,
          a different <code>shadowingApplies</code> value, or a different set of linked sensor IDs. It
          is used, for example, to annotate a region behind an object with a lowered confidence, or to
          mark a radar-detectable through-occlusion region with higher confidence than the default. The
          spec limits the number of PerceptionRegion instances per CPM to{' '}
          <code>MaxPerceptionRegions</code> (default 8) to keep message sizes bounded.
        </p>

        <h3>Perceived Object Container (POC)</h3>
        <p>
          The POC is the heart of the CPM. It starts with the total count of objects currently in the
          LDM (<code>numberOfPerceivedObjects</code>), then lists the subset actually included in this
          CPM. Each <code>PerceivedObject</code> entry carries:
        </p>
        <Table
          headers={['Field group', 'Fields', 'Notes']}
          rows={[
            ['Identity & time', 'objectId (0–65535) · measurementDeltaTime', 'objectId is randomly assigned, maintained per object while tracked. measurementDeltaTime is the offset in ms from referenceTime to the actual sensor measurement epoch, accounting for processing latency.'],
            ['Position (mandatory)', 'xDistance · yDistance · zDistance (optional)', 'East-North-Up offset from the ITS-S reference position in centimetres, each with a 95% confidence value.'],
            ['Velocity', 'xSpeed · ySpeed · zSpeed (optional) OR polar speed magnitude + direction', "Speed in the sending station's reference frame (body-fixed for vehicle, ENU for RSU). Cartesian and polar are mutually exclusive."],
            ['Acceleration', 'xAcceleration · yAcceleration · zAcceleration (optional) OR polar', 'Same coordinate convention as velocity.'],
            ['Attitude', 'yawAngle · pitchAngle · rollAngle (optional)', 'Euler angles of the object bounding box; all CartesianAngle with 95% confidence.'],
            ['Angular rates', 'yawRate · pitchRate · rollRate (optional)', 'CartesianAngularSpeed at 0.01°/s resolution with AngularSpeedConfidence enum.'],
            ['Dimensions', 'objectDimensionX · objectDimensionY · objectDimensionZ (optional)', 'Bounding-box extents in each axis.'],
            ['Age & quality', 'objectAge (mandatory) · objectPerceptionQuality · objectConfidence (optional)', 'Age in ms (0–1500); quality 0–15 scalar; confidence 0–15 scalar. Both computed via EMA process (see §Object Quality).'],
            ['Classification', 'classification (optional)', 'One or more ObjectClassWithConfidence entries: vehicleSubclass (passengerCar, lightTruck, bus…), vruSubclass (pedestrian, bicyclist, motorcyclist, animal), groupSubclass (VRU cluster/group), otherSubclass.'],
            ['Sensor link', 'sensorIdList (optional)', 'References SIC sensorId values that contributed measurements for this object.'],
            ['Correlation matrices', 'lowerTriangularCorrelationMatrices (optional)', 'Up to 4 LowerTriangularPositiveSemidefiniteMatrix blocks — Bravais-Pearson correlations for kinematic state components at 95% confidence, scaled by 100 in integer encoding.'],
            ['Map link', 'mapPosition (RSU only)', 'Lane or connection ID referencing the MAPEM cited in the Originating RSU Container.'],
          ]}
          caption="PerceivedObject fields (ETSI TS 103 324 V2.1.1, §7.1.8)"
        />

        <Callout type="info" title="VRU groups and clusters in the POC">
          A pedestrian crowd or bicycle platoon detected by a sensor can be reported as a single
          <code> groupSubclass</code> entry with a <code>clusterCardinalitySize</code> count, saving
          significant bandwidth. If the group corresponds to a VRU cluster advertised in a received{' '}
          <Link to="/vam">VAM</Link>, a <code>clusterId</code> field links the two records.
        </Callout>
      </Section>

      {/* 5. Object quality */}
      <Section id="quality" title="Object Perception Quality and Confidence">
        <p>
          Two distinct scalar quality indicators are associated with each perceived object, both
          normalised to the range 0–15. Their computation was developed and proposed to ETSI by the
          CAR 2 CAR Communication Consortium (C2C-CC TR 2089, 2021) and is now normatively referenced
          from ETSI TS 103 324 V2.1.1.
        </p>

        <Callout type="key" title="Accuracy vs. Confidence — two separate concepts">
          <strong>Accuracy</strong> (per-component confidence values and optional correlation matrices)
          captures how precisely the sensor estimated each state variable — the tightness of the
          position/speed probability distribution. <strong>Object confidence / perception quality</strong>
          captures how certain the system is that the object actually <em>exists</em> at all — the
          probability it is a real detection rather than a ghost or artefact. These are orthogonal:
          a ghost may have a very tight position estimate; a real object may have a noisy one.
        </Callout>

        <h3>objectPerceptionQuality (normative, 0–15)</h3>
        <p>
          <code>objectPerceptionQuality</code> is a 4-bit scalar computed as a weighted average of
          three ratings, each scaled to 0–15:
        </p>
        <Steps>
          <div>
            <strong>Detection confidence rating r<sub>c</sub>:</strong> Apply an Exponential Moving Average
            (EMA) with factor &alpha; (default 0.5) over the sensor- or fusion-system-specific detection
            confidence c<sub>t</sub> ∈ [0,1]. Then r<sub>c</sub> = floor(EMA<sub>t</sub> × 15).
          </div>
          <div>
            <strong>Detection success rating r<sub>d</sub>:</strong> Apply the same EMA to the binary
            detection success d<sub>t</sub> ∈ {'{ '}0, 1{'}'} (whether the last measurement
            successfully tracked the object). Then r<sub>d</sub> = floor(EMA<sub>t</sub> × 15).
          </div>
          <div>
            <strong>Object age rating r<sub>oa</sub>:</strong> r<sub>oa</sub> = min(floor(objectAge / 100), 15).
            An object tracked for 1 500 ms achieves the maximum rating of 15; a brand-new detection scores 0.
          </div>
          <div>
            <strong>Weighted average:</strong> objectPerceptionQuality = floor(
            (w<sub>d</sub>·r<sub>d</sub> + w<sub>c</sub>·r<sub>c</sub> + w<sub>oa</sub>·r<sub>oa</sub>) /
            (w<sub>d</sub> + w<sub>c</sub> + w<sub>oa</sub>)). Default weights
            w<sub>d</sub> = w<sub>c</sub> = w<sub>oa</sub> = 1 (equal).
          </div>
        </Steps>
        <p>
          Only objects with <code>objectPerceptionQuality</code> above{' '}
          <code>ObjectPerceptionQualityThreshold</code> (default 3) are eligible for inclusion in a CPM.
          This filters out ghost detections and very-newly-detected objects that have not yet accumulated
          tracking confidence.
        </p>

        <h3>Accuracy representation — standard deviations and correlations</h3>
        <p>
          For every kinematic or attitude component provided, the sender must also supply the corresponding
          standard deviation at 95% confidence level. Optionally the sender may include cross-component
          correlation information encoded as a lower-triangular positive semi-definite matrix
          (LowerTriangularPositiveSemidefiniteMatrix). The C2C-CC study evaluated four covariance
          representation strategies — full covariance matrix, block covariance, variances only, LDL
          decomposition — and recommended <strong>standard deviations plus optional Bravais-Pearson
          correlations</strong> as the best balance between information completeness, interpretability by
          engineers, and message byte budget. The normative ETSI spec adopted this recommendation.
        </p>
        <p>
          A receiver reconstructs the full covariance matrix C = A·D·A, where A is the diagonal matrix
          of received standard deviations and D is the correlation matrix reconstructed from the
          lower-triangular column entries. Correlation values are integers in the range –100 to +100
          (representing –1.00 to +1.00 Bravais-Pearson correlation, scaled by 100).
        </p>
      </Section>

      {/* 6. Generation rules */}
      <Section id="generation" title="CPM Generation Rules and Frequency Management">
        <p>
          CPMs are generated quasi-periodically. The interval between consecutive generation events
          is T_GenCpm, bounded by:
        </p>
        <StatGrid cols={3}>
          <Stat value="100 ms" label="T_GenCpmMin" sub="lower bound (50 ms allowed for some RSU use cases)" />
          <Stat value="1 000 ms" label="T_GenCpmMax" sub="upper bound — object must be included if this time has elapsed" />
          <Stat value="1 000 ms" label="T_AddSensorInformation" sub="maximum gap between SIC repetitions" />
        </StatGrid>

        <h3>Sensor Information Container inclusion</h3>
        <p>
          The SIC is mandatory in the first generated CPM and thereafter whenever the time since the
          last SIC-bearing CPM equals or exceeds T_AddSensorInformation (default 1 000 ms). After a
          pseudonym change the SIC may be omitted for a short period to break the link between old and
          new pseudonym.
        </p>

        <h3>Perceived Object inclusion — two object types</h3>
        <p>
          The spec defines two object types solely for inclusion management purposes (these type labels
          carry no meaning outside this context):
        </p>
        <DefList
          items={[
            { term: 'Type-A objects', def: 'VRU subclass pedestrian, bicyclist / light VRU vehicle, or animal; groupSubclass; otherSubclass. These are the most safety-critical and are included more aggressively — always when any Type-A object has not been updated for T_GenCpmMax / 2 (500 ms), all Type-A objects are included.' },
            { term: 'Type-B objects', def: 'vehicleSubclass and vruSubclass motorcyclist. Larger, slower-changing objects managed with dynamics-based thresholds to avoid unnecessary repetition.' },
          ]}
        />
        <p>
          An object must first pass the quality gate (objectPerceptionQuality {'>'} threshold). Then it is
          selected for inclusion if ANY of the following conditions holds:
        </p>
        <Table
          headers={['Object type', 'Condition', 'Default threshold']}
          rows={[
            ['Type-A', 'First detected since last generation event', '—'],
            ['Type-A', 'Any Type-A not included for ≥ T_GenCpmMax/2 → include ALL Type-A', '500 ms'],
            ['Type-B', 'First detected since last generation event', '—'],
            ['Type-B', 'Position change since last CPM inclusion', 'minPositionChangeThreshold = 4 m'],
            ['Type-B', 'Speed change since last inclusion', 'minGroundSpeedChangeThreshold = 0.5 m/s'],
            ['Type-B', 'Velocity orientation change since last inclusion', 'minGroundVelocityOrientationChangeThreshold = 4°'],
            ['Type-B', 'Time elapsed since last inclusion ≥ T_GenCpmMax', '1 000 ms'],
          ]}
          caption="Perceived object inclusion rules (ETSI TS 103 324 V2.1.1, §6.1.2.3 and Annex F)"
        />

        <Callout type="tip" title="Look-ahead optimisation to reduce message count">
          To reduce the total number of CPM transmissions, a sender may predict the state of Type-B
          objects at the next generation event (T_GenCpm ahead, using a constant-velocity model).
          Objects that would be triggered at the next event are pre-included in the current CPM at
          their latest measured state. This can cause some generation events to produce no new CPM.
        </Callout>

        <h3>Redundancy mitigation — Value of Information (VoI)</h3>
        <p>
          When multiple ITS-Ss detect the same physical object, repeated identical broadcasts waste
          channel capacity. The CPS uses the <em>Value of Information (VoI)</em> concept to prioritise
          or suppress objects. Annex E of TS 103 324 lists several computable VoI methods:
        </p>
        <Table
          headers={['Method', 'VoI basis', 'Effect']}
          rows={[
            ['Frequency-based', 'Inversely proportional to recent CPMs received from others about this object', 'If already well-covered by neighbours, deprioritise'],
            ['Dynamics-based', 'Distance/speed difference between local estimate and last received CPM for object', 'Only retransmit when object has changed vs. what neighbours already broadcast'],
            ['Distance-based', 'Distance to farthest neighbour broadcasting this object', 'Suppress if a nearby station already covers it'],
            ['Angle-based', 'Largest orientation difference between local and remote sender-to-object vectors', 'Unique viewing angles increase VoI'],
            ['Classification confidence', 'Difference in object confidence between local and remote broadcaster', 'Better-qualified detections have higher VoI'],
            ['Object self-announcement', 'Inversely proportional to CAMs/VAMs received from the object itself', 'If the object is V2X-equipped and broadcasting, CPM may be suppressed'],
          ]}
          caption="VoI methods for redundancy mitigation (ETSI TS 103 324 V2.1.1, Annex E)"
        />
      </Section>

      {/* 7. CPM assembly and segmentation */}
      <Section id="assembly" title="CPM Assembly and Segmentation">
        <p>
          A single CPM must fit within <code>MTU_CPM</code> — the access-layer MTU minus GeoNetworking,
          BTP, and facilities-layer header overhead. If the selected object list exceeds this budget,
          the CPS assembles multiple CPMs from the same generation event, each independently decodable
          and sharing the same <code>referenceTime</code>. The Management Container's{' '}
          <code>messageSegmentInfo</code> field carries the total segment count and this CPM's index.
        </p>
        <p>
          Two assembly strategies exist, selected by <code>MessageAssemblyConfig</code>:
        </p>
        <CardGrid cols={2}>
          <Card title="Object utility function (config 0)" accent="brand">
            Objects are ranked by a composite utility score summing normalised contributions from
            objectPerceptionQuality, position-change magnitude, speed-change magnitude,
            orientation-change magnitude, and time since last inclusion. CPMs are filled in descending
            utility order until MTU_CPM is reached; overflow rolls into the next CPM.
            Recommended when ObjectInclusionConfig = 1.
          </Card>
          <Card title="Perception-region based (config 1)" accent="emerald">
            Objects belonging to the same overlapping perception region are kept together in the same
            CPM. If a region's objects alone would exceed MTU_CPM, the region is spatially subdivided.
            Useful for RSU deployments where preserving spatial coherence of region/object associations
            matters more than utility ranking.
          </Card>
        </CardGrid>

        <Callout type="warn" title="Channel resource management with MCO">
          When the ITS-S supports Multi-Channel Operation (MCO), the CPM generation frequency T_GenCpm
          and the object count per CPM are jointly optimised to stay within a channel resource budget
          (bits/s) provided by the MCO_FAC entity (ETSI TS 103 141). Objects with the lowest VoI are
          dropped first; high-VoI objects may be promoted to alternative channels.
        </Callout>
      </Section>

      {/* 8. Dissemination */}
      <Section id="dissemination" title="Dissemination — Networking and Transport">
        <p>
          The CPS hands CPMs to the network and transport layer with the following mandatory protocol
          control information (PCI):
        </p>
        <Table
          headers={['PCI parameter', 'Value', 'Notes']}
          rows={[
            ['BTP header type', 'BTP-B (destination port, no source port)', 'ETSI TS 103 836-5-1, §7.2.2'],
            ['Destination port', 'As registered by the ITS-AID authority', 'ITS-AID identifies the CPM service — ETSI TR 102 965'],
            ['GeoNetworking packet type', 'Single Hop Broadcast (SHB)', 'One-hop dissemination; no multi-hop routing needed'],
            ['GN communication profile', 'Unspecified / ITS-G5 / LTE-V2X', 'Determined by deployment configuration or MIB'],
            ['GN maximum packet lifetime', '≤ 1 000 ms', 'Stale perception data must not persist in network buffers'],
            ['GN security profile', 'SECURED (signed) or UNSECURED', 'Signed with Authorization Ticket per ETSI TS 103 097'],
          ]}
          caption="GeoNetworking/BTP PCI for CPM (ETSI TS 103 324 V2.1.1, Table 2)"
        />
        <p>
          CPMs may also be transported over IPv6 or a combined IPv6/GeoNetworking stack, as described
          in ETSI TS 103 836-3. In IP-based scenarios (e.g. backend or cloud connectivity), security
          is provided by IPsec, DTLS, or TLS rather than the ITS certificate framework, and trust is
          established by mutual authentication between known actors.
        </p>
      </Section>

      {/* 9. Security and privacy */}
      <Section id="security" title="Security and Privacy">
        <p>
          CPMs carry object data derived from local sensors. The security framework follows the same
          certificate-based trust model used for <Link to="/cam">CAM</Link>s and{' '}
          <Link to="/vam">VAM</Link>s, as specified in the <Link to="/pki">PKI</Link> architecture:
        </p>
        <Steps>
          <div>
            <strong>Message signing:</strong> Every CPM transmitted by an ITS-S using the ETSI PKI
            trust model (ETSI TS 102 940) must be signed with the private key associated with a valid
            Authorization Ticket (AT). The signing format follows ETSI TS 103 097.
          </div>
          <div>
            <strong>ITS-AID and SSP:</strong> The AT's ITS-Application Identifier (ITS-AID) grants
            permission to send CPMs. The Service Specific Permission (SSP) is a BitmapSsp; the current
            version contains only a one-byte version field (value 1). A receiving ITS-S must verify
            AID and SSP consistency before accepting a CPM.
          </div>
          <div>
            <strong>Pseudonym changes:</strong> When the Security entity triggers a pseudonym change
            (new AT with fresh ITS-S ID), the CPS updates the stationId in the ITS PDU Header
            immediately and discards queued CPMs carrying the old ID. All previously tracked
            objectIds and sensorIds are replaced with new random values. The SIC may be omitted
            briefly after the change to prevent correlation of old and new pseudonyms via stable
            sensor FoV descriptions.
          </div>
          <div>
            <strong>Misbehaviour detection:</strong> ETSI TR 103 460 provides guidance on plausibility
            checks for received CPMs. Receivers may optionally validate incoming object data against
            their own sensor readings and local context before trusting it.
          </div>
        </Steps>

        <Callout type="warn" title="Privacy considerations for object reports">
          A CPM from a fixed RSU broadcasting detected objects can, over time, reveal pedestrian
          movement patterns and traffic flows. The standard does not mandate object-level anonymisation
          but implementers should consider data minimisation (include only safety-relevant objects)
          and the interaction of object ID retention periods (60 s) with location privacy requirements.
        </Callout>
      </Section>

      {/* 10. R1 vs R2 evolution */}
      <Section id="evolution" title="Release 1 vs. Release 2 Evolution">
        <p>
          The CPM is a <Badge tone="brand">Release 2</Badge> message — it did not exist in Release 1.
          The concept was analysed in ETSI TR 103 562 (published December 2019) before the normative
          specification ETSI TS 103 324 was finalised. The R2 version V2.1.1 (June 2023) represents
          the current standardised form and incorporates feedback from the C2C-CC object quality study
          and ETSI working group iterations. Key R2 improvements over earlier drafts include:
        </p>
        <CardGrid cols={2}>
          <Card title="Structured object quality scalar" accent="amber">
            The <code>objectPerceptionQuality</code> scalar and its EMA-based computation, contributed
            by C2C-CC TR 2089, replaced a simpler percentage-based <code>objectConfidence</code> field
            (0–101%). The 0–15 range makes efficient use of 4 bits in UPER encoding.
          </Card>
          <Card title="Full 18-D kinematic state space" accent="brand">
            R2 defines a comprehensive kinematic and attitude state space including roll/pitch/yaw
            angles, angular rates, and angular accelerations (CartesianAngularSpeed at 0.01°/s,
            CartesianAngularAcceleration at 0.01°/s²). Earlier drafts covered only 2-D position
            and speed.
          </Card>
          <Card title="Correlation matrices for fusion" accent="emerald">
            Optional LowerTriangularPositiveSemidefiniteMatrix entries allow transmitters to share
            cross-correlations between kinematic state components, enabling better Kalman filter
            initialisation at receivers doing multi-source data fusion.
          </Card>
          <Card title="Flexible WrappedCpmContainer envelope" accent="violet">
            The type-tagged container wrapper allows future container types to be added without
            breaking existing parsers — an explicit forward-compatibility mechanism not present in
            earlier CAM or DENM message families.
          </Card>
        </CardGrid>
      </Section>

      {/* 11. Practical notes */}
      <Section id="practical" title="Practical Deployment Notes">
        <Callout type="example" title="RSU at an intersection">
          A smart intersection RSU equipped with four cameras and two radars covers all approaches.
          Its SIC lists six sensors with their respective FoV cones in East-North-Up coordinates.
          At each 100 ms generation event the RSU selects objects (vehicles, cyclists, pedestrians)
          detected in the past cycle and broadcasts a CPM. An approaching truck receives the CPM,
          discovers a cyclist in the cross-street not visible due to the building on the corner,
          and triggers a HMI warning 200 ms before the potential conflict point.
        </Callout>
        <DefList
          items={[
            {
              term: 'Channel load vs. object count trade-off',
              def: 'At 10 Hz with many objects, a single CPM can consume a significant fraction of the available ITS-G5 channel (10 MHz at 5.9 GHz). The VoI-based redundancy mitigation and MCO resource limits are the primary tools for keeping channel occupancy acceptable. Simulation studies in TR 103 562 showed that dynamics-based inclusion rules substantially outperform naive fixed-rate broadcasts in both awareness quality and channel efficiency.'
            },
            {
              term: 'LDM integration at the receiver',
              def: 'Received CPM objects must be tracked and predicted between reception events. An object not refreshed for T_GenCpmMax (1 000 ms) may have moved significantly. Receivers should apply Kalman or equivalent prediction filters using the provided velocity and acceleration data, and optionally the correlation matrices for filter initialisation.'
            },
            {
              term: 'Data fusion across multiple CPM sources',
              def: 'When vehicle B receives CPMs from both vehicle A and an RSU about the same pedestrian, it must associate the two object reports (using position, velocity, and classification confidence as matching criteria) before fusing them. The association confidence threshold C_InclusionRateControl (default 50%) also governs whether received CPM data is considered to cover a locally detected object for VoI computation purposes.'
            },
            {
              term: 'Coordinate systems',
              def: 'Vehicle ITS-Ss use the ISO 8855 body-fixed coordinate system (x forward, y left, z up) for sensor FoVs and object positions. RSUs use the East-North-Up (ENU) system. Receivers must account for the originating station orientation (from the Originating Vehicle Container orientation angle) to transform object coordinates into a global frame for LDM storage.'
            },
          ]}
        />
      </Section>

      {/* 12. Key standards */}
      <Section id="standards" title="Key Standards">
        <p>
          <Ref code="ETSI TS 103 324" title="Collective Perception Service" kind="ETSI" /> — normative
          specification for the CPS, CPM PDU structure, generation rules, security permissions, and
          configuration parameters. V2.1.1 (June 2023) is the current Release 2 version.
        </p>
        <p>
          <Ref code="ETSI TR 103 562" title="Analysis of the Collective Perception Service" kind="ETSI" /> —
          informative technical report with use-case analysis, simulation results for generation rules and
          DCC interaction, redundancy mitigation techniques, and the earlier CPM format proposal that fed
          into TS 103 324.
        </p>
        <p>
          <Ref code="C2C-CC TR 2089" title="CPM Object Quality" kind="C2CCC" /> — C2C-CC technical report
          that defined the object accuracy representation (standard deviations + correlations) and object
          confidence (EMA-based scalar) now normatively adopted in ETSI TS 103 324 V2.1.1.
        </p>
        <p>
          <Ref code="ETSI TS 102 894-2" title="Common Data Dictionary — Release 2" kind="ETSI" /> — data
          elements and frames imported by the CPM ASN.1 modules (e.g. TimestampIts, SemiAxisLength).
        </p>
        <p>
          <Ref code="ETSI EN 302 890-2" title="POTI — Position and Time Management" kind="ETSI" /> — defines
          the vehicle reference position, heading conventions, and TimestampIts format used by the
          Management Container.
        </p>
        <p>
          <Ref code="ETSI TS 103 097" title="Security Header and Certificate Formats — Release 2" kind="ETSI" /> —
          signing and Authorization Ticket format for CPM security.
        </p>
        <p>
          <Ref code="ETSI TS 103 836-5-1" title="GeoNetworking — Basic Transport Protocol" kind="ETSI" /> —
          BTP-B encapsulation used to carry CPMs over GeoNetworking.
        </p>
        <p>
          <Ref code="ETSI TS 103 141" title="Multi-Channel Operation (MCO)" kind="ETSI" /> — defines the
          MCO_FAC interface and resource_limit mechanism used by the CPS frequency and content management.
        </p>
        <p>
          <Ref code="ETSI TS 103 300-3" title="VRU Awareness Service — Release 2" kind="ETSI" /> — VAM spec;
          defines VRU cluster operations referenced by the <code>groupSubclass</code> in CPM.
        </p>
      </Section>

      {/* 13. Where next */}
      <Section id="where-next" title="Where Next">
        <CardGrid cols={3}>
          <Card title="CAM — Cooperative Awareness Message" accent="brand">
            The self-announcement complement to CPM.{' '}
            <Link to="/cam">Learn how vehicles describe themselves &rarr;</Link>
          </Card>
          <Card title="VAM — VRU Awareness Message" accent="emerald">
            VRUs announcing their own presence; cluster IDs link into CPM group objects.{' '}
            <Link to="/vam">VAM page &rarr;</Link>
          </Card>
          <Card title="Facilities Layer" accent="violet">
            How CPS sits alongside DENM, MAPEM, and other services.{' '}
            <Link to="/facilities">Facilities overview &rarr;</Link>
          </Card>
          <Card title="Networking & GeoNetworking" accent="cyan">
            SHB, BTP-B, and the GeoNetworking stack that carry CPMs over the air.{' '}
            <Link to="/networking">Networking page &rarr;</Link>
          </Card>
          <Card title="Security & PKI" accent="amber">
            Authorization Tickets, pseudonym changes, and the ITS certificate trust model.{' '}
            <Link to="/pki">PKI page &rarr;</Link>
          </Card>
          <Card title="CAR 2 CAR Consortium" accent="rose">
            Industry body that contributed the object quality study driving CPM R2 improvements.{' '}
            <Link to="/car2car">CAR 2 CAR page &rarr;</Link>
          </Card>
        </CardGrid>
      </Section>
    </article>
  )
}
