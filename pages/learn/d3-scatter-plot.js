import { Fragment } from 'react'
import dynamic from 'next/dynamic'

const ScatterPlot = dynamic(() => import('@/components/learn/ScatterPlot'))

const PageComponent = () => {
  return (
    <Fragment>
      <div className="container mx-auto">
        <ScatterPlot />
      </div>
    </Fragment>
  )
}

export default PageComponent
