import React, { PropTypes } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

const LinkDialog = ({ isDialogOpen, toggleDialog }) => (
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
        onTouchTap={toggleDialog}
      />
    ]}
    modal={false}
    open={isDialogOpen}
    onRequestClose={toggleDialog}
  >
    <TextField
      id="url"
      floatingLabelText="Url"
      style={{
        width: '100%'
      }}
    />
  </Dialog>
)


LinkDialog.propTypes = {
  isDialogOpen: PropTypes.bool.isRequired,
  toggleDialog: PropTypes.func.isRequired
}

export default LinkDialog
