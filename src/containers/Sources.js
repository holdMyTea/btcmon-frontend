import { connect } from 'react-redux'
import React from 'react'
import PropTypes from 'prop-types'

import { getSources, selectSources } from '../actions/sources'
import SourcesList from '../components/Sources/SourcesList'

class Sources extends React.Component {
  componentDidMount () {
    this.props.onSourcesDidMount()
  }

  render () {
    return (
      <SourcesList list={this.props.list} onSourceClick={this.props.onSourceClick}
        isGettingSources={this.props.isGettingSources} sourcesFailure={this.props.sourcesFailure}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    isGettingSources: state.sources.isGettingSources,
    sourcesFailure: state.sources.sourcesFailure,
    list: state.sources.list
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSourcesDidMount: () => dispatch(getSources()),
    onSourceClick: (id) => dispatch(selectSources(id))
  }
}

Sources.propTypes = {
  isGettingSources: PropTypes.bool.isRequired,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      isSelected: PropTypes.bool.isRequired
    })
  ).isRequired,
  onSourceClick: PropTypes.func.isRequired,
  onSourcesDidMount: PropTypes.func.isRequired,
  sourcesFailure: PropTypes.bool.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sources)
