import { setStartDate, setEndDate } from '../actions/dates'
import { connect } from 'react-redux'
import React from 'react'
import PropTypes from 'prop-types'

import DateSelector from '../components/Dates/DateSelector'

class Dates extends React.Component {
  render () {
    return (
      <div>
        <DateSelector date={this.props.startDate} onDateChange={this.props.onStartDateChange}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    startDate: state.dates.startDate,
    endDate: state.dates.endDate
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onStartDateChange: (newDate) => dispatch(setStartDate(newDate)),
    onEndDateChange: (newDate) => dispatch(setEndDate(newDate))
  }
}

Dates.propTypes = {
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  onStartDateChange: PropTypes.func.isRequired,
  onEndDateChange: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dates)
