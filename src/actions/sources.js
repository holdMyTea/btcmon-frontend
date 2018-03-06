import axios from 'axios'

export const GET_SOURCES = 'GET_SOURCES'
function getSources () {
  return {
    type: GET_SOURCES
  }
}

export const RECEIVE_SOURCES = 'RECEIVE_SOURCES'
function receiveSources (sources) {
  return {
    type: RECEIVE_SOURCES,
    sources: sources,
    receivedAt: Date.now()
  }
}

export const SELECT_SOURCES = 'SELECT_SOURCES'
export function selectSources (id) {
  return {
    type: SELECT_SOURCES,
    id: id
  }
}

export function fetchSources () {
  return function (dispatch) {
    dispatch(getSources())

    return axios.get('http://localhost:8080/sources')
      .then(
        response => {
          const sources = []

          for (let i = 0; i < response.data.sources.length; i++) {
            sources.push({
              id: i,
              name: response.data.sources[i],
              isSelected: true
            })
          }

          dispatch(receiveSources(sources))
        },
        error => console.log('God dammit', error)
      )
  }
}
