import React from 'react'

import Sources from './Sources.js'
import Display from './Display.js'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      availableSources: ['Kappa', 'Keepo'],
      activeSources: []
    }

    this.handleSourceChange = this.handleSourceChange.bind(this)
  }

  render () {
    return (
      <div>
        <Sources availableSources={this.state.availableSources} handleChange={this.handleSourceChange} />
        <Display activeSources={this.state.activeSources} />
      </div>
    )
  }

  handleSourceChange (e) {
    if (e.target.checked) {
      const newActive = {activeSources: [e.target.id, ...this.state.activeSources]}
      this.setState(
        Object.assign({}, this.state, newActive)
      )
      console.log(this.state.activeSources)
    } else {
      this.setState(
        Object.assign({}, this.state, {activeSources: this.stateactiveSources.filter(item => item !== e.target.id) || []})
      )
    }
  }
}
