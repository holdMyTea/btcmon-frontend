import fetch from 'cross-fetch'

export const GET_SOURCES = 'GET_SOURCES'
export const getSources = {
  type: 'GET_SOURCES'
}

export const RECEIVE_SOURCES = 'RECEIVE_SOURCES'
function receiveSources (data) {
  return {
    type: RECEIVE_SOURCES,
    sources: data.title,
    receivedAt: Date.now()
  }
}

export function fetchSources () {
  return function (dispatch) {
    dispatch(getSources)

    // TODO: use axios instead
    return fetch('https://jsonplaceholder.typicode.com/posts/3')
      .then(
        response => response.json(),
        error => console.log('God dammit', error)
      )
      .then(
        json => dispatch(receiveSources(json))
      )
  }
}
