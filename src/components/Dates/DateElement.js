import React from 'react'
import PropTypes from 'prop-types'

const DateElement = ({ options, current, onChange }) => {
  const handleEvent = function (event) {
    onChange(event.target.value)
  }

  return (
    <select value={current} onChange={handleEvent}>
      {options.map(option =>
        (<option value={option} key={option}>{option}</option>))
      }
    </select>
  )
}

DateElement.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.string.isRequired
  ),
  current: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default DateElement
