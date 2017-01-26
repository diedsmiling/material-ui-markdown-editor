import React, { PropTypes } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

import { setLink } from '../formatting'

export default class LinkDialog extends React.Component {
  static propTypes = {
    isDialogOpen: PropTypes.bool.isRequired,
    cm: PropTypes.object.isRequired, //eslint-disable-line
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

  onChange(e) {
    this.setState({
      url: e.target.value
    })
  }

  insertLink() {
    const formatLink = setLink(this.props.cm)
    formatLink(this.state.url)
    this.setState({
      url: ''
    })
    this.context.toggleDialog()
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
            onTouchTap={toggleDialog}
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
        onRequestClose={toggleDialog}
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
