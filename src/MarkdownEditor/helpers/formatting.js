const incrementPosition = (summand, position) => {
  const pos = Object.assign({}, position)
  pos.ch += summand
  return pos
}

const getPlaceholderBySignature = signature => (
  { '**': 'Strong text', '*': 'Emphasized text' }[signature]
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
  console.log(signature)
  const cursor = codeMirror.getCursor('start')
  const token = codeMirror.getTokenAt(cursor)
  console.log(token)
}

export const getCurrentFormat = (cm) => {
  const { codeMirror } = cm
  const cursor = codeMirror.getCursor('start')
  const type = codeMirror.getTokenAt(cursor).type
  return type ? type.split(' ') : []
}

export const removeBold = remove('**')

export const formatBold = format('**')

export const formatItalic = format('*')
