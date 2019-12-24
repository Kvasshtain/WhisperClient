import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import configureStore from 'redux-mock-store'

import { MessageList } from './MessageList'
import ConnectedMessageList from './MessageList'

describe('MessageList', () => {
    const mockMessages = ['test message']
    let testedComponent

    beforeEach(() => {
        testedComponent = shallow(<MessageList messages={mockMessages} />)
    })

    it('should render correctly', () => {

        expect(shallowToJson(testedComponent)).toMatchSnapshot();
    })

})

// describe('ConnectedMessageList', () => {
//     const initialState = { messages: ['test message'] }
//     const mockStore = configureStore()
//     let store, testedComponent

//     beforeEach(() => {
//         store = mockStore(initialState);
//         testedComponent = shallow(<ConnectedMessageList store = {store} />)
//     })

//     it('should render correctly', () => {

//         expect(shallowToJson(testedComponent)).toMatchSnapshot();
//     })

// })
