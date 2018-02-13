import {
  GET_SOURCES,
  RECEIVE_SOURCES
} from '../actions'

export default function (
  state = {
    isGettingSources: false,
    sources: []
  },
  action
) {
  switch (action.type) {
    case GET_SOURCES:
      return Object.assign({}, state, {
        isGettingSources: true
      })

    case RECEIVE_SOURCES:
      return Object.assign({}, state, {
        isGettingSources: false,
        sources: action.sources,
        receivedAt: action.receivedAt
      })

    default: return state
  }
}
