import React from 'react'
import {LineChart} from 'react-easy-chart'
import PropTypes from 'prop-types'
import moment from 'moment'

import ToolTip from './Tooltip'

class DataGraph extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      width: 0,
      height: 0,
      tooltip: {
        show: false
      }
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    this.mouseOverHandler = this.mouseOverHandler.bind(this)
    this.mouseOutHandler = this.mouseOutHandler.bind(this)
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
      <div>
        <LineChart axes
          dataPoints
          grid
          verticalGrid
          xType={'time'}
          data={this.formatData(this.props.data)}
          width={750}
          height={500}
          datePattern={'%d/%m %H:%M'}
          tickTimeDisplayFormat={'%d/%m %H:%M'}
          mouseOverHandler={this.mouseOverHandler}
          mouseOutHandler={this.mouseOutHandler}
        />
        {this.createTooltip()}
      </div>
    )
  }

  createTooltip () {
    if (this.state.tooltip.show) {
      return (
        <ToolTip top={this.state.tooltip.top} left={this.state.tooltip.left}>
          Costed ${this.state.tooltip.y} at {this.state.tooltip.x}
        </ToolTip>
      )
    }
  }

  mouseOverHandler (d, e) {
    console.log('x: ' + e.clientX + ', y: ' + e.clientY)
    this.setState({
      tooltip: {
        show: true,
        top: e.clientY,
        left: e.clientX,
        x: d.x,
        y: d.y
      }
    })
  }

  mouseOutHandler () {
    this.setState({
      tooltip: {
        show: false
      }
    })
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
