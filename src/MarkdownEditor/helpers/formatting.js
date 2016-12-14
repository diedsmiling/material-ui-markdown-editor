const incrementPosition = (summand, position) => {
  const pos = Object.assign({}, position)
  pos.ch += summand
  return pos
}

const getPlaceholderBySignature = signature => (
  { '**': 'Strong text', '*': 'Emphasized text' }[signature]
)

const getPositions = (position, positions) =>
  positions.filter(pos => position > pos[0] && position < pos[1])[0]

const getMatches = (signature, string, start, accum) => {
  const index = string.indexOf(signature, start)
  if (index > -1) {
    accum.push(index)
    return getMatches(signature, string, index + 1, accum)
  }
  return accum
}

const groupMatches = (array, accum) => {
  if (array.length) {
    accum.push(array.splice(0, 2)) //eslint-disable-line
    groupMatches(array, accum)
  }
  return accum
}

/* Adds to the end postion token length */
const normalize = (array, signature) =>
  array.map((item) => {
    item[1] += signature.length //eslint-disable-line
    return item
  })

const isEmpty = string => string.length === 0

const format = signature => cm => () => {
  const { codeMirror } = cm

  const selection = codeMirror.getSelection()
  const text = isEmpty(selection) ? getPlaceholderBySignature(signature) : selection
  const start = codeMirror.getCursor('start')
  const end = incrementPosition(text.length, start)

  codeMirror.replaceSelection(signature + text + signature)
  codeMirror.setSelection(
    ...[start, end].map(pos => incrementPosition(signature.length, pos))
  )

  codeMirror.focus()
}

const remove = signature => cm => () => {
  const { codeMirror } = cm

  const cursor = codeMirror.getCursor('start')
  const line = codeMirror.getLine(cursor.line)
  const matches = groupMatches(getMatches(signature, line, 0, []), [])
  const [startCh, endCh] = getPositions(cursor.ch, normalize(matches, signature))

  const startPoint = {
    line: cursor.line,
    ch: startCh
  }

  const endPoint = {
    line: cursor.line,
    ch: endCh
  }

  const text = codeMirror.getRange(startPoint, endPoint).split(signature).join('')

  codeMirror.replaceRange(
    text,
    startPoint,
    endPoint
  )
}

export const getCurrentFormat = (cm) => {
  const { codeMirror } = cm
  const cursor = codeMirror.getCursor('start')
  const type = codeMirror.getTokenTypeAt(cursor)
  return type ? type.split(' ') : []
}

export const removeBold = remove('**')

export const removeItalic = remove('*')

export const formatBold = format('**')

export const formatItalic = format('*')
