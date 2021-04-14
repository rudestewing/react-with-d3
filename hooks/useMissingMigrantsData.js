import React, { useState, useEffect } from 'react'
import { csv } from 'd3'

export const useMissingMigrantsData = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    csv('/data/MissingMigrants-Global-2021-03-27T05-02-23.csv', (d) => {
      return {
        date: new Date(d['Reported Date']),
        total: parseFloat(d['Total Dead and Missing']),
        coordinate: d['Location Coordinates']
          .split(',')
          .map((d) => parseFloat(d)),
      }
    }).then((responseData) => {
      setData((state) => [...responseData])
    })
  }, [])

  return data
}

export default useMissingMigrantsData
