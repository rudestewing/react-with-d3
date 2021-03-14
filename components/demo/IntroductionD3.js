import * as d3 from 'd3'
import { useRef } from 'react'
import { useEffect } from 'react'

const IntroductionD3 = () => {
  const svgRef = useRef()

  function main() {
    console.log('main')
    const svg = d3.select(svgRef.current)

    const height = parseFloat(svg.attr('height'))
    const width = parseFloat(svg.attr('width'))

    const eyeSpacing = 100
    const eyeYOffset = -70
    const eyeRadius = 30

    const eyebrowWidth = 70
    const eyebrowHeight = 10
    const eyebrowYOffset = -70

    const g = svg
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`)

    const circle = g
      .append('circle')
      .attr('r', height / 2)
      .attr('fill', 'yellow')
      .attr('stroke', 'black')

    const eyesG = g.append('g').attr('transform', `translate(0, ${eyeYOffset})`)

    const leftEye = eyesG
      .append('circle')
      .attr('r', eyeRadius)
      .attr('cx', -eyeSpacing)
      .attr('fill', 'black')

    const rightEye = eyesG
      .append('circle')
      .attr('r', eyeRadius)
      .attr('cx', eyeSpacing)
      .attr('fill', 'black')

    const leftEyebrow = eyesG
      .append('rect')
      .attr('x', -eyeSpacing - eyebrowWidth / 2)
      .attr('y', eyebrowYOffset)
      .attr('height', eyebrowHeight)
      .attr('width', eyebrowWidth)

    const rightEyebrow = eyesG
      .append('rect')
      .attr('x', eyeSpacing - eyebrowWidth / 2)
      .attr('y', eyebrowYOffset)
      .attr('height', eyebrowHeight)
      .attr('width', eyebrowWidth)
      .transition()
      .duration(2000)
      .attr('y', eyebrowYOffset - 30)
      .transition()
      .duration(1500)
      .attr('y', eyebrowYOffset)

    const mouth = g.append('path').attr(
      'd',
      d3.arc()({
        innerRadius: 0,
        outerRadius: 100,
        startAngle: Math.PI / 2,
        endAngle: (Math.PI * 3) / 2,
      })
    )
  }

  useEffect(() => {
    main()
  }, [])

  return (
    <div>
      <div className="p-10">
        <svg width="960" height="500" ref={svgRef}></svg>
      </div>
      <div>Hehe</div>
    </div>
  )
}

export default IntroductionD3
