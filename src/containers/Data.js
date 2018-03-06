import { connect } from 'react-redux'
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { fetchData } from '../actions/data'
import DataElement from '../components/Data/DataElement'

class Data extends React.Component {
  componentDidUpdate (prevProps, prevState) {
    this.checkForUpdates()
  }

  render () {
    if (this.props.isGettingSources) {
      return (<h3>Waiting for the sources update</h3>)
    } else if (this.props.isGettingData) {
      return (<h3>Waiting for the data</h3>)
    } else if (this.props.selectedSources.length === 0) {
      return (<h3>No sources selected</h3>)
    } else {
      return (
        <div>
          {this.props.data.map(
            source => (<DataElement data={source.data} key={source.name}
              name={source.name} />)
          )}
        </div>
      )
    }
  }

  checkForUpdates () {
    if (
      (this.props.isGettingData || this.props.isGettingSources) ||
      (this.props.selectedSources === 0) ||
      // (Object.keys(this.props.dataActualFor).length !== 0) ||
      (
        (this.props.startDate === this.props.dataActualFor.startDate) &&
        (this.props.endDate === this.props.dataActualFor.endDate) &&
        (
          this.props.selectedSources.every(
            source => this.props.dataActualFor.sources.includes(source)
          )
        )
      )
    ) return

    this.props.onDataUpdate(
      moment(this.props.startDate).valueOf(),
      moment(this.props.endDate).valueOf(),
      this.props.selectedSources
    )
  }
}

const mapStateToProps = state => {
  const selectedSources = state.sources.list.filter(
    source => source.isSelected
  ).map(source => source.name)

  return {
    isGettingSources: state.sources.isGettingSources,
    isGettingData: state.data.isGettingData,
    dataActualFor: state.data.actualFor,
    data: state.data.list.filter(dataset =>
      selectedSources.includes(dataset.name)
    ),
    startDate: state.dates.startDate,
    endDate: state.dates.endDate,
    selectedSources: selectedSources
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDataUpdate: (startDate, endDate, sources) => dispatch(
      fetchData(startDate, endDate, sources)
    )
  }
}

Data.propTypes = {
  isGettingSources: PropTypes.bool.isRequired,
  isGettingData: PropTypes.bool.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
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
