import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json';

import { MessageFrame } from './MessageFrame'

describe('MessageFrame', () => {
    const mockMessage = 'test message'
    const mockIndex = 100500

    it ('should render correctly', () => {
        const testComponent = shallow(<MessageFrame 
            index = { mockIndex }
            message = { mockMessage }
        />)

        expect(shallowToJson(testComponent)).toMatchSnapshot();
      })

})