import React from 'react'
import Sources from '../containers/Sources'
import Dates from '../containers/Dates'
import Data from '../containers/Data'

const App = () => (
  <div className='app'>
    <div className='left-column'>
      <Sources />
      <Dates />
    </div>
    <div className="right-column">
      <Data />
    </div>
  </div>
)

export default App
