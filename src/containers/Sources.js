import { fetchSources, selectSources } from '../actions'
import { connect } from 'react-redux'
import React from 'react'
import PropTypes from 'prop-types'

import SourcesButton from '../components/SourcesButton'
import SourcesList from '../components/SourcesList'

let Sources = ({ isGettingSources, onSourcesButtonClick, sources, onSourceClick }) => (
  <div>
    <SourcesButton isGettingSources={isGettingSources} onSourcesButtonClick={onSourcesButtonClick} />
    <SourcesList sources={sources} onSourceClick={onSourceClick} />
  </div>
)

const mapStateToProps = state => {
  return {
    isGettingSources: state.isGettingSources,
    sources: state.sources
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSourcesButtonClick: () => dispatch(fetchSources()),
    onSourceClick: (id) => dispatch(selectSources(id))
  }
}

Sources.propTypes = {
  isGettingSources: PropTypes.bool.isRequired,
  sources: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      isSelected: PropTypes.bool.isRequired
    })
  ).isRequired,
  onSourcesButtonClick: PropTypes.func.isRequired,
  onSourceClick: PropTypes.func.isRequired
}

Sources = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sources)

export default Sources
