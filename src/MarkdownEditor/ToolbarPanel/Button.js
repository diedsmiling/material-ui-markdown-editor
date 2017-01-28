import React, { PropTypes } from 'react'
import FlatButton from 'material-ui/FlatButton'

const Button = ({ onClick, style, icon, openDialog, isImageDialog }, { toggleDialog }) => (
  <FlatButton
    onClick={(openDialog ? toggleDialog(isImageDialog) : onClick)} //eslint-disable-line
    style={{ ...style, minWidth: '36px' }}
    icon={icon}
  />
)

Button.propTypes = {
  icon: PropTypes.element,
  onClick: PropTypes.func,
  isImageDialog: PropTypes.bool,
  style: PropTypes.object, //eslint-disable-line
  openDialog: PropTypes.bool
}

Button.contextTypes = {
  toggleDialog: PropTypes.func
}

export default Button
