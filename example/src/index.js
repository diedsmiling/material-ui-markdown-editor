import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import MarkdownEditor from '../../dist'

const Example = () => (
  <MarkdownEditor />
);

ReactDOM.render(
  <Example />,
  document.getElementById('root')
);

