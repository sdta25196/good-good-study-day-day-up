import React from 'react'
import ReactDOM from 'react-dom'
import metaConfig from './meta.config'
import App from './Render'

ReactDOM.render(
  <React.StrictMode>
    <App meta={metaConfig} />
  </React.StrictMode>,
  document.getElementById('root')
)
