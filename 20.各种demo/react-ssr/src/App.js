import React from 'react'
import { Route } from 'react-router-dom'
import Index from './container/Index'
import About from './container/About'

function App() {
  return (
    <div>
      <Route path="/" exact component={Index}></Route>
      <Route path="/about" exact component={About}></Route>
    </div>
  )
}
export default App