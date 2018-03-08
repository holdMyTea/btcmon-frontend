import React from 'react'
import PropTypes from 'prop-types'

const DataElement = ({ data, name }) => {
  return (
    <div>
      <h4>{name}</h4>
      <ul>
        {data.map(
          item =>
            (<li key={item.timestamp}>
              {item.timestamp + ' - ' + item.value}
            </li>)
        )}
      </ul>
    </div>
  )
}

DataElement.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      timestamp: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired
    })
  )
}

export default DataElement
