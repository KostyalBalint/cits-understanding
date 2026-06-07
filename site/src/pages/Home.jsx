import React from 'react'
import { Link } from 'react-router-dom'
import { Section, Callout, CardGrid, Card, StatGrid, Stat, LayerStack, Badge } from '../components/ui.jsx'

function Hero() {
  return (
    <header className="relative overflow-hidden rounded-3xl border border-ink-700 bg-gradient-to-br from-ink-900 via-ink-900 to-brand-900/40 px-7 py-12 sm:px-12 sm:py-16">
      <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-600/20 blur-3xl" />
      <div className="relative">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-700 bg-brand-900/40 px-3 py-1 text-xs font-semibold text-brand-200">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
          Cooperative Intelligent Transport Systems · in depth
        </div>
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl">
          When vehicles and roads <span className="text-brand-400">talk to each other</span>.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
          C-ITS lets cars, trucks, bicycles, traffic lights and road operators exchange short
          wireless messages so everyone sees further than their own sensors. This guide explains
          the full European standards stack — from the radio bits up to the EU trust model —
          built from the primary ETSI, C-Roads, CAR&nbsp;2&nbsp;CAR and EU sources.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/overview" className="rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white transition hover:bg-brand-500">
            Start: What is C-ITS? →
          </Link>
          <Link to="/architecture" className="rounded-xl border border-ink-700 bg-ink-900/60 px-5 py-3 font-semibold text-slate-200 transition hover:border-brand-700">
            The protocol stack
          </Link>
        </div>
      </div>
    </header>
  )
}

