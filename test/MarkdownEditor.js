import React from 'react'
import test from 'ava'
import CM from 'codemirror'
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

test('Should render <Codemirror /> component', t =>
  t.true(wrapper.containsMatchingElement(<Codemirror />))
)

test('Should add CodeMirror reference to the state', t =>
  t.true(wrapper.state().cm.codeMirror instanceof CM)
)

test('Should update state on CodeMirror change', (t) => {
  const { codeMirror } = wrapper.state().cm
  codeMirror.setValue('foo bar')
  CM.signal(codeMirror, 'change', codeMirror, { origin: '+input' })
  t.is(wrapper.state().code, 'foo bar')
})

test('Should set CodeMirror mode as "markdown" and lineNumbers opion', (t) => {
  const { options } = wrapper.state().cm.codeMirror
  t.is(options.mode, 'markdown')
  t.true(options.lineNumbers)
})

test('Should set token on cursor activity', (t) => {
  const { codeMirror } = wrapper.state().cm
  t.deepEqual(wrapper.state().tokens, [])

  codeMirror.setValue('** foo **')
  CM.signal(codeMirror, 'change', codeMirror, { origin: '+input' })
  CM.signal(codeMirror, 'cursorActivity', codeMirror, {})
  t.deepEqual(wrapper.state().tokens, ['strong'])
})
