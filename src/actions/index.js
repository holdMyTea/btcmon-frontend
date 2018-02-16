import axios from 'axios'

export const GET_SOURCES = 'GET_SOURCES'
function getSources () {
  return {
    type: 'GET_SOURCES'
  }
}

export const RECEIVE_SOURCES = 'RECEIVE_SOURCES'
function receiveSources (data) {
  return {
    type: RECEIVE_SOURCES,
    sources: data,
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

    // TODO: use axios instead
    return axios.get('http://localhost:8080/sources')
      .then(
        response => response.json(),
        error => console.log('God dammit', error)
      )
      .then(
        json => {
          console.log('json: ' + json)
          dispatch(receiveSources(json))
        }
      )
  }
}
