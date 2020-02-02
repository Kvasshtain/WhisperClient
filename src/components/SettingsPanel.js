import React from 'react'
import PropTypes from 'prop-types'

function SettingsPanel(props) {

    return (
        <div onClick = { props.onSignOut }>
            <button >
                Sign out
            </button>
        </div>
    )
}

SettingsPanel.propTypes = {
    onSignOut: PropTypes.func.isRequired,
}

export { SettingsPanel }