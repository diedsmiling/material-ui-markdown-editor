const incrementPosition = (summand, position) => {
  const pos = position
  pos.ch += summand
  return pos
}

const getPlaceholderBySignature = signature => (
  { '**': 'Strong text', '*': 'Emphasized text' }[signature]
)

const format = signature => (cm) => {
  const { codeMirror } = cm
  const cursorPositions = [
    codeMirror.getCursor('start'),
    codeMirror.getCursor('end')
  ]
  let text = codeMirror.getSelection()
  if (text.length === 0) {
    text = getPlaceholderBySignature(signature)
    cursorPositions[0] = incrementPosition(text.length, cursorPositions[0])
  }

  codeMirror.replaceSelection(signature + text + signature)
  codeMirror.setSelection(
    ...cursorPositions.map(pos => incrementPosition(signature.length, pos))
  )

  codeMirror.focus()
}

export const formatBold = format('**')
export const formatItalic = format('*')
