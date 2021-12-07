
process.on("message", () => {
  console.log('im a child ts')
  process.send("copy that.")
  process.exit()
})

