const incrementPosition = (summand, position) => {
  const pos = Object.assign({}, position)
  pos.ch += summand
  return pos
}

const position = (line, ch) => ({
  line, ch
})

const isEmpty = string => string.length === 0

const isEmptyOneLineSelection = (line, length) =>
  isEmpty(line) && length === 1

const getPositions = (seekedPosition, positions) =>
  positions.filter(pos => seekedPosition > pos[0] && seekedPosition < pos[1])[0]

const getPlaceholderBySignature = signature => (
  {
    '**': 'Strong text',
    '*': 'Emphasized text',
    '- ': 'List item'
  }[signature]
)

const normalize = (array, signatureLength, accum = []) => {
  if (array.length) {
    /* Increases end postion with signature length */
    const chunk = array.splice(0, 2)
    chunk[1] += signatureLength
    accum.push(chunk)
    normalize(array, accum)
  }
  return accum
}

const getMatches = (signature, string, start = 0, accum = []) => {
  const index = string.indexOf(signature, start)
  if (index > -1) {
    accum.push(index)
    return getMatches(signature, string, index + 1, accum)
  }
  return normalize(accum, signature.length)
}

const formatMultiline = signature => cm => () => {
  const { codeMirror } = cm
  const start = codeMirror.getCursor('start')
  const end = codeMirror.getCursor('end')
  const length = (end.line - start.line) + 1

  Array(length)
    .fill(start.line)
    .forEach((from, i) => {
      const lineNumber = from + i
      const line = codeMirror.getLine(lineNumber)
      const text = signature +
        (isEmptyOneLineSelection(line, length) ? getPlaceholderBySignature(signature) : line)

      codeMirror.replaceRange(
        text,
        position(lineNumber, 0),
        position(lineNumber, line.length)
      )
    })
}

const formatInline = signature => cm => () => {
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

const removeInline = signature => cm => () => {
  const { codeMirror } = cm

  const cursor = codeMirror.getCursor('start')
  const line = codeMirror.getLine(cursor.line)
  const [start, end] = getPositions(
    cursor.ch,
    getMatches(signature, line)
  )
  const startPoint = position(cursor.line, start)
  const endPoint = position(cursor.line, end)
  const text =
    codeMirror
      .getRange(startPoint, endPoint)
      .split(signature).join('')

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

export const formatUl = formatMultiline('- ')

export const removeBold = removeInline('**')

export const removeItalic = removeInline('*')

export const formatBold = formatInline('**')

export const formatItalic = formatInline('*')
