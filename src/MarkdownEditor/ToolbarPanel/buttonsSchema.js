import React from 'react'
import Bold from 'material-ui/svg-icons/editor/format-bold'
import Italic from 'material-ui/svg-icons/editor/format-italic'
import BulletsList from 'material-ui/svg-icons/editor/format-list-bulleted'
import NumbersList from 'material-ui/svg-icons/editor/format-list-numbered'
import { lightBlack, grey400 } from 'material-ui/styles/colors'
import {
  setBold,
  removeBold,
  setItalic,
  removeItalic,
  setUl,
  removeUl,
  setOl,
  removeOl
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
  const formatBold = setBold(cm)
  const cancelBold = removeBold(cm)
  const formatItalic = setItalic(cm)
  const cancelItalic = removeItalic(cm)
  const formatUl = setUl(cm)
  const cancelUl = removeUl(cm)
  const formatOl = setOl(cm)
  const cancelOl = removeOl(cm)

  return [
    [
      {
        style: { marginLeft: 24, ...getActiveStyle('strong') },
        icon: <Bold color={lightBlack} />,
        onClick: isActiveToken('strong', tokens) ? cancelBold : formatBold
      },
      {
        style: getActiveStyle('em'),
        icon: <Italic color={lightBlack} />,
        onClick: isActiveToken('em', tokens) ? cancelItalic : formatItalic
      }
    ],
    [
      {
        style: { marginLeft: 24, ...getActiveStyle('ul') },
        icon: <BulletsList color={lightBlack} />,
        onClick: isActiveToken('ul', tokens) ? cancelUl : formatUl
      },
      {
        style: getActiveStyle('ol'),
        icon: <NumbersList color={lightBlack} />,
        onClick: isActiveToken('ol', tokens) ? cancelOl : formatOl
      }
    ]
  ]
}

export default getSchema
