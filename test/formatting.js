import React from 'react'
import test from 'ava'
import CM from 'codemirror'
import { mount } from 'enzyme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Markdown from '../src/MarkdownEditor/MarkdownEditor'
import { getCurrentFormat } from '../src/MarkdownEditor/formatting'

let wrapper
let cm
test.beforeEach(() => {
  wrapper = mount(<Markdown />, {
    context: {
      muiTheme: getMuiTheme()
    },
    childContextTypes: {
      muiTheme: React.PropTypes.object.isRequired
    }
  })
  cm = wrapper.state().cm
})

test('Should recognise current format and provide it in a form of array', (t) => {
  const format = getCurrentFormat(cm)
  t.true(Array.isArray(format))
})

test('Should recognise format', (t) => {
  cm.codeMirror.setValue('** Foo **')
  t.deepEqual(getCurrentFormat(cm), ['strong'])
})

test('Should return empty array if no format is recognised', (t) => {
  cm.codeMirror.setValue('** Foo ** bar')
  cm.codeMirror.setCursor({ line: 0, ch: 11 })
  t.deepEqual(getCurrentFormat(cm), [])
})

test('Should recognise "ul" format', (t) => {
  const list = `- foo \n- bar`
  cm.codeMirror.setValue(list)
  CM.signal(cm.codeMirror, 'change', cm.codeMirror, { origin: '+input' })
  t.deepEqual(getCurrentFormat(cm), ['ul'])
})

test('Should recognise "ol" format', (t) => {
  const list = `1. foo \n2. bar`
  cm.codeMirror.setValue(list)
  CM.signal(cm.codeMirror, 'change', cm.codeMirror, { origin: '+input' })
  t.deepEqual(getCurrentFormat(cm), ['ol'])
})
