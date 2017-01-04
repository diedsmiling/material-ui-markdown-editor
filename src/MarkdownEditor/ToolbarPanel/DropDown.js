import React, { PropTypes } from 'react'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'

const DropDown = ({ icon, style, options }) => (
  <IconMenu
    iconButtonElement={
      <IconButton style={style}>
        { icon }
      </IconButton>
    }
  >
    {
      options.map(option => <MenuItem {...option} />)
    }
  </IconMenu>
)

DropDown.propTypes = {
  icon: PropTypes.element,
  style: PropTypes.object, //eslint-disable-line
  options: PropTypes.arrayOf(
    PropTypes.shape({
      style: PropTypes.object, //eslint-disable-line
      primaryText: PropTypes.string
    })
  )
}

export default DropDown
