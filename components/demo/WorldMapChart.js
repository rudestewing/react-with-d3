import { useRef, useEffect, useState } from 'react'
import { csv, json, geoPath, geoMercator, svg, select, zoom } from 'd3'

import { feature } from 'topojson-client'

/**
 *  1. Create Group for positioning by append('g')
 *  2. Create Scale
 *  3. Create Axis Group
 */

const WorldMapChart = () => {
  const svgRef = useRef(null)
  const projectionRef = useRef(geoMercator())
  const pathRef = useRef(null)

  const [chartData, setChartData] = useState({
    worldMapData: null,
    populationData: null,
  })

  const svg = select(svgRef.current)

  const title = 'World Map Chart'

  function renderChart() {
    // console.log(chartData)
    pathRef.current = geoPath().projection(projectionRef.current)

    const countries = feature(
      chartData.worldMapData,
      chartData.worldMapData.objects.countries
    )

    console.log(countries)

    const contentGroup = svg.append('g')

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
      .attr('d', pathRef.current)
      .attr('class', 'country')
      .append('title')
      .text((d) => d.properties.name)
  }

  function fetchData() {
    Promise.all([
      json('/data/world-atlas-topology-json.json'),
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
        className="world-map-chart"
        width="960"
        height="500"
        ref={svgRef}
      ></svg>
    </div>
  )
}

export default WorldMapChart
