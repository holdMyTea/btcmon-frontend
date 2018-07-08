import React from 'react'
import { LineChart, XAxis, YAxis, Line } from 'recharts'
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
              : this.buildGraph()
  }

  buildGraph () {
    const formattedData = this.formatData(this.props.data)

    return (
      <LineChart width={this.state.width * 0.75}
        height={this.state.height * 0.8}
        data={formattedData}>

        {/* <XAxis type="number" height={100} tickFormatter={this.formatXAxis}/> */}
        <YAxis type="number" width={100} tickFormatter={this.formatYAxis}
          domain={['dataMin * 0.95', 'dataMax * 1.05']}
        />

        {
          this.props.selectedSources.map(
            source =>
              (<Line dataKey={source} key={source} type="monotone"/>)
          )
        }

      </LineChart>
    )
  }

  /**
   * Formats received data for recharts.
   * Transforms array of Souce objects, holding timestamp-value pair into one array with single timestamp
   * value and corresponding price for each Source.
   * @param {Array<Object>} rawData Array of Souce objects, holding timestamp-value pair
   * @param {String} rawData[].name Name of the source
   * @param {Object[]} rawData[].data Actual Source's dataset
   * @param {String} rawData[].data[].timestamp JS Date string value was valid for
   * @param {Number} rawData[].data[].value Price value
   * @returns {Array<Object>} Array with single timestamp and corresponding values for each Source.
   */
  formatData (rawData) {
    const formattedData = []

    for (let i = 0; i < rawData.reduce((acc, val) => Math.min(acc, val.data.length), Infinity); i++) {
      const element = {
        timestamp: moment(
          rawData.reduce(
            (acc, val) => (acc += moment(val.data[i].timestamp).unix()), 0
          ) / rawData.length).format()
      }

      rawData.forEach(source => (
        element[source.name] = source.data[i].value
      ))

      formattedData.push(element)
    }

    return formattedData
  }

  formatXAxis (tickItem) {
    return moment.unix(tickItem).format('M/D/YY HH:mm')
  }

  formatYAxis (tickItem) {
    return tickItem.toFixed(2)
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
