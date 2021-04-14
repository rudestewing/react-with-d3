import { geoNaturalEarth1, scaleSqrt, max } from 'd3'
import { geoNaturalEarh1, geoPath, geoGraticule } from 'd3'

const sizeValue = (d) => d.total

const projection = geoNaturalEarth1()
const path = geoPath(projection)
const graticule = geoGraticule()

const WorldMap = (props) => {
  const { data, worldAtlas } = props
  const { countries, interiors } = worldAtlas

  console.log(data)

  const sizeScale = scaleSqrt()
    .domain([0, max(data, sizeValue)])
    .range([0, 15])

  function handleCircleClick(d) {
    console.log(d)
  }

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

      {data.length &&
        data.map((d, index) => {
          const [x, y] = projection(d.coords)
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r={sizeScale(sizeValue(d))}
              onClick={() => handleCircleClick(d)}
              style={{ fill: '#137B80', opacity: 0.3 }}
            />
          )
        })}
      {/* {data.map((d, index) => {
        const [x, y] = projection([d.coordinate[1], d.coordinate[0]])

        return (
          <circle
            key={index}
            r={sizeScale(sizeValue(d))}
            cx={x}
            cy={y}
            style={{ fill: '#137B80', opacity: 0.3 }}
          ></circle>
        )
      })} */}
    </g>
  )
}

export default WorldMap
