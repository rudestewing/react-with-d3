import { useRef, useEffect, useState } from 'react'
import { csv, json, geoPath, geoMercator, svg, select } from 'd3'
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
  const [data, setData] = useState(null)

  const svg = select(svgRef.current)

  const title = 'World Map Chart'

  function renderChart() {
    pathRef.current = geoPath().projection(projectionRef.current)
    const countries = feature(data, data.objects.countries)

    svg
      .selectAll('path')
      .data(countries.features)
      .enter()
      .append('path')
      .attr('d', pathRef.current)
      .attr('class', 'country')
      .append('title')
      .text((d) => console.log(d.properties))
  }

  function fetchData() {
    json('/data/world-atlas-topology-json.json').then((data) => {
      setData(data)
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (data) renderChart()
  }, [data])

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
