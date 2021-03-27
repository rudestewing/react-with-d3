import {
  bin,
  csv,
  extent,
  scaleLinear,
  scaleTime,
  timeMonth,
  timeMonths,
} from 'd3'
import { useEffect, useState } from 'react'

const margin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30,
}

const width = 960
const height = 500

const innerWidth = width - margin.left - margin.right
const innerHeight = height - margin.top - margin.bottom

const MissingDeathBar = () => {
  const [data, setData] = useState([])

  const xValue = (d) => d['Reported Date']
  const xAxisLabel = 'Time'

  const yValue = (d) => d['Total Dead and Missing']
  const yAxisLabel = 'Total Dead and Missing'

  const xScale = scaleTime().domain(extent(data, xValue)).range([0, innerWidth])

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0])

  const [start, stop] = xScale.domain()

  // group by months by bin function

  const binnedData = bin()
    .value(xValue)
    .domain(xScale.domain())
    .thresholds(timeMonths(start, stop))(data)

  console.log(binnedData)

  useEffect(() => {
    csv('/data/MissingMigrants-Global-2021-03-27T05-02-23.csv', (d) => {
      d['Total Dead and Missing'] = parseFloat(d['Total Dead and Missing'])
      d['Reported Date'] = new Date(d['Reported Date'])
      return d
    }).then((responseData) => {
      setData((state) => [...responseData])
    })
  }, [])

  return (
    <div>
      <svg width={width} height={height}></svg>
    </div>
  )
}

export default MissingDeathBar
