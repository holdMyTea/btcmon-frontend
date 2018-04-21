import React from 'react'
import { LineChart } from 'recharts'
import PropTypes from 'prop-types'

import DataElement from './DataElement'

const DataGraph = ({isGettingSources, isGettingData,
  sourcesFailure, dataFailure, selectedSources, data}) => {

  return isGettingSources ? (<h3>Waiting for the sources update</h3>)
    : isGettingData ? (<h3>Waiting for the data</h3>)
      : sourcesFailure ? (<h3>Failed to get sources</h3>)
        : dataFailure ? (<h3>Failed to get data</h3>)
          : selectedSources.length === 0 ? (<h3>No sources selected</h3>)
            : (
              <div>
                {data.map(
                  source => (<DataElement data={source.data} key={source.name}
                    name={source.name} />)
                )}
              </div>
            )
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
