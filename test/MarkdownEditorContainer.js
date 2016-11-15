import React from 'react'
import test from 'ava' // eslint-disable-line
import { shallow } from 'enzyme' // eslint-disable-line
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MarkdownEditorContainer from '../src/MarkdownEditor/MarkdownEditorContainer'
import MarkdownEditor from '../src/MarkdownEditor/MarkdownEditor'

test('Should contain MarkdownEditor component ', (t) => {
  const wrapper = shallow(<MarkdownEditorContainer />)
  t.true(wrapper.contains(<MarkdownEditor />))
})

test('Should wrap in MuiThemeProvider if corespinding prop is passed', (t) => {
  const wrapper = shallow(<MarkdownEditorContainer wrapInTheme />)
  t.true(wrapper.containsMatchingElement(
    <MuiThemeProvider>
      <MarkdownEditor />
    </MuiThemeProvider>
  ))
})
