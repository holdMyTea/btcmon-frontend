import {
  GET_SOURCES,
  SELECT_SOURCES,
  GET_SOURCES_SUCCESS,
  GET_SOURCES_FAILURE
} from '../actions/sources'

export default function (
  state = {
    isGettingSources: false,
    sourcesFailure: false,
    list: []
  },
  action
) {
  switch (action.type) {
    case GET_SOURCES:
      return {...state, isGettingSources: true}

    case GET_SOURCES_SUCCESS:
      const sources = []

      for (let i = 0; i < action.payload.sources.length; i++) {
        sources.push({
          id: i,
          name: action.payload.sources[i],
          isSelected: true
        })
      }

      return {
        isGettingSources: false,
        sourcesFailure: false,
        list: sources
      }

    case GET_SOURCES_FAILURE:
      return {...state, sourcesFailure: true}

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
