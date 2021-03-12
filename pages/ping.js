import SiteLayout from '@/components/layouts/SiteLayout'
import { Fragment } from 'react'

const PageComponent = () => {
  return (
    <Fragment>
      <SiteLayout>
        {{
          content: (
            <div className="container mx-auto py-10">
              <div>Ping</div>
            </div>
          ),
        }}
      </SiteLayout>
    </Fragment>
  )
}

export default PageComponent
