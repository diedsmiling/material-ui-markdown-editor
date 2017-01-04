import React, { PropTypes } from 'react'

const FlexWrapper = ({ children }) =>
  <div style={{ display: 'flex' }}>
    {children}
  </div>
export default FlexWrapper

FlexWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(
      PropTypes.element
    )
  ])
}
