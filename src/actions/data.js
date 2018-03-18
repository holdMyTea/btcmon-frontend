import { RSAA } from 'redux-api-middleware'
import moment from 'moment'

export const GET_DATA = 'GET_DATA'
export const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS'
export const GET_DATA_FAILURE = 'GET_DATA_FAILURE'

export const getData = (startDate, endDate, sources) => ({
  [RSAA]: {
    endpoint: 'http://localhost:8080/' + moment(startDate).valueOf() + '/' +
      moment(endDate).valueOf() + '/' + sources.reduce((acc, val) => acc + '/' + val),
    method: 'GET',
    types: [GET_DATA, GET_DATA_SUCCESS, GET_DATA_FAILURE]
  }
})
