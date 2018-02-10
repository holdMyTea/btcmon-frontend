import React from 'react'

export default (props) => {
  console.log(props.availableSources)
  return (
    <div>
      {props.availableSources.map((source) => (
        <div>
          <input type='checkbox' key={source} id={source} onChange={props.handleChange} />
          <label htmlFor={source}>{source}</label>
        </div>
      ))}
    </div>)
}
