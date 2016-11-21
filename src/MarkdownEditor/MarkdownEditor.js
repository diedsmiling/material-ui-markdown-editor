import React from 'react'
import Codemirror from 'react-codemirror'
import ToolbarPanel from './ToolbarPanel'
import codemirrorMd from 'codemirror/mode/markdown/markdown' // eslint-disable-line
import styles from 'codemirror/lib/codemirror.css' // eslint-disable-line

export default class MarkdownEditor extends React.Component {
  constructor() {
    super()
    this.state = {
      code: '# Heading'
    }
    this.updateCode = this.updateCode.bind(this)
  }
  updateCode(newCode) {
    this.setState({
      code: newCode
    })
  }
  render() {
    const options = {
      lineNumbers: true,
      mode: 'markdown'
    }

    return (
      <div>
        <ToolbarPanel />
        <Codemirror
          value={this.state.code}
          onChange={this.updateCode}
          options={options}
        />
      </div>
    )
  }
}
