import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import './tailwind.css'
import './disabled-row.css'
import CaptureSelfieStep from './CaptureSelfieStep'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CaptureSelfieStep />
  </React.StrictMode>,
)
