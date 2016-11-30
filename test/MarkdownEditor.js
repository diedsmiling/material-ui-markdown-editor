import React from 'react'
import test from 'ava'
import { shallow } from 'enzyme'
import Markdown from '../src/MarkdownEditor/MarkdownEditor'
import ToolbarPanel from '../src/MarkdownEditor/ToolbarPanel/ToolbarPanel'

test('Should render Toolbar', (t) => {
  const wrapper = shallow(<Markdown />)
  t.true(wrapper.contains(<ToolbarPanel />))
})
