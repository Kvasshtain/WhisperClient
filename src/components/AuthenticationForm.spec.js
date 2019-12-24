import React from 'react'
import {shallow} from 'enzyme'
import {shallowToJson} from 'enzyme-to-json';

import {AuthenticationForm} from './AuthenticationForm'

describe('NewMessageInput', () => {
    const mockOnSubmit = jest.fn()

    it ('should render correctly', () => {
        const testedComponent = shallow(<AuthenticationForm 
            onSubmit = {mockOnSubmit}
        />)

        expect(shallowToJson(testedComponent)).toMatchSnapshot();
      })

})

describe('when typing name', () => {
    const mockOnSubmit = jest.fn()
    const newTestUserName = 'Capitan Nemo'

    const myComponent = shallow(<AuthenticationForm
        onSubmit = {mockOnSubmit}
    />)

    beforeEach(() => {
        myComponent.find('[name="userName"]').simulate('change', {
            target: {
                value : newTestUserName,
            }
        })
    })

    it('updates inputValue field in state', () => {
        expect(myComponent.state().userName).toEqual(newTestUserName);
    })

})

describe('when typing name', () => {
    const mockOnSubmit = jest.fn()
    const newTestUserPassword = 'root'

    const myComponent = shallow(<AuthenticationForm
        onSubmit = {mockOnSubmit}
    />)

    beforeEach(() => {
        myComponent.find('[name="userPassword"]').simulate('change', {
            target: {
                value : newTestUserPassword,
            }
        })
    })

    it('updates inputValue field in state', () => {
        expect(myComponent.state().userPassword).toEqual(newTestUserPassword);
    })

})

describe('when push the button', () => {
    const mockOnSubmit = jest.fn()

    const myComponent = shallow(<AuthenticationForm
        onSubmit = {mockOnSubmit}
    />)

    beforeEach(() => {
        myComponent.find('button').simulate('click', {
            preventDefault: () => { },
        })
    })

    it('calls the props.onSubmit', () => {
        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    })

})