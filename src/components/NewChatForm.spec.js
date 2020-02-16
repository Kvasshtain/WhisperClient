import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'

import { NewChatForm } from './NewChatForm'

describe('NewChatForm', () => {
  const mockCurrentUserId = '0'
  const mockOnSubmit = jest.fn()

  it('should render correctly', () => {
    const testedComponent = shallow(
      <NewChatForm
        onSubmitNewChat={mockOnSubmit}
        currentUserId={mockCurrentUserId}
      />
    )

    expect(shallowToJson(testedComponent)).toMatchSnapshot()
  })
})

describe('when typing chat name', () => {
  const mockCurrentUserId = '0'
  const mockOnSubmit = jest.fn()
  const newTestChatName = 'Capitan Nemo Chat'

  const myComponent = shallow(
    <NewChatForm
      onSubmitNewChat={mockOnSubmit}
      currentUserId={mockCurrentUserId}
    />
  )

  beforeEach(() => {
    myComponent.find('[name="chatName"]').simulate('change', {
      target: {
        value: newTestChatName,
      },
    })
  })

  it('updates inputValue field in state', () => {
    expect(myComponent.state().name).toEqual(newTestChatName)
  })
})

describe('when push the button', () => {
  const mockCurrentUserId = '0'
  const mockOnSubmit = jest.fn()

  const myComponent = shallow(
    <NewChatForm
      onSubmitNewChat={mockOnSubmit}
      currentUserId={mockCurrentUserId}
    />
  )

  beforeEach(() => {
    myComponent.find('form').simulate('submit', {
      preventDefault: () => {},
    })
  })

  it('calls the props.onSubmit', () => {
    expect(mockOnSubmit).toHaveBeenCalledTimes(1)
  })
})
