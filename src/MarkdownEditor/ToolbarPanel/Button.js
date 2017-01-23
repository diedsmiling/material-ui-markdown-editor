import React, { PropTypes } from 'react'
import FlatButton from 'material-ui/FlatButton'

const Button = ({ onClick, style, icon, getContext }, context) => (
  <FlatButton
    onClick={(getContext ? () => (context.isDialogOpen = true) : onClick)} //eslint-disable-line
    style={{ ...style, minWidth: '36px' }}
    icon={icon}
  />
)

Button.propTypes = {
  icon: PropTypes.element,
  onClick: PropTypes.func,
  style: PropTypes.object, //eslint-disable-line
  getContext: PropTypes.bool
}

Button.contextTypes = {
  isDialogOpen: PropTypes.bool.isRequired
}

export default Button
