import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'

import DateElement from './DateElement'

let DateSelector = function ({ date, onDateChange }) {
  const current = moment(date)

  return (
    <div className='date-selector'>
      <DateElement options={moment.months()} current={moment.months()[current.month()]}
        onChange={onChange('month', current, onDateChange)}/>

      <DateElement options={Array(current.clone().endOf('month').date()).fill().map((v, i) => String(i))} // that clone() was painfull to figure out
        current={String(current.date())}
        onChange={onChange('date', current, onDateChange)} />
    </div>
  )
}

const onChange = function (setMethod, currentDate, onDateChange) {
  return function (newValue) {
    const newDate = currentDate.clone()[setMethod](newValue)
    onDateChange(newDate.format())
  }
}

DateSelector.propTypes = {
  date: PropTypes.string.isRequired,
  onDateChange: PropTypes.func.isRequired
}

export default DateSelector
