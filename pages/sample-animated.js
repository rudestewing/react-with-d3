import { animated, useSpring } from 'react-spring'

const PageComponent = () => {
  const animatedProps = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    animationDuration: 2000,
  })

  return (
    <div>
      <animated.div style={animatedProps}>
        <div className="bg-blue-500 p-3 block">Hello</div>
      </animated.div>
    </div>
  )
}

export default PageComponent
