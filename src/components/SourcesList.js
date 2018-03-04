import React from 'react'
import PropTypes from 'prop-types'

import styles from './SourcesList.css'

let SourceList = function ({ list, onSourceClick, isGettingSources }) {
  let component

  if (isGettingSources) {
    component =
      (<h3>Loading...</h3>)
  } else if (list[0]) {
    const items = list.map(source => (
      <li key={source.id}
        onClick={() => onSourceClick(source.id)}
        className={source.isSelected ? styles['selected-source'] : styles['deselected-source']}
      >{source.name}</li>
    ))

    component = (
      <ul>
        {items}
      </ul>)
  } else {
    component =
      (<h3>No sources yet</h3>)
  }

  return component
}

SourceList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      isSelected: PropTypes.bool.isRequired
    })
  ).isRequired,
  onSourceClick: PropTypes.func.isRequired
}

export default SourceList
