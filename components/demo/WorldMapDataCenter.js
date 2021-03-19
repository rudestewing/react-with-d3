import { useRef, useState, useEffect, useMemo } from 'react'
import {
  select,
  geoNaturalEarth1,
  geoPath,
  json,
  zoom,
  selection,
  svg,
} from 'd3'
import { feature } from 'topojson-client'

const WorldMapDataCenter = () => {
  const svgRef = useRef(null)
  const projection = useMemo(() => geoNaturalEarth1())
  const path = useMemo(() => geoPath().projection(projection))
  const [mapTransform, setMapTransform] = useState({ x: 0, y: 0, k: 1 })

  const [featuresData, setFeaturesData] = useState(null)

  function fetchData() {
    Promise.all([json('/data/world-atlas-topology-json-110m.json')]).then(
      ([worldMap]) => {
        const features = feature(worldMap, worldMap.objects.countries)
        setFeaturesData((state) => features)
      }
    )
  }

  function attachZoomMap() {
    const svg = select(svgRef.current)
    svg.call(
      zoom().on('zoom', (e) => {
        console.log('zoom')
      })
    )
  }

  function detachZoomMap() {
    const svg = select(svgRef.current)

    svg.on('zoom', null)
  }

  useEffect(() => {
    fetchData()

    attachZoomMap()

    return () => {
      detachZoomMap()
    }
  }, [])

  function handleMouseOverMap(e) {
    e.target.setAttribute('fill', '#4f7ff0')
  }

  function handleMouseOut(e) {
    e.target.setAttribute('fill', '#f2f6fc')
  }

  function handleClickDataCenter(e, d) {
    console.log(e, d)
  }

  return (
    <div>
      <div id="world-map-data-center" style={{ height: '500px' }}>
        <svg width="100%" height="100%" ref={svgRef}>
          <g
            transform={`translate(${mapTransform.x}, ${mapTransform.y}) scale(${mapTransform.k})`}
            className="map-group"
          >
            {featuresData &&
              featuresData.features.map((d, i) => {
                return (
                  <path
                    key={i}
                    d={path(d)}
                    fill="#f2f6fc"
                    strokeWidth="0.2"
                    stroke="gray"
                    onMouseOver={handleMouseOverMap}
                    onMouseOut={handleMouseOut}
                    className="country"
                  ></path>
                )
              })}
          </g>
          <g>{/* Circles Location goes here */}</g>)
        </svg>
      </div>
    </div>
  )
}

export default WorldMapDataCenter
