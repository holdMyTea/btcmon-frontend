import React from 'react'
import PropTypes from 'prop-types'

import styles from './SourcesList.css'

let SourceList = function ({ sources, onSourceClick }) {
  let component

  if (sources[0]) {
    const list = sources.map(source => (
      <li key={source.id}
        onClick={() => onSourceClick(source.id)}
        className={source.isSelected ? styles['selected-source'] : styles['deselected-source']}
      >{source.name}</li>
    ))

    component = (
      <ul>
        {list}
      </ul>)
  } else {
    component =
      (<h3>No sources yet</h3>)
  }

  return component
}

SourceList.propTypes = {
  sources: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      isSelected: PropTypes.bool.isRequired
    })
  ).isRequired,
  onSourceClick: PropTypes.func.isRequired
}

export default SourceList
