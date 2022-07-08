let a = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 4,
    },
    right: {
      val: 5,
    }
  },
  right: {
    val: 3,
    left: {
      val: 6,
    },
    right: {
      val: 7,
    }
  }
}


function mirrorTree(node) {
  if (!node) return null
  const left = mirrorTree(node.left)
  const right = mirrorTree(node.right)
  node.left = right
  node.right = left
  return node
}

mirrorTree(a)

console.log(JSON.stringify(a, null, 2));