import React from 'react'
import test from 'ava'
import codeMirror from 'codemirror'
import Codemirror from 'react-codemirror'

import { mount } from 'enzyme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Markdown from '../src/MarkdownEditor/MarkdownEditor'
import ToolbarPanel from '../src/MarkdownEditor/ToolbarPanel/ToolbarPanel'

let wrapper

test.beforeEach(() => {
  wrapper = mount(<Markdown />, {
    context: {
      muiTheme: getMuiTheme()
    },
    childContextTypes: {
      muiTheme: React.PropTypes.object.isRequired
    }
  })
})

test('Should render Toolbar component', t =>
  t.true(wrapper.containsMatchingElement(<ToolbarPanel />))
)

test('Should render Codemirror component', t =>
  t.true(wrapper.containsMatchingElement(<Codemirror />))
)

test('Should add an instance of codeMirror to the state', t =>
  t.true(wrapper.state().cm.codeMirror instanceof codeMirror)
)

test('Should update state on textarea change', (t) => {
  const changeObject = {
    origin: '+input'
  }
  const cm = wrapper.state().cm.codeMirror
  cm.setValue('test')
  codeMirror.signal(cm, 'change', cm, changeObject)
  t.is(wrapper.state().code, 'test')
})
