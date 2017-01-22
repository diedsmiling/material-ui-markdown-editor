import React, { PropTypes } from 'react'

const FlexWrapper = ({ children }, context) => {
  console.log(context)
  return (
    <div style={{ display: 'flex' }}>
      {children}
    </div>
  )
}
export default FlexWrapper

FlexWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(
      PropTypes.element
    )
  ])
}
