import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { apiMiddleware } from 'redux-api-middleware'
import { createLogger } from 'redux-logger'

import reducers from './reducers'
import App from './components/App.js'
import './misc/styles/main.scss'

const loggerMiddleware = createLogger()

const store = createStore(
  reducers,
  applyMiddleware(
    apiMiddleware,
    loggerMiddleware
  )
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
