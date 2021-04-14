import { extent } from 'd3-array'
import { scaleLinear, scaleTime, tickFormat } from 'd3-scale'
import { timeFormat } from 'd3-time-format'

const margin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 80,
}

const width = 960
const height = 500

const innerWidth = width - margin.left - margin.right
const innerHeight = height - margin.top - margin.bottom

const Bar = ({ data }) => {
  // make scale
  const xValue = (d) => d.date
  const xAxisLabel = 'Time'

  const yValue = (d) => d.total
  const yAxisLabel = 'Total Dead and Missing'

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice()

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0])

  return (
    <div>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {xScale.ticks().map((tickValue, index) => {
            console.log(xScale(tickValue))
            return (
              <g key={index} transform={`translate(${xScale(tickValue)}, 0)`}>
                <line y2={innerHeight} style={{ stroke: '#C0C0BB' }}></line>
                <text textAnchor="middle" dy={'.71em'} y={innerHeight + 5}>
                  {timeFormat('%m/%d/%Y')(tickValue)}
                </text>
              </g>
            )
          })}
          {yScale.ticks().map((tickValue, index) => {
            return (
              <g key={index} transform={`translate(0, ${yScale(tickValue)})`}>
                <line x2={innerWidth} style={{ stroke: '#C0C0BB' }}></line>
                <text textAnchor="end" x={-3} dy={'.32em'}>
                  {tickValue}
                </text>
              </g>
            )
          })}
          {data.map((d, index) => {
            return (
              <g key={index} transform={`translate(${xScale(xValue(d))}, 0)`}>
                {/* <rect
                  x={xScale(d.time)}
                ></rect> */}
                <circle
                  cx={xScale(xValue(d))}
                  cy={yScale(yValue(d))}
                  r={5}
                ></circle>
              </g>
            )
          })}
        </g>
      </svg>
    </div>
  )
}

export default Bar
