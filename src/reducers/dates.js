import moment from 'moment'
import {
  SET_START_DATE,
  SET_END_DATE
} from '../actions/dates'

export default function (
  state = {
    startDate: moment().format(),
    endDate: moment().subtract(1, 'days').format()
  },
  action
) {
  switch (action.type) {
    case SET_START_DATE:
      return Object.assign({}, state, {
        startDate: action.date
      })

    case SET_END_DATE:
      return Object.assign({}, state, {
        endDate: action.date
      })

    default: return state
  }
}
