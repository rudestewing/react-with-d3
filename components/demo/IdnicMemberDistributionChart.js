import {
  select,
  json,
  geoMercator,
  geoPath,
  scaleThreshold,
  schemeBlues,
  zoom,
  schemeGreens,
  schemeAccent,
  schemeOranges,
  format,
} from 'd3'
import { useCallback, useEffect, useRef, useState, useMemo } from 'react'
import { feature } from 'topojson-client'
import legend from '../../utils/extensions/d3/color-legend'

const IdnicMemberDistributionChart = () => {
  const svgRef = useRef(null)
  const [chartData, setChartData] = useState({
    mapData: null,
    valueData: null,
  })

  const [featureData, setFeatureData] = useState([])

  const projection = useMemo(() =>
    geoMercator().scale(1200).translate([-1900, 150])
  )
  const path = useMemo(() => geoPath().projection(projection))

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

    const contentGroup = svg.append('g').attr('class', 'content-group')

    const provinces = feature(
      chartData.mapData,
      chartData.mapData.objects.states_provinces
    )

    const totalById = {}

    chartData.valueData.forEach((d) => {
      totalById[d.geoId] = d.total
    })

    provinces.features.forEach((d) => {
      const geoId = String(d.properties.code_hasc).split('.').join('-')
      d.geoId = geoId
      d.total = totalById[geoId] || 0
    })

    setFeatureData([...provinces.features])

    const scaleValues = [1, 5, 10, 30, 50, 100, 200, 300]

    const colorScale = scaleThreshold()
      .domain(scaleValues)
      .range(schemeBlues[8])

    const legendGroup = svg.append('g').attr('class', 'legend')

    legendGroup.append(() => {
      return legend({
        color: scaleThreshold(
          [...scaleValues].map((d) => format('.3s')(d).replace('G', 'B')),
          schemeBlues[8]
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

    contentGroup
      .selectAll('path')
      .data(provinces.features)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('class', 'province')
      .attr('fill', (d) => colorScale(d.total))
  }

  function main() {
    Promise.all([
      json('/data/indonesia-topojson-province.json'),
      json('/data/idnic-member-distribution.json'),
    ]).then(([mapData, valueData]) => {
      setChartData((state) => {
        return {
          mapData,
          valueData: [...valueData].sort((a, b) => b.total - a.total),
        }
      })
    })
  }

  useEffect(() => {
    main()
  }, [])

  useEffect(() => {
    if (chartData.mapData && chartData.valueData) renderChart()
  }, [chartData])

  return (
    <div>
      <svg
        className="idnic-member-distribution"
        width="1000"
        height="500"
        ref={svgRef}
      ></svg>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {featureData.length && (
            <table
              width="100%"
              className="border-collapse border border-green-800"
            >
              <tbody>
                {[...featureData]
                  .sort((a, b) => b.total - a.total)
                  .map((item) => {
                    return (
                      <tr key={item.geoId}>
                        <td className="border border-green-600 p-2 text-xs">
                          {item.properties.code_hasc}
                        </td>
                        <td className="border border-green-600 p-2 text-xs">
                          {item.properties.name}
                        </td>
                        <td className="border border-green-600 p-2 text-xs">
                          {item.geoId}
                        </td>
                        <td className="border border-green-600 p-2 text-xs">
                          {item.total}
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          )}
          {chartData.valueData && (
            <table
              width="100%"
              className="border-collapse border border-green-800"
            >
              <tbody>
                {[...chartData.valueData]
                  .sort((a, b) => b.total - a.total)
                  .map((item) => {
                    return (
                      <tr key={item.geoId}>
                        <td className="border border-green-600 p-2 text-xs">
                          {item.geoId}
                        </td>
                        <td className="border border-green-600 p-2 text-xs">
                          {item.name}
                        </td>
                        <td className="border border-green-600 p-2 text-xs">
                          {item.total}
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

export default IdnicMemberDistributionChart
