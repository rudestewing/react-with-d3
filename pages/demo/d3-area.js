import dynamic from 'next/dynamic'
import Head from 'next/head'
import { Fragment } from 'react'

import DemoLayout from '@/components/layouts/DemoLayout'

const AreaChart = dynamic(() => import('@/components/demo/AreaChart.js'))

const PageComponent = () => {
  return (
    <Fragment>
      <DemoLayout>
        {{
          content: (
            <div className="container mx-auto">
              <AreaChart />
            </div>
          ),
        }}
      </DemoLayout>
    </Fragment>
  )
}

export default PageComponent
