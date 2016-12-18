import React from 'react'
import test from 'ava'
import CM from 'codemirror'
import Codemirror from 'react-codemirror'
import { mount } from 'enzyme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Markdown from '../src/MarkdownEditor/MarkdownEditor'
import { getCurrentFormat } from '../src/MarkdownEditor/formatting'

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

test('Should recognise current format and provide it in a form of array', (t) => {
  const format = getCurrentFormat(wrapper.state().cm)
  t.true(Array.isArray(format))
})

test('Should recognise format', (t) => {
  const { cm } = wrapper.state()
  cm.codeMirror.setValue('** Foo **')
  t.deepEqual(getCurrentFormat(cm), ['strong'])
})
