import { useRef, useEffect } from 'react'
import {
  csv,
  scaleLinear,
  min,
  max,
  scaleTime,
  axisBottom,
  axisLeft,
  select,
  extent,
  line,
  curveBasis,
} from 'd3'

/**
 *  1. Create Group for positioning by append('g')
 *  2. Create Scale
 *  3. Create Axis Group
 */

const LineChart = () => {
  const svgRef = useRef(null)

  const title = 'Temperature in San Francisco'
  const yAxisLabel = 'Temperature'
  const xAxisLabel = 'Time'

  function renderChart(data) {
    const svg = select(svgRef.current)

    const margin = { top: 60, right: 40, bottom: 88, left: 150 }

    const width = parseFloat(svg.attr('width'))
    const height = parseFloat(svg.attr('height'))

    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const contentGroup = svg
      .append('g')
      .attr('transform', `translate(${margin.left} ${margin.top})`)

    contentGroup
      .append('text')
      .text(title)
      .attr('y', -20)
      .attr('x', innerWidth / 2)
      .attr('fill', 'black')
      .attr('text-anchor', 'middle')
      .attr('font-size', `1.2rem`)

    const xScale = scaleTime()
      .domain(extent(data, (d) => d.timestamp))
      .range([0, innerWidth])
      .nice()

    const yScale = scaleLinear()
      .domain(extent(data, (d) => d.temperature))
      .range([innerHeight, 0])
      .nice()

    const xAxis = axisBottom(xScale).tickSize(-innerHeight)
    const yAxis = axisLeft(yScale).tickSize(-innerWidth)

    const xAxisGroup = contentGroup
      .append('g')
      .attr('transform', `translate(0, ${innerHeight})`)
      .call(xAxis)

    xAxisGroup
      .append('text')
      .text(xAxisLabel)
      .attr('fill', 'black')
      .attr('y', 30)
      .attr('x', innerWidth / 2)
      // .attr('text-anchor', 'middle')
      .attr('font-size', '1.2rem')

    const yAxisGroup = contentGroup.append('g').call(yAxis)

    yAxisGroup
      .append('text')
      .text(yAxisLabel)
      .attr('y', -60)
      .attr('x', -innerHeight / 2)
      .attr('fill', 'black')
      .attr('transform', `rotate(-90)`)
      .attr('text-anchor', 'middle')
      .attr('font-size', `1.2rem`)

    const lineGenerator = line()
      .x((d) => xScale(d.timestamp))
      .y((d) => yScale(d.temperature))
      .curve(curveBasis)

    contentGroup
      .append('path')
      .attr('stroke', 'orange')
      .attr('d', lineGenerator(data))
      .attr('fill', 'none')
      .attr('stroke-width', 3)
      .style('stroke-linejoin', 'round')

    contentGroup.selectAll('.domain, .tick line').attr('stroke', 'lightgray')
  }

  function main() {
    csv('/data/temperature-in-san-francisco.csv').then((data) => {
      data.forEach((d) => {
        d.temperature = parseFloat(d.temperature)
        d.timestamp = new Date(d.timestamp)
      })

      console.log(data)

      renderChart(data)
    })
  }

  useEffect(() => {
    main()
  }, [])

  return (
    <div>
      <svg width="960" height="500" ref={svgRef}></svg>
    </div>
  )
}

export default LineChart
