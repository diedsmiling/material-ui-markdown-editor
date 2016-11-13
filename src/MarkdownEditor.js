import React from 'react'
import Codemirror from 'react-codemirror'
import styles from '../node_modules/codemirror/lib/codemirror.css'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

injectTapEventPlugin()

export default class MarkdownEditor extends React.Component {
  constructor() {
    super()
    this.state = {
      code: '// Code'
    }
  }
  updateCode(newCode) {
    this.setState({
      code: newCode
    })
  }
  render() {
    const options = {
      lineNumbers: true
    }
    return (
      <MuiThemeProvider>
        <Codemirror
          mode="markdown"
          value={this.state.code}
          onChange={this.updateCode}
          options={options}
        />
      </MuiThemeProvider>
    )
  }
}
