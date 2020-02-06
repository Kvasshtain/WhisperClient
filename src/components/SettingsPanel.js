import React from 'react'
import PropTypes from 'prop-types'

function SettingsPanel(props) {

    return (
        <div>
            <button onClick = { props.onSignOut }>
                Sign out
            </button>
            <span>
                { props.currentUserName }
            </span>
        </div>
    )
}

SettingsPanel.propTypes = {
    onSignOut: PropTypes.func.isRequired,
    currentUserName: PropTypes.string,
}

export { SettingsPanel }