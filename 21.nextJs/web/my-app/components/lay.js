function Lay({ children }) {
  console.log(666)
  return (
    <div>
      <div>这里公共的</div>
      {children}
    </div>
  )
}

export default Lay