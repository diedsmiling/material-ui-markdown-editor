import React from 'react'
import Bold from 'material-ui/svg-icons/editor/format-bold'
import Italic from 'material-ui/svg-icons/editor/format-italic'
import BulletsList from 'material-ui/svg-icons/editor/format-list-bulleted'
import NumbersList from 'material-ui/svg-icons/editor/format-list-numbered'
import { lightBlack } from 'material-ui/styles/colors'
import { formatBold, formatItalic } from './formatting'

const getSchema = cm => (
  [
    [
      {
        style: { marginLeft: 24 },
        icon: <Bold color={lightBlack} />,
        clickHanlder: function clickBold() { formatBold(cm) }
      },
      {
        icon: <Italic color={lightBlack} />,
        clickHanlder: function clickItalic() { formatItalic(cm) }
      }
    ],
    [
      {
        style: { marginLeft: 24 },
        icon: <BulletsList color={lightBlack} />,
        clickHanlder: function clickBold() { formatBold(cm) }
      },
      {
        style: { marginLeft: 24 },
        icon: <NumbersList color={lightBlack} />,
        clickHanlder: function clickBold() { formatBold(cm) }
      }
    ]
  ]
)

export default getSchema
