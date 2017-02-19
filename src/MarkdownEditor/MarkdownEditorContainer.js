import React, { PropTypes } from 'react'
import MarkdownEditor from './MarkdownEditor'

const MarkdownEditorContainer = ({ code, title }) => (
  <MarkdownEditor code={code} title={title} />
)

MarkdownEditorContainer.propTypes = {
  code: PropTypes.string,
  title: PropTypes.string
}

export default MarkdownEditorContainer
