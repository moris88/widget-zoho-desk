import React from 'react'

import {
  If,
  Lead,
  Print,
  useRecords,
  ZohoCRM,
} from '@crmpartners/crmpartnerslib'
import { Button, Spinner } from '@crmpartners/widget-factory'

export interface AppProps {
  crmData: ZohoCRM.EmbeddedAppData
}

function App({ crmData }: AppProps) {
  const { Entity, EntityId } = crmData
  const [show, setShow] = React.useState<boolean>(false)
  const { loading, response, error } = useRecords<Lead>({
    module: Entity,
    id: EntityId as string,
  })

  return (
    <If
      condition={!loading}
      isFalse={
        <div className="flex h-screen items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <div
        className={`${
          loading ? 'flex items-center justify-center' : 'm-10'
        } h-full`}
      >
        <p className="mb-2 rounded-lg bg-slate-100 p-2 text-center font-bold">
          {`Module: "${Entity}" - ID: ${EntityId}`}
        </p>
        <div className="mb-5 flex justify-center">
          <Button
            tag="button"
            variant={show ? 'failure' : 'primary'}
            onClick={() => setShow((show) => !show)}
          >
            <If condition={show} isFalse={<>Show</>}>
              Close
            </If>
          </Button>
        </div>
        <If
          condition={!error}
          isFalse={
            <div className="rounded-md bg-red-500 p-2">
              <p className="text-center font-bold">Error Developer!</p>
              <Print data={error} />
            </div>
          }
        >
          <If condition={show}>
            <Print className="rounded-md bg-sky-500 p-2" data={response} />
          </If>
        </If>
      </div>
    </If>
  )
}

export default App
