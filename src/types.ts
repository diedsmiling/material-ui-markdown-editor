export type Selection = {
    startOffset: number,
    endOffset: number
}

export type SelectionSpy = {
  startFound: boolean,
  foundEnd: boolean,
  currentChar: number
}