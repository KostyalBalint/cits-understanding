import React from 'react'
import { Link } from 'react-router-dom'
import { PageHeader, Section, Prose, Callout, Ref, Table, StatGrid, Stat, CardGrid, Card, Steps, Figure, LayerStack, DefList, Badge } from '../components/ui.jsx'

export default function MessageDENM() {
  return (
    <article>
      <PageHeader
        kicker="Facilities Layer Messages"
        title="DENM — Decentralized Environmental Notification Message"
        intro="The DENM is the C-ITS alarm message. Unlike the periodic heartbeat of the CAM, a DENM fires on-demand whenever a station detects a road hazard or abnormal traffic condition — a crash, roadworks, black ice, a broken-down vehicle, an approaching emergency vehicle — and needs to warn other road users within a geographically defined area, potentially far beyond direct radio range."
        sources={['ETSI EN 302 637-3', 'ETSI TS 103 831', 'ETSI TS 102 637-3']}
      />

      {/* ── 1. Purpose & motivation ─────────────────────────────────────────── */}
      <Section id="purpose" title="Purpose and Motivation">
        <p>
          The Road Hazard Warning (RHW) application is the primary consumer of DENMs. It is an event-based application
          composed of many use cases: emergency electronic brake light (EEBL), wrong-way driving, stationary vehicle after
          accident, traffic jam, roadworks, slippery road, emergency vehicle approaching, and more. The DEN (Decentralized
          Environmental Notification) basic service — defined at the <Link to="/facilities">facilities layer</Link> — generates,
          manages, and processes DENMs on behalf of these applications.
        </p>
        <p>
          A DENM is sent <strong>only when something notable happens</strong>. Once triggered, it is repeated at a configured
          interval for the duration of the event, so that vehicles entering the destination area later also receive the
          warning. The transmission stops automatically when the event expires, or immediately when a cancellation or negation
          DENM is issued.
        </p>

        <Callout type="key" title="DENM vs CAM — complementary alarms">
          <p>
            The <Link to="/cam">CAM</Link> broadcasts a vehicle's kinematic state at 1–10 Hz regardless of what is happening.
            The DENM reacts to events: it is <strong>event-triggered, not periodic</strong>; it carries a
            <strong> geographic relevance area</strong> that tells receivers whether the information concerns them; and it can
            be disseminated via <strong>multi-hop GeoNetworking</strong> to ITS stations kilometres away from the event, well
            beyond direct V2X range. Whereas a CAM expires the moment the next one arrives, a DENM persists in the network
            for its entire <em>validityDuration</em> through keep-alive forwarding.
          </p>
        </Callout>

        <CardGrid cols={3}>
          <Card title="Event-triggered" accent="rose">
            Sent only upon detection of a hazard or abnormal condition — not on a fixed timer. Each event gets a unique
            actionID so multiple stations can track the same incident independently.
          </Card>
          <Card title="Geographic scope" accent="amber">
            Carries relevance area (distance + traffic direction) and is disseminated to a GeoNetworking destination area
            (circle, rectangle, or ellipse). Receivers perform their own relevance check.
          </Card>
          <Card title="Persistent coverage" accent="emerald">
            Repeated at a configurable interval; forwarded by intermediate stations via Keep-Alive Forwarding (KAF) even
            if the originator has moved away or gone silent.
          </Card>
        </CardGrid>
      </Section>

      {/* ── 2. ITS architecture position ─────────────────────────────────────── */}
      <Section id="architecture" title="Position in the ITS Stack">
        <p>
          The DEN service sits at the <Link to="/facilities">facilities layer</Link>, sandwiched between ITS-S applications
          above and the <Link to="/networking">networking &amp; transport layer</Link> below. It exposes two logical
          interfaces to applications: <strong>IF.DEN.1 / IF.Triggering</strong> for DENM transmission requests and
          <strong> IF.DEN.2 / IF.DataCollect</strong> for delivering received DENMs upward. Downward it hands the encoded
          DENM to GeoNetworking/BTP for dissemination, or optionally to a Resource Management service (Release 2).
        </p>

        <Figure caption="DENM in the ITS-S layer architecture — the DEN service bridges applications and GeoNetworking.">
          <LayerStack
            layers={[
              { name: 'ITS-S Application (RHW, EEBL, …)', sub: 'AppDENM_trigger / AppDENM_update / AppDENM_termination', accent: 'brand' },
              { name: 'DEN Service (Facilities Layer)', sub: 'Encode · Decode · DENM Dissemination Mgmt · DENM Collection Mgmt · KAF', accent: 'amber' },
              { name: 'GeoNetworking + BTP-B', sub: 'GeoBroadcast · destination area · port 2002', accent: 'emerald' },
              { name: 'ITS-G5 / LTE-V2X / C-V2X Access', sub: 'ETSI EN 302 663 / IEEE 802.11p', accent: 'violet' },
            ]}
            leftRail="Security (TS 103 097)"
            rightRail="Management (LDM, POTI)"
          />
        </Figure>

        <p>
          The DEN service interacts with the <strong>Local Dynamic Map (LDM)</strong> — a facilities-layer database — to
          store event information for retrieval by applications. In Release 2 it may also interface with the Position and
          Time management (POTI) service for accurate timestamping, and with a Resource Management service to respect
          channel congestion limits.
        </p>
      </Section>

      {/* ── 3. DENM Structure ────────────────────────────────────────────────── */}
      <Section id="structure" title="DENM Structure">
        <p>
          A DENM PDU is encoded in ASN.1 Unaligned Packed Encoding Rules (UPER / PER). It consists of a common
          <strong> ITS PDU header</strong> followed by the DENM payload, which is divided into up to four containers in
          fixed order. The header and management container are always present; the other three are optional.
        </p>

        <Figure caption="High-level structure of a DENM PDU (ETSI EN 302 637-3 / TS 103 831).">
          <div className="flex flex-col gap-2 w-full text-sm font-mono">
            <div className="flex gap-2 items-stretch">
              <div className="bg-violet-900 border border-violet-500 rounded px-3 py-2 text-violet-200 w-48 shrink-0 flex items-center justify-center text-center">
                ITS PDU Header
                <br />
                <span className="text-violet-400 text-xs">(always present)</span>
              </div>
              <div className="flex flex-col justify-center text-slate-400 text-xs leading-tight">
                <span>protocolVersion</span>
                <span>messageID (DENM = 1)</span>
                <span>stationID (originator)</span>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="bg-rose-900 border border-rose-500 rounded px-3 py-2 text-rose-200 flex-1 text-center">
                Management Container
                <br />
                <span className="text-rose-400 text-xs font-sans">(always present)</span>
              </div>
              <div className="bg-amber-900 border border-amber-500 rounded px-3 py-2 text-amber-200 flex-1 text-center">
                Situation Container
                <br />
                <span className="text-amber-400 text-xs font-sans">(absent in cancel/negate)</span>
              </div>
              <div className="bg-emerald-900 border border-emerald-500 rounded px-3 py-2 text-emerald-200 flex-1 text-center">
                Location Container
                <br />
                <span className="text-emerald-400 text-xs font-sans">(present if Situation present)</span>
              </div>
              <div className="bg-sky-900 border border-sky-500 rounded px-3 py-2 text-sky-200 flex-1 text-center">
                A La Carte Container
                <br />
                <span className="text-sky-400 text-xs font-sans">(use-case specific)</span>
              </div>
            </div>
          </div>
        </Figure>

        <Table
          caption="DENM containers — mandatory / optional rules and key fields"
          headers={['Container', 'Present?', 'Key fields']}
          rows={[
            [
              <strong>ITS PDU Header</strong>,
              <Badge tone="brand">Always</Badge>,
              'protocolVersion, messageID (=1 for DENM), stationID of originator'
            ],
            [
              <strong>Management</strong>,
              <Badge tone="brand">Always</Badge>,
              'actionID (originatingStationID + sequenceNumber), detectionTime, referenceTime, termination, eventPosition, relevanceDistance, relevanceTrafficDirection, validityDuration, transmissionInterval, stationType'
            ],
            [
              <strong>Situation</strong>,
              <Badge tone="amber">New/Update only</Badge>,
              'informationQuality (0–7), eventType (causeCode + subCauseCode), linkedCause, eventHistory / eventZone (R2), linkedDenms (R2)'
            ],
            [
              <strong>Location</strong>,
              <Badge tone="amber">New/Update only</Badge>,
              'traces / detectionZonesToEventPosition, eventSpeed, eventPositionHeading, roadType, lanePositions (R2), occupiedLanes (R2)'
            ],
            [
              <strong>A La Carte</strong>,
              <Badge tone="emerald">Conditional</Badge>,
              'roadWorks, stationaryVehicle, impactReduction, externalTemperature, positioningSolution, roadConfiguration (R2), preCrash (R2), lanePosition'
            ],
          ]}
        />

        <h3>Management Container in Detail</h3>
        <p>
          The management container carries the protocol machinery. Its most important field is <strong>actionID</strong>,
          a 6-byte composite key:
        </p>
        <DefList items={[
          {
            term: 'originatingStationID (4 bytes)',
            def: 'The stationID of the ITS-S that first detected the event. For privacy-enabled vehicles this is a pseudonym that rotates over time; all stored actionIDs and DENM header stationIDs are updated in sync whenever the pseudonym changes.'
          },
          {
            term: 'sequenceNumber (2 bytes)',
            def: 'Incremented for each new event detected by the same station. The combination (stationID, sequenceNumber) uniquely identifies one event instance. Release 2 renamed this field actionId (camelCase) and allows a central entity (e.g. traffic management centre) to supply the stationId component.'
          },
          {
            term: 'referenceTime',
            def: 'Generation timestamp of this specific DENM instance (new, update, or cancellation). Strictly increasing per actionID — the primary mechanism to distinguish updates from repetitions. Measured in milliseconds since 2004-01-01T00:00:00 UTC (ITS epoch).'
          },
          {
            term: 'detectionTime',
            def: 'When the event (or its update/termination) was detected by the application. May predate referenceTime. Remains unchanged during DENM repetitions; updated for every update or termination.'
          },
          {
            term: 'validityDuration',
            def: 'How long the event is expected to persist, in seconds. Default 600 s if not specified by the application. Governs how long the DENM is kept alive in receiving stations and by KAF forwarders.'
          },
          {
            term: 'relevanceDistance',
            def: 'Distance from event position within which the event is considered relevant to receiving ITS-Ss (e.g. lessThan50m, lessThan100m, lessThan200m, lessThan500m, lessThan1000m, lessThan5km, lessThan10km, over10km).'
          },
          {
            term: 'relevanceTrafficDirection',
            def: 'Traffic direction(s) affected: allTrafficDirections, upstreamTraffic, downstreamTraffic, or oppositeTraffic. Used by receivers to perform a relevance check before presenting warnings.'
          },
          {
            term: 'transmissionInterval',
            def: 'Optional hint to forwarding stations (KAF) about the desired re-transmission interval in ms. If absent, KAF forwarding is disabled for that DENM.'
          },
          {
            term: 'stationType',
            def: 'Type of the originating ITS station (e.g. passengerCar, truck, roadSideUnit, bicycle, pedestrian).'
          },
        ]} />

        <h3>Situation Container in Detail</h3>
        <p>
          The situation container tells receivers <em>what</em> happened. The core classification is the
          <strong> eventType</strong> data frame, composed of:
        </p>
        <ul>
          <li><strong>causeCode</strong> — high-level category (e.g. 2 = accident, 3 = roadworks, 95 = emergencyVehicleApproaching). Values 1–100 are aligned with the TPEG TEC specification (TISA TAWG11071); values 91–100 are ETSI-specific additions.</li>
          <li><strong>subCauseCode</strong> — detail within that category (e.g. accident subCause 3 = multiVehicleAccident). Set to 0 when unknown or unavailable.</li>
        </ul>
        <p>
          <strong>informationQuality</strong> (0–7) indicates confidence in the event information: 0 = unavailable,
          1 = lowest, 7 = highest. The <strong>linkedCause</strong> field allows a secondary cause to be stated — for
          example, causeCode=2 (accident) with a linkedCause of causeCode=6 (adverse weather — adhesion) to indicate the
          crash was caused by ice.
        </p>

        <h3>Location Container in Detail</h3>
        <p>
          The location container provides the event's geometric footprint for relevance checking. The mandatory
          <strong> traces</strong> field (renamed <strong>detectionZonesToEventPosition</strong> in R2) contains up to 7
          paths — ordered lists of waypoints approaching the event position from different directions (e.g. from multiple
          motorway on-ramps). Each waypoint is a delta position relative to the previous point, optionally augmented with
          a time offset. A receiving vehicle compares its own trajectory against the traces to determine whether it is
          heading toward the event. The <strong>roadType</strong> field classifies the road (urban/non-urban,
          with/without divider).
        </p>
      </Section>

      {/* ── 4. Cause code catalogue ──────────────────────────────────────────── */}
      <Section id="cause-codes" title="Cause Code / Sub-Cause Code Catalogue">
        <p>
          Every DENM carries an <strong>eventType</strong> that combines a cause code with a sub-cause code. The table below
          gives selected examples from the full catalogue defined in ETSI EN 302 637-3 Table 10 and TS 103 831.
        </p>
        <Table
          caption="Selected DENM cause codes and sub-cause codes (ETSI EN 302 637-3 Table 10)"
          headers={['Cause code description', 'causeCode value', 'Example sub-cause codes']}
          rows={[
            ['trafficCondition', '1', '0=unavailable, 1=increased, 2=jam slowly increasing, 3=jam increasing, 5=stationary, 8=jam strongly decreasing'],
            ['accident', '2', '0=unavailable, 1=multi-vehicle, 2=heavy accident, 3=accident involving lorry, 5=with roadworks, 8=assistance requested (e-call)'],
            ['roadworks', '3', '0=unavailable, 1=major roadworks, 2=road marking, 4=short-term stationary, 5=street cleaning, 6=winter service'],
            ['adverseWeatherCondition-Adhesion', '6', '0=unavailable, 1=heavy frost, 4=snow on road, 5=ice on road, 6=black ice, 10=aquaplaning'],
            ['hazardousLocation-ObstacleOnTheRoad', '10', '0=unavailable, 1=shed load, 2=parts of vehicles, 3=parts of tires, 6=broken down vehicle'],
            ['humanPresenceOnTheRoad', '12', '0=unavailable, 1=children on roadway, 2=cyclists on roadway, 3=motorcyclist on roadway'],
            ['wrongWayDriving', '14', '0=unavailable, 1=vehicle in wrong lane, 2=vehicle in wrong driving direction'],
            ['slowVehicle', '26', '0=unavailable, 1=maintenance vehicle, 2=vehicle lacking power, 4=truck speed limit, 6=abnormal wide load'],
            ['dangerousEndOfQueue', '27', '0=unavailable, 1=sudden end of queue, 2=queue over hill, 3=queue around bend, 4=queue in tunnel'],
            ['vehicleBreakdown', '91', '0=unavailable, 1=lack of fuel, 2=lack of battery, 3=engine problem, 6=braking system problem, 8=tyre puncture'],
            ['postCrash', '92', '1=no e-call, 2=e-call manual, 3=e-call automatic, 4=e-call without cell access'],
            ['stationaryVehicle', '94', '0=unavailable, 1=human problem, 2=vehicle breakdown, 3=post crash, 4=public transport stop, 5=dangerous goods'],
            ['emergencyVehicleApproaching', '95', '0=unavailable, 1=emergency vehicle approaching, 2=prioritized vehicle approaching'],
            ['hazardousLocation-DangerousCurve', '96', '0=unavailable, 1=dangerous left turn, 2=dangerous right turn, 3=multiple curves'],
            ['collisionRisk', '97', '0=unavailable, 1=longitudinal, 2=crossing, 3=lateral, 4=vulnerable road user at risk'],
            ['signalViolation', '98', '0=unavailable, 1=stop sign, 2=traffic light, 3=turning regulation violation'],
            ['dangerousSituation', '99', '0=unavailable, 1=emergency electronic brake light (EEBL), 2=pre-crash system activated, 5=AEB engaged'],
          ]}
        />
        <Callout type="info" title="Release 2 adds new cause codes">
          TS 103 831 adds: impassability (5), aquaplaning (7), publicTransportVehicleApproaching (28),
          railwayLevelCrossing (100), detectedRoadworks (4), and violence (20). The SSP scheme was extended from 4 to
          5 octets (SSP version 2) to accommodate these additions.
        </Callout>
      </Section>

      {/* ── 5. DENM Lifecycle ────────────────────────────────────────────────── */}
      <Section id="lifecycle" title="DENM Lifecycle — Trigger, Update, Repetition, Termination">
        <p>
          A DENM's life is governed by the protocol through four message types and four operations. The DEN service at the
          originating ITS-S maintains a local <strong>message table</strong> tracking every active actionID with its current
          state: ACTIVE, CANCELLED, or NEGATED.
        </p>

        <Figure caption="DENM lifecycle — from first detection to event end.">
          <div className="flex flex-col gap-4 items-center text-sm w-full">
            <div className="bg-rose-900 border border-rose-500 rounded-lg px-6 py-3 text-rose-100 text-center w-72">
              <div className="font-bold text-rose-200">NEW DENM</div>
              <div className="text-xs text-rose-400">AppDENM_trigger &rarr; new actionID assigned</div>
              <div className="text-xs mt-1">State: <Badge tone="brand">ACTIVE</Badge></div>
            </div>
            <div className="flex gap-8 w-full justify-center">
              <div className="flex flex-col items-center gap-2">
                <div className="text-slate-400 text-xs">(while event persists)</div>
                <div className="bg-amber-900 border border-amber-500 rounded-lg px-5 py-3 text-amber-100 text-center w-52">
                  <div className="font-bold text-amber-200">REPETITION</div>
                  <div className="text-xs text-amber-400">Same referenceTime, same actionID
                    <br />at transmissionInterval
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="text-slate-400 text-xs">(event evolves)</div>
                <div className="bg-sky-900 border border-sky-500 rounded-lg px-5 py-3 text-sky-100 text-center w-52">
                  <div className="font-bold text-sky-200">UPDATE DENM</div>
                  <div className="text-xs text-sky-400">AppDENM_update &rarr; new referenceTime
                    <br />same actionID
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-violet-900 border border-violet-500 rounded-lg px-6 py-3 text-violet-100 text-center w-72">
              <div className="font-bold text-violet-200">KAF FORWARDING</div>
              <div className="text-xs text-violet-400">Intermediate stations re-broadcast stored DENM
                <br />when originator is silent
              </div>
            </div>
            <div className="flex gap-6 w-full justify-center flex-wrap">
              <div className="flex flex-col items-center gap-1">
                <div className="text-slate-400 text-xs">(originator detects end)</div>
                <div className="bg-slate-700 border border-slate-500 rounded-lg px-5 py-3 text-slate-100 text-center w-48">
                  <div className="font-bold">CANCELLATION</div>
                  <div className="text-xs text-slate-400">termination=isCancellation
                    <br />same actionID &amp; stationID
                  </div>
                  <div className="text-xs mt-1"><Badge tone="amber">CANCELLED</Badge></div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="text-slate-400 text-xs">(third-party detects end)</div>
                <div className="bg-slate-700 border border-slate-500 rounded-lg px-5 py-3 text-slate-100 text-center w-48">
                  <div className="font-bold">NEGATION</div>
                  <div className="text-xs text-slate-400">termination=isNegation
                    <br />original actionID, different stationID
                  </div>
                  <div className="text-xs mt-1"><Badge tone="emerald">NEGATED</Badge></div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="text-slate-400 text-xs">(timer expires)</div>
                <div className="bg-slate-700 border border-slate-500 rounded-lg px-5 py-3 text-slate-100 text-center w-48">
                  <div className="font-bold">VALIDITY EXPIRY</div>
                  <div className="text-xs text-slate-400">validityDuration elapsed
                    <br />auto-cleared by DEN service
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Figure>

        <h3>The Four Operations Explained</h3>

        <Steps>
          <div>
            <strong>Trigger (AppDENM_trigger):</strong> The application detects a new event and passes event details to the
            DEN service. A fresh actionID (stationID + unused sequenceNumber) is created, all containers are populated, and
            the DENM is handed to GeoNetworking as a GeoBroadcast. Timer T_O_Validity starts (defaulting to 600 s if no
            validityDuration is provided). If repetitionInterval and repetitionDuration are supplied, timers T_Repetition
            and T_RepetitionDuration are also armed.
          </div>
          <div>
            <strong>Update (AppDENM_update):</strong> When the event evolves (position changes, severity changes, new details
            available), the application calls AppDENM_update with the same actionID. The DEN service generates a new DENM
            with an incremented referenceTime — which must be strictly greater than any previous referenceTime for that
            actionID. Receivers use referenceTime to detect whether a received DENM is newer than one already in their
            message table.
          </div>
          <div>
            <strong>Repetition:</strong> Between updates, the DEN service re-transmits the most recent DENM at the
            configured repetitionInterval, keeping the same referenceTime and actionID. New vehicles entering the area
            receive the current event state. Repetition stops automatically when T_RepetitionDuration expires or when an
            update or termination supersedes it.
          </div>
          <div>
            <strong>Cancellation (AppDENM_termination, by originator):</strong> The originating station that created the
            actionID sends a DENM with termination=isCancellation. The situation, location, and a-la-carte containers are
            absent. The entry transitions to CANCELLED in all message tables. Receiving stations remove the event from their
            awareness picture. The cancellation DENM must be transmitted at least once and may be repeated.
          </div>
          <div>
            <strong>Negation (AppDENM_termination, by third-party):</strong> A different ITS-S passes through the event
            location, finds the event no longer exists, and sends termination=isNegation using the original actionID but
            its own stationID in the PDU header. The referenceTime is copied from the latest received DENM of that actionID,
            so receivers can match it correctly. Example: a vehicle detects black ice and triggers a DENM; 20 minutes later
            another vehicle drives through the same spot, finds no ice, and negates the DENM.
          </div>
        </Steps>

        <StatGrid cols={4}>
          <Stat value="600 s" label="Default validity" sub="T_O_Validity if not specified" />
          <Stat value="1+" label="Termination sends" sub="cancellation/negation sent at least once" />
          <Stat value="0" label="subCauseCode unknown" sub="set to 0 when unavailable" />
          <Stat value="7" label="Max informationQuality" sub="1=lowest, 7=highest, 0=unavailable" />
        </StatGrid>
      </Section>

      {/* ── 6. Forwarding & geography ────────────────────────────────────────── */}
      <Section id="forwarding" title="Forwarding — GeoNetworking and Keep-Alive Forwarding">
        <p>
          DENM dissemination operates on two levels: <strong>packet-centric forwarding</strong> at the networking layer,
          and optional <strong>Keep-Alive Forwarding (KAF)</strong> at the facilities layer.
        </p>
        <h3>Packet-Centric Forwarding via GeoNetworking</h3>
        <p>
          DENMs are disseminated using <strong>GeoNetworking GeoBroadcast</strong> over <strong>BTP-B (Basic Transport
          Protocol, type B)</strong> on <strong>destination port 2002</strong>. The originating station specifies a
          destination area (circle, rectangle, or ellipse as defined in ETSI EN 302 931 / TS 103 899) to the networking
          layer. GeoNetworking nodes forward the packet greedily toward and within the destination area. This handles the
          normal case where the originator is actively transmitting.
        </p>
        <h3>Keep-Alive Forwarding (KAF)</h3>
        <p>
          KAF is an <strong>optional, facilities-layer forwarding scheme</strong>. Its purpose is to maintain DENM
          dissemination when the originating station can no longer transmit — for example, a broken-down vehicle whose ITS-S
          has failed. A station running KAF:
        </p>
        <ul>
          <li>Stores received DENMs during their validityDuration while the station remains inside the destination or relevance area and the event is not cancelled/negated.</li>
          <li>Monitors whether it still hears periodic transmissions for that actionID.</li>
          <li>If the actionID goes silent for longer than T_Forwarding, re-transmits the stored DENM, keeping the warning alive.</li>
          <li>Only forwards DENMs with the most recent referenceTime for each actionID.</li>
        </ul>
        <Callout type="tip" title="KAF requires transmissionInterval">
          A forwarding ITS-S activates KAF only if the received DENM contains a <code>transmissionInterval</code> value in
          the management container. Without it the station has no timing reference and KAF is disabled for that event.
        </Callout>

        <Figure caption="Geographic relationship between event position, relevance area, and destination area.">
          <div className="flex gap-6 justify-center items-start flex-wrap text-xs text-center">
            <div className="relative w-64 h-52 border-2 border-dashed border-slate-500 rounded-full flex items-center justify-center bg-slate-900">
              <span className="absolute top-2 text-slate-400 font-semibold">Destination Area (GeoNetworking)</span>
              <div className="relative w-36 h-32 border-2 border-dashed border-amber-500 rounded-full flex items-center justify-center bg-amber-950">
                <span className="absolute top-1 text-amber-400 font-semibold leading-tight">Relevance<br />Area</span>
                <div className="w-10 h-10 bg-rose-700 border-2 border-rose-400 rounded-full flex items-center justify-center mt-4">
                  <span className="text-rose-200 text-xs leading-tight">Event</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 justify-center text-left max-w-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-rose-700 border border-rose-400 rounded-full shrink-0"></div>
                <span className="text-slate-300"><strong>eventPosition</strong> — exact location of hazard; in Management Container</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-0 border-t-2 border-dashed border-amber-500 shrink-0"></div>
                <span className="text-slate-300"><strong>Relevance area</strong> — set by application via relevanceDistance + relevanceTrafficDirection; stations inside should act on warning</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-0 border-t-2 border-dashed border-slate-500 shrink-0"></div>
                <span className="text-slate-300"><strong>Destination area</strong> — passed to GeoNetworking; must cover relevance area; typically larger; defined as circle, rectangle, or ellipse</span>
              </div>
            </div>
          </div>
        </Figure>
      </Section>

      {/* ── 7. Security ──────────────────────────────────────────────────────── */}
      <Section id="security" title="Security — SSP, ITS-AID, and Certificates">
        <p>
          All DENMs in a deployed C-ITS ecosystem are digitally signed using <strong>Authorization Tickets (ATs)</strong>
          issued by the <Link to="/pki">C-ITS PKI</Link>. The certificate format is specified in ETSI TS 103 097. Every AT
          embeds an <strong>ITS-Application Identifier (ITS-AID)</strong> for the DEN service and a
          <strong> Service Specific Permissions (SSP)</strong> bit field.
        </p>
        <p>
          The SSP encodes exactly which cause codes the certificate holder is authorized to sign. A DENM is accepted by a
          receiver only if the causeCode in the DENM matches a set bit in the signing certificate's SSP. This prevents
          unauthorized stations from sending false warnings. The SSP is a bit string organized into octets: octet 0 carries
          the version number, octets 1–3 carry cause code permissions (R1, 4 octets total, version=1), and octet 4
          carries Release 2 extensions (version=2, 5 octets total).
        </p>
        <Callout type="example" title="SSP example — EEBL">
          The Electronic Emergency Brake Light application sends DENMs with causeCode=99 (dangerousSituation),
          subCauseCode=1 (emergencyElectronicBrakeEngaged). The sending vehicle's AT must have the SSP bit for
          dangerousSituation (octet 3, bit 7, value 0x01) set to 1. Without that permission, receiving stations reject
          the DENM as unauthorized.
        </Callout>
        <Table
          caption="DENM SSP octet scheme (EN 302 637-3 Table 9 / TS 103 831 Table 9)"
          headers={['Octet', 'Content']}
          rows={[
            ['0', 'SSP version: 0=test only, 1=R1 (4 octets), 2=R2 (5 octets)'],
            ['1', 'trafficCondition(1), accident(2), roadworks(3), adverseWeatherCondition-Adhesion(6), hazardousLocation-SurfaceCondition(9), hazardousLocation-ObstacleOnTheRoad(10), hazardousLocation-AnimalOnTheRoad(11), humanPresenceOnTheRoad(12)'],
            ['2', 'wrongWayDriving(14), rescueAndRecoveryWorkInProgress(15), adverseWeatherCondition-ExtremeWeatherCondition(17), adverseWeatherCondition-Visibility(18), adverseWeatherCondition-Precipitation(19), slowVehicle(26), dangerousEndOfQueue(27), vehicleBreakdown(91)'],
            ['3', 'postCrash(92), humanProblem(93), stationaryVehicle(94), emergencyVehicleApproaching(95), hazardousLocation-DangerousCurve(96), collisionRisk(97), signalViolation(98), dangerousSituation(99)'],
            ['4 (R2 only)', 'impassability(5), aquaplaning(7), publicTransportVehicleApproaching(28), railwayLevelCrossing(100), detectedRoadworks(4), violence(20)'],
          ]}
        />
      </Section>

      {/* ── 8. R1 vs R2 ──────────────────────────────────────────────────────── */}
      <Section id="r1-r2" title="Release 1 vs Release 2 Evolution">
        <p>
          The DENM specification has evolved across two releases. The Release 1 (R1) baseline is captured in{' '}
          <Ref code="ETSI TS 102 637-3" kind="ETSI" /> (V1.1.1, 2010 — legacy) and its replacement{' '}
          <Ref code="ETSI EN 302 637-3" kind="ETSI" /> (V1.3.1, 2019), which remains the normative base. Release 2 is
          specified in <Ref code="ETSI TS 103 831" kind="ETSI" /> (V2.3.1, 2025) and is backwards-compatible: R1 receivers
          can decode R2 DENMs and use R1 content without understanding R2 extensions.
        </p>
        <Table
          caption="Key differences between DENM Release 1 (EN 302 637-3) and Release 2 (TS 103 831)"
          headers={['Aspect', 'R1 — EN 302 637-3 V1.3.1', 'R2 — TS 103 831 V2.3.1']}
          rows={[
            ['Document type', 'European Standard (EN)', 'Technical Specification (TS)'],
            ['Field naming', 'actionID, stationID (all-caps ID)', 'actionId, stationId (camelCase)'],
            ['Relevance area', 'relevanceDistance + relevanceTrafficDirection in Management Container', 'Renamed awarenessDistance + trafficDirection; introduces awarenessArea and relevanceZone concepts with eventZone, eventEnd fields in Situation Container'],
            ['Location container', 'traces — ordered waypoints approaching event; roadType', 'Renamed detectionZonesToEventPosition; adds detectionZonesToSpecifiedEventPoint, predictedPaths, lanePositions, occupiedLanes, linkedIvims, linkedMapem'],
            ['Situation container', 'informationQuality, eventType, linkedCause, eventHistory', 'Adds eventZone, linkedDenms, eventEnd, eventEndFactor, perceivedEvent'],
            ['A La Carte container', 'roadWorks, stationaryVehicle, impactReduction, externalTemperature, positioningSolution, lanePosition', 'Adds roadConfiguration (Road Configuration Container / RCC), preCrash (for pre-crash mitigation)'],
            ['Cause codes', '24 cause codes; 4-octet SSP (version 1)', 'Adds impassability(5), aquaplaning(7), publicTransport(28), railwayCrossing(100), detectedRoadworks(4), violence(20); 5-octet SSP (version 2)'],
            ['Central entity support', 'Not addressed', 'stationId in actionId may come from a traffic management centre; central ITS-S can supply actionId value'],
            ['Resource Management', 'Not addressed', 'DEN service may interact with Resource Management service to comply with channel congestion limits'],
            ['POTI integration', 'Not addressed', 'DEN service may request position/time from POTI service'],
            ['Interface names', 'IF.DEN.1 (transmit) / IF.DEN.2 (receive)', 'IF.Triggering / IF.DataCollect / IF.DataOut / IF.DataIn / IF.Control / IF.Security'],
          ]}
        />
        <Callout type="warn" title="Legacy TS 102 637-3 (2010)">
          The very first DENM specification used a 3-container structure (no A La Carte), a single-byte
          <code> dataVersion</code> field (255 = cancellation), an <code>isNegation</code> boolean flag, and a
          <code> reliability</code> field (0–100%). These were all restructured in the replacement EN 302 637-3. The legacy
          spec is informative only and not used in current deployments.
        </Callout>
      </Section>

      {/* ── 9. Protocol operation ────────────────────────────────────────────── */}
      <Section id="protocol-operation" title="Protocol Operation — Three Roles, Six Timers">
        <p>
          The DEN service protocol defines three distinct ITS-S roles, each with its own message table and timers:
        </p>
        <CardGrid cols={3}>
          <Card title="Originating ITS-S" accent="rose">
            <p>Creates new / update / cancellation / negation DENMs. Maintains the originating message table (actionID
              state: ACTIVE / CANCELLED / NEGATED). Manages T_O_Validity, T_Repetition, T_RepetitionDuration.
              Returns the actionID to the requesting application.</p>
          </Card>
          <Card title="Forwarding ITS-S (KAF)" accent="violet">
            <p>Receives a DENM and stores it while valid. Runs T_F_Validity and T_Forwarding timers.
              Re-transmits if the event goes silent. Only forwards the most recent referenceTime per actionID.
              KAF is optional and governed by the transmissionInterval field.</p>
          </Card>
          <Card title="Receiving ITS-S" accent="emerald">
            <p>Runs T_R_Validity. Updates the receiving message table on each incoming DENM. Discards stale messages
              (referenceTime not newer). Delivers event info to applications and / or the LDM. Performs relevance check
              using relevanceDistance and relevanceTrafficDirection.</p>
          </Card>
        </CardGrid>

        <h3>Timer Reference</h3>
        <DefList items={[
          { term: 'T_O_Validity', def: 'Originating: ends DENM processing for a specific actionID. Set to validityDuration offset from detectionTime; defaults to 600 s.' },
          { term: 'T_Repetition', def: 'Originating: fires each repetitionInterval to trigger re-transmission of the current DENM for a given actionID.' },
          { term: 'T_RepetitionDuration', def: 'Originating: fires when repetitionDuration elapses, stopping automatic re-transmission. Not included in the DENM itself.' },
          { term: 'T_F_Validity', def: 'Forwarding (KAF): ends forwarding for a specific actionID when the stored DENM validity expires.' },
          { term: 'T_Forwarding', def: 'Forwarding (KAF): if no DENM of the same actionID is received within this timeout, the stored DENM is re-transmitted.' },
          { term: 'T_R_Validity', def: 'Receiving: tracks how long a received DENM remains valid in the receiving message table.' },
        ]} />
      </Section>

      {/* ── 10. Use cases ────────────────────────────────────────────────────── */}
      <Section id="use-cases" title="Representative Use Cases">
        <Table
          caption="Representative DENM use cases with triggering and termination conditions (TS 102 637-3 Table 1)"
          headers={['Use Case', 'Trigger Condition', 'Termination Condition']}
          rows={[
            ['Emergency electronic brake light (EEBL)', 'Hard braking (ABS / AEB activation)', 'Automatic after expiry time'],
            ['Wrong-way driving warning', 'Vehicle detected driving against traffic', 'Vehicle leaves wrong road section'],
            ['Stationary vehicle — accident (post-crash)', 'e-Call triggered or collision sensor', 'Vehicle removed from road'],
            ['Stationary vehicle — breakdown', 'Breakdown detected with hazard lights on', 'Vehicle moves or is removed'],
            ['Traffic condition / traffic jam', 'Traffic jam detection (deceleration patterns)', 'End of traffic jam detected'],
            ['Roadwork warning', 'Signalled by fixed or moving roadside ITS-S', 'End of roadwork period'],
            ['Adverse weather — road adhesion', 'ESP / ESC activation by vehicle sensors', 'End of slippery condition'],
            ['Adverse weather — precipitation', 'Heavy rain/snow detected (wiper activation)', 'End of precipitation'],
            ['Adverse weather — visibility', 'Low visibility (fog lights / anti-fog activation)', 'End of low visibility condition'],
            ['Emergency vehicle approaching', 'Emergency vehicle broadcasts approach DENM', 'Vehicle passes / event expires'],
            ['Collision risk warning', 'Roadside ITS-S detects intersection risk', 'Risk eliminated'],
            ['Human presence on road', 'Pedestrian / cyclist detected on carriageway', 'Area clear / expiry time'],
          ]}
        />
      </Section>

      {/* ── 11. Key standards ────────────────────────────────────────────────── */}
      <Section id="standards" title="Key Standards">
        <ul>
          <li><Ref code="ETSI EN 302 637-3" title="DENM Basic Service" kind="ETSI" /> V1.3.1 (2019) — normative Release 1; replaces TS 102 637-3.</li>
          <li><Ref code="ETSI TS 103 831" title="DEN Service Release 2" kind="ETSI" /> V2.3.1 (2025) — Release 2 with extended containers, new cause codes, SSP v2.</li>
          <li><Ref code="ETSI TS 102 637-3" title="DENM Basic Service (legacy)" kind="ETSI" /> V1.1.1 (2010) — original specification, informative only.</li>
          <li><Ref code="ETSI TS 102 894-2" title="Common Data Dictionary" kind="ETSI" /> — shared data elements and frames used by DENMs.</li>
          <li><Ref code="ETSI EN 302 636-4-1" title="GeoNetworking" kind="ETSI" /> — GeoBroadcast and forwarding used for DENM dissemination.</li>
          <li><Ref code="ETSI EN 302 636-5-1" title="BTP" kind="ETSI" /> — Basic Transport Protocol type B; DENM uses destination port 2002.</li>
          <li><Ref code="ETSI TS 103 097" title="Security headers and certificates" kind="ETSI" /> — Authorization Ticket and SSP format for DENM signing.</li>
          <li><Ref code="ETSI TS 101 539-1" title="Road Hazard Signalling" kind="ETSI" /> — application requirements for RHW use cases using DENMs.</li>
        </ul>
      </Section>

      {/* ── 12. Where next ───────────────────────────────────────────────────── */}
      <Section id="where-next" title="Where Next">
        <CardGrid cols={3}>
          <Card title="CAM" accent="brand">
            The periodic heartbeat message — understand how CAM and DENM complement each other.{' '}
            <Link to="/cam">CAM page &rarr;</Link>
          </Card>
          <Card title="Facilities Layer" accent="amber">
            The broader context: LDM, POTI, CPM, VAM, and the service interfaces.{' '}
            <Link to="/facilities">Facilities &rarr;</Link>
          </Card>
          <Card title="GeoNetworking" accent="emerald">
            How GeoBroadcast and BTP-B carry DENMs across multi-hop ITS networks.{' '}
            <Link to="/networking">Networking &rarr;</Link>
          </Card>
          <Card title="PKI &amp; Security" accent="rose">
            Authorization Tickets, SSP, and certificate management for signed DENMs.{' '}
            <Link to="/pki">PKI &rarr;</Link>
          </Card>
          <Card title="Applications" accent="violet">
            Road Hazard Warning and other C-ITS applications that consume DENMs.{' '}
            <Link to="/applications">Applications &rarr;</Link>
          </Card>
          <Card title="C-Roads" accent="cyan">
            European deployment profiles and harmonised DENM usage in C-ITS corridors.{' '}
            <Link to="/c-roads">C-Roads &rarr;</Link>
          </Card>
        </CardGrid>
      </Section>
    </article>
  )
}
