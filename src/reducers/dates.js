import moment from 'moment'
import {
  SET_START_DATE,
  SET_END_DATE
} from '../actions/dates'

function straightTime (date1, date2) {
  const dateline = moment(date1).isAfter(date2)
    ? {
      startDate: date2,
      endDate: date1
    }
    : {
      startDate: date1,
      endDate: date2
    }

  dateline.startDate = moment(dateline.startDate).hour(0).minute(0).second(0).format()
  dateline.endDate = moment(dateline.endDate).hour(23).minute(59).second(59).format()

  return dateline
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
      return straightTime(action.date, state.endDate)

    case SET_END_DATE:
      return straightTime(action.date, state.startDate)

    default: return state
  }
}
