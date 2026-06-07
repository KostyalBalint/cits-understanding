import React from 'react'
import { Link } from 'react-router-dom'
import { PageHeader, Section, Prose, Callout, Ref, Table, StatGrid, Stat, CardGrid, Card, Steps, Figure, LayerStack, DefList, Badge } from '../components/ui.jsx'

export default function Networking() {
  return (
    <article>
      <PageHeader
        kicker="Networking &amp; Transport"
        title="GeoNetworking &amp; BTP"
        intro="GeoNetworking is the network-layer protocol at the heart of C-ITS. Unlike IP — which routes packets to a named address — GeoNetworking routes packets to a geographic position or area. This makes it uniquely suited to vehicular ad hoc networks (VANETs), where vehicles move continuously, network topology changes in milliseconds, and many safety messages only matter to vehicles in a specific location. On top of GeoNetworking sits the Basic Transport Protocol (BTP), a four-byte lightweight transport that multiplexes CAM, DENM, and other facility messages to well-known ports — and optionally IPv6 can be carried as well via the GN6ASL adaptation sub-layer."
        sources={['ETSI EN 302 636-1', 'ETSI EN 302 636-3', 'ETSI EN 302 636-4-1', 'ETSI EN 302 636-5-1', 'ETSI EN 302 636-6-1', 'ETSI TS 103 836-4-1', 'ETSI TS 103 836-5-1']}
      />

      {/* ── 1. Why GeoNetworking ─────────────────────────────────────────── */}
      <Section id="why-geonetworking" title="Why position-based routing?">
        <p>
          Classical IP routing maintains tables that map a destination <em>name</em> (address) to a next-hop router.
          In a VANET this breaks down: a vehicle moving at 130 km/h changes its one-hop neighbours every few seconds,
          making topology maintenance prohibitively expensive. GeoNetworking sidesteps the problem entirely by routing
          toward a <em>geographic destination</em> — a coordinate or a shaped area — using the position information that
          every node already broadcasts in its beacons. No routing-table setup is needed; forwarding decisions are made
          autonomously, hop by hop, purely from the position information carried in each packet.
        </p>
        <Callout type="key" title="Core insight">
          GeoNetworking provides two coupled functions: <strong>geographic addressing</strong> (identify the destination
          by position or area) and <strong>geographic forwarding</strong> (route each packet toward that position using
          a partial view of the local network topology). Packets are forwarded "on the fly" without prior signalling.
        </Callout>
        <p>
          This design meets the hard requirements of vehicular safety:
        </p>
        <ul>
          <li><strong>Zero setup latency</strong> — no handshake or route discovery before the first packet can be sent.</li>
          <li><strong>Topology independence</strong> — works in sparse and dense networks, with or without roadside infrastructure.</li>
          <li><strong>Area targeting</strong> — a vehicle can send a hazard warning exactly to the circle or rectangle ahead
            where other vehicles are affected, without flooding the whole network.</li>
          <li><strong>Multi-hop</strong> — intermediate vehicles relay packets, extending range well beyond a single radio hop.</li>
        </ul>
        <p>
          GeoNetworking is specified across a family of ETSI standards. Release 1 is the EN 302 636 series.
          Release 2 supersedes it with the TS 103 836 series (see the <a href="#r1-vs-r2">R1 vs R2</a> section below).
          Both releases share the same fundamental packet format; they are wire-compatible.
        </p>
      </Section>

      {/* ── 2. Protocol stack position ───────────────────────────────────── */}
      <Section id="stack-position" title="Position in the ITS protocol stack">
        <p>
          GeoNetworking occupies the <strong>Networking &amp; Transport layer</strong> of the ETSI ITS reference
          architecture (EN 302 665). It sits above the <Link to="/access-layer">Access Layer</Link> (ITS-G5 / C-V2X)
          and below the <Link to="/facilities">Facilities Layer</Link> (CAM, DENM, …).
        </p>
        <Figure caption="ITS protocol stack showing GeoNetworking and BTP in context">
          <LayerStack
            layers={[
              { name: 'Applications', sub: 'Road safety, traffic efficiency, infotainment', accent: 'emerald' },
              { name: 'Facilities Layer', sub: 'CAM · DENM · CPM · VAM · MAPEM/SPATEM', accent: 'amber' },
              { name: 'BTP', sub: 'Basic Transport Protocol — port multiplexing (4 bytes)', accent: 'brand' },
              { name: 'GeoNetworking', sub: 'Geographic addressing & forwarding · Location Table · DCC interface', accent: 'brand' },
              { name: 'IPv6 / GN6ASL', sub: 'Optional: IPv6 over GeoNetworking adaptation sub-layer', accent: 'violet' },
              { name: 'Access Layer', sub: 'ITS-G5 (IEEE 802.11p) · C-V2X (LTE/NR sidelink)', accent: 'cyan' },
            ]}
            leftRail="Security"
            rightRail="Management"
          />
        </Figure>
        <p>
          The GeoNetworking specification is intentionally split into <strong>media-independent</strong> (EN 302 636-4-1 /
          TS 103 836-4-1) and <strong>media-dependent</strong> parts (e.g. EN 302 636-4-2 for ITS-G5). The
          media-independent part defines all packet formats, forwarding algorithms, and data structures. The
          media-dependent part adds the specifics needed for a particular access technology — for example how to map
          GeoNetworking traffic classes to EDCA access categories on 802.11p. This split allows GeoNetworking to run
          over ITS-G5, LTE-V2X, or future radio access technologies without touching the core protocol.
        </p>
      </Section>

      {/* ── 3. GeoNetworking packet header ──────────────────────────────── */}
      <Section id="packet-header" title="GeoNetworking packet header structure">
        <p>
          Every GeoNetworking packet begins with a fixed-size <strong>Basic Header</strong> (4 bytes), followed by
          a fixed-size <strong>Common Header</strong> (8 bytes), and then an optional <strong>Extended Header</strong>
          whose size and content depend on the packet transport type (GUC, GBC, SHB, etc.).
        </p>

        <Figure caption="GeoNetworking packet: Basic Header + Common Header + Extended Header + Payload">
          <div className="flex flex-wrap gap-2 text-sm font-mono">
            <div className="flex flex-col rounded border border-brand-500 overflow-hidden min-w-[160px]">
              <div className="bg-brand-700 text-white text-center px-2 py-1 text-xs font-sans font-semibold">Basic Header (4 B)</div>
              <div className="grid grid-cols-4 divide-x divide-ink-700">
                <div className="px-1 py-2 text-center text-slate-300 text-xs">Ver<br />4b</div>
                <div className="px-1 py-2 text-center text-slate-300 text-xs">NH<br />4b</div>
                <div className="px-1 py-2 text-center text-slate-300 text-xs">LT<br />8b</div>
                <div className="px-1 py-2 text-center text-slate-300 text-xs">RHL<br />8b</div>
              </div>
            </div>
            <div className="flex flex-col rounded border border-amber-500 overflow-hidden min-w-[220px]">
              <div className="bg-amber-700 text-white text-center px-2 py-1 text-xs font-sans font-semibold">Common Header (8 B)</div>
              <div className="grid grid-cols-5 divide-x divide-ink-700">
                <div className="px-1 py-2 text-center text-slate-300 text-xs">NH<br />4b</div>
                <div className="px-1 py-2 text-center text-slate-300 text-xs">HT/<br />HST<br />8b</div>
                <div className="px-1 py-2 text-center text-slate-300 text-xs">TC<br />8b</div>
                <div className="px-1 py-2 text-center text-slate-300 text-xs">PL<br />16b</div>
                <div className="px-1 py-2 text-center text-slate-300 text-xs">MHL<br />8b</div>
              </div>
            </div>
            <div className="flex flex-col rounded border border-emerald-500 overflow-hidden min-w-[140px]">
              <div className="bg-emerald-700 text-white text-center px-2 py-1 text-xs font-sans font-semibold">Extended Header</div>
              <div className="px-2 py-2 text-center text-slate-300 text-xs">SN · SO PV · DE PV<br />(type-dependent)</div>
            </div>
            <div className="flex flex-col rounded border border-ink-600 overflow-hidden min-w-[100px]">
              <div className="bg-ink-700 text-slate-300 text-center px-2 py-1 text-xs font-sans font-semibold">Payload</div>
              <div className="px-2 py-2 text-center text-slate-400 text-xs">BTP +<br />message</div>
            </div>
          </div>
        </Figure>

        <h3 className="text-lg font-semibold mt-6 mb-2">Basic Header fields</h3>
        <Table
          caption="Fields of the GeoNetworking Basic Header (4 octets total)"
          headers={['Field', 'Size', 'Description']}
          rows={[
            ['Version', '4 bit', 'GeoNetworking protocol version (current: 1)'],
            ['NH (Next Header)', '4 bit', 'Type of header following the Basic Header: 0=ANY, 1=Common Header, 2=Secured Packet (ETSI TS 103 097)'],
            ['Reserved', '8 bit', 'Set to 0'],
            ['LT (Lifetime)', '8 bit', 'Maximum buffering time before the packet is discarded. Non-linear encoding: 6-bit Multiplier x Base (50 ms / 1 s / 10 s / 100 s). Range: 0 ms to 6 300 s'],
            ['RHL (Remaining Hop Limit)', '8 bit', 'Decremented by 1 at each forwarding node. Packet is dropped when RHL reaches 0'],
          ]}
        />

        <h3 className="text-lg font-semibold mt-6 mb-2">Common Header fields</h3>
        <Table
          caption="Fields of the GeoNetworking Common Header (8 octets total)"
          headers={['Field', 'Size', 'Description']}
          rows={[
            ['NH (Next Header)', '4 bit', 'Upper-layer protocol: 0=ANY, 1=BTP-A, 2=BTP-B, 3=IPv6'],
            ['Reserved', '4 bit', 'Set to 0'],
            ['HT (Header Type)', '4 bit', 'Packet type: 1=BEACON, 2=GUC, 3=GAC, 4=GBC, 5=TSB, 6=LS'],
            ['HST (Header Sub-Type)', '4 bit', 'Sub-type, e.g. area shape: 0=CIRCLE, 1=RECT, 2=ELIP; or for TSB: 0=SHB, 1=multi-hop'],
            ['TC (Traffic Class)', '8 bit', 'SCF bit (store-carry-forward), Channel Offload bit, 6-bit TC ID mapped to EDCA queues'],
            ['Flags', '8 bit', 'Bit 0: IS_MOBILE (1=vehicle, 0=stationary); bits 1 to 7 reserved'],
            ['PL (Payload Length)', '16 bit', 'Length in octets of everything following the complete GeoNetworking header (BTP + message)'],
            ['MHL (Max Hop Limit)', '8 bit', 'Hop limit set by the source; not decremented during forwarding (carried for informational use)'],
            ['Reserved', '8 bit', 'Set to 0'],
          ]}
        />

        <Callout type="tip" title="LT vs RHL">
          <strong>LT (Lifetime)</strong> limits how long a packet may be buffered while waiting for a suitable next hop
          — relevant in store-carry-forward scenarios. <strong>RHL (Remaining Hop Limit)</strong> limits the number of
          wireless hops the packet may traverse. Both work together to bound packet propagation in time and space.
        </Callout>

        <h3 className="text-lg font-semibold mt-6 mb-2">Position Vectors</h3>
        <p>
          GeoNetworking uses two position vector formats embedded in the Extended Header:
        </p>
        <DefList items={[
          {
            term: 'Long Position Vector (LPV) — 24 bytes',
            def: 'GN_ADDR (8 B) + TST timestamp in TAI milliseconds since 2004-01-01 (4 B) + Latitude in 1/10 micro-degree (4 B) + Longitude (4 B) + PAI accuracy indicator (1 bit) + Speed in 0.01 m/s (15 bits signed) + Heading in 0.1 degree (16 bits). Used in the Source Position Vector (SO PV) field of most extended headers.',
          },
          {
            term: 'Short Position Vector (SPV) — 20 bytes',
            def: 'GN_ADDR (8 B) + TST (4 B) + Latitude (4 B) + Longitude (4 B). Omits speed and heading to save bytes. Used in the Destination Position Vector (DE PV) of GUC and in Location Service packets.',
          },
        ]} />

        <h3 className="text-lg font-semibold mt-6 mb-2">GeoNetworking address format</h3>
        <p>
          Every GeoAdhoc router has a unique <strong>GeoNetworking address (GN_ADDR)</strong> — 8 bytes wide, structured as:
          M bit (1=manually configured / 0=auto) + ST field (5-bit ITS-S type: 0=Unknown, 1=Pedestrian, 2=Cyclist,
          5=Passenger Car, 6=Bus, 15=RSU, …) + 10 reserved bits + MID (48-bit MAC-layer address).
          The MID maps directly to the link-layer address, enabling GN6ASL to present a virtual Ethernet interface to IPv6.
        </p>
      </Section>

      {/* ── 4. Transport types ───────────────────────────────────────────── */}
      <Section id="transport-types" title="Packet transport types">
        <p>
          GeoNetworking defines several packet transport types, selected by the HT/HST fields in the Common Header.
          Each type has distinct forwarding semantics, a different Extended Header structure, and is used for
          different application scenarios.
        </p>
        <Table
          caption="GeoNetworking packet transport types (EN 302 636-4-1, table 9)"
          headers={['Type', 'HT/HST', 'Scope', 'Re-broadcast?', 'Typical use']}
          rows={[
            [<><Badge tone="brand">GUC</Badge>{' '}GeoUnicast</>, '2 / 0', 'Point-to-point to a specific GN_ADDR / position', 'No (unicast)', 'Location service reply, unicast data to known destination'],
            [<><Badge tone="amber">GBC</Badge>{' '}GeoBroadcast</>, '4 / 0–2', 'All nodes inside a geographic area (circle, rect, ellipse)', 'Yes (inside area)', 'DENM hazard warning to affected zone, MAPEM/SPATEM'],
            [<><Badge tone="amber">GAC</Badge>{' '}GeoAnycast</>, '3 / 0–2', 'Any one node inside a geographic area', 'No (stops at first receiver)', 'Query to nearest RSU'],
            [<><Badge tone="emerald">SHB</Badge>{' '}Single-Hop Broadcast</>, '5 / 0', 'All direct neighbours (1 hop only)', 'No', 'CAM cooperative awareness (primary use case)'],
            [<><Badge tone="emerald">TSB</Badge>{' '}Topo-Scoped Broadcast</>, '5 / 1', 'All nodes within N hops', 'Yes (up to MHL)', 'Emergency warnings to N-hop neighbourhood'],
            [<><Badge tone="violet">BEACON</Badge></>, '1 / 0', 'All direct neighbours (no payload)', 'No', 'Neighbour discovery when no other traffic is present'],
          ]}
        />

        <Callout type="info" title="SHB vs CAM">
          <Link to="/cam">CAM messages</Link> are by far the most frequent GeoNetworking traffic. They are always sent
          as <strong>SHB</strong> (Single-Hop Broadcast) — no forwarding, no duplication, no area — just "here I am"
          to every vehicle in direct radio range. This design minimises channel load: each CAM is transmitted exactly
          once at the source and heard by neighbours directly. Multi-hop propagation is not needed because CAMs are
          re-generated independently by every vehicle.
        </Callout>

        <h3 className="text-lg font-semibold mt-6 mb-2">Geographical areas</h3>
        <p>
          GBC, GAC, and the GUC destination position all reference geographic locations. The standard (referencing
          ETSI EN 302 931) defines three area shapes for GBC/GAC, each encoded in the Extended Header:
        </p>
        <CardGrid cols={3}>
          <Card title="Circle" accent="brand">
            Defined by centre (latitude, longitude) and radius in metres. Simple and adequate for omnidirectional
            events such as a stationary hazard or a road-works zone. HST=0.
          </Card>
          <Card title="Rectangle" accent="amber">
            Defined by centre, two semi-axis lengths (distance A along the heading, distance B perpendicular) and an
            orientation angle. Suited to a stretch of road or a highway corridor. HST=1.
          </Card>
          <Card title="Ellipse" accent="emerald">
            Same parameterisation as rectangle but with an elliptical boundary. Provides a smooth boundary modelling
            irregular coverage areas. HST=2.
          </Card>
        </CardGrid>
      </Section>

      {/* ── 5. Forwarding algorithms ─────────────────────────────────────── */}
      <Section id="forwarding" title="Forwarding algorithms &amp; the Location Table">
        <p>
          When a GeoAdhoc router receives a packet that needs to be forwarded, it consults its <strong>Location Table
          (LocT)</strong> to determine the best next-hop. Two main categories of forwarding algorithm are defined:
        </p>

        <h3 className="text-lg font-semibold mt-4 mb-2">Non-area forwarding (GeoUnicast)</h3>
        <DefList items={[
          {
            term: 'Greedy Forwarding (GF)',
            def: 'Select the neighbour from the Location Table that is geographically closest to the destination (Most Forward within Radius, MFR criterion). Fast and simple — works well in dense networks. May fail when no closer neighbour exists ("local maximum" / void region).',
          },
          {
            term: 'Contention-Based Forwarding (CBF)',
            def: 'Instead of the source selecting a next hop, every potential forwarder independently decides whether to forward. Each node sets a timer inversely proportional to its distance progress toward the destination; the closest node forwards first and its transmission suppresses the others. Reduces the need for accurate neighbour position knowledge at the sender.',
          },
        ]} />

        <h3 className="text-lg font-semibold mt-4 mb-2">Area forwarding (GBC/GAC)</h3>
        <DefList items={[
          {
            term: 'Simple GeoBroadcast',
            def: 'Flood inside the destination area: every node inside the area rebroadcasts the packet once (after checking the Duplicate Packet List). Robust but potentially high channel load.',
          },
          {
            term: 'Area CBF (Contention-Based Forwarding)',
            def: 'Timer-based self-selection applied inside the destination area. Nodes outside the area use greedy forwarding to carry the packet toward the area boundary. Suppresses redundant retransmissions.',
          },
          {
            term: 'Area Advanced Forwarding',
            def: 'Combines greedy forwarding toward the area boundary with CBF inside, plus an additional suppression mechanism using the sender position vector. Defined in Annex F of EN 302 636-4-1.',
          },
        ]} />

        <Callout type="example" title="Forwarding a DENM to a road zone">
          <ol className="list-decimal pl-4 space-y-1">
            <li>Source vehicle creates a GBC packet with a rectangular area covering 500 m ahead on the highway.</li>
            <li>Neighbours outside the area receive it and apply greedy forwarding — each relays it toward the area
              using the closest-to-area neighbour from their LocT.</li>
            <li>Once a node is inside the area it rebroadcasts using area CBF — it starts a timer; if it hears another
              node broadcast first (from a better position), it cancels its own transmission.</li>
            <li>Every vehicle in the zone receives the DENM and delivers it upward to the DENM facility.</li>
          </ol>
        </Callout>

        <h3 className="text-lg font-semibold mt-6 mb-2">Location Table (LocT)</h3>
        <p>
          The Location Table is the central data structure for forwarding decisions. Every GeoAdhoc router maintains
          one LocT, with one entry per known neighbour or recently heard station. Each
          <strong> Location Table Entry (LocTE)</strong> holds:
        </p>
        <ul>
          <li>GN_ADDR and LL_ADDR (link-layer address)</li>
          <li>ITS-S type and GeoNetworking protocol version</li>
          <li>Long Position Vector (position, speed, heading, timestamp, accuracy indicator PAI)</li>
          <li>IS_NEIGHBOUR flag (direct radio range) and LS_PENDING flag (Location Service in progress)</li>
          <li>Duplicate Packet List (DPL) for duplicate detection</li>
          <li>Packet data rate PDR(GN_ADDR) as Exponential Moving Average (EMA) — used by DCC</li>
        </ul>
        <p>
          Entries are <em>soft-state</em>: each has a lifetime (itsGnLifetimeLocTE). If not refreshed by a new
          beacon or received packet, the entry is deleted. This ensures stale position data does not mislead the
          forwarding algorithm.
        </p>

        <Callout type="warn" title="Location Service (LS)">
          If a GeoUnicast packet must be sent to a destination whose position is not in the LocT, GeoNetworking
          invokes the <strong>Location Service</strong>: an LS Request is broadcast (TSB) to find the destination;
          the destination replies with an LS Reply (GUC) containing its Long Position Vector. While LS is pending,
          outbound packets for that destination are buffered in the <em>LS packet buffer</em>. After the LS completes,
          buffered packets are flushed in FIFO order.
        </Callout>
      </Section>

      {/* ── 6. DCC interaction ──────────────────────────────────────────── */}
      <Section id="dcc" title="DCC interaction">
        <p>
          GeoNetworking is tightly coupled with <strong>Decentralised Congestion Control (DCC)</strong>. The ITS-G5
          channel at 5.9 GHz has limited bandwidth; when too many vehicles transmit simultaneously, reliability drops.
          DCC (specified in ETSI TS 102 687 / TS 103 175) monitors channel load and instructs GeoNetworking to:
        </p>
        <ul>
          <li>Reduce packet transmission rates (Transmit Rate Control, TRC)</li>
          <li>Reduce transmission power (Transmit Power Control, TPC)</li>
          <li>Limit packet data rate per source — the LocT's PDR field tracks each station's per-source packet rate
            as an EMA, enabling DCC rate enforcement at the network layer</li>
          <li>Restrict geographical area size for GBC packets (Annex B of EN 302 636-4-1)</li>
        </ul>
        <p>
          The <strong>TC (Traffic Class)</strong> field in the Common Header encodes three sub-fields: the SCF
          (store-carry-forward) bit, the Channel Offload bit, and a 6-bit TC ID. SCF=1 means the packet may be
          buffered when no neighbour exists; SCF=0 requires immediate discard. The TC ID maps to media-dependent
          priority queues (EDCA access categories for ITS-G5), so safety-critical messages (e.g. DENMs) can
          preempt background traffic. See the <Link to="/access-layer">Access Layer</Link> page for EDCA details.
        </p>
      </Section>

      {/* ── 7. BTP ──────────────────────────────────────────────────────── */}
      <Section id="btp" title="Basic Transport Protocol (BTP)">
        <p>
          The <strong>Basic Transport Protocol (BTP)</strong> sits directly above GeoNetworking (EN 302 636-5-1 /
          TS 103 836-5-1). Its sole job is <em>port-based multiplexing and demultiplexing</em> of facility-layer
          messages — analogous to UDP in the IP world, but even simpler: no checksum, no flow control, no
          connection state. The entire BTP header is exactly <strong>4 bytes</strong>.
        </p>

        <StatGrid cols={3}>
          <Stat value="4 bytes" label="BTP header size" sub="smallest transport header in any major stack" />
          <Stat value="16-bit" label="Port numbers" sub="well-known ports defined in ETSI TS 103 248" />
          <Stat value="2 types" label="BTP-A and BTP-B" sub="interactive vs non-interactive" />
        </StatGrid>

        <h3 className="text-lg font-semibold mt-6 mb-2">BTP-A vs BTP-B</h3>

        <Figure caption="BTP-A header (4 bytes): destination port + source port">
          <div className="flex gap-2 text-sm font-mono">
            <div className="flex flex-col rounded border border-brand-500 overflow-hidden">
              <div className="bg-brand-700 text-white text-center px-3 py-1 text-xs font-sans font-semibold">BTP-A (4 B)</div>
              <div className="grid grid-cols-2 divide-x divide-ink-700">
                <div className="px-4 py-2 text-center text-slate-300 text-xs">Destination port<br />16 bit</div>
                <div className="px-4 py-2 text-center text-slate-300 text-xs">Source port<br />16 bit</div>
              </div>
            </div>
          </div>
        </Figure>

        <Figure caption="BTP-B header (4 bytes): destination port + destination port info">
          <div className="flex gap-2 text-sm font-mono">
            <div className="flex flex-col rounded border border-amber-500 overflow-hidden">
              <div className="bg-amber-700 text-white text-center px-3 py-1 text-xs font-sans font-semibold">BTP-B (4 B)</div>
              <div className="grid grid-cols-2 divide-x divide-ink-700">
                <div className="px-4 py-2 text-center text-slate-300 text-xs">Destination port<br />16 bit</div>
                <div className="px-4 py-2 text-center text-slate-300 text-xs">Destination port info<br />16 bit</div>
              </div>
            </div>
          </div>
        </Figure>

        <Table
          caption="BTP header types (EN 302 636-5-1, clause 7)"
          headers={['Property', 'BTP-A (interactive)', 'BTP-B (non-interactive)']}
          rows={[
            ['NH encoding in Common Header', '1', '2'],
            ['Header bytes', '4: Destination port (16b) + Source port (16b)', '4: Destination port (16b) + Destination port info (16b)'],
            ['Source port', 'Present — the port a reply should be directed to', 'Absent'],
            ['Destination port info', 'Absent', 'Present — additional qualifier for well-known ports (per TS 103 248)'],
            ['Use case', 'Request-response exchanges, session-based facilities', 'Broadcast / anycast: CAM, DENM, CPM, VAM — one-way dissemination'],
          ]}
        />

        <Callout type="tip" title="Which type does CAM use?">
          CAM (and most other periodic safety messages) use <strong>BTP-B</strong>. There is no need for a source port
          because CAMs are not replied-to; the GeoNetworking source position vector already identifies the sender.
          BTP-A is reserved for protocol exchanges that genuinely require a reply endpoint.
        </Callout>

        <h3 className="text-lg font-semibold mt-6 mb-2">Well-known BTP port assignments</h3>
        <p>
          Port assignments are standardised in <Ref code="ETSI TS 103 248" kind="ETSI" title="BTP Port Numbers" />.
          A subset of the most commonly deployed ports:
        </p>
        <Table
          caption="BTP well-known port assignments (ETSI TS 103 248)"
          headers={['Port', 'Message / Service', 'Standard']}
          rows={[
            ['2001', 'CAM — Cooperative Awareness Message', 'EN 302 637-2 / TS 103 900'],
            ['2002', 'DENM — Decentralised Environmental Notification Message', 'EN 302 637-3 / TS 103 831'],
            ['2003', 'MAPEM — MAP Extended Message', 'TS 103 301'],
            ['2004', 'SPATEM — Signal Phase and Timing Extended Message', 'TS 103 301'],
            ['2005', 'SAEM — Service Announcement Extended Message', 'TS 102 890-1'],
            ['2006', 'IVIM — Infrastructure to Vehicle Information Message', 'TS 103 301'],
            ['2009', 'RTCMEM — RTCM Extended Message (GNSS corrections)', 'TS 103 301'],
            ['2010', 'CPM — Collective Perception Message', 'TS 103 324'],
            ['2018', 'VAM — Vulnerable Road User Awareness Message', 'TS 103 300-3'],
            ['2030', 'SREM — Signal Request Extended Message', 'TS 103 301'],
            ['2031', 'SSEM — Signal Request Status Extended Message', 'TS 103 301'],
            ['2045', 'MCM — Manoeuvre Coordination Message', 'TS 103 461'],
          ]}
        />

        <h3 className="text-lg font-semibold mt-6 mb-2">How BTP works end-to-end</h3>
        <Steps>
          <div>
            <strong>Facility layer requests transmission</strong>: e.g. the CAM service calls BTP-Data.request with
            BTP type=BTP-B, Destination port=2001, GN transport type=SHB, Traffic class=0 (highest priority).
          </div>
          <div>
            <strong>BTP adds its 4-byte header</strong>: Destination port (2001) + Destination port info (0 for CAM).
            The combined BTP-PDU is passed to GeoNetworking via the GN-SAP using GN-Data.request.
          </div>
          <div>
            <strong>GeoNetworking encapsulates</strong>: adds Basic Header (LT, RHL), Common Header (NH=2 for BTP-B,
            HT=5/HST=0 for SHB, TC), and SHB Extended Header (Source LPV). Sets MAC destination address to broadcast.
          </div>
          <div>
            <strong>Access layer transmits</strong>: ITS-G5 frame (Ethertype 0x8947 identifies GeoNetworking) carries
            the complete stack over the 5.9 GHz channel.
          </div>
          <div>
            <strong>Receiver demultiplexes</strong>: GeoNetworking strips its headers, passes the BTP-PDU upward via
            GN-Data.indication. BTP reads Destination port=2001 and delivers the payload to the CAM service.
          </div>
        </Steps>
      </Section>

      {/* ── 8. IPv6 over GeoNetworking ──────────────────────────────────── */}
      <Section id="ipv6" title="IPv6 over GeoNetworking (GN6ASL)">
        <p>
          EN 302 636-6-1 specifies the <strong>GeoNetworking to IPv6 Adaptation Sub-Layer (GN6ASL)</strong>. It allows
          standard IPv6 stacks — without any modification — to send and receive packets over the GeoNetworking network.
          From the IPv6 perspective, all ITS stations appear to be attached to the same virtual Ethernet link.
        </p>
        <p>
          GN6ASL is signalled in the Common Header NH field as value <strong>3 (IPv6)</strong>. It presents virtual
          network interfaces of Ethernet V2.0/IEEE 802.3 type to IPv6, with the 48-bit MAC address derived from the
          MID field of the local GN_ADDR.
        </p>

        <h3 className="text-lg font-semibold mt-4 mb-2">Virtual link types</h3>
        <DefList items={[
          {
            term: 'Geographical Virtual Link (GVL)',
            def: 'A link-local multicast-capable virtual link with geographically scoped boundaries tied to a GBC/GAC area. Supports IPv6 Neighbour Discovery (ND) and SLAAC. Two sub-types: Static GVL (area set by RSU management or derived from a received Router Advertisement) and Dynamic GVL (area assigned per-packet via the experimental EGN6_SAP).',
          },
          {
            term: 'Topological Virtual Link (TVL)',
            def: 'A link-local multicast-capable virtual link with topologically scoped boundaries (based on TSB). Does not guarantee symmetric reachability; IPv6 ND is disabled on TVLs. One TVL exists per GeoNetworking interface.',
          },
        ]} />

        <p>
          Key capabilities enabled by GN6ASL:
        </p>
        <ul>
          <li>IPv6 Stateless Address Autoconfiguration (SLAAC, RFC 4862) over Static GVLs</li>
          <li>IPv6 Neighbour Discovery over SGVLs (Router Advertisement / Solicitation / Neighbour Solicitation)</li>
          <li>Sub-IP multi-hop delivery of IPv6 packets (GeoNetworking forwards the packet; IPv6 Hop Limit is not decremented at each GeoNetworking hop)</li>
          <li>IPv6 multicast via GeoBroadcast (geocasting of IPv6 multicast traffic)</li>
          <li>Network Mobility Basic Support (NEMO BS, RFC 3963) for in-vehicle mobile routers</li>
        </ul>
        <p>
          The MTU available to IPv6 (MTU_GN6) equals the access layer MTU (MTU_AL) minus the size of the largest
          GeoNetworking header (GEO_MAX), expressed as:
          <code className="ml-2 px-1 bg-ink-800 rounded text-sm">MTU_GN6 = min(MTU_VI, MTU_AL - GEO_MAX)</code>.
          For ITS-G5 with its 1 500-byte Ethernet frame this typically gives IPv6 payloads of around 1 300–1 400 bytes.
        </p>
        <Callout type="info" title="GN6ASL vs BTP">
          BTP and GN6ASL are <em>alternatives</em> at the same layer position, both directly above GeoNetworking.
          BTP is used by native ITS facility messages (CAM, DENM, …). GN6ASL is used when an ITS station needs to
          carry conventional Internet traffic (TCP/UDP/HTTPS) over the vehicular network. Both coexist peacefully
          — a vehicle can exchange CAMs over BTP while downloading a firmware update over IPv6/GN6ASL.
        </Callout>
      </Section>

      {/* ── 9. Beaconing ─────────────────────────────────────────────────── */}
      <Section id="beaconing" title="Beaconing">
        <p>
          The <strong>BEACON</strong> packet (HT=1, SHB delivery) is a housekeeping mechanism: it carries no payload
          but lets a GeoAdhoc router announce its presence and broadcast its Long Position Vector to neighbours.
          This keeps the LocT current even when the station is not sending any data packets.
        </p>
        <p>Key properties:</p>
        <ul>
          <li>Transmitted as SHB — exactly one wireless transmission, no forwarding.</li>
          <li>Interval governed by itsGnBeaconServiceRetransmitTimer.</li>
          <li>When a station is actively sending CAMs or other messages that already embed a Source LPV,
            those packets effectively serve as implicit beacons, and the explicit BEACON rate may be reduced or
            suppressed to avoid redundant channel load.</li>
          <li>DCC may further back off the beacon rate under high channel load conditions.</li>
        </ul>
        <Callout type="tip" title="CAMs as implicit beacons">
          In practice, vehicles send CAMs at 1–10 Hz. Each CAM's SHB Extended Header carries a full Long Position
          Vector, so active vehicles rarely need explicit BEACON packets. The explicit BEACON is mainly useful for
          stationary RSUs or vehicles that happen to have no application traffic at the moment.
        </Callout>
      </Section>

      {/* ── 10. Media-independent vs media-dependent ─────────────────────── */}
      <Section id="media-split" title="Media-independent vs media-dependent split">
        <p>
          The GeoNetworking specification is deliberately divided into two parts to allow the core protocol to work
          over multiple radio access technologies:
        </p>
        <CardGrid cols={2}>
          <Card title="Media-Independent (EN 302 636-4-1 / TS 103 836-4-1)" accent="brand">
            Defines all packet formats (Basic Header, Common Header, Extended Headers), forwarding algorithms (greedy,
            CBF, area CBF, advanced), data structures (LocT, LS buffer, forwarding buffer, CBF buffer), address format,
            security integration (TS 103 097 hooks), duplicate packet detection, and the complete protocol state machine.
            This part is access-technology agnostic.
          </Card>
          <Card title="Media-Dependent (e.g. EN 302 636-4-2 for ITS-G5)" accent="cyan">
            Specifies how GeoNetworking Traffic Classes map to the access-layer priority queues (EDCA), encapsulation
            in 802.11p frames using Ethertype 0x8947, power and rate settings, and technology-specific forwarding
            heuristics. A separate media-dependent part exists for LTE-V2X (ETSI TS 103 613).
          </Card>
        </CardGrid>
        <p className="mt-4">
          This split means the same forwarding algorithm and packet format works equally on ITS-G5 and on C-V2X
          sidelink, with only the encapsulation layer differing. Hybrid vehicles supporting both radios can use a
          single GeoNetworking address and forward packets over the best available interface.
        </p>
      </Section>

      {/* ── 11. R1 vs R2 ─────────────────────────────────────────────────── */}
      <Section id="r1-vs-r2" title="Release 1 vs Release 2 (TS 103 836 series)">
        <p>
          The TS 103 836 series (Release 2) supersedes and extends the EN 302 636 Release 1 family. Release 2 was
          developed to align with the EU Delegated Regulation on C-ITS, support newer message types (CPM, VAM, MCM),
          and incorporate technical corrections accumulated over years of conformance testing.
        </p>
        <Table
          caption="Key differences between GeoNetworking Release 1 and Release 2"
          headers={['Aspect', 'Release 1 (EN 302 636 series)', 'Release 2 (TS 103 836 series)']}
          rows={[
            ['Document type', 'European Standard (EN)', 'Technical Specification (TS), to become EN in due course'],
            ['GeoNetworking core', 'EN 302 636-4-1 V1.4.1 (2020)', 'TS 103 836-4-1 V2.2.1 (2026)'],
            ['BTP', 'EN 302 636-5-1 V2.2.1 (2019)', 'TS 103 836-5-1 V2.1.1 (2024)'],
            ['Packet format', 'Baseline — defines the bit-level format', 'Identical on the wire — backward compatible with R1'],
            ['Port numbers reference', 'ETSI TS 103 248 (Release 1)', 'ETSI TS 103 248 Release 2 (updated port list)'],
            ['New capabilities', 'GUC, GBC, GAC, SHB, TSB, beaconing, LS', 'Refined protocol constants; expanded ITS-AID/SSP profiles; aligned with newer security standards (TS 103 097 v2)'],
          ]}
        />
        <Callout type="info" title="Backward compatibility">
          Release 2 GeoNetworking packets are bit-for-bit identical in format to Release 1 packets. A Release 1
          vehicle and a Release 2 vehicle interoperate seamlessly at the GeoNetworking/BTP layer. The Release
          distinction matters primarily for the facility-layer message profiles and security profiles that travel
          inside the payload, not for the network layer itself.
        </Callout>
      </Section>

      {/* ── 12. Key standards ────────────────────────────────────────────── */}
      <Section id="standards" title="Key standards">
        <ul className="space-y-2">
          <li><Ref code="EN 302 636-1" kind="ETSI" title="GeoNetworking Requirements" /> — Functional and performance requirements for the GeoNetworking protocol family.</li>
          <li><Ref code="EN 302 636-3" kind="ETSI" title="GeoNetworking Network Architecture" /> — ITS network architecture, ITS station protocol stack, deployment scenarios, SAPs.</li>
          <li><Ref code="EN 302 636-4-1" kind="ETSI" title="GeoNetworking Media-Independent Functionality" /> — Complete packet formats, forwarding algorithms, data structures (Release 1).</li>
          <li><Ref code="EN 302 636-5-1" kind="ETSI" title="Basic Transport Protocol (BTP)" /> — BTP-A and BTP-B header formats, port multiplexing (Release 1).</li>
          <li><Ref code="EN 302 636-6-1" kind="ETSI" title="IPv6 over GeoNetworking" /> — GN6ASL specification, virtual link models, IPv6 ND support.</li>
          <li><Ref code="TS 103 836-4-1" kind="ETSI" title="GeoNetworking Media-Independent Release 2" /> — Release 2 successor to EN 302 636-4-1.</li>
          <li><Ref code="TS 103 836-5-1" kind="ETSI" title="BTP Release 2" /> — Release 2 successor to EN 302 636-5-1.</li>
          <li><Ref code="TS 103 248" kind="ETSI" title="BTP Port Numbers" /> — Well-known port assignments for all ITS facility messages.</li>
          <li><Ref code="EN 302 931" kind="ETSI" title="Geographical Area Definition" /> — Circle, rectangle, ellipse shape encoding used by GBC/GAC.</li>
        </ul>
      </Section>

      {/* ── 13. Where next ───────────────────────────────────────────────── */}
      <Section id="where-next" title="Where next">
        <CardGrid cols={3}>
          <Card title="Access Layer" accent="cyan">
            How ITS-G5 and C-V2X provide the radio channel that GeoNetworking rides on.{' '}
            <Link to="/access-layer" className="text-brand-400 underline">Access Layer &rarr;</Link>
          </Card>
          <Card title="Facilities Layer" accent="amber">
            CAM, DENM, CPM and other messages that travel over BTP and GeoNetworking.{' '}
            <Link to="/facilities" className="text-brand-400 underline">Facilities &rarr;</Link>
          </Card>
          <Card title="Architecture" accent="emerald">
            The overall ETSI ITS architecture that places GeoNetworking in context.{' '}
            <Link to="/architecture" className="text-brand-400 underline">Architecture &rarr;</Link>
          </Card>
        </CardGrid>
      </Section>
    </article>
  )
}
