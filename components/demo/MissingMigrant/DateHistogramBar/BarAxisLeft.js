const BarAxisLeft = (props) => {
  const { yScale, innerWidth, tickOffset = 3 } = props

  return yScale.ticks().map((value) => {
    return (
      <g
        key={value}
        className="tick"
        transform={`translate(0, ${yScale(value)})`}
      >
        <line x2={innerWidth} stroke="#C0C0BB"></line>
        <text
          textAnchor="end"
          x={-tickOffset}
          dy=".32em"
          fill="#635F5D"
          fontSize="0.4em"
        >
          {value}
        </text>
      </g>
    )
  })
}

export default BarAxisLeft
