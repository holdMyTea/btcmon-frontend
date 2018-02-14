import fetch from 'cross-fetch'

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

export function fetchSources () {
  return function (dispatch) {
    dispatch(getSources())

    // TODO: use axios instead
    return fetch('https://jsonplaceholder.typicode.com/posts')
      .then(
        response => response.json(),
        error => console.log('God dammit', error)
      )
      .then(
        json => {
          const sources = []
          for (let source of json) {
            sources.push(source.title)
          }
          dispatch(receiveSources(sources))
        }
      )
  }
}
