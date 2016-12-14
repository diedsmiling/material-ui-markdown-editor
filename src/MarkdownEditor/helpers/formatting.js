const incrementPosition = (summand, position) => {
  const pos = Object.assign({}, position)
  pos.ch += summand
  return pos
}

const getPlaceholderBySignature = signature => (
  { '**': 'Strong text', '*': 'Emphasized text' }[signature]
)

const getSignaturePositions = (line, signature, start) => (
  [line.lastIndexOf(signature, start), line.indexOf(signature, start) + signature.length]
)

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
  const [startCh, endCh] = getSignaturePositions(line, signature, cursor.ch)
  const startPoint = {
    line: cursor.line,
    ch: startCh
  }

  const endPoint = {
    line: cursor.line,
    ch: endCh
  }

  codeMirror.replaceRange(
    codeMirror.getRange(startPoint, endPoint).split(signature).join(''),
    startPoint,
    endPoint
  )
}

export const getCurrentFormat = (cm) => {
  const { codeMirror } = cm
  const cursor = codeMirror.getCursor('start')
  const type = codeMirror.getTokenAt(cursor).type
  return type ? type.split(' ') : []
}

export const removeBold = remove('**')

export const removeItalic = remove('*')

export const formatBold = format('**')

export const formatItalic = format('*')
