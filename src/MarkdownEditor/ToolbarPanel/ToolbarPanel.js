import React, { PropTypes } from 'react'
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar'
import ToolbarSection from './ToolbarSection'
import getButtonsSchema from '../helpers/buttonsSchema'

const ToolbarPanel = props => (
  <Toolbar>
    <ToolbarGroup firstChild>
      {
        getButtonsSchema(props.cm, props.tokens).map((section, i) => (
          <ToolbarSection key={i} buttons={section} />
        ))
      }
    </ToolbarGroup>
    <ToolbarGroup>
      <ToolbarTitle text="Title" />
    </ToolbarGroup>
  </Toolbar>
)


ToolbarPanel.propTypes = {
  cm: PropTypes.object, //eslint-disable-line
  tokens: PropTypes.array //eslint-disable-line
}

export default ToolbarPanel
