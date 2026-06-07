import React from 'react'
import { Link } from 'react-router-dom'
import { PageHeader, Section, Prose, Callout, Ref, Table, StatGrid, Stat, CardGrid, Card, Steps, Figure, LayerStack, DefList, Badge } from '../components/ui.jsx'

export default function MessageCAM() {
  return (
    <article>
      <PageHeader
        kicker="Facilities Layer"
        title="CAM — Cooperative Awareness Message"
        intro="The CAM is the heartbeat of C-ITS. Every vehicle, cyclist, and roadside unit broadcasts its position, speed, heading, and dimensions periodically so that all neighbours can build and maintain a real-time picture of the traffic around them. This situational awareness underpins every safety application from emergency-vehicle warning to intersection collision avoidance."
        sources={['ETSI EN 302 637-2', 'ETSI TS 103 900', 'ETSI TS 102 637-2']}
      />

      {/* ── 1. Purpose & Motivation ── */}
      <Section id="purpose" title="Purpose and motivation">
        <p>
          Cooperative awareness means that every road user and piece of roadside infrastructure knows about the
          presence, type, position, and motion of every other participant within radio range. This awareness is
          the prerequisite for a whole class of safety and efficiency applications — emergency vehicle warning,
          slow vehicle indication, intersection collision risk warning, motorcycle approaching indication, and
          many more.
        </p>
        <p>
          The CAM is the standard message that carries this awareness information. Each originating
          ITS-Station (ITS-S) — a car, truck, bus, motorcycle, cyclist, or Road Side Unit (RSU) — constructs
          a CAM from its own sensor data and broadcasts it to all neighbours within single-hop radio range.
          Recipients feed the data into their Local Dynamic Map (LDM), enabling applications to compare the
          state of a remote vehicle with their own state and to alert the driver when a collision risk is
          detected.
        </p>
        <p>
          The construction, management, and processing of CAMs is the responsibility of the
          <strong> Cooperative Awareness Basic Service</strong> (CA basic service, or in Release 2:
          <strong> Cooperative Awareness Service, CAS</strong>), a mandatory facility for all ITS-Ss
          participating in road traffic. The service sits at the <Link to="/facilities">Facilities Layer</Link> and
          interfaces downward to the <Link to="/networking">Networking &amp; Transport Layer</Link> for
          dissemination and upward to applications or the LDM for data delivery.
        </p>
        <Callout type="key" title="One sentence summary">
          Every ITS station broadcasts a CAM at 1–10 Hz; neighbours use those messages to know who and
          where everyone is — the basic building block for all V2X safety.
        </Callout>
        <StatGrid cols={4}>
          <Stat value="1–10 Hz" label="Vehicle CAM rate" sub="Adaptive, based on dynamics" />
          <Stat value="100 ms" label="T_GenCamMin" sub="Fastest allowed interval" />
          <Stat value="1 000 ms" label="T_GenCamMax" sub="Slowest allowed interval" />
          <Stat value="50 ms" label="Max build time" sub="Trigger to NTL delivery" />
        </StatGrid>
      </Section>

      {/* ── 2. Stack position ── */}
      <Section id="stack" title="Where CAM sits in the ITS stack">
        <p>
          The CA basic service / CAS is placed in the <em>Application Support</em> domain of the Facilities
          Layer (ETSI EN 302 665). It interacts with the following entities:
        </p>
        <LayerStack
          layers={[
            { name: 'ITS Applications', sub: 'Road Hazard Signalling, ICRW, LCRW, …', accent: 'violet' },
            { name: 'Facilities Layer — CA basic service / CAS', sub: 'CAM generation, encoding, dissemination management; LDM update', accent: 'brand' },
            { name: 'Networking & Transport Layer', sub: 'GeoNetworking SHB · BTP-B port 2001 · single-hop, no forwarding', accent: 'emerald' },
            { name: 'Access Layer', sub: 'ITS-G5 (IEEE 802.11p / 5.9 GHz) or LTE-V2X PC5', accent: 'amber' },
          ]}
          leftRail="Security (AT cert + SSP signing)"
          rightRail="Management (DCC → T_GenCam_DCC)"
        />
        <p>
          The CA basic service passes the encoded CAM to the Networking &amp; Transport Layer via the
          NF-SAP interface. For the standard ITS-G5 deployment, GeoNetworking Single-Hop Broadcasting
          (SHB) is used — meaning the CAM is sent once, received by all nodes within radio range, and
          <strong> never forwarded</strong>. The Basic Transport Protocol (BTP) type B header carries the
          destination port. Applications and the LDM receive decoded data via the FA-SAP / IF.CAM
          interface.
        </p>
        <Callout type="tip" title="BTP-B port for CAM">
          CAMs are delivered on <strong>BTP-B destination port 2001</strong>, as registered with the global
          ITS Application Identifier (ITS-AID) authority under ISO EN 17419.
        </Callout>
      </Section>

      {/* ── 3. CAM Structure ── */}
      <Section id="structure" title="CAM PDU structure — containers in depth">
        <p>
          A CAM is encoded in ASN.1 with Unaligned Packed Encoding Rules (UPER / PER). It is composed of
          one <strong>ITS PDU Header</strong> and a <strong>cam</strong> payload comprising a timestamp
          and a set of containers. The mandatory containers are always present; optional containers are
          included when their data is available and when a minimum refresh interval has elapsed.
        </p>

        <Figure caption="General structure of a CAM PDU (EN 302 637-2 Fig. 4)">
          <div className="flex flex-col gap-2 font-mono text-sm">
            <div className="border border-brand-400 rounded p-3">
              <div className="text-brand-300 font-bold mb-2">CAM PDU</div>
              <div className="flex flex-col gap-2">
                <div className="border border-slate-500 rounded px-3 py-2 bg-ink-900">
                  <span className="text-amber-300 font-semibold">ITS PDU Header</span>
                  <span className="text-slate-400 ml-2">protocolVersion · messageID(2) · stationID</span>
                </div>
                <div className="border border-slate-500 rounded px-3 py-2 bg-ink-900">
                  <div className="text-amber-300 font-semibold mb-1">cam (CoopAwareness)</div>
                  <div className="ml-2 text-slate-400 mb-2">generationDeltaTime (TimestampIts mod 65 536, ms since 2004-01-01)</div>
                  <div className="border border-slate-600 rounded px-2 py-1 bg-ink-900">
                    <div className="text-cyan-300 font-semibold mb-1">camParameters</div>
                    <div className="flex flex-wrap gap-2 ml-2">
                      <div className="border border-emerald-500 rounded px-2 py-1">
                        <div className="text-emerald-300 font-semibold text-xs">basicContainer</div>
                        <div className="text-slate-400 text-xs">stationType</div>
                        <div className="text-slate-400 text-xs">referencePosition</div>
                      </div>
                      <div className="border border-brand-500 rounded px-2 py-1">
                        <div className="text-brand-300 font-semibold text-xs">highFrequencyContainer</div>
                        <div className="text-slate-400 text-xs">Vehicle HF or RSU HF</div>
                      </div>
                      <div className="border border-amber-500 rounded px-2 py-1 opacity-80">
                        <div className="text-amber-300 font-semibold text-xs">lowFrequencyContainer</div>
                        <div className="text-slate-400 text-xs">OPTIONAL (every ≥ 500 ms)</div>
                      </div>
                      <div className="border border-violet-500 rounded px-2 py-1 opacity-80">
                        <div className="text-violet-300 font-semibold text-xs">specialVehicleContainer</div>
                        <div className="text-slate-400 text-xs">OPTIONAL (every ≥ 500 ms)</div>
                      </div>
                      <div className="border border-rose-500 rounded px-2 py-1 opacity-70">
                        <div className="text-rose-300 font-semibold text-xs">extensionContainers</div>
                        <div className="text-slate-400 text-xs">R2 only — twoWheeler, pathPrediction, …</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Figure>

        <h3>ITS PDU Header</h3>
        <p>
          The common header shared by all ITS facility messages. For CAM, <code>protocolVersion</code> is
          set to 2, <code>messageID</code> is set to <code>cam(2)</code>, and <code>stationID</code>
          identifies the originating ITS-S (pseudonymous in a deployed PKI context).
        </p>

        <h3>Basic Container (mandatory, all ITS-Ss)</h3>
        <p>
          Contains the fundamental "who and where" information. Every CAM from every station type must
          include this container.
        </p>
        <Table
          caption="Basic Container data elements"
          headers={['Field', 'Type', 'Description']}
          rows={[
            ['stationType', 'StationType (0–255)', 'Classifies the originating station: unknown(0), pedestrian(1), cyclist(2), moped(3), motorcycle(4), passengerCar(5), bus(6), lightTruck(7), heavyTruck(8), trailer(9), specialVehicle(10), tram(11), roadSideUnit(15). Vehicle ITS-Ss use values 3–10.'],
            ['referencePosition', 'ReferencePosition', 'WGS-84 latitude/longitude/altitude of the front-centre of the vehicle bounding box, time-aligned to generationDeltaTime. Includes a 95%-confidence positionConfidenceEllipse (semiMajor, semiMinor, orientation).'],
          ]}
        />

        <h3>High Frequency (HF) Container (mandatory, per station type)</h3>
        <p>
          This container carries all <em>fast-changing</em> dynamic data that must be up to date in every
          CAM. For vehicle ITS-Ss it is <code>basicVehicleContainerHighFrequency</code>; for RSUs it is
          <code>rsuContainerHighFrequency</code>.
        </p>
        <Table
          caption="basicVehicleContainerHighFrequency — key fields"
          headers={['Field', 'Mandatory?', 'Description / units']}
          rows={[
            ['heading', 'Yes', 'Vehicle movement heading relative to true North. 0° = North, 90° = East. Includes headingConfidence at 95% level. Range 0–3 601 (0.1°/step, 3 601 = unavailable).'],
            ['speed', 'Yes', 'Driving speed in the heading direction. Includes speedConfidence at 95% level. Granularity 0.01 m/s.'],
            ['driveDirection', 'Yes', 'Forward or backward motion of the vehicle.'],
            ['vehicleLength', 'Yes', 'Overall vehicle length including any trailer or overhanging attachment (e.g. crane). Includes vehicleLengthConfidenceIndication (trailer detected / known).'],
            ['vehicleWidth', 'Yes', 'Maximum vehicle width including side mirrors.'],
            ['longitudinalAcceleration', 'Yes', 'Signed acceleration in heading direction (negative = deceleration). Granularity 0.01 m/s².'],
            ['curvature', 'Yes', 'Inverse of current curve radius. Positive = curve to the right. Includes curvatureConfidence at 95%.'],
            ['curvatureCalculationMode', 'Yes', 'Flag: whether yawRate was used to compute curvature.'],
            ['yawRate', 'Yes', 'Rotation rate around centre of mass. Negative = clockwise from above. Includes yawRateConfidence at 95%. Granularity 0.01°/s.'],
            ['accelerationControl', 'Optional', 'Bitfield: which longitudinal control mechanisms are engaged (brake pedal, gas pedal, etc.).'],
            ['lanePosition', 'Optional', 'Lane index counted from the outside road edge in traffic direction.'],
            ['steeringWheelAngle', 'Optional', 'Steering wheel angle + confidence.'],
            ['lateralAcceleration', 'Optional', 'Lateral acceleration + confidence.'],
            ['verticalAcceleration', 'Optional', 'Vertical acceleration + confidence.'],
            ['performanceClass', 'Optional', 'Characterises the maximum age of CAM data elements relative to generationDeltaTime.'],
            ['cenDsrcTollingZone', 'Optional', 'Position of nearby CEN DSRC 5.8 GHz tolling station for interference mitigation.'],
          ]}
        />
        <p>
          For RSUs, <code>rsuContainerHighFrequency</code> optionally carries
          <code>protectedCommunicationZonesRSU</code> — a list of CEN DSRC tolling-zone coordinates so that
          passing vehicles can activate interference mitigation.
        </p>

        <h3>Low Frequency (LF) Container (conditional, vehicle ITS-Ss only)</h3>
        <p>
          Carries <em>static or slowly changing</em> vehicle attributes. It must be included in the first
          CAM generated since CA basic service / CAS activation, and thereafter whenever at least 500 ms
          have elapsed since the last CAM that contained it.
        </p>
        <Table
          caption="basicVehicleContainerLowFrequency — fields"
          headers={['Field', 'Description']}
          rows={[
            ['vehicleRole', 'Functional role: default(0), publicTransport(1), specialTransport(2), dangerousGoods(3), roadWork(4), rescue(5), emergency(6), safetyCar(7). R2 adds: agriculture(8), commercial(9), military(10), roadOperator(11), taxi(12), uvar(13).'],
            ['exteriorLights', 'Bitfield of the most important exterior light switch states (low beams, high beams, left/right indicators, hazard, fog lights, parking lights, daytime running lights, etc.).'],
            ['pathHistory', 'List of up to 23 path points representing the vehicle\'s recent trajectory. Each point is a delta offset from the previous one; the first point offsets from referencePosition. Includes PathDeltaTime between consecutive points.'],
          ]}
        />

        <h3>Special Vehicle Container (conditional, vehicle ITS-Ss only)</h3>
        <p>
          Present when <code>vehicleRole</code> is non-default. Provides additional context specific to the
          vehicle's special function. Like the LF container, it must be included in the first CAM and then at
          most every 500 ms.
        </p>
        <Table
          caption="Special Vehicle containers by vehicleRole"
          headers={['vehicleRole value', 'Container', 'Key fields']}
          rows={[
            ['publicTransport(1)', 'PublicTransportContainer', 'embarkationStatus (passengers boarding?), ptActivation (signal for traffic-light/barrier priority).'],
            ['specialTransport(2)', 'SpecialTransportContainer', 'specialTransportType (heavy/oversized load), lightBarSirenInUse.'],
            ['dangerousGoods(3)', 'DangerousGoodsContainer', 'dangerousGoodsBasic (UN dangerous-goods class).'],
            ['roadWork(4)', 'RoadWorksContainerBasic', 'roadworksSubCauseCode (type of works), lightBarSirenInUse, closedLanes (bitfield of closed lanes ahead).'],
            ['rescue(5)', 'RescueContainer', 'lightBarSirenInUse.'],
            ['emergency(6)', 'EmergencyContainer', 'lightBarSirenInUse, incidentIndication (CauseCode), emergencyPriority (requestForRightOfWay, requestForFreeCrossingAtATrafficLight).'],
            ['safetyCar(7)', 'SafetyCarContainer', 'lightBarSirenInUse, incidentIndication, trafficRule (noPassing / noPassingForTrucks), speedLimit.'],
          ]}
        />
      </Section>

      {/* ── 4. Generation rules ── */}
      <Section id="generation" title="Generation rules and triggering conditions">
        <p>
          The CA basic service / CAS manages the CAM generation frequency adaptively. It balances two
          competing needs: sending fast enough for safety applications, and not overloading the radio channel.
          The core mechanism is a periodic check timer <code>T_CheckCamGen</code> which fires at least every
          <code>T_GenCamMin</code> (100 ms). Each time the timer fires, the service evaluates two trigger
          conditions.
        </p>

        <Callout type="key" title="Two trigger conditions">
          <strong>Condition 1 — dynamics-based (high rate):</strong> The time since the last CAM is
          ≥ T_GenCam_DCC, AND at least one of: heading changed {'>'} 4°, position changed {'>'} 4 m, or
          speed changed {'>'} 0.5 m/s since the last CAM.
          <br /><br />
          <strong>Condition 2 — time-based (low-rate fallback):</strong> The time since the last CAM is
          ≥ T_GenCam AND ≥ T_GenCam_DCC.
          <br /><br />
          If either condition is satisfied, a CAM is generated immediately.
        </Callout>

        <Table
          caption="CAM triggering thresholds (EN 302 637-2 clause 6.1.3 / TS 103 900 clause 6.1.2)"
          headers={['Trigger', 'EN 302 637-2 (current R1)', 'TS 102 637-2 V1.2.1 (legacy R1)', 'Notes']}
          rows={[
            ['Heading change', '> 4°', '> 4° (same)', 'Absolute difference vs. heading in last CAM.'],
            ['Position change', '> 4 m', '> 5 m', 'Distance between current position and position in last CAM. Tightened in R1 update.'],
            ['Speed change', '> 0.5 m/s', '> 1 m/s', 'Absolute difference vs. speed in last CAM. Tightened in R1 update.'],
            ['Time elapsed (max)', '≥ T_GenCam (default T_GenCamMax = 1 000 ms)', '≤ 1 s', 'Always generates at least once per second.'],
          ]}
        />

        <Callout type="tip" title="Legacy R1 differences">
          The original Release 1 TS 102 637-2 (V1.2.1, 2011) used coarser thresholds: position {'>'} 5 m and
          speed {'>'} 1 m/s. EN 302 637-2 V1.4.1 (2019, the current R1 normative European Standard) tightened
          these to 4 m and 0.5 m/s based on feedback from field trials and safety analysis. The heading
          threshold of 4° remained unchanged.
        </Callout>

        <h3>Timer parameters in detail</h3>
        <DefList items={[
          {
            term: 'T_GenCamMin = 100 ms',
            def: 'The minimum permitted interval between two consecutive CAMs. Corresponds to the maximum rate of 10 Hz. No CAM shall be generated more frequently than this.'
          },
          {
            term: 'T_GenCamMax = 1 000 ms',
            def: 'The maximum permitted interval. Corresponds to the minimum rate of 1 Hz. The current upper limit T_GenCam defaults to T_GenCamMax.'
          },
          {
            term: 'T_GenCam',
            def: 'The currently active upper-limit interval. When Condition 1 fires, T_GenCam is set to the elapsed time since the last CAM (shortening the interval for subsequent checks). After N_GenCam = 3 consecutive condition-1 CAMs, T_GenCam resets to T_GenCamMax.'
          },
          {
            term: 'T_GenCam_DCC',
            def: 'Minimum interval imposed by the Decentralized Congestion Control (DCC). Provided by the Management entity from the ITS-G5 DCC algorithm (ETSI TS 102 724). Range: T_GenCamMin ≤ T_GenCam_DCC ≤ T_GenCamMax. If not provided, defaults to T_GenCamMin (no restriction). For LTE-V2X, DCC and T_GenCam_DCC are not applicable — congestion control is handled by the access layer (ETSI TS 103 574).'
          },
          {
            term: 'T_CheckCamGen',
            def: 'How often the two trigger conditions are evaluated. Must be ≤ T_GenCamMin (100 ms). In the simplest implementation this equals 100 ms. The check process must not be synchronized to a real-time clock — it starts at an arbitrary random offset to avoid fleet-wide synchronisation and channel collisions.'
          },
          {
            term: 'N_GenCam = 3 (default / maximum)',
            def: 'After Condition 1 triggers, the service generates N_GenCam consecutive CAMs at the shortened interval before resetting T_GenCam back to T_GenCamMax. N_GenCam may be increased dynamically — for example when approaching an intersection — to boost reception probability for safety applications.'
          },
        ]} />

        <h3>Container refresh rules</h3>
        <Table
          caption="Container inclusion frequency rules"
          headers={['Container', 'First CAM after activation', 'Subsequent inclusion']}
          rows={[
            ['basicContainer', 'Yes (mandatory)', 'Always — in every CAM'],
            ['highFrequencyContainer', 'Yes (mandatory)', 'Always — in every CAM'],
            ['lowFrequencyContainer', 'Yes (mandatory)', '≥ 500 ms since last CAM containing it'],
            ['specialVehicleContainer', 'Yes (if vehicleRole ≠ default)', '≥ 500 ms since last CAM containing it'],
            ['twoWheelerContainer (R2)', 'Yes (if applicable)', 'Every CAM — included in all CAMs from activation'],
            ['veryLowFrequencyContainer (R2)', 'Second CAM', '≥ 10 s, and only if LF + special-vehicle containers not included in that CAM'],
            ['pathPredictionContainer (R2)', 'When data available', '≥ 950 ms (T_GenCam_PathPrediction), when LF container not included'],
            ['eHorizonLocationSharingContainer (R2)', 'When data available', '≥ 1 950 ms (T_GenCam_LocationSharing)'],
            ['roadLanePositionsContainer (R2)', 'When data available', '≥ 950 ms (T_GenCam_RoadLanePositions)'],
            ['vehicleMovementControlContainer (R2)', 'When service conditions met', '≥ 500 ms (T_GenCam_VehicleMovementControl)'],
          ]}
        />

        <h3>CAM generation flow</h3>
        <Steps>
          <div>
            <strong>Start T_CheckCamGen timer</strong>: The CAS starts the check timer at a random offset
            after activation. The timer fires every T_CheckCamGen (≤ 100 ms).
          </div>
          <div>
            <strong>Evaluate trigger conditions</strong>: On timer expiry, check Condition 1
            (dynamics: heading, position, or speed change beyond threshold, and T_GenCam_DCC elapsed) and
            Condition 2 (T_GenCam and T_GenCam_DCC both elapsed). If neither fires, skip to step 6.
          </div>
          <div>
            <strong>Collect mandatory container data</strong>: Fetch current position (POTI service),
            speed, heading, acceleration, curvature, yaw rate, vehicle dimensions from the Vehicle Data
            Provider (VDP).
          </div>
          <div>
            <strong>Decide optional containers</strong>: Check ITS-S type and vehicle role; check time
            elapsed since each container was last included; include LF, special-vehicle, and R2
            extension containers as applicable.
          </div>
          <div>
            <strong>Encode CAM (UPER)</strong>: Build the ASN.1 PDU.
            generationDeltaTime = TimestampIts mod 65 536 (time of the reference position measurement,
            ms since 2004-01-01T00:00:00Z). Total encoding time shall be {'<'} 50 ms.
          </div>
          <div>
            <strong>Pass to Networking &amp; Transport Layer</strong>: Deliver the encoded CAM with PCI
            (GN SHB, BTP-B port 2001, GN max packet lifetime ≤ 1 000 ms). The security entity signs the
            message with the Authorization Ticket private key, embedding the AT certificate.
          </div>
          <div>
            <strong>Update local message table</strong>: Save generation time, position, speed, and
            heading as the reference values for the next trigger evaluation. Restart T_CheckCamGen.
          </div>
        </Steps>

        <h3>RSU generation rules</h3>
        <p>
          Roadside Unit ITS-Ss use a simpler, static generation schedule. In Release 1, the time interval
          between two consecutive RSU CAMs must be ≥ 1 000 ms (maximum 1 Hz). In Release 2, this was
          tightened to ≥ 500 ms — to ensure that a vehicle passing at high speed can receive at least one
          CAM and that the RSU can also respond to certificate requests within the vehicle's dwell time in
          the communication zone.
        </p>

        <h3>Application-driven acceleration (Extended CAM generation)</h3>
        <p>
          ITS applications may request a shorter generation interval via the optional parameter
          <code>T_GenCam_App</code>. This triggers CAMs whenever T_GenCam_DCC has elapsed (bypassing the
          dynamics condition). This mechanism respects the T_GenCamMin / T_GenCamMax bounds and, if
          multiple applications request different intervals, the most frequent (lowest) value wins. If the
          requested frequency cannot be achieved (e.g. DCC has raised T_GenCam_DCC), the CAS notifies the
          requesting application.
        </p>
      </Section>

      {/* ── 5. Networking / dissemination ── */}
      <Section id="networking" title="Dissemination over GeoNetworking and BTP">
        <p>
          CAMs use the <Link to="/networking">GeoNetworking</Link> + BTP protocol stack. The key
          dissemination rules are:
        </p>
        <CardGrid cols={3}>
          <Card title="Single-Hop Broadcast (SHB)" accent="emerald">
            GeoNetworking packet transport type SHB. The CAM is sent once from the originating ITS-S; all
            nodes in direct radio range receive it. No multi-hop forwarding is permitted. A received CAM
            shall never be re-transmitted to other ITS-Ss.
          </Card>
          <Card title="BTP-B port 2001" accent="brand">
            Basic Transport Protocol (BTP) type B header is used. The registered destination port for CAM is
            2001 (registered under ISO EN 17419 with the global ITS-AID authority). Conforming
            implementations may configure this via the Management Information Base (MIB) so that the value
            is not sent with every PDU.
          </Card>
          <Card title="GN max lifetime ≤ 1 000 ms" accent="amber">
            The GeoNetworking maximum packet lifetime for CAM is set to 1 000 ms. This ensures stale
            messages are discarded before they can be delivered after being superseded. The GN traffic class
            carries the QoS priority as defined by the BSA use case requirements.
          </Card>
        </CardGrid>
        <p>
          Both ITS-G5 (IEEE 802.11p, 5.9 GHz band) and LTE-V2X (PC5 sidelink) access layers are supported.
          For ITS-G5, DCC feeds T_GenCam_DCC; for LTE-V2X, congestion control operates at the access layer.
          A CAM may also be carried over an IPv6 stack or combined IPv6/GeoNetworking stack, though these
          paths are outside the core CAM specification scope.
        </p>
      </Section>

      {/* ── 6. Security ── */}
      <Section id="security" title="Security — signing, certificates, and SSP">
        <p>
          CAMs carry safety-critical information that must be authenticated to prevent spoofing. The ITS
          security architecture (ETSI TS 102 940, ETSI TS 103 097) requires each CAM to be signed with the
          originating station's Authorization Ticket (AT) — a short-lived pseudonymous certificate issued
          by the <Link to="/pki">PKI</Link>.
        </p>
        <Callout type="info" title="Why pseudonymous certificates?">
          Using short-lived ATs rather than long-term identity certificates lets a vehicle prove message
          authenticity without revealing its long-term identity, protecting location privacy. The PKI manages
          certificate issuance, revocation, and trust chain validation back to a trusted Root CA.
        </Callout>
        <p>
          The certificate contains an <strong>ITS-Application Identifier (ITS-AID)</strong> indicating the
          holder is permitted to send CAMs, and a <strong>Service Specific Permissions (SSP)</strong>
          bitfield that specifies which optional CAM content the holder may include (e.g. whether it may
          assert a publicTransportContainer or an emergencyContainer).
        </p>
        <p>
          The SSP is encoded as a BitmapSsp of 3 octets:
        </p>
        <Table
          caption="CAM SSP — key bits (EN 302 637-2 Table 4 / TS 103 900 Table 3)"
          headers={['Octet', 'Bit', 'Permission']}
          rows={[
            ['0', '—', 'SSP version: 1 = Release 1 permissions (3 octets); 2 = Release 1 + Release 2 extension bits.'],
            ['1', '7 (MSB)', 'protectedCommunicationZonesRSU — may sign RSU CAM with CEN DSRC tolling zone info.'],
            ['1', '6', 'publicTransportContainer — may sign CAM with vehicleRole = publicTransport(1).'],
            ['1', '5', 'specialTransportContainer — may sign with vehicleRole = specialTransport(2).'],
            ['1', '4', 'dangerousGoodsContainer — may sign with vehicleRole = dangerousGoods(3).'],
            ['1', '3', 'roadWorksContainerBasic — may sign with vehicleRole = roadWork(4).'],
            ['1', '2', 'rescueContainer — may sign with vehicleRole = rescue(5).'],
            ['1', '1', 'emergencyContainer — may sign with vehicleRole = emergency(6).'],
            ['1', '0 (LSB)', 'safetyCarContainer — may sign with vehicleRole = safetyCar(7).'],
            ['2', '7 (MSB)', 'closedLanes in RoadWorksContainerBasic (requires octet 1 bit 3 also set).'],
            ['2', '6', 'requestForRightOfWay in EmergencyPriority (requires octet 1 bit 1 set).'],
            ['2', '5', 'requestForFreeCrossingAtATrafficLight in EmergencyPriority (requires octet 1 bit 1 set).'],
            ['2', '4', 'noPassing in SafetyCarContainer (requires octet 1 bit 0 set).'],
            ['2', '3', 'noPassingForTrucks in SafetyCarContainer (requires octet 1 bit 0 set).'],
            ['2', '2', 'speedLimit in SafetyCarContainer (requires octet 1 bit 0 set).'],
            ['2', '1', 'twoWheelerContainer — R2 extension, SSP version ≥ 2 required.'],
            ['2', '0 (LSB)', 'twoWheeler-cyclist — TwoWheelerContainer with cyclist element — R2, SSP version ≥ 2.'],
          ]}
        />
        <p>
          A receiver accepts an incoming signed CAM only if: the certificate is valid (trusted chain, not
          revoked, within validity period), and the CAM content is consistent with the ITS-AID and SSP bits
          in the certificate. For instance, a CAM claiming <code>vehicleRole = emergency(6)</code> must
          be signed by a certificate with SSP octet 1, bit 1 set to 1, or the message is considered
          invalid from a security perspective.
        </p>
      </Section>

      {/* ── 7. Release 1 vs Release 2 ── */}
      <Section id="releases" title="Release 1 vs Release 2 — evolution">
        <p>
          The CAM specification has evolved across two major releases. Release 1 is the currently mandated
          standard in deployed European C-ITS systems; Release 2 extends it while maintaining complete
          backwards compatibility.
        </p>
        <Table
          caption="Release 1 vs Release 2 comparison"
          headers={['Aspect', 'Release 1 (EN 302 637-2 V1.4.1, 2019)', 'Release 2 (TS 103 900 V2.3.1, 2026)']}
          rows={[
            ['Governing standard', 'ETSI EN 302 637-2 (European Standard — mandatory)', 'ETSI TS 103 900 (Technical Specification — extensions)'],
            ['Service name', 'CA basic service', 'Cooperative Awareness Service (CAS)'],
            ['Backward compatibility', 'Baseline', 'R2 CAMs are fully decodable by R1 receivers — R1 content unchanged; R2 content in extensionContainers'],
            ['ASN.1 OID', 'cam (302637) version (2)', 'camPduRelease2 (103900) major-version-2 (2)'],
            ['Position trigger threshold', '> 4 m', '> 4 m (same)'],
            ['Speed trigger threshold', '> 0.5 m/s', '> 0.5 m/s (same)'],
            ['RSU CAM interval', '≥ 1 000 ms (max 1 Hz)', '≥ 500 ms — tightened for security certificate exchange support'],
            ['Special vehicle roles', 'default, publicTransport, specialTransport, dangerousGoods, roadWork, rescue, emergency, safetyCar (values 0–7)', 'Same plus: agriculture(8), commercial(9), military(10), roadOperator(11), taxi(12), uvar(13)'],
            ['Extension containers', 'None (extensibility marker ... in ASN.1 only)', 'twoWheelerContainer, eHorizonLocationSharingContainer, veryLowFrequencyContainer, pathPredictionContainer, roadLanePositionsContainer, vehicleMovementControlContainer'],
            ['Two-wheeler support', 'Basic (via stationType cyclist/moped/motorcycle)', 'Dedicated TwoWheelerContainer with typeSpecificInformation for cyclists'],
            ['Path prediction', 'Not defined', 'pathPredictionContainer — predicted future path of originating ITS-S'],
            ['Map-based context', 'Not defined', 'eHorizonLocationSharingContainer — map-referenced location ahead of vehicle'],
            ['Lane positioning', 'lanePosition in HF container (optional, single value)', 'roadLanePositionsContainer — detailed transversal lane position and lane type'],
            ['SSP version', 'Version 1 (3 octets, bits for R1 content)', 'Version 1 or 2; version 2 adds R2 twoWheeler SSP bits'],
          ]}
        />
        <Callout type="warn" title="Backwards compatibility guarantee">
          All R2 extensions are wrapped in <code>extensionContainers</code> using a
          WrappedExtensionContainer structure (containerId + container data). An R1 receiver that does not
          understand the extension container simply ignores it via ASN.1 extension markers
          (<code>...</code>). The R1 content in basicContainer / HF / LF / specialVehicle containers is
          entirely unchanged in R2 CAMs.
        </Callout>
      </Section>

      {/* ── 8. Receiving and using CAMs ── */}
      <Section id="receiving" title="Receiving and processing CAMs">
        <p>
          On the receiver side, the CA basic service / CAS decodes an incoming CAM and makes the content
          available to ITS applications and the LDM. The process is simpler than generation:
        </p>
        <Steps>
          <div>
            <strong>Security verification</strong>: The Networking &amp; Transport Layer (or security plane)
            verifies the signature against the attached AT certificate, validates the trust chain back to
            a Root CA, and checks SSP consistency with the CAM content. Only successfully verified CAMs
            are passed up to the facilities layer.
          </div>
          <div>
            <strong>CAM decoding (UPER)</strong>: The CAS decodes the ASN.1 payload. If decoding fails
            (out-of-range values, inconsistent structure), the CAM is silently discarded. A failure
            notification may be raised internally.
          </div>
          <div>
            <strong>LDM update / application delivery</strong>: Decoded data is provided to the Local
            Dynamic Map database — a georeferenced snapshot of the neighbourhood — and/or directly to ITS
            applications via the IF.CAM / FA-SAP interface.
          </div>
          <div>
            <strong>Application processing</strong>: Applications compare the received vehicle state with
            their own state to detect collision risks, proximity events, or special-vehicle approach
            scenarios. Results may be displayed via HMI or acted upon by automated driving systems.
          </div>
        </Steps>
        <p>
          A key design choice: received CAMs are <em>never forwarded</em>. The GeoNetworking SHB mechanism
          guarantees that each CAM propagates exactly one hop. Longer-range awareness for event-driven
          hazards is handled by <Link to="/denm">DENM</Link>, which supports GeoBroadcast forwarding.
        </p>
        <Callout type="info" title="CAM data feeds DENM dissemination">
          CAM data stored in the LDM is used by the GeoNetworking layer to determine the geographic area
          for GeoBroadcast of DENMs. Knowing where other vehicles are allows a DENM originator to set the
          destination area precisely and to decide whether forwarding is needed. This is why CAM reception
          and DENM dissemination are tightly coupled at the networking layer.
        </Callout>
      </Section>

      {/* ── 9. Deployment & real-world notes ── */}
      <Section id="deployment" title="Real-world deployment notes">
        <CardGrid cols={2}>
          <Card title="Channel load and DCC" accent="amber">
            In dense urban traffic, many vehicles transmitting at up to 10 Hz can saturate the ITS-G5
            5.9 GHz channel. DCC (Decentralized Congestion Control, ETSI TS 102 724) monitors channel busy
            ratio and raises T_GenCam_DCC when congestion is detected, automatically reducing CAM generation
            rate across the fleet without central coordination.
          </Card>
          <Card title="Timestamp precision" accent="emerald">
            The generationDeltaTime is TimestampIts mod 65 536 — a 16-bit modular millisecond counter since
            2004-01-01T00:00:00Z. The standard requires that the difference between CAM generation time and
            timestamp be {'<'} 32 767 ms to avoid wrap-around ambiguity. ITS-Ss use GPS-disciplined clocks
            or similar for adequate time synchronisation.
          </Card>
          <Card title="Privacy and pseudonymity" accent="violet">
            The stationID in the header and the AT certificate are both pseudonymous and change periodically.
            Position data in the CAM is inherently privacy-sensitive. Certificate change strategies
            (simultaneous vs. staggered across the fleet) are defined in the PKI policy, not in the CAM
            standard itself.
          </Card>
          <Card title="Confidence values" accent="rose">
            Almost every dynamic data element in the CAM carries a companion confidence field (95%
            confidence interval). If a sensor cannot provide a reliable measurement, the confidence
            field is set to "unavailable" — but the field itself remains present. Receivers should treat
            "unavailable" as a signal to not use that element for safety-critical decisions.
          </Card>
        </CardGrid>
      </Section>

      {/* ── 10. Key standards ── */}
      <Section id="standards" title="Key standards">
        <p>
          <Ref code="EN 302 637-2" title="Specification of Cooperative Awareness Basic Service" kind="ETSI" />{' '}
          V1.4.1 (2019-04) — The primary Release 1 normative document for CAM. Defines message structure,
          generation rules, timing parameters, security requirements, and the full ASN.1 module.
        </p>
        <p>
          <Ref code="TS 103 900" title="Cooperative Awareness Service, Release 2" kind="ETSI" />{' '}
          V2.3.1 (2026-05) — Extends CAM with new containers (two-wheeler, path prediction, eHorizon,
          very low frequency, lane positions, vehicle movement control), tightens RSU interval to 500 ms,
          and adds new vehicleRole values (agriculture, commercial, military, roadOperator, taxi, uvar).
        </p>
        <p>
          <Ref code="TS 102 637-2" title="Cooperative Awareness Basic Service (legacy Release 1)" kind="ETSI" />{' '}
          V1.2.1 (2011-03) — The original Release 1 TS, superseded by EN 302 637-2. Position threshold 5 m,
          speed threshold 1 m/s. Documented here for historical evolution context.
        </p>
        <p>
          <Ref code="TS 102 894-2" title="Common Data Dictionary" kind="ETSI" /> — Defines the DEs and DFs
          (StationType, ReferencePosition, Heading, Speed, VehicleLength, ExteriorLights, PathHistory, etc.)
          imported by the CAM ASN.1 module.
        </p>
        <p>
          <Ref code="TS 103 097" title="Security header and certificate formats" kind="ETSI" /> — Specifies
          the AT certificate format and BitmapSsp encoding used to sign and verify CAMs.
        </p>
        <p>
          <Ref code="EN 302 636-5-1" title="GeoNetworking — Basic Transport Protocol" kind="ETSI" /> — BTP
          type B, port 2001, SHB transport used to disseminate CAMs over the air.
        </p>
      </Section>

      {/* ── 11. Where next ── */}
      <Section id="where-next" title="Where next">
        <p>
          Having understood CAM — the heartbeat of C-ITS — explore the complementary messages and services:
        </p>
        <ul>
          <li>
            <Link to="/denm">DENM</Link> — event-driven hazard notifications triggered by CAM awareness and
            forwarded over larger areas using GeoBroadcast.
          </li>
          <li>
            <Link to="/facilities">Facilities Layer</Link> — the broader context of application-support
            services of which the CA basic service is a part.
          </li>
          <li>
            <Link to="/networking">Networking &amp; Transport</Link> — GeoNetworking SHB, BTP, and DCC in
            depth.
          </li>
          <li>
            <Link to="/pki">PKI &amp; Security</Link> — how Authorization Tickets are issued, how
            pseudonymity works, and how the trust chain is validated end-to-end.
          </li>
        </ul>
      </Section>
    </article>
  )
}
