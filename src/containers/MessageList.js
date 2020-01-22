import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { fetchMessagesList } from '../actions/messageListActions';
import { MessageFrame } from '../components/MessageFrame'
import { NewMessageInput } from '../components/NewMessageInput'

class MessageList extends React.Component {

    constructor(props) {
        super(props)
        this.messageListRef = React.createRef()
        this.state = {
            enableScrollDown: true,
            scrollTop: 0,
            previousMessagesLength: 0,
        }
    }

    componentDidMount = () => {
        this.fetchMessages()
    }

    componentDidUpdate = () => {
        const { messages } = this.props;
        
        if (!messages) return
        
        let messagesLength = messages.length
        let previousMessagesLength = this.state.previousMessagesLength
        
        if (messagesLength === previousMessagesLength) return

        this.setState({
            previousMessagesLength: messagesLength,
        })

        this.scrollDownIfEnabled()
    }

    fetchMessages = () => {
        let currentChat = this.props.currentChat
        let messages = this.props.messages

        if(!currentChat || !currentChat._id) return
        if(!messages) return

        let time = (new Date()).getTime();

        let oldestMessageTime = messages.length ? messages[0].time : time

        this.props.fetchMessagesList(currentChat._id, oldestMessageTime)
    }

    scrollDownIfEnabled = () => {
        if (this.state.enableScrollDown) {

            this.setState({
                enableScrollDown: false,
            })

            this.scrollDown()
        }
    }

    scrollDown = () => {
        const { current } = this.messageListRef

        current.scrollTop = current.scrollHeight
    }

    renderMessageList = () => {
        const { messages } = this.props;
        let messagesLength = messages.length

        if (messages && messagesLength) {
            return messages.map(function (item, index) {
                return (
                    <MessageFrame key = { index } message = { item } />
                    )
                })
        }
    }

    onScrollDownClick = () => {
        this.scrollDown()
    }

    onScroll = () => {
        const minScrollTop = 10
        const { current } = this.messageListRef

        if (current.scrollTop < minScrollTop) {
            this.fetchMessages()
        }
    }

    sendNewMessage = (newMessage) => {
        this.props.sendNewMessage(newMessage)
        
        this.setState({
            enableScrollDown: true,
        })
    }

    render() {
        return (
            <React.Fragment>
                <button onClick = { this.onScrollDownClick}>
                    Scroll down
                </button>
                <div ref={this.messageListRef} className="messageList" onScroll = { this.onScroll }>
                    {this.renderMessageList()}
                </div>
                <NewMessageInput
                    onSubmitNewMessage = { this.sendNewMessage }
                />
            </React.Fragment>
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
        fetchMessagesList: (chatId, oldestMessageTime) => dispatch(fetchMessagesList(chatId, oldestMessageTime)),
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