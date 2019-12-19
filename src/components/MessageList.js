import React from 'react'
import PropTypes from 'prop-types'

class MessageList extends React.Component {
    
    renderMessageList = () => {
        const {messages} = this.props;

        if (messages.length) {
            return messages.map(function (item, index) {
                return (
                    <p key = {index}>{item.messages}</p>
                )
            })
        }
    }

    render() {
        return (
            <div className="MessageList">
                {this.renderMessageList()}
            </div>
        )
    }
}

MessageList.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.string.isRequired)
}

export {MessageList}