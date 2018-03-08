import {
  GET_DATA,
  RECEIVE_DATA
} from '../actions/data'

export default function (
  state = {
    isGettingData: false,
    list: [],
    actualFor: {}
  },
  action
) {
  switch (action.type) {
    case GET_DATA:
      return {...state, isGettingData: true}

    case RECEIVE_DATA:
      return {
        isGettingData: false,
        list: action.data,
        actualFor: {
          startDate: action.startDate,
          endDate: action.endDate,
          sources: action.sources
        }
      }

    default: return state
  }
}
