import React from 'react'
import test from 'ava' // eslint-disable-line
import { shallow } from 'enzyme' // eslint-disable-line
import MarkdownEditorContainer from '../src/MarkdownEditor'

test('Foo', (t) => {
  const wrapper = shallow(<MarkdownEditorContainer />)
  console.log(wrapper.debug())
  t.pass()
})
