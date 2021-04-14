import { csv } from 'd3'

import { useState, useEffect } from 'react'
import Bar from './Bar'
import useData from './useData'
import WorldMap from './WorldMap'

const margin = {
  top: 30,
  right: 30,
  bottom: 90,
  left: 90,
}

const width = 960
const height = 500

const innerWidth = width - margin.left - margin.right
const innerHeight = height - margin.top - margin.bottom

const MissingMigrant = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    csv('/data/MissingMigrants-Global-2021-03-27T05-02-23.csv', (d) => {
      return {
        date: new Date(d['Reported Date']),
        total: parseFloat(d['Total Dead and Missing']),
        coordinate: d['Location Coordinates'],
      }
    }).then((responseData) => {
      setData((state) => [...responseData])
    })
  }, [])

  return (
    <div>
      {data.length && (
        <div>
          <WorldMap data={data} />
          <Bar
            data={data}
            margin={margin}
            width={width}
            height={height}
            innerWidth={innerWidth}
            innerHeight={innerHeight}
          />
        </div>
      )}
    </div>
  )
}

export default MissingMigrant
