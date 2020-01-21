import React from 'react'
import PropTypes from 'prop-types'

class ChatFrame extends React.Component {

    onSelectChat = () => {
        
        let chat = this.props.chat
        
        this.props.onSelectChat(chat)
    }

    renderUsersList = (users) => {
        
        if (users && users.length) {

            return users.map((item, index) => {
                return (
                    <div key = { index }>
                        <p>{ item.name }</p>
                    </div>  
                )
            })
        }
    }

    render() {
        let chat = this.props.chat

        return (
            <div onClick = { this.onSelectChat }>
                <div>
                    <p>{ chat.name }</p>
                </div>
                <div>
                    <h3>Chat users:</h3><br />
                        <div>
                            { this.renderUsersList(chat.users) }
                        </div>
                </div>
            </div>
        )
    }
}

ChatFrame.propTypes = {
    chat: PropTypes.exact({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        users: PropTypes.arrayOf(PropTypes.exact({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
        })).isRequired,
    }),
    onSelectChat: PropTypes.func.isRequired,
}

export { ChatFrame }