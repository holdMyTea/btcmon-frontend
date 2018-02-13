import React from 'react'
import PropTypes from 'prop-types'
import { GET_SOURCES } from '../actions'
import { connect } from 'react-redux'

let SourceButton = ({ dispatch }) => (
  <div>
    <button
      onClick={e => {
        e.preventDefault()
        dispatch(GET_SOURCES)
      }}
    >
      SOOQA
    </button>
  </div>
)

SourceButton.propTypes = {
  dispatch: PropTypes.func.isRequired
}

SourceButton = connect()(SourceButton)

export default SourceButton
