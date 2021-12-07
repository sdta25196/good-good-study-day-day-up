
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

async function run(){
  while(true) {
    await sleep(1000)
    console.log('tick...child')
  }
}

run()