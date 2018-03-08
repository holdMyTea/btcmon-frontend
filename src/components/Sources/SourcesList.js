import React from 'react'
import PropTypes from 'prop-types'

import styles from './SourcesList.css'

const SourceList = ({ list, onSourceClick, isGettingSources }) => {
  return isGettingSources ? (<h3>Loading...</h3>)
    : list[0] ? (
      <ul>{
        list.map(source => (
          <li key={source.id}
            onClick={() => onSourceClick(source.id)}
            className={source.isSelected ? styles['selected-source'] : styles['deselected-source']}
          >{source.name}</li>
        ))}
      </ul>) : (<h3>No sources yet</h3>)
}

SourceList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      isSelected: PropTypes.bool.isRequired
    })
  ).isRequired,
  onSourceClick: PropTypes.func.isRequired,
  isGettingSources: PropTypes.bool.isRequired
}

export default SourceList
