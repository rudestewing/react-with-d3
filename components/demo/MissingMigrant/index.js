import DateHistogramBar from './DateHistogramBar'
import useMissingMigrantsData from '../../../hooks/useMissingMigrantsData'
import WorldMap from './WorldMap'
import useWorldAtlas from 'hooks/useWorldAtlas'

const dimensionsWorldMap = {
  width: 960,
  height: 500,
}

const dimensionsDateHistogramBar = {
  width: 960,
  height: 150,
}

const MissingMigrant = () => {
  const data = useMissingMigrantsData()
  const worldAtlas = useWorldAtlas()

  return (
    <div>
      <h3 className="mb-3 font-semibold text-lg">Missing Migrants Data</h3>
      {data.length && (
        <>
          <svg
            aria-label="worldMap"
            width={dimensionsWorldMap.width}
            height={dimensionsWorldMap.height}
          >
            <WorldMap data={data} worldAtlas={worldAtlas} />
          </svg>
          <svg
            aria-label="dateHistogramBar"
            width={dimensionsDateHistogramBar.width}
            height={dimensionsDateHistogramBar.height}
          >
            <g>
              <DateHistogramBar
                data={data}
                width={dimensionsDateHistogramBar.width}
                height={dimensionsDateHistogramBar.height}
              />
            </g>
          </svg>
        </>
      )}
    </div>
  )
}

export default MissingMigrant
