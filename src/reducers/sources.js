import {
  GET_SOURCES,
  RECEIVE_SOURCES,
  SELECT_SOURCES
} from '../actions/sources'

export default function (
  state = {
    isGettingSources: false,
    list: []
  },
  action
) {
  switch (action.type) {
    case GET_SOURCES:
      return {...state, isGettingSources: true}

    case RECEIVE_SOURCES:
      return {
        isGettingSources: false,
        list: action.sources,
        receivedAt: action.receivedAt
      }

    case SELECT_SOURCES:
      return {...state,
        list: state.list.map(
          source => source.id === action.id
            ? {...source, isSelected: !source.isSelected}
            : source
        )
      }

    default: return state
  }
}
