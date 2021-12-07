import React from "react"

export default () => {
  return <Container x={1}>  
    <ChildComponent /> 
  </Container>
}

const Container = ({children, x} : {
  children : JSX.Element,
  x : number
}) => {
  return <div>
    {React.cloneElement(children, {
      x
    })}
  </div>

}

const ChildComponent = ({x} : {
  x? : number
}) => {
  return <div>{x}</div> 
}