import React from 'react'
import test from 'ava'
import { shallow } from 'enzyme'
import Markdown from '../src/MarkdownEditor/MarkdownEditor'
import Toolbar from '../src/MarkdownEditor/ToolbarPanel/ToolbarPanel'

test('Should render Toolbaer', (t) => {
  const wrapper = shallow(<Markdown />)
  t.true(wrapper.contains(<Toolbar />))
})
