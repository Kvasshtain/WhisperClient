import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json';

import { NewMessageInput } from './NewMessageInput'

describe('NewMessageInput', () => {
    const mockOnSubmitNewMessage = jest.fn()

    it ('should render correctly', () => {
        const testedComponent = shallow(<NewMessageInput 
            onSubmitNewMessage = { mockOnSubmitNewMessage }
        />)

        expect(shallowToJson(testedComponent)).toMatchSnapshot();
      })

})

describe('when typing new message', () => {
    const mockOnSubmitNewMessage = jest.fn()
    const newTestMessage = 'Some new message'

    const testedComponent = shallow(<NewMessageInput
        onSubmitNewMessage = { mockOnSubmitNewMessage }
    />)

    beforeEach(() => {
        testedComponent.find('input').simulate('change', {
            target: {
                value : newTestMessage,
            }
        })
    })

    it('updates inputValue field in state', () => {
        expect(testedComponent.state().newMessage).toEqual(newTestMessage);
    })

})

describe('when push the button', () => {
    const mockOnSubmitNewMessage = jest.fn()

    const myComponent = shallow(<NewMessageInput
        onSubmitNewMessage={mockOnSubmitNewMessage}
    />)

    beforeEach(() => {
        myComponent.find('form').simulate('submit', {
            preventDefault: () => { },
        })
    })

    it('calls the props.onSubmit', () => {
        expect(mockOnSubmitNewMessage).toHaveBeenCalledTimes(1);
    })

})