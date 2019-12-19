import React from 'react'
import {shallow} from 'enzyme'
import { shallowToJson } from 'enzyme-to-json';

import {MessageList} from './MessageList'

describe('MessageList', () => {
    const mockMessages = ['test message']
    
    it ('should render correctly', () => {
        const myComponent = shallow(<MessageList 
            messages = {mockMessages}
        />)

        expect(shallowToJson(myComponent)).toMatchSnapshot();
      })
    
  })
