import { combineReducers } from 'redux'
import sources from './sources'
import dates from './dates'
import data from './data'

const reducers = combineReducers({
  sources,
  dates,
  data
})

export default reducers
