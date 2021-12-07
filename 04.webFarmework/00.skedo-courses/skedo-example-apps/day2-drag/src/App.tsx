import React from 'react'
import Draggable, { DraggableCore } from 'react-draggable'
const App = () => {
  return (
    <React.Fragment>
      <Draggable
        handle=".handle"
        defaultPosition={{ x: 0, y: 0 }}
        grid={[50, 50]}
        scale={1}
      >
        <div
          className="handle"
          style={{
            cursor: "pointer",
            backgroundColor: "#eee",
            width: "200px",
          }}
        >
          <div>Drag from here</div>
          <div>This readme is really dragging on...</div>
        </div>
      </Draggable>
      <DraggableCore handle=".handle" onDrag={(a,b) => {
        console.log(a, b)
      }}>
        <div 
          className="handle">Hello</div>
      </DraggableCore>
    </React.Fragment>
  )
}
export default App