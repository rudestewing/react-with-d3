import dynamic from 'next/dynamic'
import Head from 'next/head'
import { Fragment } from 'react'

const IntroductionD3 = dynamic(() =>
  import('@/components/learn/IntroductionD3')
)

const PageComponent = () => {
  return (
    <Fragment>
      <div>
        <IntroductionD3 />
      </div>
    </Fragment>
  )
}

export default PageComponent
