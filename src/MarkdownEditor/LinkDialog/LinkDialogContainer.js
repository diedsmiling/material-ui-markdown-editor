import React, { PropTypes } from 'react'
import LinkDialog from './LinkDialog'

const LinkDialogContainer = (props, { isDialogOpen }) =>
  <LinkDialog {...props} open={isDialogOpen} />

LinkDialogContainer.contextTypes = {
  isDialogOpen: PropTypes.bool.isRequired
}

export default LinkDialogContainer
