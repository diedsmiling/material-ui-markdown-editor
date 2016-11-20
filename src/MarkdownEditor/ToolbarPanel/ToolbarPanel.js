import React from 'react'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'
import Bold from 'material-ui/svg-icons/editor/format-bold'
import Italic from 'material-ui/svg-icons/editor/format-italic'
import { lightBlack } from 'material-ui/styles/colors'
import Button from './Button'

const ToolbarPanel = () => (
  <Toolbar>
    <ToolbarGroup firstChild>
      <Button
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

export default ToolbarPanel
