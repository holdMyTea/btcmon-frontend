export const SET_START_DATE = 'SET_START_DATE'
export function setStartDate (date) {
  return setDate(date, SET_START_DATE)
}

export const SET_END_DATE = 'SET_END_DATE'
export function setEndDate (date) {
  return setDate(date, SET_END_DATE)
}

function setDate (date, type) {
  return {
    type: type,
    date: date
  }
}
