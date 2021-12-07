
export default function Composition(){
  return (
    <>
      <A></A>
      <B></B>
    </>
  )
}

function A () {
    return <h2>A</h2>
}

const B = () => {
    return <h2>B</h2>
}
