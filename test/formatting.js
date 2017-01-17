import React from 'react'
import test from 'ava'
import CM from 'codemirror'
import { mount } from 'enzyme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Markdown from '../src/MarkdownEditor/MarkdownEditor'
import {
  getCurrentFormat,
  setBold,
  setItalic,
  removeBold,
  removeItalic,
  setUl,
  removeUl,
  setOl,
  removeOl,
  setH1,
  removeH1,
  setH2,
  removeH2
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

/* Format recognising */

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
  const list = '- foo \n- bar'
  codeMirror.setValue(list)
  CM.signal(codeMirror, 'change', codeMirror, { origin: '+input' })
  t.deepEqual(getCurrentFormat(cm), ['ul'])
})

test('Should recognise "ol" format', (t) => {
  const list = '1. foo \n2. bar'
  codeMirror.setValue(list)
  CM.signal(codeMirror, 'change', codeMirror, { origin: '+input' })
  t.deepEqual(getCurrentFormat(cm), ['ol'])
})

/* Bold fomatting */

test('setBold should return a function', t =>
  t.is(typeof setBold(cm), 'function')
)

test('removeBold should return a function', t =>
  t.is(typeof removeBold(cm), 'function')
)

test('Bold formatting should insert a placeholder when nothing is selected', (t) => {
  codeMirror.setValue('')
  CM.signal(codeMirror, 'change', codeMirror, { origin: '+input' })
  setBold(cm)()
  t.is(wrapper.state().code, '**Strong text**')
})

test('Bold formatting should wrap selection in "** **"', (t) => {
  codeMirror.setValue('Foo bar')
  CM.signal(codeMirror, 'change', codeMirror, { origin: '+input' })
  codeMirror.setSelection({ line: 0, ch: 4 }, { line: 0, ch: 7 })
  setBold(cm)()
  t.is(wrapper.state().code, 'Foo **bar**')
})

test('Bold formatting should select placeholder when it is invoked', (t) => {
  codeMirror.setValue('')
  CM.signal(codeMirror, 'change', codeMirror, { origin: '+input' })
  setBold(cm)()
  t.is(codeMirror.getSelection(), 'Strong text')
})

test('Bold formatting should keep selection', (t) => {
  codeMirror.setValue('Foo bar')
  CM.signal(codeMirror, 'change', codeMirror, { origin: '+input' })
  codeMirror.setSelection({ line: 0, ch: 4 }, { line: 0, ch: 7 })
  setBold(cm)()
  t.is(codeMirror.getSelection(), 'bar')
})

test('Bold "cancellation" should unwrap selection from "**"', (t) => {
  codeMirror.setValue('Foo **bar** **baz**')
  CM.signal(codeMirror, 'change', codeMirror, { origin: '+input' })
  codeMirror.setSelection({ line: 0, ch: 6 }, { line: 0, ch: 9 })
  removeBold(cm)()
  t.is(wrapper.state().code, 'Foo bar **baz**')
})

test('Bold "cancellation" should unwrap without selection from "**"', (t) => {
  codeMirror.setValue('Foo **bar** **baz**')
  CM.signal(codeMirror, 'change', codeMirror, { origin: '+input' })
  codeMirror.setCursor({ line: 0, ch: 8 })
  removeBold(cm)()
  t.is(wrapper.state().code, 'Foo bar **baz**')
})

test('Bold "cancellation" should unwrap without selection from "**" on left border', (t) => {
  codeMirror.setValue('Foo **bar** **baz**')
  CM.signal(codeMirror, 'change', codeMirror, { origin: '+input' })
  codeMirror.setCursor({ line: 0, ch: 5 })
  removeBold(cm)()
  t.is(wrapper.state().code, 'Foo bar **baz**')
})

test('Bold "cancellation" should unwrap without selection from "**" on right border', (t) => {
  codeMirror.setValue('Foo **bar** **baz**')
  CM.signal(codeMirror, 'change', codeMirror, { origin: '+input' })
  codeMirror.setCursor({ line: 0, ch: 10 })
  removeBold(cm)()
  t.is(wrapper.state().code, 'Foo bar **baz**')
})

/* Italic fomatting */

test('setItalic should return a function', t =>
  t.is(typeof setItalic(cm), 'function')
)

test('removeItalic should return a function', t =>
  t.is(typeof removeItalic(cm), 'function')
)

test('Italic formatting should insert a placeholder when nothing is selected', (t) => {
  codeMirror.setValue('')
  CM.signal(codeMirror, 'change', codeMirror, { origin: '+input' })
  setItalic(cm)()
  t.is(wrapper.state().code, '*Emphasized text*')
})

