import dynamic from 'next/dynamic'
import Head from 'next/head'
import { Fragment } from 'react'

import DemoLayout from '@/components/layouts/DemoLayout'

const BarChart = dynamic(() => import('@/components/demo/BarChart.js'))

const PageComponent = () => {
  return (
    <Fragment>
      <DemoLayout>
        {{
          content: (
            <div className="container mx-auto">
              <BarChart />
            </div>
          ),
        }}
      </DemoLayout>
    </Fragment>
  )
}

export default PageComponent
