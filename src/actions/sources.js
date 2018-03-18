import { RSAA } from 'redux-api-middleware'

export const GET_SOURCES = 'GET_SOURCES'
export const GET_SOURCES_SUCCESS = 'GET_SOURCES_SUCCESS'
export const GET_SOURCES_FAILURE = 'GET_SOURCES_FAILURE'

export const getSources = () => ({
  [RSAA]: {
    endpoint: 'http://localhost:8080/sources',
    method: 'GET',
    types: [GET_SOURCES, GET_SOURCES_SUCCESS, GET_SOURCES_FAILURE]
  }
})

export const SELECT_SOURCES = 'SELECT_SOURCES'
export function selectSources (id) {
  return {
    type: SELECT_SOURCES,
    id: id
  }
}
