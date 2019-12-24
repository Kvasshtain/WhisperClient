import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { fetchMessagesList } from '../actions/messageListActions';

class MessageList extends React.Component {

    componentDidMount() {
        this.props.fetchMessagesList()
    }

    renderMessageList = () => {
        const {messages} = this.props;

        if (messages && messages.length) {
            return messages.map(function (item, index) {
                return (
                    <p key = {index}>{item.message}</p>
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

const mapDispatchToProps = (dispatch) => {
    return {
        fetchMessagesList: () => dispatch(fetchMessagesList())
    };
  };

MessageList.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.string.isRequired)
}

export {MessageList}
export default connect(mapStateToProps, mapDispatchToProps)(MessageList);