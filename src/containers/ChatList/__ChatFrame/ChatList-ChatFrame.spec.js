import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'

import { ChatFrame } from './ChatList-ChatFrame'

describe('ChatFrame', () => {
  const mockChat = {
    _id: '0',
    name: 'captains log',
    users: [
      {
        _id: '0',
        email: 'nemo@captain.com',
        name: 'captain Nemo',
      },
    ],
  }

  const mockChangeCurrentChat = jest.fn()

  it('should render correctly', () => {
    const testedComponent = shallow(
      <ChatFrame onSelectChat={mockChangeCurrentChat} chat={mockChat} />
    )

    expect(shallowToJson(testedComponent)).toMatchSnapshot()
  })
})

describe('when push the chat for selection', () => {
  const mockChat = {
    _id: '0',
    name: 'captains log',
    users: [
      {
        _id: '0',
        email: 'nemo@captain.com',
        name: 'captain Nemo',
      },
    ],
  }

  const mockMockChangeCurrentChat = jest.fn()

  const myComponent = shallow(
    <ChatFrame onSelectChat={mockMockChangeCurrentChat} chat={mockChat} />
  )

  beforeEach(() => {
    myComponent
      .find('div')
      .first()
      .simulate('click')
  })

  it('calls the props.onSubmit', () => {
    expect(mockMockChangeCurrentChat).toHaveBeenCalledTimes(1)
  })
})
