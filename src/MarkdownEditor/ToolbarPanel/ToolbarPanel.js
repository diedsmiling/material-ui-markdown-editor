import React, { PropTypes } from 'react'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'
import Bold from 'material-ui/svg-icons/editor/format-bold'
import Italic from 'material-ui/svg-icons/editor/format-italic'
import { lightBlack } from 'material-ui/styles/colors'
import Button from './Button'

const ToolbarPanel = props => (
  <Toolbar>
    <ToolbarGroup firstChild>
      <Button
        onClick={function() { console.log(props)}}
        icon={<Bold color={lightBlack} />}
      />
      <Button
        icon={<Italic color={lightBlack} />}
      />
      <ToolbarSeparator />
    </ToolbarGroup>
    <ToolbarGroup>
      <ToolbarTitle text="Title" />
    </ToolbarGroup>
  </Toolbar>
)

ToolbarPanel.propTypes = {
  cm: PropTypes.object
}

export default ToolbarPanel
