import React from 'react'
import PropTypes from 'prop-types'

const SourceList = ({ list, onSourceClick, isGettingSources, sourcesFailure }) => {
  return isGettingSources ? (<h3>Loading...</h3>)
    : sourcesFailure ? (<h3>Unable to get sources</h3>)
      : list[0] ? (
        <ul className='sources-list'>{
          list.map(source => (
            <li key={source.id}
              onClick={() => onSourceClick(source.id)}
              className={source.isSelected ? ['selected-source'] : ['deselected-source']}
              style={source.isSelected ? {color: 'white', background: source.color} : {}}
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
  isGettingSources: PropTypes.bool.isRequired,
  sourcesFailure: PropTypes.bool.isRequired
}

export default SourceList
