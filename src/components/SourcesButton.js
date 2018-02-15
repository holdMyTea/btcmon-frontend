import React from 'react'
import PropTypes from 'prop-types'

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

export default SourceButton
