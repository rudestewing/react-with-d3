import { Fragment } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const menus = [
  {
    title: 'Home',
    path: '/',
  },
  {
    title: 'Map',
    path: '/map',
  },
  {
    title: 'PING',
    path: '/ping',
  },
]

const SiteLayout = ({ children }) => {
  const router = useRouter()

  return (
    <div>
      <header>
        <div className="container mx-auto">
          <ul className="flex flex-wrap">
            {menus.map((menu) => {
              return (
                <li key={menu.path} className="block">
                  <Link href={menu.path}>
                    <a
                      className={`block p-5 ${
                        router.pathname == menu.path &&
                        'bg-blue-600  text-gray-100'
                      }`}
                    >
                      {menu.title}
                    </a>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </header>
      <div id="content">{children.content || <Fragment />}</div>
    </div>
  )
}

export default SiteLayout
