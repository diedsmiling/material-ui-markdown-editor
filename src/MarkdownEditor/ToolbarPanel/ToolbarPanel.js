import React, { PropTypes } from 'react'
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar'
import ToolbarSection from './ToolbarSection'
import getButtonsSchema from './buttonsSchema'

const ToolbarPanel = ({ cm, tokens }) => (
  <Toolbar>
    <ToolbarGroup firstChild>
      {
        getButtonsSchema(cm, tokens).map((section, i) =>
          <ToolbarSection key={i} items={section} />
        )
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
