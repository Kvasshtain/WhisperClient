import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json';

import { MessageTimestamp } from './MessageTimestamp'

describe('NewMessageInput', () => {
    const mockTime = "2019-12-25T17:02:10.480Z";

    it ('should render correctly', () => {
        const testedComponent = shallow(<MessageTimestamp 
            time = { mockTime }
        />)

        expect(shallowToJson(testedComponent)).toMatchSnapshot();
      })

})