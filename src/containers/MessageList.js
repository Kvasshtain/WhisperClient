import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchMessagesList } from '../actions/messageListActions'
import { fetchNewMessages } from '../actions/messageListActions'
import { MessageFrame } from '../components/MessageFrame'
import { NewMessageInput } from '../components/NewMessageInput'
import { updateInterval } from '../applicationSettings'
import './MessageList.sass'

class MessageList extends React.Component {
  constructor(props) {
    super(props)

    this.messageListRef = React.createRef()

    this.state = {
      enableScrollDown: true,
      previousMessagesLength: 0,
    }
  }

  componentDidMount = () => {
    this.fetchMessages()
    this.initializeMessagesListUpdateTimer()
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  componentDidUpdate = () => {
    const { messages } = this.props
    const scrollDownShift = 30

    if (!messages) return

    const messagesLength = messages.length
    const previousMessagesLength = this.state.previousMessagesLength

    if (messagesLength === previousMessagesLength) return

    this.setState({
      previousMessagesLength: messagesLength,
    })

    const { current } = this.messageListRef

    current.scrollTop += scrollDownShift

    this.scrollDownIfEnabled()
  }

  initializeMessagesListUpdateTimer = () => {
    this.timerID = setInterval(() => this.fetchNewMessages(), updateInterval)
  }

  fetchMessages = () => {
    const currentChat = this.props.currentChat
    const messages = this.props.messages

    if (!currentChat || !currentChat._id) return
    if (!messages) return

    const time = new Date().getTime()

    const oldestMessageTime = messages.length ? messages[0].time : time

    this.props.fetchMessagesList(currentChat._id, oldestMessageTime)
  }

  fetchNewMessages = () => {
    const currentChat = this.props.currentChat
    const messages = this.props.messages

    if (!currentChat || !currentChat._id) return
    if (!messages) return

    const lastMessageIndex = messages.length - 1

    if (lastMessageIndex < 0) {
      this.fetchMessages()
      return
    }

    this.props.fetchNewMessages(
      currentChat._id,
      messages[lastMessageIndex].time
    )
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
    const { messages } = this.props
    const messagesLength = messages.length

    if (messages && messagesLength) {
      return messages.map(function(item, index) {
        return <MessageFrame key={index} message={item} />
      })
    }
  }

  onScrollDownClick = () => {
    this.scrollDown()
  }

  onScroll = () => {
    const minScrollTop = 30
    const { current } = this.messageListRef

    if (current.scrollTop < minScrollTop) {
      this.fetchMessages()
    }
  }

  sendNewMessage = newMessage => {
    this.props.sendNewMessage(newMessage)

    this.setState({
      enableScrollDown: true,
    })
  }

  render() {
    const strToDecode = '&#11015'
    const parser = new DOMParser()
    const decodedString = parser.parseFromString(
      `<!doctype html><body>${strToDecode}`,
      'text/html'
    ).body.textContent

    return (
      <div>
        <div className="scroll-down-button" onClick={this.onScrollDownClick}>
          {decodedString}
        </div>
        <div
          ref={this.messageListRef}
          className="message-list"
          onScroll={this.onScroll}
        >
          {this.renderMessageList()}
        </div>
        <NewMessageInput onSubmitNewMessage={this.sendNewMessage} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messages,
    currentChat: state.currentChat,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMessagesList: (chatId, oldestMessageTime) =>
      dispatch(fetchMessagesList(chatId, oldestMessageTime)),
    fetchNewMessages: (chatId, newestMessageTime) =>
      dispatch(fetchNewMessages(chatId, newestMessageTime)),
  }
}

MessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.exact({
        chatId: PropTypes.number.isRequired,
        authorName: PropTypes.string.isRequired,
        authorEmail: PropTypes.string.isRequired,
        time: PropTypes.oneOfType([
          PropTypes.number,
          PropTypes.string,
          PropTypes.instanceOf(Date),
        ]).isRequired,
        text: PropTypes.string.isRequired,
        wasMessageReceived: PropTypes.bool,
      }),
    })
  ),
}

export { MessageList }
export default connect(mapStateToProps, mapDispatchToProps)(MessageList)
