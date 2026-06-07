import React from 'react'
import { Link } from 'react-router-dom'
import { PageHeader, Section, Prose, Callout, Ref, Table, StatGrid, Stat, CardGrid, Card, Steps, Figure, LayerStack, DefList, Badge } from '../components/ui.jsx'

export default function Facilities() {
  return (
    <article>
      <PageHeader
        kicker="FACILITIES LAYER"
        title="Facilities Layer: Messages, Data &amp; Services"
        intro="The facilities layer is the intelligence of the ITS station. Sitting between the networking stack and applications, it creates and processes all C-ITS messages, maintains a shared dictionary of common data types, runs a local sensor-fused map of the surroundings, and manages the station's position and time reference. Every message — from CAM to DENM to CPM — originates and terminates here."
        sources={[
          'ETSI TS 102 894-1 V2.0.0',
          'ETSI TS 102 894-2 V2.4.1',
          'ETSI EN 302 895 V1.1.1',
          'ETSI EN 302 890-2 V2.1.1',
          'ETSI EN 302 890-1 V1.1.1',
        ]}
      />

      {/* ── 1. Role & architecture ─────────────────────────────────────────── */}
      <Section id="role" title="Role in the ITS-S Architecture">
        <p>
          An ITS Station (ITS-S) is structured according to the reference architecture defined in{' '}
          <Ref code="ETSI EN 302 665" kind="ETSI" title="ITS Communications Architecture" />.
          It has four horizontal layers — access, networking &amp; transport, facilities, and applications — plus
          two vertical cross-layers (management and security). The facilities layer occupies the critical middle tier:
        </p>

        <LayerStack
          layers={[
            { name: 'Applications', sub: 'CA, DEN, CP, VRU, Platooning, GLOSA …', accent: 'amber' },
            { name: 'Facilities Layer', sub: 'Message services · CDD · LDM · PoTi · SA', accent: 'brand' },
            { name: 'Networking & Transport', sub: 'GeoNetworking · BTP · IPv6', accent: 'emerald' },
            { name: 'Access Layer', sub: 'ITS-G5 · C-V2X · LTE-V · DSRC', accent: 'violet' },
          ]}
          leftRail="Security"
          rightRail="Management"
        />

        <p>
          The facilities layer is responsible for:
        </p>
        <ul>
          <li>Encoding and decoding all ITS message PDUs (Protocol Data Units) using ASN.1 / UPER.</li>
          <li>Providing the <strong>Common Data Dictionary (CDD)</strong> — a shared library of data types reused by every message.</li>
          <li>Operating the <strong>Local Dynamic Map (LDM)</strong> — a timestamped, geo-referenced database of nearby objects and events.</li>
          <li>Delivering authoritative <strong>position and time</strong> information to all other layers through the PoTi entity.</li>
          <li>Running <strong>service management facilities</strong> such as the Services Announcement (SA) service.</li>
        </ul>

        <Callout type="key" title="Why a separate facilities layer?">
          Without the facilities layer, every application would have to implement its own message codec, its own
          position engine, and its own neighbour database. The facilities layer centralises these costly functions
          once per ITS-S and exposes them to any number of concurrent applications through well-defined service
          access points (FA-SAP, NF-SAP, MF-SAP, SF-SAP).
        </Callout>

        <p>
          The structure is governed at a high level by{' '}
          <Ref code="ETSI TS 102 894-1" kind="ETSI" title="Facility Layer Structure R2" />,
          which defines the Release 2 functional architecture. Release 2 (version 2.Y.Z) specifications
          are self-consistent and backward compatible with Release 1 at the PDU level — a Release 1 receiver
          can decode a Release 2 message, provided no breaking extension markers were added.
        </p>
      </Section>

      {/* ── 2. Common Data Dictionary ──────────────────────────────────────── */}
      <Section id="cdd" title="Common Data Dictionary (CDD)">
        <p>
          <Ref code="ETSI TS 102 894-2" kind="ETSI" title="CDD Release 2" /> defines the{' '}
          <strong>ITS Common Data Dictionary</strong> — a repository of <em>Data Elements (DEs)</em> and{' '}
          <em>Data Frames (DFs)</em> that any ITS message can import instead of defining its own types.
          The CDD removes the need for every standard to invent its own representation of "position" or
          "speed", ensures semantic interoperability, and simplifies conformance testing.
        </p>

        <Callout type="info" title="Data Elements vs Data Frames">
          A <strong>Data Element (DE)</strong> is a primitive, atomic value — an integer, enumeration or
          bit string with a precise unit and range. A <strong>Data Frame (DF)</strong> is a structured
          composite of DEs and/or other DFs, analogous to a struct in C. The CDD defines both.
        </Callout>

        <h3>CDD Structure</h3>
        <p>
          The entire CDD is encoded as a single ASN.1 module named <code>ETSI-ITS-CDD</code>,
          identified by the Object Identifier:
        </p>
        <pre className="bg-ink-900 border border-ink-700 rounded p-4 text-sm text-brand-300 overflow-x-auto whitespace-pre-wrap">
{`{itu-t (0) identified-organization (4) etsi (0) itsDomain (5)
 wg1 (1) 102894 cdd (2) major-version-4 (4) minor-version-3 (3)}`}
        </pre>
        <p>
          The module uses <strong>ASN.1 with UPER (Unaligned Packed Encoding Rules)</strong> for compact
          over-the-air transmission. Each DE or DF carries an in-module semantic comment following
          the Javadoc-style template: <code>@brief</code>, <code>@param</code>/<code>@field</code>,
          <code>@unit</code>, <code>@category</code>, and <code>@revision</code>.
        </p>

        <h3>DE/DF Categories</h3>
        <p>
          Every CDD data object belongs to at least one of the following categories, which help
          implementers locate relevant types:
        </p>
        <CardGrid cols={3}>
          <Card title="Basic Information" accent="brand">
            Elementary values — protocol version, message ID, station ID, timestamps.
          </Card>
          <Card title="Vehicle Information" accent="amber">
            Types specific to road and rail vehicles — vehicle dimensions, vehicle role, light status.
          </Card>
          <Card title="GeoReference Information" accent="emerald">
            Geographic descriptions — reference position, altitude, relevance area shapes.
          </Card>
          <Card title="Kinematic Information" accent="violet">
            Motion state — speed, heading, curvature, acceleration, yaw rate, path history.
          </Card>
          <Card title="Traffic &amp; Road Topology" accent="rose">
            Road events, cause codes, traffic participant types, intersection topology.
          </Card>
          <Card title="Sensing &amp; VRU Information" accent="cyan">
            Sensor data, detected objects, cluster information, Vulnerable Road User profiles.
          </Card>
        </CardGrid>

        <h3>Key CDD Examples</h3>
        <p>
          The table below gives a representative sample of CDD DEs and DFs that appear in almost
          every C-ITS message. Value ranges and units are taken directly from the CDD ASN.1 module
          (TS 102 894-2 v2.4.1).
        </p>
        <Table
          caption="Selected CDD Data Elements and Data Frames"
          headers={['Name', 'Type', 'ASN.1 basis / range', 'Unit / notes']}
          rows={[
            [
              <><code>StationId</code></>,
              'DE',
              'INTEGER 0..4 294 967 295',
              'Uniquely identifies an ITS-S within a constellation',
            ],
            [
              <><code>TimestampIts</code></>,
              'DE',
              'INTEGER 0..4 398 046 511 103',
              'ms since 2004-01-01T00:00:00Z (ITS epoch, TAI-based)',
            ],
            [
              <><code>Latitude</code></>,
              'DE',
              'INTEGER -831 999 999..832 000 001',
              '1/10 µdeg resolution; unavailable = 900 000 001',
            ],
            [
              <><code>Longitude</code></>,
              'DE',
              'INTEGER -1 799 999 999..1 800 000 001',
              '1/10 µdeg resolution; unavailable = 1 800 000 001',
            ],
            [
              <><code>Altitude</code></>,
              'DF',
              'altitudeValue + altitudeConfidence',
              'cm above WGS84 ellipsoid; range -100 000..614 300',
            ],
            [
              <><code>ReferencePosition</code></>,
              'DF',
              'Latitude + Longitude + PosConfidenceEllipse + Altitude',
              'Full 3-D position with uncertainty ellipse',
            ],
            [
              <><code>Heading</code></>,
              'DF',
              'headingValue (0..3 601) + headingConfidence',
              '0.1 deg resolution; 0 = North, clockwise; 3 601 = unavailable',
            ],
            [
              <><code>Speed</code></>,
              'DF',
              'speedValue (0..16 383) + speedConfidence',
              '0.01 m/s resolution; 16 383 = unavailable',
            ],
            [
              <><code>PathHistory</code></>,
              'DF',
              'SEQUENCE OF PathPoint (max 40)',
              'Sequence of delta lat/lon/alt/time path waypoints',
            ],
            [
              <><code>ItsPduHeader</code></>,
              'DF',
              'protocolVersion + messageId + stationId',
              'Mandatory header on every ITS PDU; messageId encodes message type',
            ],
            [
              <><code>StationType</code></>,
              'DE',
              'ENUMERATED {unknown, pedestrian, cyclist, moped, motorcycle, passengerCar, bus, lightTruck …}',
              'Classifies the sending ITS-S type',
            ],
            [
              <><code>CauseCodeV2</code></>,
              'DF',
              'causeCode + subCauseCode',
              'Reason for a DENM event (accident, roadworks, hazardous location…)',
            ],
          ]}
        />

        <Callout type="example" title="How import works in a message ASN.1 module">
          The CAM module (TS 103 900) imports from the CDD with:
          <pre className="mt-2 bg-ink-900 border border-ink-700 rounded p-3 text-sm text-brand-300 overflow-x-auto">
{`IMPORTS
  ItsPduHeader, ReferencePosition, Heading, Speed,
  StationId, TimestampIts
    FROM ETSI-ITS-CDD
    { itu-t (0) identified-organization (4) etsi (0) itsDomain (5)
      wg1 (1) 102894 cdd (2) major-version-4 (4) minor-version-3 (3) }
    WITH SUCCESSORS;`}
          </pre>
          The <code>WITH SUCCESSORS</code> clause allows future minor-version CDD updates without
          requiring the importing module to be re-published.
        </Callout>

        <h3>CDD Versioning</h3>
        <p>
          The CDD has evolved through four Release 2 versions. The major-version arc in the OID
          is incremented only when backward compatibility of encoded PDUs is broken (e.g. a type is
          renamed or fields are reordered). Adding a new DE/DF, or adding a field at the end of an
          extensible SEQUENCE, increments only the minor-version and does not break existing decoders.
          Current version is <Badge tone="brand">V2.4.1 (2025-11)</Badge>.
        </p>
      </Section>

      {/* ── 3. Message Taxonomy ───────────────────────────────────────────── */}
      <Section id="messages" title="C-ITS Message Taxonomy">
        <p>
          Every message produced at the facilities layer shares the same top-level structure: an
          <code>ItsPduHeader</code> (from the CDD) followed by a message-specific body. The
          <code>messageId</code> field of the header identifies the message type. The table below
          catalogues the principal message types in Release 1 and Release 2.
        </p>
        <Table
          caption="C-ITS message types and their facility-layer standards"
          headers={['Message', 'Full name', 'Standard', 'Purpose', 'Page']}
          rows={[
            [
              <Badge tone="brand">CAM</Badge>,
              'Cooperative Awareness Message',
              'ETSI TS 103 900 (R2)',
              'Periodic broadcast of vehicle/RSU kinematic state (position, speed, heading). Up to 10 Hz for vehicles.',
              <Link to="/cam" className="text-brand-300 underline">CAM</Link>,
            ],
            [
              <Badge tone="rose">DENM</Badge>,
              'Decentralised Environmental Notification Message',
              'ETSI TS 103 831 (R2)',
              'Event-driven alert — accident, roadworks, hazard. Geographically targeted, time-limited.',
              <Link to="/denm" className="text-brand-300 underline">DENM</Link>,
            ],
            [
              <Badge tone="violet">CPM</Badge>,
              'Collective Perception Message',
              'ETSI TS 103 324',
              'Sensor-detected object sharing — lets vehicles act as distributed sensors for each other.',
              <Link to="/cpm" className="text-brand-300 underline">CPM</Link>,
            ],
            [
              <Badge tone="amber">VAM</Badge>,
              'VRU Awareness Message',
              'ETSI TS 103 300-3 (R2)',
              'Presence and kinematics of Vulnerable Road Users (pedestrians, cyclists, personal mobility).',
              <Link to="/vam" className="text-brand-300 underline">VAM</Link>,
            ],
            [
              <Badge tone="emerald">SPATEM</Badge>,
              'Signal Phase And Timing Extended Message',
              'ETSI TS 103 301 (R2)',
              'Real-time traffic signal state and phase timing from infrastructure.',
              <Link to="/infrastructure" className="text-brand-300 underline">Infrastructure</Link>,
            ],
            [
              <Badge tone="emerald">MAPEM</Badge>,
              'MAP Extended Message',
              'ETSI TS 103 301 (R2)',
              'Intersection topology — lanes, connections, approaches. Usually static, sent at low rate.',
              <Link to="/infrastructure" className="text-brand-300 underline">Infrastructure</Link>,
            ],
            [
              <Badge tone="emerald">IVIM</Badge>,
              'Infrastructure to Vehicle Information Message',
              'ETSI TS 103 301 (R2)',
              'Regulatory and informational road signs broadcast by RSUs.',
              <Link to="/infrastructure" className="text-brand-300 underline">Infrastructure</Link>,
            ],
            [
              <Badge tone="cyan">SREM</Badge>,
              'Signal Request Extended Message',
              'ETSI TS 103 301 (R2)',
              'Vehicle requests priority or pre-emption at a signalised intersection.',
              <Link to="/infrastructure" className="text-brand-300 underline">Infrastructure</Link>,
            ],
            [
              <Badge tone="cyan">SSEM</Badge>,
              'Signal Request Status Extended Message',
              'ETSI TS 103 301 (R2)',
              'Infrastructure response to an SREM — granted, rejected, or queued.',
              <Link to="/infrastructure" className="text-brand-300 underline">Infrastructure</Link>,
            ],
            [
              <Badge tone="amber">MCM</Badge>,
              'Manoeuvre Coordination Message',
              'ETSI TS 103 461',
              'Cooperative manoeuvre negotiation — lane change, merge, overtake proposals.',
              <Link to="/mcm" className="text-brand-300 underline">MCM</Link>,
            ],
            [
              <Badge tone="brand">SAEM</Badge>,
              'Services Announcement Extended Message',
              'ETSI EN 302 890-1',
              'Push announcement of available ITS services on neighbouring ITS-Ss. Default rate: 1 Hz, radius: 400 m.',
              <span className="text-slate-400">SA service</span>,
            ],
            [
              <Badge tone="violet">IMZM</Badge>,
              'Interference Management Zone Message',
              'ETSI TS 103 724',
              'Announces zones where transmitted power must be reduced to protect CEN DSRC equipment.',
              <span className="text-slate-400">—</span>,
            ],
          ]}
        />
        <p>
          All messages import <code>ItsPduHeader</code> from the CDD, are encoded in{' '}
          <strong>UPER (Unaligned Packed Encoding Rules)</strong> per ITU-T X.691, and are
          typically secured using <Link to="/security" className="text-brand-300 underline">ETSI ITS security headers</Link> per
          TS 103 097. Each is assigned a unique ITS Application Identifier (ITS-AID) from the
          ETSI registry (TS 102 965).
        </p>
      </Section>

      {/* ── 4. LDM ─────────────────────────────────────────────────────────── */}
      <Section id="ldm" title="Local Dynamic Map (LDM)">
        <p>
          <Ref code="ETSI EN 302 895" kind="ETSI" title="Local Dynamic Map" /> defines the{' '}
          <strong>LDM</strong> — a conceptual, timestamped, geo-referenced data store residing within
          an ITS-S that aggregates information from all sources (received messages, on-board sensors,
          applications) and serves it to authorised consumers on demand or by subscription.
        </p>
        <p>
          The LDM does not modify provider data. It is not a communication protocol — it is a
          well-defined internal service accessed via four interfaces.
        </p>

        <h3>Conceptual Layers</h3>
        <p>
          Conceptually the data held in the LDM can be organised into four layers of increasing
          dynamicity:
        </p>
        <Figure caption="LDM conceptual data layers — from static map to dynamic events">
          <div className="grid grid-cols-1 gap-0 rounded overflow-hidden border border-ink-700 text-sm">
            <div className="flex items-start gap-4 bg-violet-950 border-b border-ink-700 p-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center font-bold text-white">4</div>
              <div>
                <p className="font-semibold text-violet-300">Dynamic Events</p>
                <p className="text-slate-300 mt-1">
                  Received DENMs, hazard alerts, road-work zones — transient events with explicit time
                  validity periods. Provided by the DEN basic service.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-rose-950 border-b border-ink-700 p-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center font-bold text-white">3</div>
              <div>
                <p className="font-semibold text-rose-300">Mobile Objects</p>
                <p className="text-slate-300 mt-1">
                  Nearby vehicles, VRUs, RSUs — data from received CAMs, VAMs, CPMs. Expires quickly
                  (order of seconds) if not refreshed.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-amber-950 border-b border-ink-700 p-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center font-bold text-white">2</div>
              <div>
                <p className="font-semibold text-amber-300">Transient Data</p>
                <p className="text-slate-300 mt-1">
                  Traffic signals (SPATEM/MAPEM), intersection maps, road-side information — semi-static
                  but updated periodically by infrastructure.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-emerald-950 p-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-white">1</div>
              <div>
                <p className="font-semibold text-emerald-300">Static Map Data</p>
                <p className="text-slate-300 mt-1">
                  Road network geometry, lane topology, speed limits, static POIs — long-lived
                  background map layer used for context.
                </p>
              </div>
            </div>
          </div>
        </Figure>

        <h3>LDM Functional Architecture</h3>
        <p>EN 302 895 defines two internal components and four external interfaces:</p>
        <DefList items={[
          {
            term: 'FN.LDM.1 — LDM Service',
            def: 'Handles registration/deregistration of Data Providers and Data Consumers, processes query and publish/subscribe requests, and enforces access authorisation.',
          },
          {
            term: 'FN.LDM.2 — LDM Maintenance',
            def: 'Stores LDM Data Objects, applies time-validity and geo-validity rules (LDM Area of Maintenance), and performs garbage collection of expired objects.',
          },
          {
            term: 'IF.LDM.1 — Management Layer',
            def: 'Required interface to the ITS management entity (MF-SAP) for configuration.',
          },
          {
            term: 'IF.LDM.2 — Security Layer',
            def: 'Required interface to verify authorisation of any Data Provider or Consumer (SF-SAP). Supports revocation of authorisation via RevokeAuthorization messages.',
          },
          {
            term: 'IF.LDM.3 — Data Providers',
            def: 'Provided interface over which facilities (CA service, DEN service) and applications push LDM Data Objects. Providers must register first and supply a timestamp and location with every object.',
          },
          {
            term: 'IF.LDM.4 — Data Consumers',
            def: 'Provided interface over which applications pull data (query) or subscribe to continuous updates (publish/subscribe with filter, area-of-interest, priority, and ordering).',
          },
        ]} />

        <h3>Query and Subscription</h3>
        <p>Applications access the LDM through two complementary mechanisms:</p>
        <Steps>
          <div>
            <strong>Query (one-shot):</strong> A <code>RequestDataobjects.Req</code> message specifies
            the Data Object type (e.g. CAM objects), an optional filter expression (e.g.{' '}
            <code>{'referencePosition.latitude > 43600336'}</code>), priority, and ordering. The LDM
            returns all matching objects within the consumer's registered Area of Interest.
          </div>
          <div>
            <strong>Subscribe (continuous):</strong> A <code>SubscribeDataConsumer.Req</code> sets up
            a standing query. The LDM sends a <code>PublishDataobjects.Resp</code> each time matching
            data is added or updated. The subscription supports event-driven, periodic, and composite
            modes.
          </div>
          <div>
            <strong>Filter language:</strong> Filters are boolean expressions over Data Object attributes
            using comparison operators (==, !=, {'>'},{'<'}, {'>='},{'<='}, =~, !~) combined with
            AND / OR. Example: <code>causeCode == 2 &amp;&amp; subCauseCode == 2</code>.
          </div>
        </Steps>

        <Callout type="tip" title="LDM as the application API">
          From an application developer's perspective the LDM is the primary C-ITS data API. Instead
          of parsing raw incoming CAMs, an application subscribes to the LDM for vehicle objects
          within 200 m. The LDM handles decoding, provenance, and expiry — the application only
          sees clean, authorised data objects.
        </Callout>
      </Section>

      {/* ── 5. PoTi ───────────────────────────────────────────────────────── */}
      <Section id="poti" title="Position and Time Management (PoTi)">
        <p>
          <Ref code="ETSI EN 302 890-2" kind="ETSI" title="PoTi Release 2" /> specifies the{' '}
          <strong>Position and Time (PoTi)</strong> facility entity — the single source of truth for
          an ITS-S's own location, motion, and clock. Every other facility and every application obtains
          position and time from PoTi, ensuring a consistent, integrity-checked reference.
        </p>

        <StatGrid cols={4}>
          <Stat value="10 Hz" label="Position update rate" sub="Release 1 minimum for vehicle ITS-S" />
          <Stat value="20 Hz" label="Platooning rate" sub="Higher rate under consideration in R2" />
          <Stat value="WGS84" label="Reference datum" sub="Ellipsoidal height, not geoid/MSL" />
          <Stat value="TAI" label="Time basis" sub="Epoch 2004-01-01T00:00:00Z" />
        </StatGrid>

        <h3>PoTi Functional Components</h3>
        <CardGrid cols={2}>
          <Card title="Position Information Management" accent="brand">
            Maintains the full kinematic and attitude state: 3-D position (lat/lon/alt), horizontal
            velocity vector, vertical speed, heading (clockwise from WGS84 North), accelerations
            (lateral, longitudinal, vertical in vehicle coordinate system), and yaw/pitch/roll rates.
            Confidence estimates accompany every quantity.
          </Card>
          <Card title="Position Augmentation" accent="emerald">
            Applies external correction data to improve accuracy. Sources include EGNOS (satellite-based
            augmentation), RTCM differential GNSS corrections from nearby R-ITS-Ss (per TS 103 301),
            RTK/PPP-RTK, and cooperative relative positioning from peer ITS-Ss.
          </Card>
          <Card title="Time Information Management" accent="violet">
            Manages the station clock (Tsys) representing ITS Time — TAI-based, epoch
            2004-01-01T00:00:00Z. Synchronises using GNSS (preferred), NTP (RFC 5905), or PTP
            (RFC 8173). Note: TAI has no leap seconds, so NTP synchronisation requires careful
            leap-second handling.
          </Card>
          <Card title="Coordinate System Conversion" accent="amber">
            Converts between WGS84 and local vehicle coordinate systems (ISO 8855), and computes
            relative positions for relevance-area checks (e.g. ellipses and rectangles in DENM traces)
            using the local tangent plane method per ETSI EN 302 931.
          </Card>
        </CardGrid>

        <h3>ITS-S Reference Position</h3>
        <p>
          A key concept in PoTi is the <strong>reference position</strong>: the antenna-independent
          canonical point of the ITS-S used in all transmitted messages. EN 302 890-2 defines reference
          point locations for each platform type:
        </p>
        <Table
          caption="ITS-S reference position (RefPoint ID 0) by platform"
          headers={['Platform', 'RefPoint ID 0', 'Notes']}
          rows={[
            ['Passenger car / small van', 'Ground centre-front of bounding box', 'RefPoint ID 1 = rear centre; GNSS antenna may be elsewhere'],
            ['Standard rigid truck', 'Ground centre-front of bounding box', 'RefPoint ID 1 = rear centre'],
            ['Tractor truck', 'Ground centre-front of bounding box', 'RefPoint ID 1 = overhanging turning point'],
            ['Bus', 'Ground centre-front of bounding box', 'Following same convention as passenger car'],
            ['Motorcycle / bicycle', 'Ground centre-front of bounding box', '—'],
            ['Pedestrian', 'Ground position at user', '—'],
            ['Roadside ITS-S (R-ITS-S)', 'Fixed installation point', 'Typically antenna base or pole base'],
          ]}
        />

        <h3>PoTi Interfaces</h3>
        <p>
          PoTi exports position and time data across four service access points. The minimum mandatory
          data set at each SAP is defined in EN 302 890-2 clauses 5.5.1–5.5.5:
        </p>
        <Table
          caption="PoTi interface minimum data sets"
          headers={['Interface', 'SAP', 'Mandatory data', 'Consumer']}
          rows={[
            ['IF.Appl', 'FA-SAP', 'Timestamp, Latitude, Longitude + optional altitude, speed, heading, confidences', 'ITS applications (CAM service, DEN service, etc.)'],
            ['IF.N&T', 'NF-SAP', 'Timestamp, Latitude, Longitude, horizontal position confidence ellipse', 'GeoNetworking (beacon position)'],
            ['IF.Sec', 'SF-SAP', 'Timestamp, Latitude, Longitude + optional altitude', 'Security entity (populates security header)'],
            ['IF.Mng', 'MF-SAP', 'Configuration and status', 'Management entity (configures PoTi parameters)'],
          ]}
        />

        <h3>Augmentation Services</h3>
        <p>
          For CCAM (Cooperative, Connected, Automated Mobility) use cases, standard GNSS accuracy
          (typically ±3–5 m) is insufficient. EN 302 890-2 specifies two augmentation services:
        </p>
        <DefList items={[
          {
            term: 'GNSS Positioning Correction (GPC) Service',
            def: 'A Roadside ITS-S (R-ITS-S) broadcasts RTCM differential correction data or SSR/PPP-RTK corrections. Vehicle ITS-Ss receive and apply them to achieve sub-metre horizontal accuracy. Defined in RTCM 10403.3. Transitions between R-ITS-S service areas are handled by applying corrections until the old R-ITS-S is out of range.',
          },
          {
            term: 'R-ITS-S Ranging Augmentation Service',
            def: 'Uses Time-of-Flight (ToF) measurements with Ultra Wide Band (UWB) or similar technology between a vehicle and an R-ITS-S of known position to provide ranging-based position correction. Announced via the SA service (EN 302 890-1). Ranging data is exchanged in a standardised ASN.1 PDU (Annex A of EN 302 890-2).',
          },
        ]} />
      </Section>

      {/* ── 6. Services Announcement ─────────────────────────────────────── */}
      <Section id="sa" title="Services Announcement (SA) Facility">
        <p>
          <Ref code="ETSI EN 302 890-1" kind="ETSI" title="SA Specification" /> defines the{' '}
          <strong>Services Announcement (SA) service</strong> — a medium-agnostic push mechanism that
          lets an ITS-S advertise what services it offers, so that nearby ITS-Ss can discover and
          connect to them without prior configuration.
        </p>
        <p>
          The SA service is split between the <strong>facilities layer</strong> (message encoding/decoding,
          TX/RX management) and the <strong>management entity</strong> (registration of service providers
          and users). Applications register their service at the management entity; the SA facility
          layer then handles periodic broadcast of the{' '}
          <strong>Services Announcement Extended Message (SAEM)</strong>.
        </p>
        <Table
          caption="SAEM key communication parameters (TS 102 890-1 Table 7)"
          headers={['Parameter', 'Value', 'Notes']}
          rows={[
            ['Logical channel', 'SfCH (Safety channel)', 'Mapped to physical channel per access technology and region'],
            ['Default rate', '1 Hz (255 x 1 s interval)', 'Between consecutive SAEMs with same saID'],
            ['Default radius (MDA)', '400 m', 'Minimum Dissemination Area given to Networking layer'],
            ['Max latency', '100 ms', 'CSP_MaxLat = ms100'],
            ['Security', 'Data integrity + non-repudiation + source authentication required', 'Generic security profile per TS 103 097'],
            ['Encoding', 'UPER (Unaligned PER)', 'Per ITU-T X.691'],
          ]}
        />
        <p>
          The SAEM body (<code>samBody</code>) carries a list of <code>ServiceInfo</code> entries —
          one per announced service — each containing the ITS-AID, a channel index, and optional
          extensions for protocol type (GeoNetworking, IPv6, WSMP) and provider MAC address. An
          <code>saID</code> / <code>contentCount</code> pair allows receivers to detect changes without
          re-parsing identical content.
        </p>
        <Callout type="tip" title="SA for PoTi augmentation discovery">
          The GNSS Positioning Correction and Ranging augmentation services defined in EN 302 890-2
          are discovered by vehicle ITS-Ss via the SA service. The R-ITS-S broadcasts a SAEM
          announcing the augmentation service AID; vehicles can subscribe to the correction data
          before they enter the R-ITS-S service area.
        </Callout>
      </Section>

      {/* ── 7. Application Support & Service Management ───────────────────── */}
      <Section id="app-support" title="Facilities-Layer Application Support">
        <p>
          Beyond generating and parsing messages, the facilities layer provides cross-cutting support
          services to applications:
        </p>
        <CardGrid cols={2}>
          <Card title="Message rate adaptation" accent="brand">
            The CA basic service adapts CAM transmission frequency (1–10 Hz) based on dynamics reported
            by PoTi — speed change, heading change, or elapsed time. The facilities layer manages the
            timer and trigger logic so the application itself need not.
          </Card>
          <Card title="Decentralised Congestion Control (DCC)" accent="amber">
            The facilities layer interacts with the networking layer DCC mechanism (TS 103 175) to
            throttle message rates when channel load is high, ensuring the shared radio medium is
            not overwhelmed.
          </Card>
          <Card title="Security processing" accent="violet">
            Outgoing PDUs are signed by the security entity before transmission; incoming PDUs are
            verified before their data objects are accepted by the LDM. The facilities layer mediates
            this flow via the SF-SAP, shielding applications from raw certificates.
          </Card>
          <Card title="Service management (MF-SAP)" accent="emerald">
            The management entity configures facilities-layer services — enabling/disabling message
            services, setting priorities, configuring PoTi augmentation sources, and managing
            LDM Area of Maintenance boundaries.
          </Card>
        </CardGrid>

        <Callout type="info" title="Release 1 vs Release 2 evolution">
          Release 1 (V1.Y.Z) specifications established the core CAM/DENM/LDM/PoTi framework.
          Release 2 (V2.Y.Z, 2022–present) adds CPM, VAM, MCM, IMZM, extended CDD categories
          (sensing, VRU, cluster), higher-rate PoTi requirements for CCAM, and integrates change
          requests from field deployments. Release 2 is self-consistent; a Release 2 document at
          V2.0.0 contains the same normative provisions as the latest Release 1 version.
        </Callout>
      </Section>

      {/* ── 8. Where next ─────────────────────────────────────────────────── */}
      <Section id="where-next" title="Explore Further">
        <p>
          The facilities layer connects to every other part of the C-ITS ecosystem. Start with the
          message pages to understand what each service actually sends, or visit the architecture
          overview for the full ITS-S stack:
        </p>
        <CardGrid cols={3}>
          <Card title="CAM" accent="brand" icon="📡">
            The most common C-ITS message.{' '}
            <Link to="/cam" className="text-brand-300 underline">Cooperative Awareness</Link>
          </Card>
          <Card title="DENM" accent="rose" icon="⚠️">
            Road hazard and event alerts.{' '}
            <Link to="/denm" className="text-brand-300 underline">Decentralised Notification</Link>
          </Card>
          <Card title="CPM" accent="violet" icon="👁️">
            Sensor-detected object sharing.{' '}
            <Link to="/cpm" className="text-brand-300 underline">Collective Perception</Link>
          </Card>
          <Card title="VAM" accent="amber" icon="🚶">
            Vulnerable road user awareness.{' '}
            <Link to="/vam" className="text-brand-300 underline">VRU Awareness</Link>
          </Card>
          <Card title="Infrastructure" accent="emerald" icon="🚦">
            SPATEM, MAPEM, IVIM, SREM, SSEM.{' '}
            <Link to="/infrastructure" className="text-brand-300 underline">Infrastructure msgs</Link>
          </Card>
          <Card title="MCM" accent="cyan" icon="🔀">
            Manoeuvre coordination.{' '}
            <Link to="/mcm" className="text-brand-300 underline">MCM</Link>
          </Card>
          <Card title="Architecture" accent="brand" icon="🏗️">
            Full ITS-S protocol stack.{' '}
            <Link to="/architecture" className="text-brand-300 underline">Architecture</Link>
          </Card>
          <Card title="Applications" accent="amber" icon="🗺️">
            Use cases enabled by these messages.{' '}
            <Link to="/applications" className="text-brand-300 underline">Applications</Link>
          </Card>
          <Card title="Security" accent="violet" icon="🔐">
            How messages are signed and verified.{' '}
            <Link to="/security" className="text-brand-300 underline">Security &amp; PKI</Link>
          </Card>
        </CardGrid>
      </Section>

      {/* ── 9. Key Standards ──────────────────────────────────────────────── */}
      <Section id="standards" title="Key Standards">
        <Table
          caption="Standards referenced on this page"
          headers={['Standard', 'Title', 'Version']}
          rows={[
            [
              <Ref code="ETSI TS 102 894-1" kind="ETSI" title="Facility Layer Structure R2" />,
              'Intelligent Transport Systems; Facilities Layer; Part 1: Facility layer structure, functional requirements and specifications; Release 2',
              'V2.0.0 (2023-02)',
            ],
            [
              <Ref code="ETSI TS 102 894-2" kind="ETSI" title="CDD Release 2" />,
              'Intelligent Transport Systems; Facilities Layer; Part 2: Common Data Dictionary (CDD); Release 2',
              'V2.4.1 (2025-11)',
            ],
            [
              <Ref code="ETSI EN 302 895" kind="ETSI" title="Local Dynamic Map" />,
              'Intelligent Transport Systems; Vehicular Communications; Basic Set of Applications; Local Dynamic Map (LDM)',
              'V1.1.1 (2014-09)',
            ],
            [
              <Ref code="ETSI EN 302 890-2" kind="ETSI" title="PoTi Release 2" />,
              'Intelligent Transport Systems; Facilities Layer function; Part 2: Position and Time management (PoTi); Release 2',
              'V2.1.1 (2020-10)',
            ],
            [
              <Ref code="ETSI EN 302 890-1" kind="ETSI" title="Services Announcement" />,
              'Intelligent Transport Systems; Facilities layer function; Part 1: Services Announcement (SA) specification',
              'V1.1.1 (2017-05)',
            ],
            [
              <Ref code="ETSI EN 302 665" kind="ETSI" title="ITS Communications Architecture" />,
              'Intelligent Transport Systems; Communications Architecture',
              'V1.1.1 (2010-09)',
            ],
          ]}
        />
      </Section>
    </article>
  )
}
