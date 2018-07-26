import moment from 'moment'
import {
  GET_DATA,
  GET_DATA_SUCCESS,
  GET_DATA_FAILURE
} from '../actions/data'

export default function (
  state = {
    isGettingData: false,
    dataFailure: false,
    list: [],
    actualFor: {}
  },
  action
) {
  switch (action.type) {
    case GET_DATA:
      return {...state, isGettingData: true}

    case GET_DATA_SUCCESS:
      return {
        isGettingData: false,
        dataFailure: false,
        list: action.payload.data,
        actualFor: {
          startDate: moment(Number(action.payload.startDate)).format(),
          endDate: moment(Number(action.payload.endDate)).format(),
          sources: action.payload.sources
        }
      }

    case GET_DATA_FAILURE:
      return {...state, dataFailure: true, isGettingData: false}

    default: return state
  }
}
