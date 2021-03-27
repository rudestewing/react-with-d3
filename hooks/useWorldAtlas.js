import { json } from 'd3'
import { useEffect, useState } from 'react'
import { feature, mesh } from 'topojson-client'

const dataUrl = '/data/world-atlas-topology-json-50m.json'

const useWorldAtlas = () => {
  const [data, setData] = useState({
    countries: null,
    interiors: null,
  })

  useEffect(() => {
    json(dataUrl).then((responseData) => {
      setData((state) => {
        const { countries } = responseData.objects
        return {
          countries: feature(responseData, countries),
          interiors: mesh(responseData, countries, (a, b) => a !== b),
        }
      })
    })
  }, [])

  return data
}

export default useWorldAtlas
