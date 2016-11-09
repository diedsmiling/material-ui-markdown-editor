import React from 'react'
import ReactDOM from 'react-dom'
import MarkdownEditor from '../MarkdownEditor'

const Example = () => (
  <div>
    <MarkdownEditor />
  </div>
)

const ROOT_NODE = document.getElementById('root')
console.log(ROOT_NODE)
ReactDOM.render(
  <Example />,
  ROOT_NODE
)
