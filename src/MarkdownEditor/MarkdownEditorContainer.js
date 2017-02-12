import React, { PropTypes } from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'  // eslint-disable-line
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MarkdownEditor from './MarkdownEditor'

injectTapEventPlugin()

const MarkdownEditorContainer = ({ wrapInTheme, code, title }) => (
  wrapInTheme
  ?
    <MuiThemeProvider>
      <MarkdownEditor code={code} title={title} />
    </MuiThemeProvider>
  : <MarkdownEditor />
)

MarkdownEditorContainer.propTypes = {
  wrapInTheme: PropTypes.bool,
  code: PropTypes.string,
  title: PropTypes.string
}

export default MarkdownEditorContainer
