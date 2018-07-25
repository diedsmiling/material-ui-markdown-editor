import * as React from 'react';

interface IEditorAreaProps {
  content?: string;
}

interface IEditorAreaState {
  content: string;
}

export default class EditorArea extends React.Component<IEditorAreaProps, IEditorAreaState> {
  static defaultProps: IEditorAreaProps = {
    content: '',
  };

  constructor(props: IEditorAreaProps) {
    super(props);
    this.state = {
      content: this.props.content,
    };
  }

  public render() {
    return (
      <div
        onInput={console.log}
        contentEditable
      >
        {this.state.content}
      </div>
    );
  }
}
