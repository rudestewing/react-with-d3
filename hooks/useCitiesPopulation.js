import { useEffect, useState } from 'react'
import { csv } from 'd3'

const useCitiesPopulation = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    csv('/data/cities-population.csv', (d) => {
      d.lat = parseFloat(d.lat)
      d.lng = parseFloat(d.lng)
      d.population = parseFloat(d.population)
      return d
    }).then((responseData) => {
      setData((state) => [...responseData])
    })
  }, [])

  return data
}

export default useCitiesPopulation
