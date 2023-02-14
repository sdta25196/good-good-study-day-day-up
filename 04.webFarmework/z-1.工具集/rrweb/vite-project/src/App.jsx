import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { record, Replayer } from 'rrweb'

function App() {
  const [start, setStart] = useState(false)
  const [events, setEvents] = useState([])

  useEffect(() => {
    if (start) {
      record({
        emit(event) {
          setEvents(e => {
            e.push(event)
            return e
          })
        }
      });
    }
  }, [start])

  const replay = () => {
    console.log(events)
    const replayer = new Replayer(events, {
      root: document.querySelector('#replayBox')
    });
    replayer.play();
  }

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <input />
      <div className="card">
        <button onClick={() => setStart(state => !state)}>
          点击{!start ? '开始' : '停止'}录制
        </button>
        <button onClick={replay}>
          点击开始回放
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
