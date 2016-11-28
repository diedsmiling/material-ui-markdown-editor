const incrementPosition = (summand, position) => {
  const pos = position
  pos.ch += summand
  return pos
}

export const formatBold = (cm) => {
  const { codeMirror } = cm

  const cursorPositions = [
    codeMirror.getCursor('start'),
    codeMirror.getCursor('end')
  ]

  codeMirror.replaceSelection(`**${codeMirror.getSelection()}**`)
  codeMirror.setSelection(...cursorPositions.map(pos => incrementPosition(2, pos)))
  codeMirror.focus()
}

export const formatItalic = (cm) => {
  console.log(cm)
}
