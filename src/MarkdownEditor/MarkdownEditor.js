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

  componentDidMount() {
    /* need to trigger rerender since tooblbar is rendered before
     Codemirror textarea and we can't get it's ref at first render */
    this.setState({ cm: this.cm }) //eslint-disable-line
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
        <ToolbarPanel cm={this.state.cm} />
        <Codemirror
          ref={((ref) => { this.cm = ref })}
          value={this.state.code}
          onChange={this.updateCode}
          options={options}
        />
      </div>
    )
  }
}
