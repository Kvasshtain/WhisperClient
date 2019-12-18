import React from 'react'
import PropTypes from 'prop-types'

class MessageList extends React.Component {
    
    renderMessageList = () => {
        const {messages} = this.props;

        if (messages.length) {
            return messages.map(function (item) {
                return (
                    <p>{item.messages}</p>
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
    messages: PropTypes.arrayOf(PropTypes.string)
}

export {MessageList}