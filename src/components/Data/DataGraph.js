import React from 'react'
import {LineChart} from 'react-easy-chart'
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
    return (
      <LineChart axes
        xType={'time'}
        data={this.formatData(this.props.data)}
        width={750}
        height={500}
        datePattern={'%d/%m %H:%M'}
      />
    )
  }

  formatData (rawData) {
    const formattedData = []

    rawData.forEach(source => {
      formattedData.push(
        source.data.map(record => ({
          x: moment(record.timestamp).format('DD/MM HH:mm'),
          y: record.value
        }))
      )
    })

    return formattedData
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
