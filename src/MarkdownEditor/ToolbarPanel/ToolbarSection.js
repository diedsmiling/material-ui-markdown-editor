import React, { PropTypes } from 'react'
import { ToolbarSeparator } from 'material-ui/Toolbar'
import Button from './Button'

const ToolbarSection = props => (
  <div style={{ display: 'flex' }}>
    {
      props.buttons.map((button, key) => (
        <Button
          key={key}
          style={button.style}
          onClick={button.clickHanlder}
          icon={button.icon}
          icons={button.icons}
        />
      ))
    }
    <ToolbarSeparator />
  </div>
)

ToolbarSection.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      style: PropTypes.object,
      onClick: PropTypes.func,
      icon: PropTypes.element
    })
  )
}

export default ToolbarSection
