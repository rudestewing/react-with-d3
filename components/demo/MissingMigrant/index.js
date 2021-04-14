import DateHistogramBar from './DateHistogramBar'
import useMissingMigrantsData from '../../../hooks/useMissingMigrantsData'
import WorldMap from './WorldMap'
import useWorldAtlas from 'hooks/useWorldAtlas'
import { useState, useEffect, useMemo } from 'react'

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
  const [brushExtent, setBrushExtent] = useState([])
  // const [filteredData, setFilteredData] = useState([])

  // useEffect(() => {
  //   console.log('brush Extent changed')
  //   if (brushExtent.length) {
  //     setFilteredData(
  //       [...data].filter((d) => {
  //         const date = d.date
  //         return date >= brushExtent[0] && date <= brushExtent[1]
  //       })
  //     )
  //   } else {
  //     setFilteredData([...data])
  //   }
  // }, [brushExtent])

  const filteredData = useMemo(() => {
    return brushExtent.length
      ? data.filter((d) => {
          const date = d.date
          return date >= brushExtent[0] && date <= brushExtent[1]
        })
      : data
  }, [data, brushExtent])

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
            <g>
              <WorldMap data={filteredData} worldAtlas={worldAtlas} />
            </g>
          </svg>

          <svg
            aria-label="dateHistogramBar"
            width={dimensionsDateHistogramBar.width}
            height={dimensionsDateHistogramBar.height}
          >
            <g>
              <DateHistogramBar
                setBrushExtent={setBrushExtent}
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
