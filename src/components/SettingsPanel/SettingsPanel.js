import React from 'react'
import PropTypes from 'prop-types'

import './SettingsPanel.sass'

function SettingsPanel(props) {
  return (
    <div className="settingsPanel">
      <button onClick={props.onSignOut}>Sign out</button>
      <span>{props.currentUserName}</span>
    </div>
  )
}

SettingsPanel.propTypes = {
  onSignOut: PropTypes.func.isRequired,
  currentUserName: PropTypes.string,
}

export { SettingsPanel }