export default function Home() {
  return (
    <article>
      <Hero />

      <StatGrid cols={4}>
        <Stat value="5.9 GHz" label="Dedicated ITS band" sub="5.855–5.925 GHz" />
        <Stat value="1–10 Hz" label="Awareness beacon rate" sub="adaptive CAM / VAM" />
        <Stat value="≈300 m" label="Direct V2X range" sub="line-of-sight, ITS-G5 / PC5" />
        <Stat value="2 stacks" label="ITS-G5 & C-V2X" sub="802.11p vs 3GPP PC5" />
      </StatGrid>

      <Section id="idea" title="The core idea">
        <p>
          Every participant — a car, a roadside unit at a junction, even a cyclist's phone — is an{' '}
          <strong>ITS station</strong> running the same layered communication stack. Stations
          broadcast small, signed, standardised messages over a dedicated 5.9&nbsp;GHz radio. A
          neighbour receiving them builds a live picture of its surroundings: who is where, moving
          how fast, and what hazards lie ahead — <em>beyond</em> line of sight and before any
          on-board sensor could detect them.
        </p>
        <p>
          The hard part is making this work between every brand of vehicle and every country's road
          operator. That interoperability is what the standards on this site exist to guarantee.
        </p>
      </Section>

      <Section id="messages" title="The language: V2X messages">
        <p>Different situations call for different message types. The big ones:</p>
        <CardGrid cols={3}>
          <Card title="CAM" icon="📡" accent="brand">
            Periodic <strong>heartbeat</strong> — position, speed, heading, 1–10×/s.{' '}
            <Link to="/cam">Read →</Link>
          </Card>
          <Card title="DENM" icon="⚠️" accent="rose">
            Event-driven <strong>hazard warnings</strong> — crash, ice, jam, roadworks.{' '}
            <Link to="/denm">Read →</Link>
          </Card>
          <Card title="CPM" icon="👁️" accent="cyan">
            <strong>Collective perception</strong> — share what your sensors detect.{' '}
            <Link to="/cpm">Read →</Link>
          </Card>
          <Card title="VAM" icon="🚶" accent="emerald">
            <strong>Vulnerable road users</strong> — pedestrians & cyclists announce themselves.{' '}
            <Link to="/vam">Read →</Link>
          </Card>
          <Card title="SPATEM / MAPEM" icon="🚦" accent="amber">
            Traffic-light <strong>phase, timing & topology</strong> from the roadside.{' '}
            <Link to="/infrastructure">Read →</Link>
          </Card>
          <Card title="IVIM / SREM / SSEM" icon="🪧" accent="violet">
            In-vehicle <strong>signage</strong> & signal <strong>priority requests</strong>.{' '}
            <Link to="/infrastructure">Read →</Link>
          </Card>
        </CardGrid>
      </Section>

      <Section id="stack" title="The stack at a glance">
        <p>
          Every ITS station implements the same layers, with <strong>Security</strong> and{' '}
          <strong>Management</strong> running vertically alongside all of them. Click any layer to
          dive in.
        </p>
        <LayerStack
          leftRail="Security"
          rightRail="Management"
          layers={[
            { name: 'Applications', sub: 'Safety, efficiency & infotainment use cases', accent: 'rose' },
            { name: 'Facilities', sub: 'Messages (CAM/DENM/CPM…), CDD, LDM, POTI', accent: 'amber' },
            { name: 'Networking & Transport', sub: 'GeoNetworking + BTP (+ IPv6)', accent: 'emerald' },
            { name: 'Access', sub: 'ITS-G5 (802.11p) or C-V2X (PC5) @ 5.9 GHz + DCC', accent: 'brand' },
          ]}
        />
        <p className="text-sm text-slate-400">
          Jump to: <Link to="/access-layer">Access</Link> ·{' '}
          <Link to="/networking">Networking</Link> · <Link to="/facilities">Facilities</Link> ·{' '}
          <Link to="/applications">Applications</Link> · <Link to="/security">Security</Link> ·{' '}
          <Link to="/management">Management</Link>
        </p>
      </Section>

      <Callout type="key" title="If you read nothing else">
        <p>
          C-ITS = <strong>standardised, signed, short-range broadcasts</strong> between ITS stations
          over 5.9&nbsp;GHz, organised by the ETSI ITS layered architecture, profiled for deployment
          by <Link to="/c-roads">C-Roads</Link> and <Link to="/car2car">CAR&nbsp;2&nbsp;CAR</Link>,
          and made trustworthy by the EU <Link to="/pki">CCMS public-key infrastructure</Link>.
        </p>
      </Callout>

      <Section id="paths" title="How to use this guide">
        <CardGrid cols={3}>
          <Card title="I'm new" icon="🌱" accent="emerald">
            <Link to="/overview">What is C-ITS?</Link> →{' '}
            <Link to="/architecture">Architecture</Link> →{' '}
            <Link to="/cam">CAM</Link> & <Link to="/denm">DENM</Link>.
          </Card>
          <Card title="I want the stack" icon="🔧" accent="brand">
            <Link to="/access-layer">Access</Link> →{' '}
            <Link to="/networking">Networking</Link> →{' '}
            <Link to="/facilities">Facilities</Link> →{' '}
            <Link to="/security">Security</Link>.
          </Card>
          <Card title="I deploy / regulate" icon="🏛️" accent="amber">
            <Link to="/c-roads">C-Roads</Link> ·{' '}
            <Link to="/car2car">CAR 2 CAR</Link> ·{' '}
            <Link to="/eu-policy">EU policy</Link> ·{' '}
            <Link to="/pki">PKI / trust</Link>.
          </Card>
        </CardGrid>
        <p className="text-sm text-slate-400">
          Reference any time: the <Link to="/standards">Standards Index</Link> and the{' '}
          <Link to="/glossary">Glossary</Link>.
        </p>
      </Section>

      <div className="mt-8 flex flex-wrap gap-2">
        <Badge tone="brand">ETSI ITS</Badge>
        <Badge tone="emerald">C-Roads</Badge>
        <Badge tone="violet">CAR 2 CAR</Badge>
        <Badge tone="amber">EU Commission</Badge>
        <Badge tone="rose">SAE / IEEE / ISO</Badge>
      </div>
    </article>
  )
}
