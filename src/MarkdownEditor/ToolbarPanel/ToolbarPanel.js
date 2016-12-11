import React, { PropTypes } from 'react'
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar'
import Bold from 'material-ui/svg-icons/editor/format-bold'
import Italic from 'material-ui/svg-icons/editor/format-italic'
import BulletsList from 'material-ui/svg-icons/editor/format-list-bulleted'
import NumbersList from 'material-ui/svg-icons/editor/format-list-numbered'
import { lightBlack } from 'material-ui/styles/colors'
import ToolbarSection from './ToolbarSection'
import { formatBold, formatItalic } from '../helpers/formatting'

const ToolbarPanel = (props) => {
  const schema = [
    [
      {
        style: { marginLeft: 24 },
        icon: <Bold color={lightBlack} />,
        clickHanlder: function clickBold() { formatBold(props.cm) }
      },
      {
        icon: <Italic color={lightBlack} />,
        clickHanlder: function clickItalic() { formatItalic(props.cm) }
      }
    ],
    [
      {
        style: { marginLeft: 24 },
        icon: <BulletsList color={lightBlack} />,
        clickHanlder: function clickBold() { formatBold(props.cm) }
      },
      {
        style: { marginLeft: 24 },
        icon: <NumbersList color={lightBlack} />,
        clickHanlder: function clickBold() { formatBold(props.cm) }
      }
    ]
  ]
  return (
    <Toolbar>
      <ToolbarGroup firstChild>
        {
          schema.map((section, i) => (
            <ToolbarSection key={i} buttons={section} />
          ))
        }
      </ToolbarGroup>
      <ToolbarGroup>
        <ToolbarTitle text="Title" />
      </ToolbarGroup>
    </Toolbar>
  )
}

ToolbarPanel.propTypes = {
  cm: PropTypes.object, //eslint-disable-line
  tokens: PropTypes.array //eslint-disable-line
}

export default ToolbarPanel
