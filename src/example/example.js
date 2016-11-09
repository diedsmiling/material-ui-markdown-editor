import React from 'react'
import ReactDOM from 'react-dom'
import MarkdownEditor from '../MarkdownEditor'

const Example = () => (
  <div>
    <MarkdownEditor />
  </div>
)

ReactDOM.render(
  <Example />,
  document.getElementById('root')
)
