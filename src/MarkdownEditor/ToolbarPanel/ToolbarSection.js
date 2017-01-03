import React, { PropTypes } from 'react'
import { ToolbarSeparator } from 'material-ui/Toolbar'
import Button from './Button'
import DropDown from './DropDown'

const ToolbarSection = ({ items }) => (
  <div style={{ display: 'flex' }}>
    {
      items.map((item, key) => (
        item.isDropDown
          ? <DropDown key={key} {...item} />
          : <Button key={key} {...item} />
      ))
    }
    <ToolbarSeparator />
  </div>
)

ToolbarSection.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      style: PropTypes.object,
      onClick: PropTypes.func,
      icon: PropTypes.element
    })
  )
}

export default ToolbarSection
