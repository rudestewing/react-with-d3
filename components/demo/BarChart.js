import {
  select,
  csv,
  scaleLinear,
  max,
  scaleBand,
  axisLeft,
  axisBottom,
  format,
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

      const yScale = scaleBand()
        .domain(data.map((d) => d.country))
        .range([0, innerHeight])
        .padding(0.21)

      // Axis X & Y
      const xAxis = axisBottom(xScale)
        .tickFormat((number) => format('.3s')(number).replace('G', 'B'))
        .tickSize(-innerHeight)

      const yAxis = axisLeft(yScale)

      const g = svg
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

      const xAxisG = g.append('g').call(yAxis).style('font-size', '1.1rem')

      xAxisG.selectAll('.domain, .tick line').remove()

      const yAxisG = g
        .append('g')
        .call(xAxis)
        .style('font-size', '1.1rem')
        .attr('transform', `translate(0, ${innerHeight})`)

      yAxisG.selectAll('.domain').remove()

      g.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('y', (d) => yScale(d.country))
        // .attr('width', (d) => xScale(d.population))
        .attr('width', 0)
        .attr('height', yScale.bandwidth())
        .attr('fill', 'teal')

      g.selectAll('rect')
        .transition()
        .duration(1000)
        .attr('width', (d) => xScale(d.population))
        .delay((d, i) => i * 100)

      g.append('text')
        .text('Top 10 most popular countries')
        .attr('y', -10)
        .attr('class', 'chart-title')
    }

    csv('/data/country.csv').then((data) => {
      data.forEach((d) => {
        d.population = +d.population * 1000
      })

      renderChart([...data].sort((a, b) => b.population - a.population))
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
