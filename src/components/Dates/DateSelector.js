import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'

import DateElement from './DateElement'

let DateSelector = function ({ date, onDateChange }) {
  const selected = moment(date)
  const now = moment()

  const years = [selected.year(), selected.year() - 1].map(e => String(e))

  const months = selected.isBefore(now, 'year')
    ? moment.months()
    : moment.months().slice(0, now.month() + 1)

  const days = selected.isBefore(now, 'month')
    ? Array(now.clone().endOf('month').date()).fill().map((v, i) => String(i + 1)) // that clone() was painfull to figure out
    : Array(now.date()).fill().map((v, i) => String(i + 1))

  return (
    <div className='date-selector'>
      <DateElement options={months} current={moment.months()[selected.month()]}
        onChange={onChange('month', selected, onDateChange)}/>

      <DateElement options={days}
        current={String(selected.date())}
        onChange={onChange('date', selected, onDateChange)} />

      <DateElement options={years} current={String(selected.year())}
        onChange={onChange('year', selected, onDateChange)} />
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
