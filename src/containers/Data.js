import { connect } from 'react-redux'
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { getData } from '../actions/data'
import DataGraph from '../components/Data/DataGraph'

class Data extends React.Component {
  componentDidUpdate (prevProps, prevState) {
    this.checkForUpdates()
  }

  render () {
    return (
      <DataGraph isGettingSources={this.props.isGettingSources}
        isGettingData={this.props.isGettingData}
        sourcesFailure={this.props.sourcesFailure}
        dataFailure={this.props.dataFailure}
        colors={this.props.selectedSources.map(source => source.color)}
        data={this.props.data} />
    )
  }

  checkForUpdates () {
    if (
      !(
        (this.props.isGettingData || this.props.isGettingSources) ||
        (this.props.selectedSources.length === 0) ||
        (
          (this.props.startDate === this.props.dataActualFor.startDate) &&
          (this.props.endDate === this.props.dataActualFor.endDate) &&
          (
            this.props.selectedSources.every(
              source => this.props.dataActualFor.sources.includes(source.name)
            )
          )
        )
      )
    ) {
      this.props.onDataUpdate(
        moment(this.props.startDate).valueOf(),
        moment(this.props.endDate).valueOf(),
        this.props.selectedSources
      )
    }
  }
}

const mapStateToProps = state => {
  const selectedSources = state.sources.list.filter(
    source => source.isSelected
  ).map(source => ({name: source.name, color: source.color}))

  return {
    isGettingSources: state.sources.isGettingSources,
    sourcesFailure: state.sources.sourcesFailure,
    isGettingData: state.data.isGettingData,
    dataFailure: state.data.dataFailure,
    dataActualFor: state.data.actualFor,
    data: state.data.list.filter(dataset =>
      selectedSources.map(source => source.name).includes(dataset.name)
    ),
    startDate: state.dates.startDate,
    endDate: state.dates.endDate,
    selectedSources: selectedSources
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDataUpdate: (startDate, endDate, sources) => dispatch(
      getData(startDate, endDate, sources.map(source => source.name))
    )
  }
}

Data.propTypes = {
  isGettingSources: PropTypes.bool.isRequired,
  sourcesFailure: PropTypes.bool.isRequired,
  isGettingData: PropTypes.bool.isRequired,
  dataFailure: PropTypes.bool.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  selectedSources: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      color: PropTypes.string
    })
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
  ),
  dataActualFor: PropTypes.shape({
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    sources: PropTypes.arrayOf(
      PropTypes.string
    )
  }),
  onDataUpdate: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Data)
