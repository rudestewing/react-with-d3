import { Fragment, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ChevronLeft, ChevronRight } from 'react-feather'
import { animated, useSpring } from 'react-spring'

const DemoLayout = ({ children }) => {
  const router = useRouter()
  const [showMenu, setShowMenu] = useState(true)

  const stylePropsMenu = useSpring(
    showMenu
      ? {
          opacity: 1,
          display: 'block',
        }
      : {
          opacity: 0,
          display: 'none',
        }
  )

  const menus = [
    {
      title: 'Bar Chart',
      path: '/demo/d3-bar',
    },
    {
      title: 'Scatter Plot',
      path: '/demo/d3-scatter-plot',
    },
    {
      title: 'Line',
      path: '/demo/d3-line',
    },
    {
      title: 'Area',
      path: '/demo/d3-area',
    },
    {
      title: 'World Map Population',
      path: '/demo/d3-world-map',
    },
    {
      title: 'Idnic Member Distribution',
      path: '/demo/d3-idnic-member-distribution',
    },
    {
      title: 'World Map',
      path: '/demo/d3-world-map-case',
    },
  ]

  function toggleMenu() {
    setShowMenu((state) => !state)
  }

  return (
    <div className="h-full">
      <div className="w-full block p-3 bg-blue-900">
        <div className="flex">
          <div className="cursor-pointer px-2" onClick={toggleMenu}>
            {showMenu ? (
              <ChevronLeft color="white" />
            ) : (
              <ChevronRight color="white" />
            )}
          </div>
          <h3 className="text-left font-semibold text-white tracking-wider">
            Exercise Chart with d3JS
          </h3>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 h-full">
        <animated.div
          style={stylePropsMenu}
          className={`col-span-1 lg:col-span-2 h-auto lg:h-full bg-blue-800`}
        >
          <ul>
            {menus.map((menu) => {
              return (
                <li key={menu.path}>
                  <Link href={menu.path}>
                    <a
                      className={`block p-3 w-full  ${
                        router.pathname == menu.path
                          ? 'text-blue-900 bg-white'
                          : 'text-white'
                      }
                      hover:text-blue-900 hover:bg-white text-xs`}
                    >
                      <span>{menu.title}</span>
                    </a>
                  </Link>
                </li>
              )
            })}
          </ul>
        </animated.div>
        <div className="col-span-1 lg:col-span-10">
          <div>{children.content || <Fragment />}</div>
        </div>
      </div>
    </div>
  )
}

export default DemoLayout
