import React from 'react'
import Bold from 'material-ui/svg-icons/editor/format-bold'
import Italic from 'material-ui/svg-icons/editor/format-italic'
import BulletsList from 'material-ui/svg-icons/editor/format-list-bulleted'
import NumbersList from 'material-ui/svg-icons/editor/format-list-numbered'
import { lightBlack, grey400 } from 'material-ui/styles/colors'
import { formatBold, formatItalic } from './formatting'

const isActiveToken = (token, tokens) =>
  tokens.length && tokens[0] === token

const getStyleIfActive = tokens => token => (
  isActiveToken(token, tokens)
    ? { backgroundColor: grey400 }
    : {}
)

const getSchema = (cm, tokens) => {
  const getActiveStyle = getStyleIfActive(tokens)
  const setBold = formatBold(cm)
  const setItalic = formatItalic(cm)

  return [
    [
      {
        style: { marginLeft: 24, ...getActiveStyle('strong') },
        icon: <Bold color={lightBlack} />,
        clickHanlder: setBold
      },
      {
        style: getActiveStyle('em'),
        icon: <Italic color={lightBlack} />,
        clickHanlder: setItalic
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
