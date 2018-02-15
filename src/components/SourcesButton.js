import React from 'react'
import PropTypes from 'prop-types'

let SourceButton = ({ isGettingSources, onSourcesButtonClick }) => (
  <button
    onClick={e => {
      e.preventDefault()
      onSourcesButtonClick()
    }}
    disabled={isGettingSources}
  >
    SOOQA
  </button>
)

SourceButton.propTypes = {
  isGettingSources: PropTypes.bool.isRequired,
  onSourcesButtonClick: PropTypes.func.isRequired
}

export default SourceButton
