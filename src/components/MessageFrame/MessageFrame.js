import React from 'react'
import PropTypes from 'prop-types'
import { MessageTimestamp } from './__MessageTimestamp/MessageFrame-MessageTimestamp'
import { AuthorNameLabel } from './__AuthorNameLabel/MessageFrame-AuthorNameLabel'
import { MessageTextField } from './__MessageTextField/MessageFrame-MessageTextField'

import './MessageFrame.sass'
import './_user/MessageFrame_user_another.sass'
import './_user/MessageFrame_user_current.sass'
import '../RotatingImage/_RotatingImage.sass'

import waitingIcon from '../../resources/BlueWaitingIcon.png'

class MessageFrame extends React.Component {
  renderAuthorName = () => {
    const { message, currentUserEmail } = this.props

    if (currentUserEmail === message.authorEmail) {
      return
    } else {
      return <AuthorNameLabel authorName={message.authorName} />
    }
  }

  renderMessageStatus() {
    const { hasServerReceivedMessage } = this.props

    if (!hasServerReceivedMessage) {
      return <div className="messageStatus">
        <img className="RotatingImage" src={waitingIcon}></img>
      </div>
    }
  }

  render() {
    const { message, currentUserEmail } = this.props
    let messageFrameClass = 'messageFrame'

    if (currentUserEmail === message.authorEmail) {
      messageFrameClass += ' messageFrame_user_current'
    } else {
      messageFrameClass += ' messageFrame_user_another'
    }

    return (
      <div className={messageFrameClass}>
        <div>
          {this.renderMessageStatus()}
        </div>
        <div>
          <div>{this.renderAuthorName()}</div>
          <div>
            <MessageTextField text={message.text} />
          </div>
          <div>
            <MessageTimestamp time={message.time} />
          </div>
        </div>
      </div>
    )
  }
}

MessageFrame.propTypes = {
  message: PropTypes.exact({
    _id: PropTypes.string,
    clientSideId: PropTypes.string,
    chatId: PropTypes.string.isRequired,
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
  currentUserEmail: PropTypes.string,
  hasServerReceivedMessage: PropTypes.bool,
}

export { MessageFrame }
