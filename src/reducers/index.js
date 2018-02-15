import {
  GET_SOURCES,
  RECEIVE_SOURCES,
  SELECT_SOURCES
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

    case SELECT_SOURCES:
      return Object.assign({}, state, {
        sources: state.sources.map(
          source => source.id === action.id
            ? {...source, isSelected: !source.isSelected}
            : source
        )
      })

    default: return state
  }
}
