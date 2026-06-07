import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout.jsx'

import Home from './pages/Home.jsx'
import Overview from './pages/Overview.jsx'
import Architecture from './pages/Architecture.jsx'
import AccessLayer from './pages/AccessLayer.jsx'
import Networking from './pages/Networking.jsx'
import Facilities from './pages/Facilities.jsx'
import Management from './pages/Management.jsx'
import MessageCAM from './pages/MessageCAM.jsx'
import MessageDENM from './pages/MessageDENM.jsx'
import MessageCPM from './pages/MessageCPM.jsx'
import MessageVAM from './pages/MessageVAM.jsx'
import MessageInfra from './pages/MessageInfra.jsx'
import MessageMCM from './pages/MessageMCM.jsx'
import Applications from './pages/Applications.jsx'
import Security from './pages/Security.jsx'
import PKITrust from './pages/PKITrust.jsx'
import Conformance from './pages/Conformance.jsx'
import CRoads from './pages/CRoads.jsx'
import Car2Car from './pages/Car2Car.jsx'
import EUPolicy from './pages/EUPolicy.jsx'
import Global from './pages/Global.jsx'
import Research from './pages/Research.jsx'
import Standards from './pages/Standards.jsx'
import Glossary from './pages/Glossary.jsx'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/architecture" element={<Architecture />} />
        <Route path="/access-layer" element={<AccessLayer />} />
        <Route path="/networking" element={<Networking />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/management" element={<Management />} />
        <Route path="/cam" element={<MessageCAM />} />
        <Route path="/denm" element={<MessageDENM />} />
        <Route path="/cpm" element={<MessageCPM />} />
        <Route path="/vam" element={<MessageVAM />} />
        <Route path="/infrastructure" element={<MessageInfra />} />
        <Route path="/mcm" element={<MessageMCM />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/security" element={<Security />} />
        <Route path="/pki" element={<PKITrust />} />
        <Route path="/conformance" element={<Conformance />} />
        <Route path="/c-roads" element={<CRoads />} />
        <Route path="/car2car" element={<Car2Car />} />
        <Route path="/eu-policy" element={<EUPolicy />} />
        <Route path="/global" element={<Global />} />
        <Route path="/research" element={<Research />} />
        <Route path="/standards" element={<Standards />} />
        <Route path="/glossary" element={<Glossary />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}
