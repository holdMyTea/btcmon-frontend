import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

let SourceList = function ({ sources }) {
  let component

  if (sources[0]) {
    const list = sources.map(source => (
      <ul key={source}>{source}</ul>
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

const mapStateToProps = state => {
  return {
    sources: state.sources
  }
}

SourceList.propTypes = {
  sources: PropTypes.arrayOf(
    PropTypes.string
  ).isRequired
}

SourceList = connect(
  mapStateToProps
)(SourceList)

export default SourceList
