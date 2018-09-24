import * as React from 'react';
import * as ReactDOM from 'react-dom'

// import highlight from '../helpers/highlight';
import getTextNode from '../helpers/getTextNode';

interface IEditorAreaProps {
  content?: string;
}

interface IEditorAreaState {
  content: string;
  offest?: number;
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
    const range = document.getSelection().getRangeAt(0);
    this.setState({ content: this.htmlEl.textContent, offest: range.startOffset });
  }

  componentDidUpdate() {
    const selection = window.getSelection();

    const range = document.createRange();
    const textNode = getTextNode(ReactDOM.findDOMNode(this.htmlEl))

    range.setStart(textNode, 2);
    range.setEnd(textNode, 3);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  public render() {
    return (
      <div
        ref={e => this.htmlEl = e}
        onInput={this.updateContent}
        contentEditable
        dangerouslySetInnerHTML={{ __html: this.state.content }}
      />
    );
  }
}
