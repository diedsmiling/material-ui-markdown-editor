import React from 'react'
import test from 'ava'
import { shallow, mount } from 'enzyme'
import pq from 'proxyquire'
import sinon from 'sinon'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

/*
  MarkdownEditor should be stubbed because it uses Codemirror,
  which needs full browser environment and that triggers errors when mounting component
*/
const MarkdownEditor = () => <div />

const proxyquire = pq.noCallThru()
const injectTapEventPluginStub = sinon.stub()
const MarkdownEditorContainer = proxyquire(
  '../src/MarkdownEditor/MarkdownEditorContainer',
  {
    'react-tap-event-plugin': injectTapEventPluginStub,
    './MarkdownEditor': MarkdownEditor
  }
).default

test('Should contain MarkdownEditor component ', (t) => {
  const wrapper = shallow(<MarkdownEditorContainer />)
  t.true(wrapper.contains(<MarkdownEditor />))
})

test('Should wrap in MuiThemeProvider if wrapInTheme prop is passed', (t) => {
  const wrapper = shallow(<MarkdownEditorContainer wrapInTheme />)
  t.true(wrapper.containsMatchingElement(
    <MuiThemeProvider>
      <MarkdownEditor />
    </MuiThemeProvider>
  ))
})

test('Should invoke in injectTapEventPlugin if wrapInTheme prop is passed', (t) => {
  mount(<MarkdownEditorContainer wrapInTheme />)
  t.true(injectTapEventPluginStub.calledOnce)
})
