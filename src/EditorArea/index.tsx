import * as React from 'react';
import * as ReactDOM from 'react-dom';

import sanitize from '../helpers/sanitize';
import restoreSelection from '../helpers/restoreSelection';

interface IEditorAreaProps {
  content?: string;
}

interface IEditorAreaState {
  content: string;
  startOffset?: number;
  endOffset?: number;
}

export default class EditorArea extends React.Component<IEditorAreaProps, IEditorAreaState> {
  static defaultProps: IEditorAreaProps = {
    content: '',
  };

  htmlEl: Element | null = null;

  constructor(props: IEditorAreaProps) {
    super(props);
    this.state = {
      content: this.props.content,
    };
  }

  updateContent = (evt: React.SyntheticEvent<any>) => {
    const { startOffset, endOffset } = document.getSelection().getRangeAt(0);
    console.log(startOffset, endOffset);
    this.setState({ startOffset, endOffset, content: this.htmlEl.textContent });
  }

  componentDidUpdate() {
    console.log(ReactDOM.findDOMNode(this.htmlEl).childNodes);
    const textNode = ReactDOM.findDOMNode(this.htmlEl)
    restoreSelection(textNode, this.state.startOffset, this.state.endOffset);
  }

  public render() {
    return (
      <div
        ref={e => this.htmlEl = e}
        onInput={this.updateContent}
        contentEditable
        dangerouslySetInnerHTML={{ __html: sanitize(this.state.content) }}
      />
    );
  }
}

// const restoreSelection = function (containerEl, savedSel) {
//   let charIndex = 0;
//   const range = document.createRange();
//   range.setStart(containerEl, 0);
//   range.collapse(true);
//   const nodeStack = [containerEl];
//   let node;
//   let foundStart = false;
//   let stop = false;
//
//   while (!stop && (node = nodeStack.pop())) {
//     console.log(node.nodeType)
//     if (node.nodeType === 3) {
//       const nextCharIndex = charIndex + node.length;
//       if (!foundStart && savedSel.start >= charIndex && savedSel.start <= nextCharIndex) {
//         range.setStart(node, savedSel.start - charIndex);
//         foundStart = true;
//       }
//       if (foundStart && savedSel.end >= charIndex && savedSel.end <= nextCharIndex) {
//         range.setEnd(node, savedSel.end - charIndex);
//         stop = true;
//       }
//       charIndex = nextCharIndex;
//     } else {
//       let i = node.childNodes.length;
//       while (i--) {
//         nodeStack.push(node.childNodes[i]);
//       }
//     }
//   }
//
//   const sel = window.getSelection();
//   sel.removeAllRanges();
//   sel.addRange(range);
// }
