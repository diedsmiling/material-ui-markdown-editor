import React, { PropTypes } from 'react'
import FlatButton from 'material-ui/FlatButton'

const Button = props => (
  <FlatButton
    onClick={props.onClick}
    style={Object.assign({ minWidth: '36px' }, props.style)}
    icon={props.icon}
  />
)

Button.propTypes = {
  icon: PropTypes.element,
  onClick: PropTypes.function,
  style: PropTypes.object //eslint-disable-line
}

export default Button
