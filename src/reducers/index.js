import { combineReducers } from 'redux'
import sources from './sources'
import dates from './dates'

const reducers = combineReducers({
  sources,
  dates
})

export default reducers
