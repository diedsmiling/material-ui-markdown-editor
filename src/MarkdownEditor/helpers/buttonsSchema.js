import React from 'react'
import Bold from 'material-ui/svg-icons/editor/format-bold'
import Italic from 'material-ui/svg-icons/editor/format-italic'
import BulletsList from 'material-ui/svg-icons/editor/format-list-bulleted'
import NumbersList from 'material-ui/svg-icons/editor/format-list-numbered'
import { lightBlack, grey400 } from 'material-ui/styles/colors'
import { formatBold, formatItalic } from './formatting'

const getStyleIfActive = tokens => token => (
  tokens.length && tokens[0] === token
    ? { backgroundColor: grey400 }
    : {}
)

const getSchema = (cm, tokens) => {
  const getActiveStyle = getStyleIfActive(tokens)
  return [
    [
      {
        style: { marginLeft: 24, ...getActiveStyle('strong') },
        icon: <Bold color={lightBlack} />,
        clickHanlder: function clickBold() { formatBold(cm) }
      },
      {
        style: getActiveStyle('em'),
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
        icon: <NumbersList color={lightBlack} />,
        clickHanlder: function clickBold() { formatBold(cm) }
      }
    ]
  ]
}

export default getSchema
