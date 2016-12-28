import React, { PropTypes } from 'react'
import FlatButton from 'material-ui/FlatButton'

const Button = ({ onClick, style, icon }) => (
  <FlatButton
    onClick={onClick}
    style={{ ...style, minWidth: '36px' }}
    icon={icon}
  />
)

Button.propTypes = {
  icon: PropTypes.element,
  onClick: PropTypes.func,
  style: PropTypes.object //eslint-disable-line
}

export default Button
