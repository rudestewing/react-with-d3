import { select } from 'd3'
import { useEffect, useRef } from 'react'

const IdnicMemberDistributionChart = () => {
  const svgRef = useRef(null)

  function main() {
    const svg = select(svgRef.current)
    console.log(svg)
  }

  useEffect(() => {
    main()
  }, [])

  return (
    <div>
      <svg width="960" height="500" ref={svgRef}></svg>
    </div>
  )
}

export default IdnicMemberDistributionChart
