import React from 'react'
import { Link } from 'react-router-dom'
import { PageHeader, Section, Prose, Callout, Ref, Table, StatGrid, Stat, CardGrid, Card, Steps, Figure, LayerStack, DefList, Badge } from '../components/ui.jsx'

export default function AccessLayer() {
  return (
    <article>
      <PageHeader
        kicker="ACCESS LAYER"
        title="Radio Access: ITS-G5 and C-V2X"
        intro="The access layer sits at the very bottom of the C-ITS protocol stack, directly above the antenna. It defines which radio technology carries cooperative messages, how the 5.9 GHz spectrum is sliced into channels, how collisions are avoided, and how each station is stopped from drowning its neighbours — all without any central controller."
        sources={[
          'ETSI EN 302 663', 'ETSI EN 303 797', 'ETSI EN 303 613',
          'ETSI TS 102 687', 'ETSI TS 103 175', 'ETSI TS 102 724',
          'ETSI EN 302 571', 'ETSI TS 102 792', 'ETSI TS 103 574', 'ETSI TS 103 723'
        ]}
      />

      {/* ─── 1. Two technologies, one band ─── */}
      <Section id="two-rats" title="Two Competing Radio Access Technologies">
        <p>
          European C-ITS operates in the 5.9 GHz ITS band allocated by ECC/DEC/(08)01 and harmonised via
          Commission Decision 2008/671/EC. Two distinct radio access technologies (RATs) have been standardised for
          this band, and the choice between them has become one of the defining policy debates in the sector.
        </p>

        <CardGrid cols={2}>
          <Card title="ITS-G5" accent="brand">
            <p>
              Based on IEEE 802.11p / 802.11-2016 with OCB mode (Outside the Context of a BSS). Developed
              by ETSI TC ITS from ~2009 onward. Standardised in{' '}
              <Ref code="EN 302 663" kind="ETSI" title="ITS-G5 Access Layer" /> (Release 1) and{' '}
              <Ref code="EN 303 797" kind="ETSI" title="ITS-G5 Access Layer R2" /> (Release 2, 2024).
              Deployed across Europe, Japan (ARIB STD-T109), and the USA (DSRC / WAVE).
            </p>
            <p className="mt-2">
              <Badge tone="brand">Mature</Badge>{' '}<Badge tone="emerald">Deployed</Badge>
            </p>
          </Card>
          <Card title="C-V2X / LTE-V2X" accent="amber">
            <p>
              Cellular-V2X (C-V2X) using the 3GPP PC5 sidelink interface (Release 14 for LTE-V2X, Release 16
              for NR-V2X). Standardised in{' '}
              <Ref code="EN 303 613" kind="ETSI" title="LTE-V2X Access Layer" /> and profiled in{' '}
              <Ref code="TS 103 723" kind="ETSI" title="LTE-V2X Direct Comm Profile" />.
              Originally a cellular industry push; operates without base-station infrastructure in Mode 4
              (autonomous resource selection).
            </p>
            <p className="mt-2">
              <Badge tone="amber">Emerging</Badge>{' '}<Badge tone="violet">3GPP Rel-14+</Badge>
            </p>
          </Card>
        </CardGrid>

        <Callout type="warn" title="The Technology-Neutrality Debate">
          The European Commission's Delegated Regulation 2019/C 86 I/01 originally mandated ITS-G5, triggering
          significant political opposition from the automotive industry backing C-V2X. After the regulation was
          annulled by the EU Court of Justice in 2021, the EU shifted to a technology-neutral approach. The
          Implementing Decision (EU) 2020/1426 updated the spectrum rules without mandating a specific RAT.
          Both technologies share the same 5.9 GHz band and must coexist. In practice, most early European
          C-ITS deployments (C-Roads, Day 1 services) use ITS-G5, while the automotive industry is actively
          deploying C-V2X in newer vehicles.
        </Callout>

        <Callout type="key" title="Shared Spectrum, Different Physics">
          Both ITS-G5 and C-V2X operate in the 5.855–5.925 GHz ITS band, use 10 MHz channels, and target
          the same safety and traffic-efficiency applications. Their PHY and MAC layers are fundamentally
          different, and they cannot directly communicate with each other — interoperability requires
          translation at higher layers or hybrid devices.
        </Callout>
      </Section>

      {/* ─── 2. Spectrum and channel layout ─── */}
      <Section id="spectrum" title="The 5.9 GHz ITS Band and Channel Layout">
        <p>
          The European ITS radio band spans 5 855 MHz to 5 925 MHz (70 MHz total). It is divided into three
          sub-bands with different regulatory statuses:
        </p>

        <Table
          caption="5 GHz ITS frequency band segmentation (EN 302 571 / EN 303 613)"
          headers={['Sub-band', 'Frequency range', 'Designation', 'Usage']}
          rows={[
            ['ITS-G5B', '5 855–5 875 MHz', 'Non-safety', 'ITS non-safety applications (ECC Rec 08/01)'],
            ['ITS-G5A', '5 875–5 905 MHz', 'Safety', 'ITS road safety (harmonised, mandatory in EU)'],
            ['ITS-G5D', '5 905–5 925 MHz', 'Future', 'Future ITS applications (ECC Dec 08/01)'],
          ]}
        />

        <p>
          Each 10 MHz channel sits within these sub-bands. For ITS-G5A (the primary safety band), ETSI TS 102 724
          defines three named channels:
        </p>

        <Figure caption="ITS-G5A channel layout — 5 875 to 5 905 MHz (10 MHz channels, not to scale). CCH is the control channel; SCH1 and SCH2 are service channels.">
          <div className="flex flex-col gap-2 w-full">
            <div className="flex items-end gap-0 w-full text-xs text-slate-400">
              <span className="w-1/6 text-left">5 855</span>
              <span className="w-1/6 text-center">5 875</span>
              <span className="w-1/6 text-center">5 885</span>
              <span className="w-1/6 text-center">5 895</span>
              <span className="w-1/6 text-center">5 905</span>
              <span className="w-1/6 text-right">5 925 MHz</span>
            </div>
            <div className="flex w-full h-14 rounded overflow-hidden border border-ink-700 text-sm font-semibold">
              <div className="flex items-center justify-center bg-ink-800 text-slate-400 border-r border-ink-600 flex-none" style={{width:'28%'}}>
                <span className="text-xs text-center">ITS-G5B<br/>non-safety</span>
              </div>
              <div className="flex items-center justify-center bg-violet-900 text-violet-200 border-r border-ink-600 flex-none" style={{width:'14%'}}>
                <span className="text-xs text-center">SCH2<br/>5 880</span>
              </div>
              <div className="flex items-center justify-center bg-brand-800 text-brand-100 border-r border-ink-600 flex-none" style={{width:'14%'}}>
                <span className="text-xs text-center">CCH<br/>5 890</span>
              </div>
              <div className="flex items-center justify-center bg-emerald-900 text-emerald-200 border-r border-ink-600 flex-none" style={{width:'14%'}}>
                <span className="text-xs text-center">SCH1<br/>5 900</span>
              </div>
              <div className="flex items-center justify-center bg-ink-800 text-slate-400 flex-1">
                <span className="text-xs text-center">ITS-G5D<br/>future</span>
              </div>
            </div>
            <div className="flex gap-6 text-xs text-slate-400 mt-1 flex-wrap">
              <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded bg-brand-800"></span> CCH – Control Channel (default safety)</span>
              <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded bg-emerald-900"></span> SCH1 – Service Channel 1</span>
              <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded bg-violet-900"></span> SCH2 – Service Channel 2</span>
            </div>
          </div>
        </Figure>

        <DefList items={[
          {
            term: 'CCH — Control Channel',
            def: 'Centre frequency 5 890 MHz. Default channel for cooperative road-safety messages (DCC profiles DP1, DP2). Priority traffic for CAM and DENM. All ITS stations monitor the CCH.'
          },
          {
            term: 'SCH1 — Service Channel 1',
            def: 'Centre frequency 5 900 MHz. Default channel when CCH is in Active or Restrictive DCC state. Carries DP3–DP8 profiles and SCH-specific service messages (DP9–DP13+).'
          },
          {
            term: 'SCH2 — Service Channel 2',
            def: 'Centre frequency 5 880 MHz. Alternate safety channel, but its adjacency to CCH creates adjacent-channel interference constraints that limit deployment flexibility.'
          },
          {
            term: 'ITS-G5B channels',
            def: '5 855–5 875 MHz. Two 10 MHz channels: SCH3 (5 865 MHz) and SCH4 (5 875 MHz). Used for non-safety ITS applications under ECC Recommendation (08)01.'
          },
        ]} />

        <StatGrid cols={4}>
          <Stat value="70 MHz" label="Total ITS band" sub="5 855–5 925 MHz" />
          <Stat value="10 MHz" label="Channel bandwidth" sub="Standard ITS-G5 channel" />
          <Stat value="33 dBm" label="Max EIRP" sub="EN 302 571 upper limit" />
          <Stat value="-85 dBm" label="CBR threshold" sub="Energy detect for busy-channel" />
        </StatGrid>

        <p>
          <strong>Power limits</strong> for ITS equipment are set by{' '}
          <Ref code="EN 302 571" kind="ETSI" title="Harmonised Radio Std" />.
          Maximum RF output power is 33 dBm EIRP. Transmit power control (TPC) is mandatory, allowing the
          DCC algorithm to reduce power during congestion. The default operating power for mobile ITS stations
          is 23 dBm EIRP; the CEN DSRC mitigation rules use this as their baseline reference.
        </p>
      </Section>

      {/* ─── 3. ITS-G5 PHY ─── */}
      <Section id="phy" title="ITS-G5 Physical Layer (OFDM / OCB)">
        <p>
          ITS-G5 uses the OFDM PHY specified in IEEE 802.11-2016 (clause 17), the same core as 802.11a
          (5 GHz Wi-Fi), but operated at <strong>half clock speed</strong> — resulting in 10 MHz channels
          instead of the 20 MHz used for WLAN. This halving doubles the OFDM symbol duration from 4 µs to
          8 µs, which improves robustness against multipath delay spread in highway and urban vehicular
          environments.
        </p>

        <Callout type="info" title="Why Half-Clock OFDM?">
          The coherence time of a vehicular channel (vehicles at ~100 km/h, carrier at 5.9 GHz) is on the
          order of milliseconds. A longer OFDM symbol (8 µs) relative to the channel delay spread gives
          more robustness without extra guard interval overhead. The 10 MHz bandwidth also halves throughput
          compared to 802.11a, but this is acceptable since V2X safety messages are typically very short
          (under 1 000 bytes).
        </Callout>

        <h3>OFDM Subcarrier Structure</h3>
        <p>
          The OFDM PHY uses <strong>52 subcarriers</strong> — 48 carry data and 4 are pilot subcarriers
          used for channel estimation. One OFDM symbol duration is <strong>8 µs</strong>. Eight modulation
          and coding schemes (MCS) are defined, of which three are mandatory:
        </p>

        <Table
          caption="ITS-G5 PHY transfer rates for 10 MHz channels (EN 302 663, Annex C)"
          headers={['Rate (Mbit/s)', 'Modulation', 'Code rate', 'Data bits/symbol', 'Min Rx sens. (dBm)', 'Mandatory']}
          rows={[
            ['3',   'BPSK',   '1/2', '24',  '-91', <Badge tone="emerald">Yes</Badge>],
            ['4.5', 'BPSK',   '3/4', '36',  '-90', '—'],
            ['6',   'QPSK',   '1/2', '48',  '-88', <Badge tone="emerald">Yes</Badge>],
            ['9',   'QPSK',   '3/4', '72',  '-86', '—'],
            ['12',  '16-QAM', '1/2', '96',  '-83', <Badge tone="emerald">Yes</Badge>],
            ['18',  '16-QAM', '3/4', '144', '-79', '—'],
            ['24',  '64-QAM', '2/3', '192', '-75', '—'],
            ['27',  '64-QAM', '3/4', '216', '-74', '—'],
          ]}
        />

        <h3>PPDU Frame Structure</h3>
        <p>
          A transmitted packet is the PLCP Protocol Data Unit (PPDU). It consists of:
        </p>
        <ul>
          <li><strong>Preamble (32 µs):</strong> Short and long training sequences for synchronisation and channel estimation.</li>
          <li><strong>Signal field (8 µs):</strong> Always transmitted at BPSK 1/2. Contains 4-bit rate, 12-bit length, parity, and tail bits.</li>
          <li><strong>Data field:</strong> Carries the PSDU (MAC header + payload). Duration depends on MCS and packet length.</li>
        </ul>

        <Figure caption="PPDU structure: fixed preamble + signal field, followed by variable-length data field.">
          <div className="flex w-full h-12 text-xs font-mono rounded overflow-hidden border border-ink-700">
            <div className="flex items-center justify-center bg-violet-900 text-violet-100 px-3 border-r border-ink-600 flex-none" style={{width:'20%'}}>
              Preamble 32 µs
            </div>
            <div className="flex items-center justify-center bg-brand-900 text-brand-100 px-3 border-r border-ink-600 flex-none" style={{width:'15%'}}>
              Signal 8 µs
            </div>
            <div className="flex items-center justify-center bg-emerald-900 text-emerald-100 px-3 flex-1">
              Data (PSDU = MPDU) — variable, rate and length in Signal field
            </div>
          </div>
        </Figure>

        <h3>OCB — Outside the Context of a BSS</h3>
        <p>
          The defining feature of ITS-G5 operation is that the IEEE 802.11 MIB parameter{' '}
          <code>dot11OCBActivated</code> is set to <strong>true</strong>. This enables communication
          Outside the Context of a Basic Service Set (OCB). Consequences:
        </p>
        <ul>
          <li>No authentication or association — stations transmit immediately to any receiver.</li>
          <li>No access point (AP) — true peer-to-peer ad hoc communication.</li>
          <li>BSSID is set to a wildcard (all ones) in every frame transmitted.</li>
          <li>802.11 security mechanisms are disabled — security is handled by the ETSI ITS-S security layer above.</li>
          <li>No beacon scanning — channel selection is predetermined by management configuration.</li>
          <li>No shared clock requirement — stations use GPS/GNSS for time independently.</li>
        </ul>

        <Callout type="tip" title="Release 2: IEEE 802.11bd (NGV)">
          <Ref code="EN 303 797" kind="ETSI" title="ITS-G5 R2" /> (2024) introduces Profile 2, adding support
          for IEEE 802.11bd-2022 (Next Generation V2X, NGV). NGV adds BPSK-DCM modulation (Dual Sub-Carrier
          Modulation) for extended range, 256-QAM for higher throughput, optional 20 MHz channel bonding
          (up to 30 dBm EIRP), midamble insertion for long packets, and MIMO support. Profile 1 (legacy
          802.11p mode) remains mandatory; Profile 2 is optional but enabled by default when supported.
        </Callout>
      </Section>

      {/* ─── 4. MAC and EDCA ─── */}
      <Section id="mac" title="MAC Layer: EDCA and Access Categories">
        <p>
          The ITS-G5 MAC algorithm is <strong>Enhanced Distributed Coordination Access (EDCA)</strong>,
          specified in IEEE 802.11-2016 (clause 10). EDCA extends the basic Distributed Coordination
          Function (DCF) — itself Carrier Sense Multiple Access with Collision Avoidance (CSMA/CA) —
          by adding Quality of Service (QoS) through differentiated channel access priorities.
        </p>

        <h3>CSMA/CA Backoff Procedure</h3>
        <Steps>
          <div><strong>Listen for AIFS:</strong> A station listens to the channel for an Arbitration InterFrame Space (AIFS). If idle throughout, proceed to transmit directly.</div>
          <div><strong>Backoff on busy:</strong> If the channel was busy at any point during AIFS, draw a random integer uniformly from [0, CWmin] and begin counting it down — decrementing by one per 13 µs slot only when the channel is idle.</div>
          <div><strong>Resume after busy periods:</strong> If the channel becomes busy mid-backoff, freeze the counter; restart decrements only after a fresh AIFS once the channel clears.</div>
          <div><strong>Transmit at zero:</strong> When the backoff counter reaches 0, transmit. In broadcast mode (dominant for ITS-G5), CW stays at CWmin and there are no ACKs or retransmissions.</div>
          <div><strong>Collision handling (unicast only):</strong> If no ACK is received, double CW (up to CWmax = 1023) and repeat. Reset to CWmin after success or max-retry discard.</div>
        </Steps>

        <h3>Four Access Categories</h3>
        <p>
          EDCA maintains four internal queues called <strong>Access Categories (ACs)</strong>. Higher
          priority ACs have smaller AIFS and smaller CW — they back off less and win channel access more
          often. User Priority (UP) values 0–7 (inherited from IEEE 802.1D) are mapped to the four ACs:
        </p>

        <Table
          caption="EDCA Access Categories for 802.11p / ITS-G5 — default parameters (EN 302 663, Annex C)"
          headers={['AC', 'Traffic type', 'UPs', 'CWmin', 'CWmax', 'AIFSN', 'AIFS (µs)']}
          rows={[
            [<Badge tone="rose">AC_VO</Badge>,      'Voice / Network Control', '6, 7', '3',  '7',    '2', '58'],
            [<Badge tone="amber">AC_VI</Badge>,     'Video / Controlled Load',  '4, 5', '7',  '15',   '3', '71'],
            [<Badge tone="brand">AC_BE</Badge>,     'Best Effort',               '0, 3', '15', '1 023', '6', '110'],
            [<Badge tone="emerald">AC_BK</Badge>,   'Background',               '1, 2', '15', '1 023', '9', '149'],
          ]}
        />

        <p>
          PHY timing constants for 10 MHz OFDM (from IEEE 802.11-2016, Table 17-21):
          aSlotTime = 13 µs, aSIFSTime = 32 µs, aCWmin = 15, aCWmax = 1 023.
          AIFS[AC] = AIFSN[AC] × aSlotTime + aSIFSTime.
        </p>

        <Callout type="key" title="Priority Mapping in ITS">
          Safety-critical messages (CAM, DENM) are typically assigned AC_VI or AC_VO priority by the
          facilities layer. Non-safety services use AC_BE or AC_BK. The DCC management entity may adjust
          these defaults per traffic stream. The{' '}<Link to="/networking">Networking &amp; Transport layer</Link>{' '}
          sets the User Priority field when handing packets down to the access layer via AL_DATA.request.
        </Callout>

        <h3>Logical Link Control (LLC)</h3>
        <p>
          Above the MAC sits the IEEE/ISO/IEC 8802-2 LLC sublayer operating in Type 1 (unacknowledged
          connectionless) mode. The SubNetwork Access Protocol (SNAP) identifies the network-layer protocol
          via an EtherType. GeoNetworking uses EtherType <code>0x8947</code>. For Release 2 NGV-format
          packets, EtherType Protocol Discrimination (EPD) as defined in IEEE 802-2014 is used instead
          of SNAP.
        </p>
      </Section>

      {/* ─── 5. DCC ─── */}
      <Section id="dcc" title="Decentralized Congestion Control (DCC)">
        <p>
          Decentralized Congestion Control (DCC) is the mechanism that prevents any single ITS station
          from consuming all available channel capacity. In a dense vehicular network — hundreds of vehicles
          near an accident — channel congestion causes safety messages to be lost exactly when they matter
          most. DCC ensures graceful degradation: as the channel fills up, each station reduces its own
          contributions proportionally, preserving fairness and leaving headroom for emergency traffic.
        </p>

        <Callout type="key" title="DCC is Cross-Layer by Design">
          DCC is not a single protocol but a distributed control framework spanning the access layer
          (DCC_ACC), the networking &amp; transport layer (DCC_NET), the facilities layer (DCC_FAC),
          and coordinated by a cross-layer management entity (DCC_CROSS). This is necessary because the
          access layer alone cannot know which applications are running — application priorities must
          feed back down to restrict less-important traffic first while preserving safety-critical flows.
        </Callout>

        <h3>Channel Busy Ratio (CBR)</h3>
        <p>
          The primary congestion metric is the <strong>Channel Busy Ratio (CBR)</strong>: the fraction
          of time during the last 100 ms measurement window (T_CBR = 100 ms) that the receiver perceived
          the channel as busy. A channel is considered busy when a received ITS-G5 signal exceeds
          <strong> −85 dBm</strong>.
        </p>
        <p>
          Formally: CBR = T_busy / T_CBR. The busy time T_busy is accumulated in milliseconds over
          100 ms. Any equivalent mechanism providing CBR within ±3% deviation is acceptable
          (EN 302 663 §4.3.2).
        </p>
        <p>
          In Release 2 (EN 303 797), the notation is sharpened: <strong>LCBR</strong> (Local CBR — measured
          by this station) vs <strong>GCBR</strong> (Global CBR — derived from neighbouring stations'
          reported LCBR, e.g. via GeoNetworking headers). When GCBR is available it supersedes LCBR
          as the DCC input, giving a wider view of congestion around the ego station.
        </p>

        <h3>Hard Regulatory Limits (EN 302 571 / EN 303 797)</h3>
        <p>
          Absolute limits that all DCC algorithms must respect, regardless of internal logic:
        </p>
        <ul>
          <li><strong>Ton ≤ 4 ms</strong> — maximum duration of a single transmission burst.</li>
          <li><strong>Duty cycle ≤ 3 %</strong> per second per channel (δ_max = 0.03).</li>
          <li><strong>Toff ≥ 25 ms</strong> — minimum gap between consecutive transmissions.</li>
          <li>
            When CBR ≥ CTH (default congestion threshold CTH = 0.62 for the CCH / 5895–5905 MHz channel):
            Toff ≥ min(1 000 ms, Ton × (4 000 × CBR/(1 − CBR) − 1)).
          </li>
        </ul>

        <Callout type="example" title="Toff Calculation Example">
          Suppose Ton = 1 ms and CBR = 0.70. The congestion threshold CTH = 0.62 is exceeded.
          Toff_limit = 1 × (4 000 × 0.70/0.30 − 1) ≈ 9 332 ms. Capped at 1 000 ms, so the station
          must wait 1 second between messages — effectively throttled to 1 Hz regardless of application
          demands.
        </Callout>

        <h3>Two Conformant DCC Algorithm Families</h3>
        <p>
          <Ref code="TS 102 687" kind="ETSI" title="DCC Access Layer" /> specifies two algorithm families;
          implementations must choose one:
        </p>

        <CardGrid cols={2}>
          <Card title="Reactive DCC" accent="brand">
            <p>
              A finite state machine evaluated every T_CBR (100 ms). States are ordered linearly:
              <strong> Relaxed → Active 1 → Active 2 → Active 3 → Restrictive</strong>. Only transitions
              to adjacent states are allowed (one step per 100 ms cycle — a form of hysteresis). Each
              state defines the allowed packet rate and minimum Toff.
            </p>
          </Card>
          <Card title="Adaptive DCC (LIMERIC-inspired)" accent="amber">
            <p>
              A linear control algorithm running every 200 ms. Computes a target duty cycle δ aiming
              for CBR_target = 0.68. Control parameters: α = 0.016 (smoothing), β = 0.0012 (gain),
              G⁺_max = 0.0005, G⁻_max = −0.00025. Bounds: δ_max = 0.03, δ_min = 0.0006. A gate
              keeper enforces δ by delaying packet acceptance.
            </p>
          </Card>
        </CardGrid>

        <h3>Reactive DCC State Machine</h3>
        <Figure caption="Reactive DCC states — transitions only between neighbours. Example Toff/rate for Ton &lt; 1 ms (TS 102 687 Annex A).">
          <div className="flex flex-col gap-3 w-full items-center">
            <div className="flex items-start gap-1 w-full justify-center flex-wrap">
              {[
                { state: 'Relaxed',     cbr: 'CBR < 30 %',  rate: '10 Hz',  toff: '100 ms',   color: 'bg-emerald-900 border-emerald-600 text-emerald-100' },
                { state: 'Active 1',    cbr: '30–39 %',     rate: '5 Hz',   toff: '200 ms',   color: 'bg-brand-900 border-brand-600 text-brand-100' },
                { state: 'Active 2',    cbr: '40–49 %',     rate: '2.5 Hz', toff: '400 ms',   color: 'bg-amber-900 border-amber-600 text-amber-100' },
                { state: 'Active 3',    cbr: '50–60 %',     rate: '2 Hz',   toff: '500 ms',   color: 'bg-orange-900 border-orange-600 text-orange-100' },
                { state: 'Restrictive', cbr: 'CBR > 60 %',  rate: '1 Hz',   toff: '1 000 ms', color: 'bg-rose-900 border-rose-700 text-rose-100' },
              ].map((s, i, arr) => (
                <React.Fragment key={s.state}>
                  <div className={`flex flex-col items-center px-3 py-2 rounded border ${s.color} text-xs min-w-[90px] text-center`}>
                    <span className="font-bold">{s.state}</span>
                    <span>{s.cbr}</span>
                    <span>{s.rate}</span>
                    <span className="text-[10px] opacity-75">Toff {s.toff}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="flex items-center text-slate-500 text-sm pt-4">
                      <span>&#8596;</span>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
            <p className="text-xs text-slate-400 text-center">
              Bidirectional arrows indicate only adjacent transitions are permitted. One step per 100 ms T_CBR evaluation cycle.
            </p>
          </div>
        </Figure>

        <h3>DCC Control Knobs: TPC, TRC, TDC</h3>
        <DefList items={[
          {
            term: 'TPC — Transmit Power Control',
            def: 'Reduce output power to shrink the interference footprint. Stations further away experience less signal, so their CBR measurement drops. Used as a first-line defence to limit reach before cutting message rate.'
          },
          {
            term: 'TRC — Transmit Rate Control',
            def: 'Increase Toff (the inter-packet gap). Fewer packets per second means less airtime consumed by the ego station. The primary mechanism used by both reactive and adaptive DCC.'
          },
          {
            term: 'TDC — Transmit Datarate Control',
            def: 'Switch to a higher MCS (e.g. 24 Mbit/s instead of 6 Mbit/s). Shorter Ton for the same payload means less airtime per packet. Only useful when link quality allows higher modulation without reliability degradation.'
          },
        ]} />

        <h3>Cross-Layer DCC Architecture</h3>
        <p>
          <Ref code="TS 103 175" kind="ETSI" title="Cross-Layer DCC" /> specifies how DCC entities at
          different layers collaborate via the management plane (DCC_CROSS entity):
        </p>
        <LayerStack
          layers={[
            { name: 'DCC_FAC — Facilities Layer', sub: 'Receives message-generation rate limits from management; sheds lower-priority CAM/DENM generation first under congestion', accent: 'violet' },
            { name: 'DCC_NET — Networking & Transport', sub: 'Channel routing — selects CCH vs SCH based on congestion state; embeds local CBR in GeoNetworking headers for sharing', accent: 'brand' },
            { name: 'DCC_ACC — Access Layer', sub: 'Gate keeper: enforces Ton/Toff limits; measures local CBR every 100 ms; controls TX power and MCS per packet', accent: 'emerald' },
          ]}
          leftRail="DCC_CROSS (Management plane): evaluates all inputs, distributes Toff limits and power limits downward"
        />

        <Callout type="tip" title="DCC Profile Identifiers (DP0–DP32)">
          TS 102 724 introduces DCC Profile Identifiers (DP-ID) that classify traffic streams.
          DP1/DP2 map to CCH safety traffic (CAM, DENM), DP3–DP8 to CCH non-safety, DP9–DP13+ to
          SCH-specific services. Each profile carries its own Toff requirement per DCC state and its
          own channel assignment priority. This lets the management entity shed non-safety traffic
          first while preserving DP1/DP2 safety traffic even in Restrictive state.
        </Callout>
      </Section>

      {/* ─── 6. CEN DSRC coexistence ─── */}
      <Section id="coexistence" title="Coexistence with CEN DSRC Road Tolling">
        <p>
          Road tolling in Europe uses <strong>CEN DSRC</strong> (Dedicated Short-Range Communication),
          standardised in CEN EN 12253 and operating in the 5 795–5 815 MHz band. This band lies just
          below the ITS-G5B sub-band. Studies (ECC Reports 101 and 228, ETSI TR 102 654) confirmed that
          ITS transmissions can interfere with DSRC toll-readers when vehicles pass through charging portals.
        </p>
        <p>
          <Ref code="TS 102 792" kind="ETSI" title="CEN DSRC Mitigation" /> specifies mandatory mitigation
          for all ITS stations in ITS-G5A/B/D:
        </p>

        <Steps>
          <div>
            <strong>Protected Zone Database:</strong> Each ITS station holds a database of DSRC installation
            positions (toll plazas, tunnel entries, parking gates) with associated GPS coordinates and
            protected zone radii. The database may be pre-loaded statically, or dynamically updated from
            roadside ITS stations broadcasting their position and protected zone radius in CAMs.
          </div>
          <div>
            <strong>Normal Mode (outside zones):</strong> ITS station operates with default parameters —
            up to 23 dBm EIRP. Unwanted emissions in the 5 795–5 815 MHz tolling band must not exceed
            −33 dBm/MHz EIRP.
          </div>
          <div>
            <strong>Coexistence Mode (inside protected zone):</strong> When an ITS station enters a
            protected zone, it switches to coexistence mode. Output power and duty cycle are severely
            restricted. For LTE-V2X stations (EN 303 613 §5.7.3), maximum power inside a protected zone
            is 10 dBm EIRP and spurious emissions in the tolling band are capped at −65 dBm/MHz.
          </div>
          <div>
            <strong>Duty Cycle Restriction:</strong> Inside the zone the allowed transmit duty cycle drops
            dramatically. The Toff between messages grows to keep aggregate interference below the field
            strength threshold where DSRC reliability is impaired. Calculations in TS 102 792 Annex A
            show that Toff grows roughly linearly with the number of ITS interferers.
          </div>
        </Steps>

        <p>
          Both ITS-G5 (EN 302 663 §4.4, EN 303 797 §4.7) and LTE-V2X (EN 303 613 §5.7.3) require
          conformance to TS 102 792. Fixed ITS stations near toll plazas have simplified rules since
          their position is known.
        </p>
      </Section>

      {/* ─── 7. C-V2X PHY/MAC ─── */}
      <Section id="cv2x" title="C-V2X / LTE-V2X Access Layer (PC5 Sidelink)">
        <p>
          LTE-V2X (Long Term Evolution based Vehicle-to-Everything), standardised in 3GPP Release 14,
          uses the <strong>PC5 sidelink interface</strong> for direct V2X communication without
          base-station involvement (Mode 4: autonomous resource selection). ETSI profiles the ITS-specific
          configuration in <Ref code="EN 303 613" kind="ETSI" title="LTE-V2X Access Layer" />.
        </p>

        <h3>Protocol Stack</h3>
        <LayerStack
          layers={[
            { name: 'PDCP — Packet Data Convergence Protocol', sub: 'Differentiates IP and Non-IP SDUs (e.g. GeoNetworking encapsulation)', accent: 'violet' },
            { name: 'RLC — Radio Link Control', sub: 'Segmentation and concatenation of SDUs for MAC transport', accent: 'brand' },
            { name: 'RRC — Radio Resource Control', sub: 'Access stratum management; configures Mode 4 resource pool parameters', accent: 'emerald' },
            { name: 'NAS — Non-Access Stratum', sub: 'Subscription control and CN requests (mostly bypassed in standalone Mode 4)', accent: 'amber' },
            { name: 'MAC — Medium Access Control', sub: 'Autonomous resource pool management and scheduling; sensing-based collision avoidance', accent: 'brand' },
            { name: 'PHY — Physical Layer', sub: 'SC-FDMA / OFDM; PSCCH (control) + PSSCH (data); Band 47 (5 855–5 925 MHz)', accent: 'emerald' },
          ]}
          leftRail="Management (MI-SAP)"
        />

        <h3>PC5 Physical Layer Basics</h3>
        <p>
          Unlike ITS-G5's OFDM with 52 subcarriers at 10 MHz, LTE-V2X PHY uses SC-FDMA / OFDM with a
          15 kHz subcarrier spacing in Band 47. Resources are organised into Resource Blocks (RBs — 7
          consecutive symbols × 12 consecutive subcarriers in frequency) and sub-channels (contiguous
          RB sets). The Physical Sidelink Control CHannel (PSCCH) carries scheduling grants; the Physical
          Sidelink Shared CHannel (PSSCH) carries the actual data payload.
        </p>
        <p>
          In Mode 4, each vehicle autonomously selects resources from a pre-configured resource pool
          based on sensing: it measures Sidelink RSSI (S-RSSI) over each sub-channel for a configurable
          sensing window, excludes busy sub-channels, and selects semi-persistent resources from the
          remainder.
        </p>

        <h3>C-V2X Congestion Control</h3>
        <p>
          <Ref code="TS 103 574" kind="ETSI" title="C-V2X Congestion Control" /> defines congestion
          control for the PC5 interface. The key metric is the <strong>Channel Busy Ratio (CBR)</strong>,
          which for LTE-V2X is defined as the portion of sub-channels in the resource pool whose S-RSSI
          exceeds a configured threshold, measured over the last 100 ms. Note this definition differs
          from the ITS-G5 CBR (energy detect on a 10 MHz channel vs sub-channel RSSI occupancy).
        </p>
        <p>
          Each station adapts its <strong>Channel Occupancy Ratio (CR)</strong> — the fraction of
          configured sub-channels it actually uses — so as not to exceed a per-CBR CR limit. Higher CBR
          forces lower CR: the station must back off by using fewer sub-channels per unit time, reducing
          its contribution to congestion.
        </p>

        <Callout type="tip" title="Mode 4 Resource Reselection">
          Semi-persistent scheduling means a station picks resources valid for multiple consecutive
          subframes. When the reselection counter reaches zero, the station re-senses and re-selects.
          This reduces signalling overhead but introduces an inherent collision probability if two
          stations independently choose the same resources — mitigated by the randomised reselection
          probability (typically 20 %) and sensing-based exclusion.
        </Callout>
      </Section>

      {/* ─── 8. Comparison Table ─── */}
      <Section id="comparison" title="ITS-G5 vs C-V2X: Side-by-Side Comparison">
        <Table
          caption="Comparison of ITS-G5 and C-V2X / LTE-V2X access layer technologies"
          headers={['Attribute', 'ITS-G5 (802.11p / OCB)', 'C-V2X / LTE-V2X (PC5 Mode 4)']}
          rows={[
            ['Standard body',        'ETSI / IEEE',                        '3GPP (ETSI ITS profile)'],
            ['Key ETSI standard',    'EN 302 663, EN 303 797',              'EN 303 613, TS 103 723'],
            ['Spectrum',             '5.855–5.925 GHz ITS band',            '5.855–5.925 GHz (Band 47)'],
            ['Channel bandwidth',    '10 MHz (20 MHz optional R2)',          '10 MHz (standard)'],
            ['PHY waveform',         'OFDM, 52 subcarriers, 8 µs symbol',   'SC-FDMA / OFDM, 15 kHz SCS'],
            ['Data rates',           '3–27 Mbit/s (3/6/12 Mbit/s mandatory)', 'Variable MCS+RB; higher peak possible'],
            ['Channel access',       'CSMA/CA EDCA — contention-based',     'Sensing-based semi-persistent scheduling'],
            ['Infrastructure',       'None — pure ad hoc OCB',              'None in Mode 4; eNB-assisted Mode 3'],
            ['Latency',              'Sub-ms channel access (typical)',      'Deterministic scheduling, ~1 ms range'],
            ['NLOS performance',     'Good LOS; challenged NLOS',           'Better NLOS (SC-FDMA waveform properties)'],
            ['Congestion control',   'DCC: CBR → Toff/power/rate (TS 102 687)', 'CBR → CR limit (TS 103 574)'],
            ['Security',             'ETSI ITS-S security layer (ETSI TS 102 731)', 'Same ETSI ITS-S security'],
            ['Deployment status',    'C-Roads Day 1 (EU); Japan; US DSRC',  'Newer vehicles; strong Chinese market'],
            ['OCB / BSS mode',       'dot11OCBActivated = true',            'N/A — native PC5 sidelink'],
          ]}
        />

        <StatGrid cols={3}>
          <Stat value="8 µs" label="ITS-G5 OFDM symbol" sub="Half-clocked for vehicular multipath" />
          <Stat value="15 kHz" label="C-V2X subcarrier spacing" sub="LTE Band 47 subcarrier" />
          <Stat value="100 ms" label="CBR measurement window" sub="Both ITS-G5 and C-V2X" />
        </StatGrid>
      </Section>

      {/* ─── 9. Release 2 ─── */}
      <Section id="release2" title="Release 2: Multi-Channel Operation and NGV">
        <p>
          Release 2 of the ETSI ITS standards introduces significant access layer enhancements for both
          ITS-G5 and C-V2X. The primary Release 2 ITS-G5 access layer document is{' '}
          <Ref code="EN 303 797" kind="ETSI" title="ITS-G5 R2" /> (2024).
        </p>

        <CardGrid cols={2}>
          <Card title="Multi-Channel Operation (MCO)" accent="emerald">
            <p>
              ETSI TS 103 695 specifies Multi-Channel Operation. ITS stations may carry multiple
              transceivers, each tuned to a different channel simultaneously, eliminating the old
              time-sharing constraint. MCO is coordinated by the management plane, which sets channel
              selection and DCC thresholds per channel — including CTH values that may differ from the
              default 0.62 when MCO settings are active.
            </p>
          </Card>
          <Card title="Profile 2: IEEE 802.11bd (NGV)" accent="brand">
            <p>
              IEEE 802.11bd-2022 (Next Generation V2X) adds BPSK-DCM for extended range, 256-QAM for
              throughput at good link quality, optional 20 MHz channel bonding (max 30 dBm EIRP),
              midamble insertion for mobility compensation in long packets, and MIMO support. Profile 1
              (802.11-2020 legacy mode) remains mandatory; Profile 2 is optional.
            </p>
          </Card>
          <Card title="Global CBR Feedback" accent="amber">
            <p>
              EN 303 797 formalises LCBR / GCBR distinction. When higher layers provide GCBR — e.g.
              from GeoNetworking cooperative awareness or dedicated management messages — the access
              layer substitutes it for LCBR as the DCC input. This improves accuracy at congestion
              cluster boundaries.
            </p>
          </Card>
          <Card title="C-V2X R2 Congestion" accent="violet">
            <p>
              TS 103 574 V2.0.0 (2023) establishes the Release 2 baseline for C-V2X PC5 congestion
              control, referencing V1.1.1 (2018) as the normative foundation. The R2 framework enables
              future enhancements: multi-channel coordination, global CBR exchange, and improved
              resource pool definitions aligned with NR-V2X (5G NR PC5).
            </p>
          </Card>
        </CardGrid>
      </Section>

      {/* ─── 10. Stack context ─── */}
      <Section id="stack" title="Position in the ITS Station Architecture">
        <p>
          The access layer occupies the bottom of the ITS station reference architecture (ETSI EN 302 665).
          It exports a single data interface (IN-SAP) upward and a management interface (MI-SAP) to the
          management entity. Higher layers see one uniform access interface regardless of whether the
          underlying radio is ITS-G5 or C-V2X — the key to technology-neutral upper-layer operation.
        </p>
        <LayerStack
          layers={[
            { name: 'Applications', sub: 'Road safety, traffic efficiency, infotainment', accent: 'violet' },
            { name: 'Facilities', sub: 'CAM, DENM, CPM, VAM — message generation; DCC_FAC', accent: 'amber' },
            { name: 'Networking & Transport', sub: 'GeoNetworking, BTP; DCC_NET — see Networking page', accent: 'brand' },
            { name: 'Access Layer', sub: 'ITS-G5 (802.11p OCB) or C-V2X (PC5) — this page; DCC_ACC', accent: 'emerald' },
          ]}
          leftRail="Management (DCC_CROSS, channel config)"
          rightRail="Security (PKI, certificates)"
        />
        <p>
          The <strong>AL_DATA.request</strong> primitive carries: source/destination MAC, priority,
          transmit power, MCS, channel number, transceiver ID, and payload down to the radio.
          <strong> AL_DATA.indication</strong> delivers: source/destination MAC, current local CBR,
          channel number, RSSI, and payload back up to the networking layer. This clean interface
          decouples radio technology from upper-layer protocol logic.
        </p>
        <p>
          Related pages: <Link to="/networking">Networking &amp; Transport</Link> describes GeoNetworking
          above this layer. <Link to="/architecture">Architecture</Link> covers the full ITS station
          reference model. <Link to="/management">Management</Link> covers the management plane including
          DCC_CROSS.
        </p>
      </Section>

      {/* ─── 11. Key standards ─── */}
      <Section id="standards" title="Key Standards Referenced">
        <ul>
          <li><Ref code="EN 302 663" kind="ETSI" title="ITS-G5 Access Layer R1" /> — Release 1 PHY/MAC specification (IEEE 802.11-2016 OCB mode).</li>
          <li><Ref code="EN 303 797" kind="ETSI" title="ITS-G5 Access Layer R2" /> — Release 2 (2024); adds 802.11bd / NGV profile, LCBR/GCBR formalisation.</li>
          <li><Ref code="EN 302 571" kind="ETSI" title="Harmonised Radio Standard 5.855–5.925 GHz" /> — Regulatory power limits, DCC duty cycle, RED conformance.</li>
          <li><Ref code="TS 102 724" kind="ETSI" title="Harmonised Channel Specs 5 GHz" /> — Channel layout (CCH, SCH1, SCH2, G5B), DCC profiles DP0–DP32, multi-channel operation.</li>
          <li><Ref code="TS 102 687" kind="ETSI" title="DCC Access Layer" /> — Reactive and adaptive DCC algorithms.</li>
          <li><Ref code="TS 103 175" kind="ETSI" title="Cross-Layer DCC Management" /> — DCC_CROSS entity, MI-SAP/MN-SAP/MF-SAP interfaces, test cases.</li>
          <li><Ref code="TS 102 792" kind="ETSI" title="CEN DSRC Mitigation" /> — Protected zones, coexistence mode, duty cycle limits near toll plazas.</li>
          <li><Ref code="EN 303 613" kind="ETSI" title="LTE-V2X Access Layer" /> — PC5 sidelink protocol stack for 5.9 GHz ITS band (3GPP Rel-14 ETSI profile).</li>
          <li><Ref code="TS 103 574" kind="ETSI" title="C-V2X PC5 Congestion Control" /> — CR-based congestion control for LTE-V2X; V2.0.0 is the Release 2 baseline.</li>
          <li><Ref code="TS 103 723" kind="ETSI" title="LTE-V2X Direct Comm Profile" /> — System profile for LTE-V2X PC5 Mode 4, aligned with C2C-CC BSP and C-Roads RSP.</li>
        </ul>
      </Section>
    </article>
  )
}
