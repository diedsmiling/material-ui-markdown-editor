import React from 'react'
import Codemirror from 'react-codemirror'
import styles from '../../node_modules/codemirror/lib/codemirror.css' //eslint-disable-line

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
      <div>
        <Codemirror
          mode="markdown"
          value={this.state.code}
          onChange={this.updateCode}
          options={options}
        />
      </div>
    )
  }
}
