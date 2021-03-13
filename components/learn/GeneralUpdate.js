import { select, range, scaleOrdinal } from 'd3'
import { useEffect, useRef, useState } from 'react'

const GeneralUpdate = () => {
  const svgRef = useRef(null)

  function renderChart(selection, chartProps) {
    const width = parseFloat(selection.attr('width'))
    const height = parseFloat(selection.attr('height'))

    const bowl = selection
      .selectAll('rect')
      .data([null])
      .enter()

      .append('rect')
      .attr('y', 100)
      .attr('width', 920)
      .attr('height', 300)
      .attr('rx', 300 / 2)
      .attr('fill', 'steelblue')

    const colorScale = scaleOrdinal()
      .domain(['apple', 'lemon'])
      .range(['#c11d1d', '#eae600'])

    const radiusScale = scaleOrdinal()
      .domain(['apple', 'lemon'])
      .range([50, 30])

    const groups = selection.selectAll('g').data(chartProps.fruits)

    const groupsEnter = groups.enter().append('g')

    groupsEnter
      .merge(groups)
      .attr(`transform`, (d, i) => `translate(${i * 180 + 100}, ${height / 2})`)

    groups.exit().remove()

    groupsEnter
      .append('circle')
      .merge(groups.select('circle'))
      .attr('r', (d) => radiusScale(d.type))
      .attr('fill', (d) => colorScale(d.type))

    groupsEnter
      .append('text')
      .merge(groups.select('text'))
      .text((d) => d.type)
      .attr('y', 120)

    const text = selection.selectAll('text').data(chartProps.fruits)

    text
      .enter()
      .append('text')
      .attr('x', (d, i) => i * 120 + 60)
      .attr('y', height / 2)
      .merge(text)
      .text((d) => d.type)
      .attr('stroke', 'black')
      .attr('fill', 'black')
      .attr('text-anchor', 'middle')
      .attr('font-size', '0.8rem')
  }

  function main() {
    const svg = select(svgRef.current)

    const makeFruit = (type) => ({ type })

    const fruits = range(5).map(() => makeFruit('apple'))

    renderChart(svg, { fruits })

    setTimeout(() => {
      fruits.pop()
      renderChart(svg, { fruits })
    }, 500)

    setTimeout(() => {
      fruits[2].type = 'lemon'

      renderChart(svg, { fruits })
    }, 1000)
  }

  useEffect(() => {
    main()
  }, [])

  return (
    <div>
      <div>
        <svg width="960" height="500" ref={svgRef}></svg>
      </div>
    </div>
  )
}

export default GeneralUpdate
