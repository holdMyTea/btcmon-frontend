import React from 'react'

export default (props) => (
  <div>
    <h3>Display:</h3>
    <ul>
      {props.activeSources.map(source => (<li>{source}</li>))}
    </ul>
  </div>
)
