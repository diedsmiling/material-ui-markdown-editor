import { Selection, SelectionSpy } from '../types';

const isNodeByType = (nodeType: number) => (node: Node) => node.nodeType === nodeType;

const isNodeByTag = (tag: string) => (node: Node) => node.nodeName === tag;

const isTextNode = isNodeByType(Node.TEXT_NODE);

const isElementNode = isNodeByType(Node.ELEMENT_NODE);

const isBr = isNodeByTag('BR');

const isStart = (selection: Selection, currentChar: number, nextChar: number) => (
  selection.startOffset >= currentChar && selection.startOffset <= nextChar
)

const isEnd = (selection: Selection, currentChar: number, nextChar: number) => (
  selection.endOffset >= currentChar && selection.endOffset <= nextChar
)

function traverseAndRestore(
  node: Node,
  selectionSpy: SelectionSpy,
  selection: Selection,
): SelectionSpy {
  return [...node.childNodes].reduce((acc: SelectionSpy, node: Node) => {
    console.log(node.nodeType);

    let { startFound, start, end } = acc;
    const { currentChar } = acc;

    if (isElementNode(node) && isBr(node)) {
       // acc.start.position = acc.start.position + 1;
       // acc.end.position = acc.end.position + 1;
    }

    if (isTextNode(node)) {
      let { startFound, start, end } = acc;
      const { currentChar } = acc;
      const nextChar = currentChar + node.textContent.length;

      if (!startFound && isStart(selection, currentChar, nextChar)) {
        startFound = true;
        start = {
          node,
          position: selection.startOffset - currentChar,
        };
      }

      if (startFound && isEnd(selection, currentChar, nextChar)) {
        end = {
          node,
          position: selection.endOffset - currentChar,
        };
      }

      return {
        startFound,
        start,
        end,
        currentChar: nextChar,
      };
    }

    return traverseAndRestore(node, acc, selection);
  }, selectionSpy);
}

export function restoreSelection(node: Node, selection: Selection) {

  const restoredSelection = traverseAndRestore(
    node,
    { startFound: false, currentChar: 0 },
    selection,
  );

  const range = document.createRange();
  range.setStart(node, 0);
  range.collapse(true);
  range.setEnd(restoredSelection.end.node, restoredSelection.end.position);
  range.setStart(restoredSelection.start.node, restoredSelection.start.position);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}

export function getSelection(node: Node) : Selection {
  const range = window.getSelection().getRangeAt(0);
  const preSelectionRange = range.cloneRange();
  preSelectionRange.selectNodeContents(node);
  preSelectionRange.setEnd(range.startContainer, range.startOffset);
  const start = preSelectionRange.toString().length;

  return {
    startOffset: start,
    endOffset: start + range.toString().length,
  };
}
