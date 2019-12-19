import React from 'react'
import {shallow} from 'enzyme'
import {shallowToJson} from 'enzyme-to-json';

import {NewMessageInput} from './NewMessageInput'

describe('NewMessageInput', () => {
    const mockOnSubmitNewMessage = jest.fn()

    it ('should render correctly', () => {
        const myComponent = shallow(<NewMessageInput 
            onSubmitNewMessage = {mockOnSubmitNewMessage}
        />)

        expect(shallowToJson(myComponent)).toMatchSnapshot();
      })

})

describe('when typing new message', () => {
    const mockOnSubmitNewMessage = jest.fn()
    const newTestMessage = 'Some new message'

    const myComponent = shallow(<NewMessageInput
        onSubmitNewMessage={mockOnSubmitNewMessage}
    />)

    beforeEach(() => {
        myComponent.find('input').simulate('change', {
            target: {
                value : newTestMessage,
            }
        })
    })

    it('updates inputValue field in state', () => {
        expect(myComponent.state().inputValue).toEqual(newTestMessage);
    })

})

describe('when push the button', () => {
    const mockOnSubmitNewMessage = jest.fn()

    const myComponent = shallow(<NewMessageInput
        onSubmitNewMessage={mockOnSubmitNewMessage}
    />)

    beforeEach(() => {
        myComponent.find('button').simulate('click', {
            preventDefault: () => { },
        })
    })

    it('calls the props.onSubmit', () => {
        expect(mockOnSubmitNewMessage).toHaveBeenCalledTimes(1);
    })

})