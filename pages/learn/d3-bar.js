import dynamic from 'next/dynamic'
import Head from 'next/head'
import { Fragment } from 'react'

const BarChart = dynamic(() => import('@/components/learn/BarChart.js'))

const PageComponent = () => {
  return (
    <Fragment>
      <div>
        <BarChart />
      </div>
    </Fragment>
  )
}

export default PageComponent
