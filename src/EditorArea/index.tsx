import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Selection} from "../types";
import sanitize from '../helpers/sanitize';
import { restoreSelection, getSelection } from '../helpers/selection';

interface IEditorAreaProps {
  content?: string;
}

interface IEditorAreaState {
  content: string;
  startOffset?: number;
  endOffset?: number;
}


const newline = '\n';

function nl2br(text) {
    if (typeof text === 'number') {
        return text;
    } else if (typeof text !== 'string') {
        return '';
    }

    let lines = text.split(newline);
    return lines.map(function(line, i) {
        return (
            <span key={i}>
                {line}
                <br/>
            </span>
        );
    });
}

export default class EditorArea extends React.Component<IEditorAreaProps, IEditorAreaState> {
  static defaultProps: IEditorAreaProps = {
    content: '',
  };

  htmlEl: HTMLElement | null = null;

  constructor(props: IEditorAreaProps) {
    super(props);
    this.state = {
      content: this.props.content,
    };
  }

  updateSelection() {
    this.setState({ ...getSelection(this.htmlEl) });
  }

  updateContent = (evt: React.SyntheticEvent<any>) => {
    this.updateSelection();
    this.setState({ content: this.htmlEl.innerText });
  }

  componentDidUpdate() {
    const textNode = ReactDOM.findDOMNode(this.htmlEl)
    const { startOffset, endOffset } = this.state;
    restoreSelection(textNode, { startOffset, endOffset });
  }

  public render() {
    return (
      <div
        style={{whiteSpace: "pre-line"}}
        ref={e => this.htmlEl = e}
        onInput={this.updateContent}
        contentEditable
        dangerouslySetInnerHTML={{ __html: sanitize(this.state.content) }}
      />
    );
  }
}

