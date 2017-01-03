import React from 'react'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
console.log(MenuItem)
const DropDown = ({ icon, style }) => (
  <IconMenu
    iconButtonElement={
      <IconButton>
        {icon}
      </IconButton>
    }
  >
    <MenuItem value="AL" primaryText="Test" />
    <MenuItem value="AL" primaryText="Test1" />
  </IconMenu>
)

export default DropDown
