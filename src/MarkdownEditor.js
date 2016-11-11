import React from 'react'
import Codemirror from 'react-codemirror'

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
    console.log('ad')
    const options = {
      lineNumbers: true
    }
    return <Codemirror mode="markdown" value={this.state.code} onChange={this.updateCode} options={options} />
  }
}
