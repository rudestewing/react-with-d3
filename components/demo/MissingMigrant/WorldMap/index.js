import { geoNaturalEarth1, scaleSqrt, max } from 'd3'
import { geoNaturalEarh1, geoPath, geoGraticule } from 'd3'

const sizeValue = (d) => d.total
const maxRadius = 15

const projection = geoNaturalEarth1()
const path = geoPath(projection)
const graticule = geoGraticule()

const WorldMap = (props) => {
  const { data, worldAtlas } = props
  const { countries, interiors } = worldAtlas

  const sizeScale = scaleSqrt()
    .domain([0, max(data, sizeValue)])
    .range([0, 15])

  return (
    <g>
      <path
        d={path({ type: 'Spehere' })}
        style={{
          fill: '#fdfdfd',
        }}
      ></path>
      <path
        d={path(graticule())}
        style={{
          fill: 'none',
          stroke: 'lightgray',
        }}
      ></path>
      {countries &&
        countries.features.map((feature, index) => {
          return (
            <path
              key={index}
              className="feature"
              d={path(feature)}
              style={{
                fill: '#d8d8d8',
                strokeWidth: 0.5,
                strokeLinejoin: 'round',
                strokeLinecap: 'round',
                stroke: '#fdfdfd',
              }}
            ></path>
          )
        })}
      {data.map((d) => {
        const [x, y] = projection([d.coordinate[1], d.coordinate[0]])

        return (
          <circle
            r={sizeScale(sizeValue(d))}
            cx={x}
            cy={y}
            style={{ fill: '#137B80', opacity: 0.3 }}
          ></circle>
        )
      })}
    </g>
  )
}

export default WorldMap
