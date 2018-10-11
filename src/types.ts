export type Selection = {
  startOffset: number,
  endOffset: number,
};

export type limitOnNode = {
  position: number,
  node: Node,
};

export type SelectionSpy = {
  startFound: boolean,
  currentChar: number,
  start?: limitOnNode,
  end?: limitOnNode,
};
