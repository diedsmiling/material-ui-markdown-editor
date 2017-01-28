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

const getPlaceholderBySignature = signature => ({
  '**': 'Strong text',
  '*': 'Emphasized text',
  '- ': 'List item',
  '#. ': 'List item',
  '# ': 'Heading',
  '## ': 'Heading',
  '### ': 'Heading',
  '`': 'Code',
  '> ': 'Quote'
}[signature])

const normalize = (array, signatureLength, accum = []) => {
  if (array.length) {
    /* Increases end postion with signature length */
    const chunk = array.splice(0, 2)
    chunk[1] += signatureLength
    accum.push(chunk)
    normalize(array, signatureLength, accum)
  }
  return accum
}

const getMatches = (signature, string, start = 0, accum = []) => {
  const index = string.indexOf(signature, start)
  if (index > -1) {
    accum.push(index)
    return getMatches(signature, string, index + signature.length, accum)
  }

  return normalize(accum, signature.length)
}

const getRemovingPartLength = (line, signature) => (
  ['- ', '### ', '## ', '# ', '> '].includes(signature) ? signature.length : line.indexOf('.') + 2
)

const formatLink = pattern => cm => (link) => {
  const { codeMirror } = cm
  const text = pattern
    .replace('##', codeMirror.getSelection())
    .replace('$$', link)
  codeMirror.replaceSelection(text)
}

const formatMultiline = signature => cm => () => {
  const { codeMirror } = cm
  const start = codeMirror.getCursor('start')
  const end = codeMirror.getCursor('end')
  const length = (end.line - start.line) + 1

  Array(length)
    .fill(start.line)
    .forEach((from, i) => {
      const curentLine = i + 1
      const lineNumber = from + i
      const line = codeMirror.getLine(lineNumber)
      let text = signature +
        (isEmptyOneLineSelection(line, length) ? getPlaceholderBySignature(signature) : line)
      if (signature === '#. ') {
        text = text.replace(signature, `${curentLine}. `)
      }
      codeMirror.replaceRange(
        text,
        position(lineNumber, 0),
        position(lineNumber, line.length)
      )
    })

  const lastLineLength = codeMirror.getLine(end.line).length
  codeMirror.setSelection(position(start.line, 0), position(end.line, lastLineLength))
  codeMirror.focus()
}

const removeMultiline = signature => cm => () => {
  const { codeMirror } = cm
  const start = codeMirror.getCursor('start')
  const end = codeMirror.getCursor('end')
  const length = (end.line - start.line) + 1

  Array(length)
    .fill(start.line)
    .forEach((from, i) => {
      const currentLine = from + i
      const line = codeMirror.getLine(currentLine)
      codeMirror.replaceRange(
        '',
        position(currentLine, 0),
        position(currentLine, getRemovingPartLength(line, signature))
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

const normalizeList = (types, line) => {
  const typesCloned = [...types]
  if (typesCloned[0] !== 'variable-2') return typesCloned
  typesCloned[0] = line.startsWith('- ') || line.startsWith('* ')
    ? typesCloned[0] = 'ul'
    : typesCloned[0] = 'ol'

  return typesCloned
}

export const getCurrentFormat = (cm) => {
  const { codeMirror } = cm
  const cursor = codeMirror.getCursor('start')
  const type = codeMirror.getTokenTypeAt(cursor)
  const line = codeMirror.getLine(cursor.line)

  return type ? normalizeList(type.split(' '), line) : []
}

export const setH1 = formatMultiline('# ')

export const removeH1 = removeMultiline('# ')

export const setH2 = formatMultiline('## ')

export const removeH2 = removeMultiline('## ')

export const setH3 = formatMultiline('### ')

export const removeH3 = removeMultiline('### ')

export const setOl = formatMultiline('#. ')

export const removeOl = removeMultiline('#. ')

export const setUl = formatMultiline('- ')

export const removeUl = removeMultiline('- ')

export const setBold = formatInline('**')

export const removeBold = removeInline('**')

export const setItalic = formatInline('*')

export const removeItalic = removeInline('*')

export const setCode = formatInline('`')

export const removeCode = removeInline('`')

export const setQuote = formatMultiline('> ')

export const removeQuote = removeMultiline('> ')

export const setLink = formatLink('[##]($$)')

export const setImage = formatLink('![##]($$)')
