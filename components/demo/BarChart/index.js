import { csv, max, scaleLinear, scaleBand, format, select } from 'd3'
import { useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { useSpring, animated } from 'react-spring'

const width = 960
const height = 500

const margin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 200,
}

const innerWidth = width - margin.left - margin.right
const innerHeight = height - margin.top - margin.bottom

const AnimatedRectBar = ({ width, ...restProps }) => {
  const springProps = useSpring({
    from: {
      width: 0,
    },
    to: {
      width,
    },
  })

  return (
    <animated.rect
      style={springProps}
      width={width}
      {...restProps}
    ></animated.rect>
  )
}

const BarChart = () => {
  const svgRef = useRef(null)
  const [populationData, setPopulationData] = useState([])

  function fetchData() {
    csv('/data/country.csv').then((data) => {
      data.forEach((d) => {
        d.population = +d.population * 1000
      })
      setPopulationData((state) =>
        [...data].sort((a, b) => b.population - a.population)
      )
    })
  }

  const xScale = scaleLinear()
    .domain([0, max(populationData, (d) => d.population)])
    .range([0, innerWidth])

  const yScale = scaleBand()
    .domain(populationData.map((d) => d.country))
    .range([0, innerHeight])
    .padding(0.2)

  useEffect(() => {
    fetchData()
    return () => {}
  }, [])

  return (
    <div>
      <svg ref={svgRef} width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {xScale.ticks().map((tickValue, index) => (
            <g key={index} transform={`translate(${xScale(tickValue)}, 0)`}>
              <line y2={innerHeight} stroke="lightgray"></line>
              <text y={innerHeight} textAnchor="middle" dy="5">
                {format('.3s')(parseFloat(tickValue)).replace('G', 'B')}
              </text>
            </g>
          ))}
          {yScale.domain().map((domainValue, index) => (
            <g
              key={index}
              transform={`translate(0, ${
                yScale(domainValue) + yScale.bandwidth() / 2
              })`}
            >
              <text x="-10" textAnchor="end">
                {domainValue}
              </text>
            </g>
          ))}
          {populationData.length &&
            populationData.map((d, index) => {
              return (
                <AnimatedRectBar
                  key={index}
                  y={yScale(d.country)}
                  width={xScale(d.population)}
                  height={yScale.bandwidth()}
                  fill={'steelblue'}
                />
              )
            })}
        </g>
      </svg>
    </div>
  )
}

export default BarChart
