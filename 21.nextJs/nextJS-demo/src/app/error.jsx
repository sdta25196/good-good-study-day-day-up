"use client"

function GlobalError({ error }) {
  return (
    <div>
      滋啦啦的错误:<br />
      {error.message}
    </div>
  )
}

export default GlobalError