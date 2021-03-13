import dynamic from 'next/dynamic'
import Head from 'next/head'
import { Fragment } from 'react'

const AreaChart = dynamic(() => import('@/components/learn/AreaChart.js'))

const PageComponent = () => {
  return (
    <Fragment>
      <div>
        <AreaChart />
      </div>
    </Fragment>
  )
}

export default PageComponent
