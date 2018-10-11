import { Selection, SelectionSpy } from '../types';

function traverseAndRestore(
  node: Node,
  selectionSpy: SelectionSpy,
  selection: Selection,
): SelectionSpy {
  return [...node.childNodes].reduce((acc: SelectionSpy, node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      let { startFound, start, end } = acc;
      const { currentChar } = acc;
      const nextChar = currentChar + node.textContent.length;

      if (
        !startFound &&
        selection.startOffset >= currentChar &&
        selection.startOffset <= nextChar
      ) {
        startFound = true;
        start = {
          node,
          position: selection.startOffset - currentChar,
        };
      }

      if (startFound && selection.endOffset >= currentChar && selection.endOffset <= nextChar) {
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

  const res = traverseAndRestore(
    node,
    { startFound: false, currentChar: 0 },
    selection,
  );

  const range = document.createRange();
  range.setStart(node, 0);
  range.collapse(true);
  range.setEnd(res.end.node, res.end.position);
  range.setStart(res.start.node, res.start.position);
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
