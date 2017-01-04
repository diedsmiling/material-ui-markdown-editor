import React, { PropTypes } from 'react'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'

const DropDown = ({ icon, style, options, onItemTouchTap }) => (
  <IconMenu
    onItemTouchTap={onItemTouchTap}
    iconButtonElement={
      <IconButton style={style}>
        { icon }
      </IconButton>
    }
  >
    {
      options.map((option, i) => <MenuItem key={i} {...option} />)
    }
  </IconMenu>
)

DropDown.propTypes = {
  icon: PropTypes.element,
  onItemTouchTap: PropTypes.func,
  style: PropTypes.object, //eslint-disable-line
  options: PropTypes.arrayOf(
    PropTypes.shape({
      style: PropTypes.object, //eslint-disable-line
      primaryText: PropTypes.string
    })
  )
}

export default DropDown
