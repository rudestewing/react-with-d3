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
} from 'd3'

import { feature } from 'topojson-client'

/**
 *  1. Create Group for positioning by append('g')
 *  2. Create Scale
 *  3. Create Axis Group
 */

const WorldMapChart = () => {
  const svgRef = useRef(null)
  const projection = useMemo(() => geoNaturalEarth1())
  const path = useMemo(() => geoPath().projection(projection))

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

    const width = +svg.attr('width')
    const height = +svg.attr('height')

    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const populationById = {}

    const countries = chartData.worldMapData

    chartData.populationData.forEach((d) => {
      populationById[d.id] = parseFloat(d.population)
    })

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

    svg.call(
      zoom().on('zoom', (e) => {
        contentGroup.attr('transform', e.transform)
      })
    )

    contentGroup
      .selectAll('path')
      .data(countries.features)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('class', 'country')
      .attr('fill', (d) => colorScale(d.population))
      .on('mouseover', (e, d) => {
        console.log('mouseover')
        // process tooltip here
      })
      .on('mouseout', (e, d) => {
        console.log('mouseout')
        // process tooltip here
      })
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
            populationData,
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
