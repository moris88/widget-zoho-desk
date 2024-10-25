import ReactDOM from 'react-dom/client'
import '@crmpartners/widget-factory/style'
import App from './App'
import './index.css'

import { ZohoCRM } from '@crmpartners/crmpartnerslib'

declare global {
  interface Window {
    ZOHO: ZohoCRM.SDK
  }
}

const { ZOHO } = window

const root = document.getElementById('root') as HTMLElement
ZOHO.embeddedApp.on('PageLoad', function (data) {
  ReactDOM.createRoot(root).render(<App crmData={data} />)
})

ZOHO.embeddedApp.init()
