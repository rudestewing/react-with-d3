import { useRef, useEffect, useState, useMemo } from 'react'
import {
  csv,
  json,
  geoPath,
  geoMercator,
  geoNaturalEarth1,
  svg,
  select,
  zoom,
  scaleThreshold,
  schemeBlues,
  scaleLinear,
  range,
  axisBottom,
  scaleQuantile,
  scaleOrdinal,
  format,
} from 'd3'

import legend from '../../utils/extensions/d3/color-legend'

/**
 *  1. Create Group for positioning by append('g')
 *  2. Create Scale
 *  3. Create Axis Group
 */

const WorldMapChart = () => {
  const svgRef = useRef(null)

  const [chartData, setChartData] = useState({
    worldMapData: null,
    populationData: null,
  })

  function renderChart() {
    const svg = select(svgRef.current)

    svg.select('.content-group').remove()

    const margin = {
      top: 40,
      left: 20,
      right: 20,
      bottom: 20,
    }

    const width = svgRef.current.clientWidth
    const height = +svg.attr('height')

    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom
    const projection = geoNaturalEarth1().translate([
      innerWidth / 2,
      innerHeight / 2,
    ])
    const path = geoPath().projection(projection)

    const populationById = {}

    const countries = chartData.worldMapData

    chartData.populationData.forEach((d) => {
      populationById[d.id] = parseFloat(d.population)
    })

    console.log(chartData.populationData)
    countries.features.forEach((d) => {
      d.population = populationById[d.id] || 0
    })

    const scaleValues = [
      100000,
      1000000,
      10000000,
      30000000,
      100000000,
      500000000,
      1000000000,
    ]

    const colorScale = scaleThreshold()
      .domain(scaleValues)
      .range(schemeBlues[7])

    const contentGroup = svg.append('g').attr('class', 'content-group')

    const legendGroup = svg.append('g').attr('class', 'legend')

    legendGroup.append(() => {
      return legend({
        color: scaleThreshold(
          [...scaleValues].map((d) => format('.3s')(d).replace('G', 'B')),
          schemeBlues[7]
        ),
        title: '',
        tickSize: 1,
      })
    })

    svg.call(
      zoom().on('zoom', (e) => {
        const t = e.transform
        const h = 0
        const s = t['k'] >= 1 ? t['k'] : 1

        t['x'] = Math.min(
          (innerWidth / innerHeight) * (s - 1),
          Math.max(innerWidth * (1 - s), t['x'])
        )

        t['y'] = Math.min(
          h * (s - 1) + h * s,
          Math.max(innerHeight * (1 - s) - h * s, t['y'])
        )

        t['k'] = s
        contentGroup.attr('transform', t)
      })
    )

    const tooltip = select('body')
      .append('div')
      .style('display', 'none')
      .attr('class', 'tooltip')
      .style('background-color', 'white')
      .style('border', 'solid')
      .style('border-width', '2px')
      .style('border-radius', '5px')
      .style('padding', '8px')
      .style('z-index', 50)
      .style('position', 'absolute')

    contentGroup
      .selectAll('path')
      .data([...countries.features].sort((a, b) => b.population - a.population))
      .enter()
      .append('path')
      .attr('d', path)
      .attr('class', 'country')
      // .attr('fill', (d) => colorScale(d.population))
      .on('mouseover', (e, d) => {
        tooltip.style('display', 'block')
      })
      .on('mousemove', (e, d) => {
        tooltip
          .html(
            `
          <div>
            <div class="text-sm"> Population: </div>
            <div class="font-semibold tracking-wider"> ${
              d.properties.name
            } </div>
            <div class="text-sm">${format(',')(d.population)} </div>
            <div class="text-sm">${format('.3s')(d.population).replace(
              'G',
              'B'
            )} </div>
          </div>
          `
          )
          .style('left', `${parseFloat(e['x']) + 10}px`)
          .style('top', `${parseFloat(e['y'])}px`)
      })
      .on('mouseout', (e, d) => {
        tooltip.style('display', 'none')
      })
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .attr('fill', (d) => colorScale(d.population))
  }

  function fetchData() {
    Promise.all([
      json('/data/world.geojson.json'),
      csv('/data/world-population.csv'),
    ])
      .then(([worldMapData, populationData]) => {
        setChartData((state) => {
          return {
            worldMapData,
            populationData: [...populationData].sort(
              (a, b) => b.population - a.population
            ),
          }
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (chartData.worldMapData && chartData.populationData) renderChart()
  }, [chartData])

  return (
    <div>
      <h3 className="mb-5 text-lg font-semibold tracking-wider">
        World Map Population
      </h3>
      <svg
        className="world-map-population"
        width="960"
        height="500"
        ref={svgRef}
        style={{ border: `1px solid gray` }}
      ></svg>
    </div>
  )
}

export default WorldMapChart
