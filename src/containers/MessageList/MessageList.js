import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  fetchMessagesList,
  fetchNewMessages,
  subscribeForNewMessages,
  unsubscribeForNewMessages,
} from '../../actions/messageListActions'

import { MessageFrame } from '../../components/MessageFrame/MessageFrame'
import { ScrollDownButton } from './__ScrollDownButton/MessageList-ScrollDownButton'

import './MessageList.sass'
import './__Item/MessageList-Item.sass'
import './__ChatNameCaption/MessageList-ChatNameCaption.sass'

class MessageList extends React.Component {
  constructor(props) {
    super(props)

    this.messageListRef = React.createRef()

    this.state = {
      enableScrollDown: true,
      previousMessagesLength: 0,
      suspendMessagesFetching: false,
      currentChat: null,
      needScrollDown: true,
      showScrollDownButton: false,
    }
  }

  componentDidMount = () => {
    const { currentChat, subscribeForNewMessages } = this.props
    if (this.state.currentChat !== currentChat) {
      this.setState({ currentChat })
      subscribeForNewMessages(this.props.currentChat._id)
    }
    this.fetchMessages()
  }

  componentWillUnmount() {
    this.props.unsubscribeForNewMessages()
  }

  componentDidUpdate = () => {
    const { messages, currentChat, subscribeForNewMessages } = this.props
    const scrollDownShift = 30
    const { current } = this.messageListRef

    if (this.state.currentChat !== currentChat) {
      this.reloadMessagesList()
      subscribeForNewMessages(this.props.currentChat._id)
      return
    }

    if (!messages) return

    const messagesLength = messages.length
    const previousMessagesLength = this.state.previousMessagesLength

    if (messagesLength <= previousMessagesLength) {
      return
    }

    this.setState({
      previousMessagesLength: messagesLength,
      suspendMessagesFetching: false,
    })

    if (current) {
      current.scrollTop += scrollDownShift
    }

    this.scrollDownIfNeed()
  }

  reloadMessagesList = () => {
    this.setState({
      currentChat: this.props.currentChat,
      previousMessagesLength: 0,
      suspendMessagesFetching: true,
      needScrollDown: true,
    })

    this.fetchMessagesForced()
  }

  fetchMessages = () => {
    if (this.state.suspendMessagesFetching) return

    this.fetchMessagesForced()
  }

  fetchMessagesForced = () => {
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

  scrollDownIfNeed = () => {
    if (this.state.needScrollDown) {
      this.setState({
        needScrollDown: false,
      })

      this.scrollDown()
    }
  }

  tryLoadMessagesUntilScrollAppears() {
    const { current } = this.messageListRef

    if (current.offsetWidth <= current.clientWidth) {
      this.fetchMessages()
    }
  }

  scrollDown = () => {
    const { current } = this.messageListRef

    this.setState({
      needScrollDown: false,
    })

    if (current) {
      current.scrollTop = current.scrollHeight
    }
  }

  onScrollDownClick = () => {
    this.scrollDown()
  }

  onScroll = () => {
    const minScrollTop = 200
    const scrollDownButtonThreshold = 200
    const {
      scrollHeight,
      scrollTop,
      clientHeight,
    } = this.messageListRef.current

    this.setState({
      showScrollDownButton:
        scrollHeight - scrollTop >= clientHeight + scrollDownButtonThreshold,
      needScrollDown: scrollHeight - scrollTop === clientHeight,
    })

    if (this.state.suspendMessagesFetching) return

    if (scrollTop < minScrollTop) {
      this.setState({
        suspendMessagesFetching: true,
      })

      this.fetchMessages()
    }
  }

  renderMessageList = (messages, hasServerReceivedMessage) => {
    const { currentUser } = this.props
    const messagesLength = messages.length

    if (messages && messagesLength) {
      return messages.map(function(item, index) {
        return (
          <div className="item" key={index}>
            <MessageFrame hasServerReceivedMessage={hasServerReceivedMessage} message={item} currentUserEmail={currentUser.email} />
          </div>
        )
      })
    }
  }

  renderScrollDownButton = () => {
    if (this.state.showScrollDownButton) {
      return <ScrollDownButton onScrollDownClick={this.onScrollDownClick} />
    }
  }

  renderChatNameCaption = () => {
    const chatName = this.props.currentChat.name
    if (chatName) {
      return (
        <div className="chatNameCaption">
          <div>
            <span>{chatName}</span>
          </div>
        </div>
      )
    }
  }

  render() {
    const strToDecode = '&#11015'
    const parser = new DOMParser()
    const decodedString = parser.parseFromString(
      `<!doctype html><body>${strToDecode}`,
      'text/html'
    ).body.textContent

    const { messages, waitingMessages } = this.props

    return (
      <React.Fragment>
        <div
          ref={this.messageListRef}
          className="messageList"
          onScroll={this.onScroll}
        >
          {this.renderMessageList(messages, true)}
          {this.renderMessageList(waitingMessages, false)}
        </div>
        {this.renderScrollDownButton()}
        {this.renderChatNameCaption()}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messages,
    waitingMessages: state.messagesWaitingList,
    currentChat: state.currentChat,
    currentUser: state.currentUser,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMessagesList: (chatId, oldestMessageTime) =>
      dispatch(fetchMessagesList(chatId, oldestMessageTime)),
    fetchNewMessages: (chatId, newestMessageTime) =>
      dispatch(fetchNewMessages(chatId, newestMessageTime)),
    subscribeForNewMessages: chatId =>
      dispatch(subscribeForNewMessages(chatId)),
    unsubscribeForNewMessages: () => dispatch(unsubscribeForNewMessages()),
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
