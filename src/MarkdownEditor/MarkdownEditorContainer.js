import React, { PropTypes } from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'  // eslint-disable-line
import MarkdownEditor from './MarkdownEditor'

const MarkdownEditorContainer = ({ code, title }) => (
  <MarkdownEditor code={code} title={title} />
)

MarkdownEditorContainer.propTypes = {
  code: PropTypes.string,
  title: PropTypes.string
}

export default MarkdownEditorContainer
