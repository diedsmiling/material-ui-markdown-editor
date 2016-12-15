import React from 'react'
import test from 'ava'

import { mount } from 'enzyme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Markdown from '../src/MarkdownEditor/MarkdownEditor'
import ToolbarPanel from '../src/MarkdownEditor/ToolbarPanel/ToolbarPanel'


test('Should render Toolbar', (t) => {
  const wrapper = mount(<Markdown />, {
    context: {
      muiTheme: getMuiTheme()
    },
    childContextTypes: {
      muiTheme: React.PropTypes.object.isRequired
    }
  })
  t.true(wrapper.containsMatchingElement(<ToolbarPanel />))
})
