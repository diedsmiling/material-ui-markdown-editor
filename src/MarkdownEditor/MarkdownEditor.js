import React, { PropTypes } from 'react'
import Codemirror from 'react-codemirror'
import 'codemirror/lib/codemirror.css'
import LinkDialog from './LinkDialog'
import ToolbarPanel from './ToolbarPanel'
import codemirrorMd from 'codemirror/mode/markdown/markdown' // eslint-disable-line
import './codemirrorOverride.css'
import { getCurrentFormat } from './formatting'

export default class MarkdownEditor extends React.Component {
  static childContextTypes = {
    toggleDialog: PropTypes.func
  }

  constructor() {
    super()
    this.state = {
      tokens: [],
      code: '# Heading',
      isDialogOpen: false,
      isImageDialog: false
    }
    this.updateCode = this.updateCode.bind(this)
    this.toggleDialog = this.toggleDialog.bind(this)
  }

  getChildContext() {
    return {
      toggleDialog: this.toggleDialog
    }
  }

  componentDidMount() {
    /* need to trigger rerender since tooblbar is rendered before
     Codemirror textarea and we can't get it's ref at first render */
    this.setState({ cm: this.cm }) //eslint-disable-line
    this.cm.codeMirror.on('cursorActivity', this.updateTokens.bind(this))
  }

  toggleDialog(isImageDialog) {
    return () => {
      this.setState({ isDialogOpen: !this.state.isDialogOpen, isImageDialog })
    }
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

    return (
      <div>
        <LinkDialog
          isDialogOpen={this.state.isDialogOpen}
          isImageDialog={this.state.isImageDialog}
          toggleDialog={this.toggleDialog}
          tokens={this.state.tokens}
          cm={this.state.cm}
        />
        <ToolbarPanel
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
