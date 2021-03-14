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
  min,
  extent,
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
      const title = 'Cars: Horsepower vs. Weight'

      const xValue = (d) => d.horsepower
      const xAxisLabel = 'Horsepower'

      const yValue = (d) => d.weight
      const circleRadius = 10
      const yAxisLabel = 'Weight'

      const margin = { top: 60, right: 40, bottom: 88, left: 150 }
      const innerWidth = width - margin.left - margin.right
      const innerHeight = height - margin.top - margin.bottom

      const xScale = scaleLinear()
        .domain(extent(data, xValue))
        .range([0, innerWidth])
        .nice()

      const yScale = scaleLinear()
        .domain(extent(data, yValue))
        .range([innerHeight, 0])
        .nice()

      const g = svg
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)

      const xAxis = axisBottom(xScale).tickSize(-innerHeight).tickPadding(15)

      const yAxis = axisLeft(yScale).tickSize(-innerWidth).tickPadding(10)

      const yAxisG = g.append('g').call(yAxis)
      yAxisG.selectAll('.domain').remove()

      yAxisG
        .append('text')
        .attr('class', 'axis-label')
        .attr('y', -93)
        .attr('x', -innerHeight / 2)
        .attr('fill', 'black')
        .attr('transform', `rotate(-90)`)
        .attr('text-anchor', 'middle')
        .text(yAxisLabel)

      const xAxisG = g
        .append('g')
        .call(xAxis)
        .attr('transform', `translate(0,${innerHeight})`)

      xAxisG.select('.domain').remove()

      xAxisG
        .append('text')
        .attr('class', 'axis-label')
        .attr('y', 75)
        .attr('x', innerWidth / 2)
        .attr('fill', 'black')
        .text(xAxisLabel)

      g.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cy', (d) => yScale(yValue(d)))
        .attr('cx', (d) => xScale(xValue(d)))
        .attr('r', circleRadius)
        .attr('fill', 'steelblue')
        .style('opacity', '0.5')

      g.append('text').attr('class', 'title').attr('y', -10).text(title)

      g.selectAll('.domain, .tick line').attr('stroke', 'lightgray')
    }

    csv('/data/auto-mpg.csv').then((data) => {
      data.forEach((d) => {
        d.mpg = +d.mpg
        d.cylinders = +d.cylinders
        d.displacement = +d.displacement
        d.horsepower = +d.horsepower
        d.weight = +d.weight
        d.acceleration = +d.acceleration
        d.year = +d.year
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