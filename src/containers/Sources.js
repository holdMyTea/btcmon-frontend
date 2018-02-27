import { fetchSources, selectSources } from '../actions'
import { connect } from 'react-redux'
import React from 'react'
import PropTypes from 'prop-types'

import SourcesList from '../components/SourcesList'

class Sources extends React.Component {
  componentDidMount () {
    this.props.onSourcesDidMount()
  }

  render () {
    return (
      <SourcesList sources={this.props.sources} onSourceClick={this.props.onSourceClick}
        isGettingSources={this.props.isGettingSources}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    isGettingSources: state.isGettingSources,
    sources: state.sources
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSourcesDidMount: () => dispatch(fetchSources()),
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
  onSourceClick: PropTypes.func.isRequired,
  onSourcesDidMount: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sources)
