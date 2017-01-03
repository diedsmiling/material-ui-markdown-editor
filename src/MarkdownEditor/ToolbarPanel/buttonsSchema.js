import React from 'react'
import Bold from 'material-ui/svg-icons/editor/format-bold'
import Italic from 'material-ui/svg-icons/editor/format-italic'
import Size from 'material-ui/svg-icons/editor/format-size'
import BulletsList from 'material-ui/svg-icons/editor/format-list-bulleted'
import NumbersList from 'material-ui/svg-icons/editor/format-list-numbered'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
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
import FlexWrapper from './FlexWrapper'

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
        style: { marginLeft: 24, ...getActiveStyle('heading') },
        isDropDown: true,
        icon:
          <FlexWrapper>
            <Size color={lightBlack} />
            <NavigationExpandMoreIcon />
          </FlexWrapper>
      },
      {
        style: { ...getActiveStyle('strong') },
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
