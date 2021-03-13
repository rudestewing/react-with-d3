import dynamic from 'next/dynamic'
import Head from 'next/head'
import { Fragment } from 'react'

const GeneralUpdate = dynamic(() => import('@/components/learn/GeneralUpdate'))

const PageComponent = () => {
  return (
    <Fragment>
      <div>
        <GeneralUpdate />
      </div>
    </Fragment>
  )
}

export default PageComponent
