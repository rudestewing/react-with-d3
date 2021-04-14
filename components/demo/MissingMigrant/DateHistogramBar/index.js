import {
  csv,
  scaleLinear,
  scaleTime,
  max,
  timeFormat,
  extent,
  bin,
  timeMonths,
  sum,
  timeMonth,
} from 'd3'
import BarAxisBottom from './BarAxisBottom'
import BarAxisLeft from './BarAxisLeft'

const margin = { top: 0, right: 30, bottom: 20, left: 45 }

const xAxisLabelOffset = 54
const yAxisLabelOffset = 30

const Bar = (props) => {
  const { data, width, height } = props

  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  const xValue = (d) => d.date
  const xAxisLabel = 'Time'

  const yValue = (d) => d.total
  const yAxisLabel = 'Total Dead and Missing'

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice()

  const [start, stop] = xScale.domain()

  const binnedData = bin()
    .value(xValue)
    .domain(xScale.domain())
    .thresholds(timeMonths(start, stop))(data)
    .map((array) => {
      console.log()
      return {
        y: sum(array, yValue),
        x0: array.x0,
        x1: array.x1,
      }
    })

  const yScale = scaleLinear()
    .domain([0, max(binnedData, (d) => d.y)])
    .range([innerHeight, 0])

  return (
    <g transform={`translate(${margin.left}, ${margin.top})`}>
      <BarAxisBottom xScale={xScale} innerHeight={innerHeight} tickOffset={5} />
      <text
        className="axis-label"
        textAnchor="middle"
        x={innerWidth / 2}
        y={innerHeight}
      >
        {xAxisLabel}
      </text>

      <BarAxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={5} />
      <text
        textAnchor="middle"
        transform={`translate(${-yAxisLabelOffset}, ${
          innerHeight / 2
        })rotate(-90)`}
        fontSize="0.5em"
      >
        {yAxisLabel}
      </text>

      {binnedData.map((d, index) => {
        return (
          <rect
            key={index}
            className="mark"
            x={xScale(d.x0)}
            y={yScale(d.y)}
            width={xScale(d.x1) - xScale(d.x0)}
            height={innerHeight - yScale(d.y)}
            fill={'steelblue'}
          >
            <title>{d.y}</title>
          </rect>
        )
      })}
    </g>
  )
}

export default Bar
