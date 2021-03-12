import {
  select,
  csv,
  scaleLinear,
  max,
  scaleBand,
  axisLeft,
  axisBottom,
  format,
  scalePoint,
} from 'd3'
import styles from './BarChart.module.scss'
import { useEffect, useRef } from 'react'

const BarChart = () => {
  const svgRef = useRef(null)

  function main() {
    const svg = select(svgRef.current)

    const width = parseFloat(svg.attr('width'))
    const height = parseFloat(svg.attr('height'))

    const renderChart = (data) => {
      const margin = {
        top: 50,
        right: 20,
        bottom: 50,
        left: 100,
      }

      const xValue = (d) => d.population
      const yValue = (d) => d.country

      const innerHeight = height - margin.top - margin.bottom
      const innerWidth = width - margin.left - margin.right

      // Scale X & Y
      const xScale = scaleLinear()
        .domain([0, max(data, (d) => d.population)])
        .range([0, innerWidth])
        .nice()

      const yScale = scalePoint()
        .domain(data.map((d) => d.country))
        .range([0, innerHeight])
        .padding(0.21)

      // Axis X & Y
      const xAxis = axisBottom(xScale)
        .tickFormat((number) => format('.3s')(number).replace('G', 'B'))
        .tickSize(-innerHeight)

      const yAxis = axisLeft(yScale).tickSize(-innerWidth)

      const g = svg
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

      const xAxisG = g.append('g').call(yAxis).style('font-size', '1.1rem')

      xAxisG.selectAll('.domain').remove()
      xAxisG.selectAll('.tick line').attr('stroke', 'lightgray')

      const yAxisG = g
        .append('g')
        .call(xAxis)
        .style('font-size', '1.1rem')
        .attr('transform', `translate(0, ${innerHeight})`)

      yAxisG.selectAll('.domain').remove()
      yAxisG.selectAll('.tick line').attr('stroke', 'lightgray')

      g.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cy', (d) => yScale(d.country))
        .attr('cx', (d) => xScale(d.population))
        .attr('r', 10)
        .attr('fill', 'steelblue')
        .transition()
        .duration(2000)

      g.append('text')
        .text('Top 10 most popular countries')
        .attr('y', -10)
        .attr('class', 'chart-title')
    }

    csv('/data/country.csv').then((data) => {
      data.forEach((d) => {
        d.population = +d.population * 1000
      })
      renderChart(data)
    })
  }

  useEffect(() => {
    main()
  }, [])

  return (
    <div>
      <svg
        className={styles.barChart}
        width="960"
        height="500"
        ref={svgRef}
      ></svg>
    </div>
  )
}

export default BarChart
