import React from 'react'
import PropTypes from 'prop-types'

const ToolTip = (props) => (
  <div className="tooltip" style={{top: props.top, left: props.left}}>
    {props.children}
  </div>
)

ToolTip.propTypes = {
  left: PropTypes.number,
  top: PropTypes.number,
  children: PropTypes.node
}

export default ToolTip
