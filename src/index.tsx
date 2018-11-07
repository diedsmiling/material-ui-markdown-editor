import * as React from 'react';
import EditorArea from './EditorArea';

const content = `Let's finish this **awesome** editor 
new line
new

`

export default class MarkdownEditor extends React.Component <{}> {
  render() {
    return (
      <EditorArea content={content} />
    );
  }
}
