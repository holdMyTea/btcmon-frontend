import React from 'react'
import { LineChart, YAxis, Line } from 'recharts'
import PropTypes from 'prop-types'
import moment from 'moment'

const DataGraph = ({isGettingSources, isGettingData, sourcesFailure, dataFailure, selectedSources, data}) => {
  return isGettingSources ? (<h3>Waiting for the sources update</h3>)
    : isGettingData || data.length === 0 ? (<h3>Waiting for the data</h3>)
      : sourcesFailure ? (<h3>Failed to get sources</h3>)
        : dataFailure ? (<h3>Failed to get data</h3>)
          : selectedSources.length === 0 ? (<h3>No sources selected</h3>)
            : (
              <LineChart width={600} height={300} data={formatData(data)}>
                <YAxis type="number" domain={computeDomain(data)} width={100} />
                {
                  selectedSources.map(
                    source =>
                      (<Line dataKey={source} key={source} type="monotone"/>)
                  )
                }
              </LineChart>
            )
}

const formatData = data => {
  const formattedData = []

  for (let i = 0; i < data.reduce((acc, val) => Math.min(acc, val.data.length), Infinity); i++) {
    const element = {
      timestamp: moment(
        data.reduce((acc, val) =>
          (acc += moment(val.data[i].timestamp).unix()), 0
        ) / data.length).format()
    }

    data.forEach(source => (
      element[source.name] = source.data[i].value
    ))

    formattedData.push(element)
  }

  return formattedData
}

const computeDomain = data => {
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
