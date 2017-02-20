import React from 'react'
import ReactDOM from 'react-dom'
import AppBar from 'material-ui/AppBar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'  // eslint-disable-line
import 'codemirror/lib/codemirror.css' // import codemirror styles
import MarkdownEditor from '../MarkdownEditor'
import '../MarkdownEditor/codemirrorOverride.css' //

injectTapEventPlugin()

const GithubIcon = () =>
  <a
    style={{
      fontSize: 24,
      lineHeight: '50px',
      color: '#ffffff',
      paddingRight: 24
    }}
    href="https://github.com/diedsmiling/material-ui-markdown-editor"
  >
    <i className="fa fa-github" aria-hidden="true" />
  </a>

const Example = () => (
  <MuiThemeProvider>
    <div>
      <AppBar
        showMenuIconButton={false}
        title="Material-UI Markdown Editor"
        iconElementRight={<GithubIcon />}
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
