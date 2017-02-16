import React from 'react'
import ReactDOM from 'react-dom'
import AppBar from 'material-ui/AppBar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'  // eslint-disable-line
import MarkdownEditor from '../MarkdownEditor'

injectTapEventPlugin()


const Example = () => (
  <MuiThemeProvider>
    <div>
      <AppBar
        title="Material-UI Markdown Editor"
        iconClassNameRight="muidocs-icon-custom-github"
      />
      <div style={{ marginTop: 50 }} >
        <MarkdownEditor
          title="Foo"
          code="# Fancy markdown editor!"
        />
      </div>
    </div>
  </MuiThemeProvider>
)

ReactDOM.render(
  <Example />,
  document.getElementById('root')
)
