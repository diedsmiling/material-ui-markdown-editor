const incrementPosition = (summand, position) => {
  const pos = position
  pos.ch += summand
  return pos
}

const getPlaceholderBySignature = signature => (
  { '**': 'Strong text', '*': 'Emphasized text' }[signature]
)

const isEmpty = string => string.length === 0

const getText = (signature, text) =>
  isEmpty(text) ? getPlaceholderBySignature(signature) : text

const getEndPosition = (codeMirror, text, selection) => {
  const end = codeMirror.getCursor('end')
  return text === selection ? end : incrementPosition(text.length, end)
}

const format = signature => (cm) => {
  const { codeMirror } = cm
  const selection = codeMirror.getSelection()
  const start = codeMirror.getCursor('start')
  const text = getText(signature, selection)
  const end = getEndPosition(codeMirror, text, selection)

  codeMirror.replaceSelection(signature + text + signature)
  codeMirror.setSelection(
    ...[start, end].map(pos => incrementPosition(signature.length, pos))
  )

  codeMirror.focus()
}

export const formatBold = format('**')
export const formatItalic = format('*')
