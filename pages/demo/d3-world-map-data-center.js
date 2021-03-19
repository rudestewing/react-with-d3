import dynamic from 'next/dynamic'
import Head from 'next/head'
import { Fragment } from 'react'

import DemoLayout from '@/components/layouts/DemoLayout'
const WorldMapDataCenter = dynamic(() =>
  import('@/components/demo/WorldMapDataCenter')
)

const PageComponent = () => {
  return (
    <Fragment>
      <DemoLayout>
        {{
          content: (
            <div className="container mx-auto">
              <WorldMapDataCenter />
            </div>
          ),
        }}
      </DemoLayout>
    </Fragment>
  )
}

export default PageComponent
