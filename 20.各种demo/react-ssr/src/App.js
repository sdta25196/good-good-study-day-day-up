import React, { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return <div>
    <div>ssr</div>
    <div>{count}</div>
    <button onClick={() => { setCount(x => x + 1) }}>累加器</button>
  </div>
}

export default App