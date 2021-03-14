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
  area,
  curveBasis,
  format,
} from 'd3'

/**
 *  1. Create Group for positioning by append('g')
 *  2. Create Scale
 *  3. Create Axis Group
 */

const AreaChart = () => {
  const svgRef = useRef(null)

  const title = 'World Population by Year'
  const yAxisLabel = 'Population'
  const xAxisLabel = 'Year'

  function renderChart(data) {
    const svg = select(svgRef.current)

    const margin = { top: 60, right: 40, bottom: 88, left: 150 }

    const width = parseFloat(svg.attr('width'))
    const height = parseFloat(svg.attr('height'))

    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const xValue = (d) => d.year
    const yValue = (d) => d.population

    const contentGroup = svg
      .append('g')
      .attr('class', 'content-group')
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
      .domain(extent(data, xValue))
      .range([0, innerWidth])

    const yScale = scaleLinear()
      .domain([0, max(data, yValue)])
      .range([innerHeight, 0])
      .nice()

    const areaGenerator = area()
      .x((d) => xScale(xValue(d)))
      .y0(innerHeight)
      .y1((d) => yScale(yValue(d)))
      .curve(curveBasis)

    contentGroup
      .append('path')
      .attr('d', areaGenerator(data))
      .attr('fill', 'steelblue')

    const xAxis = axisBottom(xScale).tickSize(-innerHeight).ticks(5)

    const yAxis = axisLeft(yScale)
      .tickSize(-innerWidth)
      .tickFormat((number) => format('.1s')(number).replace('G', 'B'))

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

    contentGroup.selectAll('.domain, .tick line').attr('stroke', 'lightgray')
  }

  function main() {
    csv('/data/world-population-by-year-2015.csv').then((data) => {
      console.log(data)
      data.forEach((d) => {
        d.population = parseFloat(d.population)
        d.year = new Date(d.year)
      })

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

export default AreaChart
