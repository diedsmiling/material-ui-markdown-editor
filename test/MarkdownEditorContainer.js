import React from 'react'
import test from 'ava'
import { shallow } from 'enzyme'
import pq from 'proxyquire'

const MarkdownEditor = () => <div />
const proxyquire = pq.noCallThru()
const MarkdownEditorContainer = proxyquire(
  '../src/MarkdownEditor/MarkdownEditorContainer',
  {
    './MarkdownEditor': MarkdownEditor
  }
).default

test('Should contain MarkdownEditor component ', (t) => {
  const wrapper = shallow(<MarkdownEditorContainer code="foo" title="bar" />)
  t.true(wrapper.contains(<MarkdownEditor code="foo" title="bar" />))
})
