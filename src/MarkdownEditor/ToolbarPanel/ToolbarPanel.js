import React, { PropTypes } from 'react'
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar'
import ToolbarSection from './ToolbarSection'
import getButtonsSchema from './buttonsSchema'

const ToolbarPanel = ({ cm, tokens, title }) => (
  <Toolbar>
    <ToolbarGroup firstChild>
      {
        getButtonsSchema(cm, tokens).map((section, i) =>
          <ToolbarSection key={i} items={section} />
        )
      }
    </ToolbarGroup>
    <ToolbarGroup>
      <ToolbarTitle text={title} />
    </ToolbarGroup>
  </Toolbar>
)


ToolbarPanel.propTypes = {
  cm: PropTypes.object, //eslint-disable-line
  tokens: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string
}

export default ToolbarPanel
