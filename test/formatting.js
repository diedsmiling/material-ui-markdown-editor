import React from 'react'
import test from 'ava'
import CM from 'codemirror'
import { mount } from 'enzyme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Markdown from '../src/MarkdownEditor/MarkdownEditor'
import {
  getCurrentFormat,
  formatBold,
  removeBold
} from '../src/MarkdownEditor/formatting'

let wrapper
let cm
let codeMirror

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
  codeMirror = cm.codeMirror
})

test('Should recognise current format and provide it in a form of array', (t) => {
  const format = getCurrentFormat(cm)
  t.true(Array.isArray(format))
})

test('Should recognise format', (t) => {
  codeMirror.setValue('** Foo **')
  t.deepEqual(getCurrentFormat(cm), ['strong'])
})

test('Should return empty array if no format is recognised', (t) => {
  codeMirror.setValue('** Foo ** bar')
  codeMirror.setCursor({ line: 0, ch: 11 })
  t.deepEqual(getCurrentFormat(cm), [])
})

test('Should recognise "ul" format', (t) => {
  const list = `- foo \n- bar`
  codeMirror.setValue(list)
  CM.signal(codeMirror, 'change', codeMirror, { origin: '+input' })
  t.deepEqual(getCurrentFormat(cm), ['ul'])
})

test('Should recognise "ol" format', (t) => {
  const list = `1. foo \n2. bar`
  codeMirror.setValue(list)
  CM.signal(codeMirror, 'change', codeMirror, { origin: '+input' })
  t.deepEqual(getCurrentFormat(cm), ['ol'])
})

test('Bold formatting should insert a placeholder when nothing is selected', (t) => {
  codeMirror.setValue('')
  CM.signal(codeMirror, 'change', codeMirror, { origin: '+input' })
  formatBold(cm)()
  t.is(wrapper.state().code, '**Strong text**')
})

test('Bold formatting should wrap selection in "** **"', (t) => {
  codeMirror.setValue('Foo bar')
  CM.signal(codeMirror, 'change', codeMirror, { origin: '+input' })
  codeMirror.setSelection({ line: 0, ch: 4 }, { line: 0, ch: 7 })
  formatBold(cm)()
  t.is(wrapper.state().code, 'Foo **bar**')
})

test('Bold "unformatting" should unwrap selection from "**"', (t) => {
  codeMirror.setValue('Foo **bar** **baz**')
  CM.signal(codeMirror, 'change', codeMirror, { origin: '+input' })
  codeMirror.setSelection({ line: 0, ch: 6 }, { line: 0, ch: 9 })
  removeBold(cm)()
  t.is(wrapper.state().code, 'Foo bar **baz**')
})

test('Bold "unformatting" should unwrap without selection from "**"', (t) => {
  codeMirror.setValue('Foo **bar** **baz**')
  CM.signal(codeMirror, 'change', codeMirror, { origin: '+input' })
  codeMirror.setCursor({ line: 0, ch: 8 })
  removeBold(cm)()
  t.is(wrapper.state().code, 'Foo bar **baz**')
})

test('Bold "unformatting" should unwrap without selection from "**" on left border', (t) => {
  codeMirror.setValue('Foo **bar** **baz**')
  CM.signal(codeMirror, 'change', codeMirror, { origin: '+input' })
  codeMirror.setCursor({ line: 0, ch: 5 })
  removeBold(cm)()
  t.is(wrapper.state().code, 'Foo bar **baz**')
})


test('Bold "unformatting" should unwrap without selection from "**" on right border', (t) => {
  codeMirror.setValue('Foo **bar** **baz**')
  CM.signal(codeMirror, 'change', codeMirror, { origin: '+input' })
  codeMirror.setCursor({ line: 0, ch: 10 })
  removeBold(cm)()
  t.is(wrapper.state().code, 'Foo bar **baz**')
})
