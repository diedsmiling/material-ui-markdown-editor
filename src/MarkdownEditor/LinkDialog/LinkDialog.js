import React, { PropTypes } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

export default class LinkDialog extends React.Component {
  static propTypes = {
    isDialogOpen: PropTypes.bool.isRequired,
    cm: PropTypes.object.isRequired, //eslint-disable-line
  }

  constructor() {
    super()
    this.state = {
      url: ''
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    this.setState({
      url: e.target.value
    })
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
            onTouchTap={toggleDialog}
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
          style={{
            width: '100%'
          }}
        />
      </Dialog>
    )
  }
}
