const incrementPosition = (summand, position) => {
  const pos = position
  pos.ch += summand
  return pos
}

const format = signature => (cm) => {
  const { codeMirror } = cm
  const cursorPositions = [
    codeMirror.getCursor('start'),
    codeMirror.getCursor('end')
  ]

  codeMirror.replaceSelection(signature + codeMirror.getSelection() + signature)
  codeMirror.setSelection(
    ...cursorPositions.map(pos => incrementPosition(signature.length, pos))
  )
  codeMirror.focus()
}

export const formatBold = format('**')
export const formatItalic = format('*')
