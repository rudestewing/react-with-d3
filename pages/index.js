import SiteLayout from '@/components/layouts/SiteLayout'
import { Fragment } from 'react'

const PageComponent = () => {
  return (
    <Fragment>
      <div>
        <a href="/demo/" className="underline">
          Go to Demo
        </a>
      </div>
      {/* <SiteLayout>
        {{
          content: (
            <div className="container mx-auto py-10">
              <div>Home</div>
            </div>
          ),
        }}
      </SiteLayout> */}
    </Fragment>
  )
}

export default PageComponent
