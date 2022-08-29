

for (let i = 1; i < 10; i++) {
  require('node-fetch')("http://localhost:3000/api/revalidate?secret=eol&path=/school/" + i)
}

