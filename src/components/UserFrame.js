import React from 'react'
import PropTypes from 'prop-types'

class UserFrame extends React.Component {

    onUserClick = () => {
        
        const { user } = this.props
        
        this.props.onUserClick(user)
    }

    render() {
        const { user } = this.props

        return (
            <div className = "selectedItem" onClick = { this.onUserClick }>
                <p>{user.name}</p>
                <p>{user.email}</p>
            </div>
        )
    }
}

UserFrame.propTypes = {
    chat: PropTypes.exact({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
    }),
    onSelectUser: PropTypes.func.isRequired,
}

export { UserFrame }