test('Italic formatting should wrap selection in "* *"', (t) => {
  codeMirror.setValue('Foo bar')
  CM.signal(codeMirror, 'change', codeMirror, { origin: '+input' })
  codeMirror.setSelection({ line: 0, ch: 4 }, { line: 0, ch: 7 })
  setItalic(cm)()
  t.is(wrapper.state().code, 'Foo *bar*')
})

test('Italic formatting should select placeholder when it is invoked', (t) => {
  codeMirror.setValue('')
  CM.signal(codeMirror, 'change', codeMirror, { origin: '+input' })
  setItalic(cm)()
  t.is(codeMirror.getSelection(), 'Emphasized text')
})

test('Italic formatting should keep selection', (t) => {
  codeMirror.setValue('Foo bar')
  CM.signal(codeMirror, 'change', codeMirror, { origin: '+input' })
  codeMirror.setSelection({ line: 0, ch: 4 }, { line: 0, ch: 7 })
  setItalic(cm)()
  t.is(codeMirror.getSelection(), 'bar')
})

test('Italic "cancellation" should unwrap selection from "*"', (t) => {
  codeMirror.setValue('Foo *bar* *baz*')
  CM.signal(codeMirror, 'change', codeMirror, { origin: '+input' })
  codeMirror.setSelection({ line: 0, ch: 5 }, { line: 0, ch: 8 })
  removeItalic(cm)()
  t.is(wrapper.state().code, 'Foo bar *baz*')
})

test('Italic "cancellation" should unwrap without selection from "*"', (t) => {
  codeMirror.setValue('Foo *bar* *baz*')
  CM.signal(codeMirror, 'change', codeMirror, { origin: '+input' })
  codeMirror.setCursor({ line: 0, ch: 6 })
  removeItalic(cm)()
  t.is(wrapper.state().code, 'Foo bar *baz*')
})

/* Nesting fomatting */

test('Should correctly unformat nesting strings', (t) => {
  codeMirror.setValue('***Strong text***')
  CM.signal(codeMirror, 'change', codeMirror, { origin: '+input' })
  codeMirror.setCursor({ line: 0, ch: 6 })
  CM.signal(codeMirror, 'cursorActivity', codeMirror, {})
  removeItalic(cm)()
  t.is(wrapper.state().code, '**Strong text**')
})

/* Ul fomatting */

test('setUl should return a function', t =>
  t.is(typeof setUl(cm), 'function')
)

test('removeUl should return a function', t =>
  t.is(typeof removeUl(cm), 'function')
)

test('Ul fomratting should add "- " to every selected line', (t) => {
  codeMirror.setValue('foo\nbar')
  CM.signal(codeMirror, 'change', codeMirror, { origin: '+input' })
  codeMirror.setSelection({ line: 0, ch: 0 }, { line: 1, ch: 3 })
  setUl(cm)()
  t.is(wrapper.state().code, '- foo\n- bar')
})

test('Ul formatting should select all the lines after formatting', (t) => {
  codeMirror.setValue('foo\nbar')
  CM.signal(codeMirror, 'change', codeMirror, { origin: '+input' })
  codeMirror.setSelection({ line: 0, ch: 0 }, { line: 1, ch: 3 })
  setUl(cm)()
  t.is(codeMirror.getSelection(), '- foo\n- bar')
})

test('Ul formatting should add "- " to the current line when nothing is selected', (t) => {
  codeMirror.setValue('foo')
  CM.signal(codeMirror, 'change', codeMirror, { origin: '+input' })
  setUl(cm)()
  t.is(wrapper.state().code, '- foo')
})

test('Ul formatting should select current line after one line formatting', (t) => {
  codeMirror.setValue('foo')
  CM.signal(codeMirror, 'change', codeMirror, { origin: '+input' })
  setUl(cm)()
  t.is(codeMirror.getSelection(), '- foo')
})

test('Ul cancellation should remove  "- " from each selected line', (t) => {
  codeMirror.setValue('- foo\n- bar')
  CM.signal(codeMirror, 'change', codeMirror, { origin: '+input' })
  codeMirror.setSelection({ line: 0, ch: 0 }, { line: 1, ch: 5 })
  removeUl(cm)()
  t.is(wrapper.state().code, 'foo\nbar')
})

test('Ul cancellation should remove "- " from current line if nothing is selected', (t) => {
  codeMirror.setValue('- foo\n- bar')
  CM.signal(codeMirror, 'change', codeMirror, { origin: '+input' })
  removeUl(cm)()
  t.is(wrapper.state().code, 'foo\n- bar')
})

