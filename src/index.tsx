import * as React from 'react';
import EditorArea from './EditorArea';

export default class MarkdownEditor extends React.Component <{}> {
  render() {
    return (
      <EditorArea content="Let's finish this **awesome** editor" />
    );
  }
}
