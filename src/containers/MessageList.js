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

        let currentChat = this.props.currentChat

        if(!currentChat || !currentChat._id) {
            return
        }        

        this.props.fetchMessagesList(currentChat._id)
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

    onDownClick = () => {
        this.scrollDown()
    }

    onScroll = () => {

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
                <button onClick = { this.onDownClick}>
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