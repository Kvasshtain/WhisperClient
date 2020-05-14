import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'

import { SimpleDataForm } from './SimpleDataForm'

describe('SimpleDataForm', () => {
  const mockOnSubmitNewData = jest.fn()

  it('should render correctly', () => {
    const testedComponent = shallow(
      <SimpleDataForm
        onSubmitNewData={mockOnSubmitNewData}
        u
        name="userMessage"
        type="text"
      />
    )

    expect(shallowToJson(testedComponent)).toMatchSnapshot()
  })
})

describe('when typing new message', () => {
  const mockOnSubmitNewData = jest.fn()
  const newTestData = 'Some new message'

  const testedComponent = shallow(
    <SimpleDataForm
      onSubmitNewData={mockOnSubmitNewData}
      name="userMessage"
      type="text"
    />
  )

  beforeEach(() => {
    testedComponent.find('input').simulate('change', {
      target: {
        value: newTestData,
      },
    })
  })

  it('updates inputValue field in state', () => {
    expect(testedComponent.state().newData).toEqual(newTestData)
  })
})

describe('when push the button', () => {
  const mockOnSubmitNewData = jest.fn()

  const myComponent = shallow(
    <SimpleDataForm
      onSubmitNewData={mockOnSubmitNewData}
      name="userMessage"
      type="text"
    />
  )

  beforeEach(() => {
    myComponent.find('form').simulate('submit', {
      preventDefault: () => {},
    })
  })

  it('calls the props.onSubmit', () => {
    expect(mockOnSubmitNewData).toHaveBeenCalledTimes(1)
  })
})
