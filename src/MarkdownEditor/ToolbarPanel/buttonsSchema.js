import React from 'react'
import Bold from 'material-ui/svg-icons/editor/format-bold'
import Italic from 'material-ui/svg-icons/editor/format-italic'
import BulletsList from 'material-ui/svg-icons/editor/format-list-bulleted'
import NumbersList from 'material-ui/svg-icons/editor/format-list-numbered'
import { lightBlack, grey400 } from 'material-ui/styles/colors'
import {
  formatBold,
  formatItalic,
  removeBold,
  removeItalic,
  formatUl,
  removeUl
} from '../formatting'

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
  const setUl = formatUl(cm)
  const unsetBold = removeBold(cm)
  const unsetItalic = removeItalic(cm)
  const unsetUl = removeUl(cm)

  return [
    [
      {
        style: { marginLeft: 24, ...getActiveStyle('strong') },
        icon: <Bold color={lightBlack} />,
        onClick: isActiveToken('strong', tokens) ? unsetBold : setBold
      },
      {
        style: getActiveStyle('em'),
        icon: <Italic color={lightBlack} />,
        onClick: isActiveToken('em', tokens) ? unsetItalic : setItalic
      }
    ],
    [
      {
        style: { marginLeft: 24, ...getActiveStyle('ul') },
        icon: <BulletsList color={lightBlack} />,
        onClick: isActiveToken('ul', tokens) ? unsetUl : setUl
      },
      {
        icon: <NumbersList color={lightBlack} />,
        onClick: function clickBold() { formatBold(cm) }
      }
    ]
  ]
}

export default getSchema
