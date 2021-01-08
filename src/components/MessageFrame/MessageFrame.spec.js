import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'

import { MessageFrame } from './MessageFrame'

describe('MessageFrame', () => {
  const mockMessage = {
    _id: '0',
    chatId: '0',
    authorName: 'captain Nemo',
    authorEmail: 'nemo@mail.ru',
    time: '2019-12-25T16:40:12.526Z',
    text: 'some message',
    wasMessageReceived: true,
  }

  it('should render correctly', () => {
    const testComponent = shallow(<MessageFrame message={mockMessage} />)

    expect(shallowToJson(testComponent)).toMatchSnapshot()
  })
})
