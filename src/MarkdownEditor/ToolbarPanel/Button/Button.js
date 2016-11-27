import React, { PropTypes } from 'react'
import FlatButton from 'material-ui/FlatButton'

const Button = props => (
  <FlatButton
    onClick={props.onClick}
    style={{ minWidth: '36px' }}
    icon={props.icon}
  />
)

Button.propTypes = {
  icon: PropTypes.element,
  onClick: PropTypes.function
}

export default Button
