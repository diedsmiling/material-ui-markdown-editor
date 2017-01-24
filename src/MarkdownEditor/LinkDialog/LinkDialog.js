import React, { PropTypes } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

const LinkDialog = ({ isDialogOpen, toggleDialog }) => {
  const actions = [
    <FlatButton
      label="Cancel"
      primary
      onTouchTap={toggleDialog}
    />,
    <FlatButton
      label="Submit"
      primary
      keyboardFocused
      onTouchTap={toggleDialog}
    />
  ]
  return (
    <Dialog
      title="Insert link url"
      actions={actions}
      modal={false}
      open={isDialogOpen}
      onRequestClose={toggleDialog}
    >
      <TextField />
    </Dialog>
  )
}

LinkDialog.propTypes = {
  isDialogOpen: PropTypes.bool.isRequired,
  toggleDialog: PropTypes.func.isRequired
}

export default LinkDialog
