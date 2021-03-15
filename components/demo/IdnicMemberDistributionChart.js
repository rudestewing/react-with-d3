import { select, json, geoMercator, geoPath } from 'd3'
import { useCallback, useEffect, useRef, useState, useMemo } from 'react'
import { feature } from 'topojson-client'

const IdnicMemberDistributionChart = () => {
  const svgRef = useRef(null)
  const [chartData, setChartData] = useState({
    mapData: null,
    valueData: null,
  })

  const projection = useMemo(() =>
    geoMercator().scale(1200).translate([-1900, 150])
  )
  const path = useMemo(() => geoPath().projection(projection))

  function renderChart() {
    const svg = select(svgRef.current)

    const provinces = feature(
      chartData.mapData,
      chartData.mapData.objects.IDN_adm_2_kabkota
    )

    const contentGroup = svg.append('g')

    contentGroup
      .selectAll('path')
      .data(provinces.features)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('class', 'province')
  }

  function main() {
    Promise.all([json('/data/indonesia-topojson-city-regency.json')]).then(
      ([mapData]) => {
        console.log(mapData)
        setChartData((state) => {
          return {
            ...state,
            mapData,
          }
        })
      }
    )
  }

  useEffect(() => {
    main()
  }, [])

  useEffect(() => {
    if (chartData.mapData) renderChart()
  })

  return (
    <div>
      <svg
        className="idnic-member-distribution"
        width="1000"
        height="500"
        ref={svgRef}
      ></svg>
    </div>
  )
}

export default IdnicMemberDistributionChart
