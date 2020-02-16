import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'

import { AuthenticationForm } from './AuthenticationForm'

describe('AuthenticationForm', () => {
  const mockOnSubmit = jest.fn()

  it('should render correctly', () => {
    const testedComponent = shallow(
      <AuthenticationForm onSubmit={mockOnSubmit} />
    )

    expect(shallowToJson(testedComponent)).toMatchSnapshot()
  })
})

describe('when typing name', () => {
  const mockOnSubmit = jest.fn()
  const newTestUserEmail = 'capitan-nemo@google.com'

  const myComponent = shallow(<AuthenticationForm onSubmit={mockOnSubmit} />)

  beforeEach(() => {
    myComponent.find('[name="userEmail"]').simulate('change', {
      target: {
        value: newTestUserEmail,
      },
    })
  })

  it('updates inputValue field in state', () => {
    expect(myComponent.state().email).toEqual(newTestUserEmail)
  })
})

describe('when typing email', () => {
  const mockOnSubmit = jest.fn()
  const newTestUserPassword = 'root'

  const myComponent = shallow(<AuthenticationForm onSubmit={mockOnSubmit} />)

  beforeEach(() => {
    myComponent.find('[name="userPassword"]').simulate('change', {
      target: {
        value: newTestUserPassword,
      },
    })
  })

  it('updates inputValue field in state', () => {
    expect(myComponent.state().password).toEqual(newTestUserPassword)
  })
})

describe('when push the button', () => {
  const mockOnSubmit = jest.fn()

  const myComponent = shallow(<AuthenticationForm onSubmit={mockOnSubmit} />)

  beforeEach(() => {
    myComponent.find('form').simulate('submit', {
      preventDefault: () => {},
    })
  })

  it('calls the props.onSubmit', () => {
    expect(mockOnSubmit).toHaveBeenCalledTimes(1)
  })
})
