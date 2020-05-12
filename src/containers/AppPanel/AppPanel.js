import React from 'react'

import { TopPanel } from './__TopPanel/AppPanel-TopPanel'
import { MainPanel } from './__MainPanel/AppPanel-MainPanel'

import './AppPanel.sass'

function AppPanel() {
  return (
    <div className="appPanel">
      <div className="mainPanelPlace">
        <MainPanel />
      </div>
      <div className="topPanelPlace">
        <TopPanel />
      </div>
    </div>
  )
}

export { AppPanel }
