import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import configureStore from 'redux-mock-store'

import { MessageList } from './MessageList'
import ConnectedMessageList from './MessageList'

describe('MessageList', () => {
  const mockMessages = [
    {
      _id: '0',
      chatId: '0',
      authorName: 'captain Nemo',
      authorEmail: 'nemo@mail.com',
      time: '2019-12-25T16:40:12.526Z',
      text: 'some message',
      wasMessageReceived: true,
    },
  ]
  const mockFetchMessagesList = jest.fn()
  const mockCurrentUser = {
    _id: '0',
    name: 'captain Nemo',
    email: 'nemo@mail.com',
  }
  const mockCurrentChat = {
    _id: '0',
    name: 'chat1',
    users: [],
  }
  const mockSubscribeForNewMessages = jest.fn()
  let testedComponent

  beforeEach(() => {
    testedComponent = shallow(
      <MessageList
        messages={mockMessages}
        fetchMessagesList={mockFetchMessagesList}
        currentUser={mockCurrentUser}
        currentChat={mockCurrentChat}
        subscribeForNewMessages={mockSubscribeForNewMessages}
      />
    )
  })

  it('should render correctly', () => {
    expect(shallowToJson(testedComponent)).toMatchSnapshot()
  })
})
