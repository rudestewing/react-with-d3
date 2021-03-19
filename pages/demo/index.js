import dynamic from 'next/dynamic'
import Head from 'next/head'
import { Fragment } from 'react'

import DemoLayout from '@/components/layouts/DemoLayout'

const PageComponent = () => {
  return (
    <Fragment>
      <DemoLayout>
        {{
          content: <div>Welcome</div>,
        }}
      </DemoLayout>
    </Fragment>
  )
}

export default PageComponent
