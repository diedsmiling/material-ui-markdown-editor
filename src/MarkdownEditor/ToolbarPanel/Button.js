import React, { PropTypes } from 'react'
import FlatButton from 'material-ui/FlatButton'

const Button = props => (
  <FlatButton
    style={{ 'min-width': '2rem' }}
    icon={props.icon}
  />
)

Button.propTypes = {
  icon: PropTypes.element
}

export default Button
