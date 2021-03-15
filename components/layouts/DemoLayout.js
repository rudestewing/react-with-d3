import { Fragment } from 'react'
import Link from 'next/link'

const DemoLayout = ({ children }) => {
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
      title: 'World Map',
      path: '/demo/d3-world-map',
    },
    {
      title: 'Idnic Member Distribution',
      path: '/demo/d3-idnic-member-distribution',
    },
  ]

  return (
    <div>
      <div className="w-full block p-3 bg-blue-900">
        <h3 className="text-left font-semibold text-white tracking-wider">
          Examples of d3js
        </h3>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 ">
        <div className="col-span-1 lg:col-span-2 h-full bg-blue-800">
          <ul>
            {menus.map((menu) => {
              return (
                <li key={menu.path}>
                  <Link href={menu.path}>
                    <a className="block p-3 w-full text-white hover:text-blue-900 hover:bg-white">
                      {menu.title}
                    </a>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="col-span-1 lg:col-span-10">
          <div>{children.content || <Fragment />}</div>
        </div>
      </div>
    </div>
  )
}

export default DemoLayout
