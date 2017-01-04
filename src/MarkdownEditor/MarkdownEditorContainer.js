import React, { PropTypes, Component } from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'  // eslint-disable-line
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MarkdownEditor from './MarkdownEditor'

injectTapEventPlugin()

const MarkdownEditorContainer = ({ wrapInTheme }) => (
  wrapInTheme
  ?
    <MuiThemeProvider>
      <MarkdownEditor />
    </MuiThemeProvider>
  : <MarkdownEditor />
)

MarkdownEditorContainer.propTypes = {
  wrapInTheme: PropTypes.bool
}

export default MarkdownEditorContainer
