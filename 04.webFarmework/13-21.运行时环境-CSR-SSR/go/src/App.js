import React from 'react'
import { useHistory } from 'react-router-dom'
function App(props) {
  const history = useHistory()
  return (
    <div>
      AppHello
      <button onClick={() => history.push('/ssr')}>
        点击去ssr
      </button>
    </div>
  )
}

export default App