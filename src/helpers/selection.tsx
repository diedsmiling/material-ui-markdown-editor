import { Selection, SelectionSpy } from '../types'
//
// const seek = limit => (spy: sele, )
//

//function seekForStart(currentChar: number, nodeLength: number, )

function traverseAndRestore(node: Node, selectionSpy: SelectionSpy, selection: Selection, range: Range): SelectionSpy {
    return [ ...node.childNodes].reduce((acc: SelectionSpy, node: Node) => {
        if (node.nodeType === Node.TEXT_NODE) {
            let { startFound, currentChar} = acc;
            const nextChar = currentChar + node.textContent.length;

            if (
                !startFound &&
                selection.startOffset >= currentChar &&
                selection.startOffset <= nextChar
            ) {
                startFound = true;
                console.log('start', selection.startOffset - currentChar)
                range.setStart(node, selection.startOffset - currentChar);
            }

            if (startFound && selection.endOffset >= currentChar&& selection.endOffset <= nextChar) {
                range.setEnd(node, selection.endOffset - currentChar);
                console.log('end', selection.endOffset - currentChar);
            }

            return {
                startFound,
                currentChar: nextChar
            };
        } else {
          return traverseAndRestore(node, acc, selection, range);
        }
    },  selectionSpy);
}

export function restoreSelection(node: Node, selection: Selection) {
  const range = document.createRange();
  range.setStart(node, 0);
  range.collapse(true);
  return traverseAndRestore(
      node,
      { startFound: false, currentChar: 0 },
      selection,
      range
  )
}

export function getSelection(node: Node) : Selection {
  const range = window.getSelection().getRangeAt(0);
  const preSelectionRange = range.cloneRange();
  preSelectionRange.selectNodeContents(node);
  preSelectionRange.setEnd(range.startContainer, range.startOffset);
  const start = preSelectionRange.toString().length;

  return {
    startOffset: start,
    endOffset: start + range.toString().length
  }
}


/*
var saveSelection, restoreSelection;

if (window.getSelection && document.createRange) {
  saveSelection = function(containerEl) {
    var range = window.getSelection().getRangeAt(0);
    var preSelectionRange = range.cloneRange();
    preSelectionRange.selectNodeContents(containerEl);
    preSelectionRange.setEnd(range.startContainer, range.startOffset);
    var start = preSelectionRange.toString().length;

    return {
      start: start,
      end: start + range.toString().length
    }
  };

  restoreSelection = function(containerEl, savedSel) {
    var charIndex = 0, range = document.createRange();
    range.setStart(containerEl, 0);
    range.collapse(true);
    var nodeStack = [containerEl], node, foundStart = false, stop = false;

    while (!stop && (node = nodeStack.pop())) {
      if (node.nodeType == 3) {
        var nextCharIndex = charIndex + node.length;
        if (!foundStart && savedSel.start >= charIndex && savedSel.start <= nextCharIndex) {
          range.setStart(node, savedSel.start - charIndex);
          foundStart = true;
        }
        if (foundStart && savedSel.end >= charIndex && savedSel.end <= nextCharIndex) {
          range.setEnd(node, savedSel.end - charIndex);
          stop = true;
        }
        charIndex = nextCharIndex;
      } else {
        var i = node.childNodes.length;
        while (i--) {
          nodeStack.push(node.childNodes[i]);
        }
      }
    }

    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }
} else if (document.selection && document.body.createTextRange) {
  saveSelection = function(containerEl) {
    var selectedTextRange = document.selection.createRange();
    var preSelectionTextRange = document.body.createTextRange();
    preSelectionTextRange.moveToElementText(containerEl);
    preSelectionTextRange.setEndPoint("EndToStart", selectedTextRange);
    var start = preSelectionTextRange.text.length;

    return {
      start: start,
      end: start + selectedTextRange.text.length
    }
  };

  restoreSelection = function(containerEl, savedSel) {
    var textRange = document.body.createTextRange();
    textRange.moveToElementText(containerEl);
    textRange.collapse(true);
    textRange.moveEnd("character", savedSel.end);
    textRange.moveStart("character", savedSel.start);
    textRange.select();
  };
}

var savedSelection;

function doSave() {
  savedSelection = saveSelection( document.getElementById("editor") );
}

function doRestore() {
  if (savedSelection) {
    restoreSelection(document.getElementById("editor"), savedSelection);
  }
}
*/
