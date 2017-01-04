import React, { PropTypes } from 'react'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'

const DropDown = ({ icon, style }) => (
  <IconMenu
    iconButtonElement={
      <IconButton style={style}>
        { icon }
      </IconButton>
    }
  >
    <MenuItem value="AL" primaryText="Test" />
    <MenuItem value="AL1" primaryText="Test1" />
  </IconMenu>
)

DropDown.propTypes = {
  icon: PropTypes.element,
  style: PropTypes.object //eslint-disable-line
}

export default DropDown
