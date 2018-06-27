import React from 'react'
import { LineChart, YAxis, Line } from 'recharts'
import PropTypes from 'prop-types'
import moment from 'moment'

class DataGraph extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      width: 0,
      height: 0
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  componentDidMount () {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  render () {
    return this.props.isGettingSources ? (<h3>Waiting for the sources update</h3>)
      : this.props.isGettingData || this.props.data.length === 0 ? (<h3>Waiting for the data</h3>)
        : this.props.sourcesFailure ? (<h3>Failed to get sources</h3>)
          : this.props.dataFailure ? (<h3>Failed to get data</h3>)
            : this.props.selectedSources.length === 0 ? (<h3>No sources selected</h3>)
              : (
                <LineChart width={this.state.width * 0.75}
                  height={this.state.height * 0.5}
                  data={this.formatData(this.props.data)}>

                  <YAxis type="number" domain={this.computeDomain(this.props.data)} width={100} />
                  {
                    this.props.selectedSources.map(
                      source =>
                        (<Line dataKey={source} key={source} type="monotone"/>)
                    )
                  }

                </LineChart>
              )
  }

  formatData (data) {
    const formattedData = []

    for (let i = 0; i < data.reduce((acc, val) => Math.min(acc, val.data.length), Infinity); i++) {
      const element = {
        timestamp: moment(
          data.reduce(
            (acc, val) => (acc += moment(val.data[i].timestamp).unix()), 0
          ) / data.length).format()
      }

      data.forEach(source => (
        element[source.name] = source.data[i].value
      ))

      formattedData.push(element)
    }

    return formattedData
  }

  computeDomain (data) {
    let min = Infinity
    let max = -Infinity

    data.forEach(source => {
      source.data.forEach(e => {
        min = Math.min(min, e.value)
        max = Math.max(max, e.value)
      })
    })

    const diff = (max - min) * 0.05

    return [min - diff, max + diff]
  }

  updateWindowDimensions () {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }
}

DataGraph.propTypes = {
  isGettingSources: PropTypes.bool.isRequired,
  isGettingData: PropTypes.bool.isRequired,
  sourcesFailure: PropTypes.bool.isRequired,
  dataFailure: PropTypes.bool.isRequired,
  selectedSources: PropTypes.arrayOf(
    PropTypes.string
  ).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          timestamp: PropTypes.string.isRequired,
          value: PropTypes.number.isRequired
        })
      )
    })
  )
}

export default DataGraph