test('Ul cancellation should select affected lines after being executed', (t) => {
  codeMirror.setValue('- foo\n- bar')
  CM.signal(codeMirror, 'change', codeMirror, { origin: '+input' })
  codeMirror.setSelection({ line: 0, ch: 0 }, { line: 1, ch: 5 })
  removeUl(cm)()
  t.is(codeMirror.getSelection(), 'foo\nbar')
})

/* Ol fomatting */

test('setOl should return a function', t =>
  t.is(typeof setOl(cm), 'function')
)

test('removeOl should return a function', t =>
  t.is(typeof removeOl(cm), 'function')
)

test('Ol fomratting should add a numeric index in front of every selected line', (t) => {
  codeMirror.setValue('foo\nbar\nbaz')
  CM.signal(codeMirror, 'change', codeMirror, { origin: '+input' })
  codeMirror.setSelection({ line: 1, ch: 0 }, { line: 2, ch: 3 })
  setOl(cm)()
  t.is(wrapper.state().code, 'foo\n1. bar\n2. baz')
})

test('Ol formattings should select all changed the lines after formatting', (t) => {
  codeMirror.setValue('foo\nbar')
  CM.signal(codeMirror, 'change', codeMirror, { origin: '+input' })
  codeMirror.setSelection({ line: 0, ch: 0 }, { line: 1, ch: 3 })
  setOl(cm)()
  t.is(codeMirror.getSelection(), '1. foo\n2. bar')
})

test('Ol formatting should add "1. " to the current line when nothing is selected', (t) => {
  codeMirror.setValue('foo')
  CM.signal(codeMirror, 'change', codeMirror, { origin: '+input' })
  setOl(cm)()
  t.is(wrapper.state().code, '1. foo')
})

test('Ol formatting should select current line after one line formatting', (t) => {
  codeMirror.setValue('foo')
  CM.signal(codeMirror, 'change', codeMirror, { origin: '+input' })
  setOl(cm)()
  t.is(codeMirror.getSelection(), '1. foo')
})

test('Ol cancellation should remove numeric index from each selected line', (t) => {
  codeMirror.setValue('9. foo\n10. bar')
  CM.signal(codeMirror, 'change', codeMirror, { origin: '+input' })
  codeMirror.setSelection({ line: 0, ch: 0 }, { line: 1, ch: 5 })
  removeOl(cm)()
  t.is(wrapper.state().code, 'foo\nbar')
})

test('Ol cancellation should remove numeric index  from current line if nothing is selected', (t) => {
  codeMirror.setValue('10. foo\n bar')
  CM.signal(codeMirror, 'change', codeMirror, { origin: '+input' })
  removeOl(cm)()
  t.is(wrapper.state().code, 'foo\n bar')
})

test('Ol cancellation should select affected lines after being executed', (t) => {
  codeMirror.setValue('9. foo\n10. bar')
  CM.signal(codeMirror, 'change', codeMirror, { origin: '+input' })
  codeMirror.setSelection({ line: 0, ch: 0 }, { line: 1, ch: 7 })
  removeOl(cm)()
  t.is(codeMirror.getSelection(), 'foo\nbar')
})

/* setH1 fomatting */

test('setH1 should be a function', t =>
  t.is(typeof setH1(cm), 'function')
)

test('removeH1 should be a function', t =>
  t.is(typeof removeH1(cm), 'function')
)

test('setH1 fomratting should add a # in front of every selected line', (t) => {
  codeMirror.setValue('foo\nbar\nbaz')
  CM.signal(codeMirror, 'change', codeMirror, { origin: '+input' })
  codeMirror.setSelection({ line: 1, ch: 0 }, { line: 2, ch: 3 })
  setH1(cm)()
  t.is(wrapper.state().code, 'foo\n# bar\n# baz')
})

test('setH2 should be a function', t =>
  t.is(typeof setH2(cm), 'function')
)

test('removeH2 should be a function', t =>
  t.is(typeof removeH2(cm), 'function')
)

test('setH2 fomratting should add a # in front of every selected line', (t) => {
  codeMirror.setValue('foo\nbar\nbaz')
  CM.signal(codeMirror, 'change', codeMirror, { origin: '+input' })
  codeMirror.setSelection({ line: 1, ch: 0 }, { line: 2, ch: 3 })
  setH2(cm)()
  t.is(wrapper.state().code, 'foo\n## bar\n## baz')
})
