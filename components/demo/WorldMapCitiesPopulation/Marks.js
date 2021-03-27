import {
  geoPath,
  geoNaturalEarth1,
  geoGraticule,
  scaleLinear,
  scaleSqrt,
  max,
} from 'd3'

const projection = geoNaturalEarth1()
const path = geoPath(projection)
const graticule = geoGraticule()

const Marks = ({ worldAtlas, cities }) => {
  const { countries, interiors } = worldAtlas

  const sizeValue = (d) => d.population
  const maxRadius = 10

  const circleSizeScale = scaleSqrt()
    .domain([0, max(cities, sizeValue)])
    .range([0, maxRadius])

  return (
    <g className="marks">
      <path
        d={path({ type: 'Sphere' })}
        className="speheres"
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
                strokeWidth: 3,
                strokeLinejoin: 'round',
                strokeLinecap: 'round',
              }}
            ></path>
          )
        })}
      {cities.length &&
        cities.map((d) => {
          const [x, y] = projection([d.lng, d.lat])
          return (
            <circle
              cx={x}
              cy={y}
              r={circleSizeScale(sizeValue(d))}
              style={{
                opacity: 0.3,
                fill: 'steelblue',
              }}
            ></circle>
          )
        })}
    </g>
  )
}

export default Marks
