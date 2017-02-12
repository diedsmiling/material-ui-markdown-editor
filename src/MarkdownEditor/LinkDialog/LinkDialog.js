import React, { PropTypes } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

import { getUrl, isUrl, setUrl, updateUrl } from '../formatting'

export default class LinkDialog extends React.Component {
  static propTypes = {
    isDialogOpen: PropTypes.bool.isRequired,
    cm: PropTypes.object, //eslint-disable-line
    isImageDialog: PropTypes.bool,
    tokens: PropTypes.arrayOf(PropTypes.string)
  }

  static contextTypes = {
    toggleDialog: PropTypes.func
  }

  constructor() {
    super()
    this.state = {
      url: ''
    }
    this.onChange = this.onChange.bind(this)
    this.insertLink = this.insertLink.bind(this)
  }

  componentWillReceiveProps({ tokens, cm }) {
    if (tokens[1] && tokens[1] === 'url') {
      this.setState({ url: getUrl(cm.codeMirror) })
    }
  }

  onChange(e) {
    this.setState({
      url: e.target.value
    })
  }

  insertLink() {
    const { state: { url } } = this
    const { props: { cm, tokens, isImageDialog } } = this

    this.setState({ url: '' })
    this.context.toggleDialog()()

    return isUrl(tokens) ? updateUrl(cm, url, isImageDialog) : setUrl(cm, url, isImageDialog)
  }

  render() {
    const { isDialogOpen } = this.props
    const { toggleDialog } = this.context
    return (
      <Dialog
        title="Insert hyperlink"
        actions={[
          <FlatButton
            label="Cancel"
            primary
            onTouchTap={toggleDialog()}
          />,
          <FlatButton
            label="Ok"
            primary
            keyboardFocused
            disabled={this.state.url === ''}
            onTouchTap={this.insertLink}
          />
        ]}
        modal={false}
        open={isDialogOpen}
        onRequestClose={toggleDialog()}
      >
        <TextField
          id="url"
          onChange={this.onChange}
          floatingLabelText="Url"
          value={this.state.url}
          style={{
            width: '100%'
          }}
        />
      </Dialog>
    )
  }
}
