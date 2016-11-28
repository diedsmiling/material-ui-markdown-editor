import React, { PropTypes } from 'react'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'
import Bold from 'material-ui/svg-icons/editor/format-bold'
import Italic from 'material-ui/svg-icons/editor/format-italic'
import { lightBlack } from 'material-ui/styles/colors'
import Button from './Button'
import { formatBold, formatItalic } from '../helpers/formatting'

const ToolbarPanel = props => (
  <Toolbar>
    <ToolbarGroup firstChild>
      <Button
        onClick={function clickBold() { formatBold(props.cm) }}
        icon={<Bold color={lightBlack} />}
      />
      <Button
        onClick={function clickBold() { formatItalic(props.cm) }}
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
