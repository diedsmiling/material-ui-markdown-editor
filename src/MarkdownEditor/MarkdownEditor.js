import React from 'react'
import Codemirror from 'react-codemirror'
import LinkDialog from './LinkDialog'
import ToolbarPanel from './ToolbarPanel'
import codemirrorMd from 'codemirror/mode/markdown/markdown' // eslint-disable-line
import styles from 'codemirror/lib/codemirror.css' // eslint-disable-line
import { getCurrentFormat } from './formatting'

export default class MarkdownEditor extends React.Component {
  static childContextTypes = {
    color: React.PropTypes.string
  }

  constructor() {
    super()
    this.state = {
      tokens: [],
      code: '# Heading',
      isDialogOpen: false
    }
    this.updateCode = this.updateCode.bind(this)
    this.toggleDialog = this.toggleDialog.bind(this)
  }

  getChildContext() {
    return { color: 'purple' }
  }

  componentDidMount() {
    /* need to trigger rerender since tooblbar is rendered before
     Codemirror textarea and we can't get it's ref at first render */
    this.setState({ cm: this.cm }) //eslint-disable-line
    this.cm.codeMirror.on('cursorActivity', this.updateTokens.bind(this))
  }

  toggleDialog() {
    this.setState({ isDialogOpen: !this.state.isDialogOpen })
  }

  updateTokens() {
    const tokens = getCurrentFormat(this.cm)
    this.setState({ tokens })
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
    // <LinkDialog isDialogOpen={this.state.isDialogOpen} /> 
    return (
      <div>

        <ToolbarPanel
          toggleDialog={this.toggleDialog}
          cm={this.state.cm}
          tokens={this.state.tokens}
        />
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
