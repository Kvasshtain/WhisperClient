import React from 'react'

import CurrentChatPanel from '../../CurrentChatPanel/CurrentChatPanel'
import UserChatsPanel from '../../UserChatsPanel/UserChatsPanel'

import './AppPanel-MainPanel.sass'

function MainPanel() {
  return (
    <div className="mainPanel">
      <UserChatsPanel />
      <CurrentChatPanel />
    </div>
  )
}

export { MainPanel }
