import React, { PropTypes, Component } from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'  // eslint-disable-line
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MarkdownEditor from './MarkdownEditor'

class MarkdownEditorContainer extends Component {
  static propTypes = {
    wrapInTheme: PropTypes.bool
  }
  componentDidMount() {
    if (this.props.wrapInTheme) {
      injectTapEventPlugin()
    }
  }
  render() {
    return this.props.wrapInTheme
    ?
      <MuiThemeProvider>
        <MarkdownEditor />
      </MuiThemeProvider>
      :
      <MarkdownEditor />
  }

}

export default MarkdownEditorContainer
