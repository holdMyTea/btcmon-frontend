import moment from 'moment'
import {
  SET_START_DATE,
  SET_END_DATE
} from '../actions/dates'

function straightTime (date1, date2) {
  return moment(date1).isAfter(date2)
    ? {
      startDate: date2,
      endDate: date1
    }
    : {
      startDate: date1,
      endDate: date2
    }
}

export default function (
  state = {
    startDate: moment().subtract(1, 'days').format(),
    endDate: moment().format()
  },
  action
) {
  switch (action.type) {
    case SET_START_DATE:
      return Object.assign({}, state, straightTime(action.date, state.endDate))

    case SET_END_DATE:
      return Object.assign({}, state, straightTime(action.date, state.startDate))

    default: return state
  }
}
