import React from 'react'
import PropTypes from 'prop-types'
import { fetchSources } from '../actions'
import { connect } from 'react-redux'

let SourceButton = ({ isGettingSources, onSourcesButtonClick }) => (
  <div>
    <button
      onClick={e => {
        e.preventDefault()
        onSourcesButtonClick()
      }}
      disabled={isGettingSources}
    >
      SOOQA
    </button>
  </div>
)

SourceButton.propTypes = {
  isGettingSources: PropTypes.bool.isRequired,
  onSourcesButtonClick: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    isGettingSources: state.isGettingSources
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSourcesButtonClick: () => dispatch(fetchSources())
  }
}

SourceButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(SourceButton)

export default SourceButton
