import axios from 'axios'
import moment from 'moment'

export const GET_DATA = 'GET_DATA'
function getData () {
  return {
    type: GET_DATA
  }
}

export const RECEIVE_DATA = 'RECEIVE_DATA'
function receiveData (data, startDate, endDate, sources) {
  return {
    type: RECEIVE_DATA,
    data: data,
    startDate: moment(startDate).format(),
    endDate: moment(endDate).format(),
    sources: sources
  }
}

export function fetchData (startDate, endDate, sources) {
  return function (dispatch) {
    dispatch(getData())

    const url = 'http://localhost:8080/' + moment(startDate).valueOf() + '/' + moment(endDate).valueOf() + '/' +
    sources.reduce((acc, val) => acc + '/' + val)

    console.log('url: ' + url)

    return axios.get(url)
      .then(
        response => {
          // var name imagination 80 lvl
          dispatch(receiveData(response.data.data, startDate, endDate, sources))
        },
        error => console.log('God dammit', error)
      )
  }
}
