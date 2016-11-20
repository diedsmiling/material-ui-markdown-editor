import React from 'react'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'
import Bold from 'material-ui/svg-icons/editor/format-bold'
import Italic from 'material-ui/svg-icons/editor/format-italic'
import FlatButton from 'material-ui/FlatButton'
import { lightBlack } from 'material-ui/styles/colors'

const ToolbarPanel = () => (
  <Toolbar>
    <ToolbarGroup firstChild>
      <FlatButton
        style={{ 'min-width': '2rem' }}
        icon={<Bold color={lightBlack} />}
      />
      <FlatButton
        style={{ 'min-width': '2rem' }}
        icon={<Italic color={lightBlack} />}
      />
      <ToolbarSeparator />
    </ToolbarGroup>
    <ToolbarGroup>
      <ToolbarTitle text="Title" />
    </ToolbarGroup>
  </Toolbar>
)

export default ToolbarPanel
