import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

class MessageList extends React.Component {
    
    renderMessageList = () => {
        const {messages} = this.props;

        if (messages && messages.length) {
            return messages.map(function (item, index) {
                return (
                    <p key = {index}>{item}</p>
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

const mapStateToProps = (state) => {
    return {
        messages: state.messages,
        wasMessageReceived: state.wasMessageReceived,
    };
};

MessageList.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.string.isRequired)
}

export {MessageList}
export default connect(mapStateToProps)(MessageList);