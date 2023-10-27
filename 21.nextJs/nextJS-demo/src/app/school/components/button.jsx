"use client"
function Button({ x }) {
  const d = () => {
    console.log(x)
  }
  return (
    <div onClick={d}>
      这里是一个小组件啊{x}
    </div>
  )
}

export default Button