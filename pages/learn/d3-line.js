import dynamic from 'next/dynamic'
import Head from 'next/head'
import { Fragment } from 'react'

const LineChart = dynamic(() => import('@/components/learn/LineChart.js'))

const PageComponent = () => {
  return (
    <Fragment>
      <div>
        <LineChart />
      </div>
    </Fragment>
  )
}

export default PageComponent
