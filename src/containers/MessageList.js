import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { fetchMessagesList } from '../actions/messageListActions';
import { MessageFrame } from '../components/MessageFrame'

class MessageList extends React.Component {

    componentDidMount = () => {

        let currentChat = this.props.currentChat

        if(!currentChat || !currentChat._id) {
            return
        }

        this.props.fetchMessagesList(currentChat._id)
    }

    renderMessageList = () => {
        const { messages } = this.props;

        if (messages && messages.length) {
            return messages.map(function (item) {
                return (
                    <MessageFrame key = { item._id } message = { item } />
                )
            })
        }
    }

    render() {
        return (
            <div className="MessageList">
                { this.renderMessageList() }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        messages: state.messages,
        currentChat: state.currentChat,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchMessagesList: (chatId) => dispatch(fetchMessagesList(chatId)),
    }
}

MessageList.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.shape({
        message: PropTypes.exact({
            chatId: PropTypes.number.isRequired,
            authorName: PropTypes.string.isRequired,
            authorEmail: PropTypes.string.isRequired,
            time: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
            text: PropTypes.string.isRequired,
            wasMessageReceived: PropTypes.bool,
        })
    })
    )
}

export { MessageList }
export default connect(mapStateToProps, mapDispatchToProps)(MessageList);