import { connect } from 'react-redux'
import React from 'react'
import PropTypes from 'prop-types'

import { fetchSources, selectSources } from '../actions/sources'
import SourcesList from '../components/Sources/SourcesList'

class Sources extends React.Component {
  componentDidMount () {
    this.props.onSourcesDidMount()
  }

  render () {
    return (
      <SourcesList list={this.props.list} onSourceClick={this.props.onSourceClick}
        isGettingSources={this.props.isGettingSources}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    isGettingSources: state.sources.isGettingSources,
    list: state.sources.list
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
  list: PropTypes.arrayOf(
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
