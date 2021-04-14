import { timeFormat } from 'd3'

const BarAxisBottom = (props) => {
  const { xScale, innerHeight, tickOffset = 3 } = props

  return xScale.ticks().map((value) => {
    console.log(xScale(value))
    return (
      <g
        key={value}
        className="tick"
        transform={`translate(${xScale(value)}, 0)`}
      >
        <line y2={innerHeight} stroke="#C0C0BB"></line>
        <text
          textAnchor="middle"
          dy=".71em"
          y={innerHeight + tickOffset}
          fill="635F5D"
        >
          {timeFormat('%m/%d/%Y')(value)}
        </text>
      </g>
    )
  })
}

export default BarAxisBottom
