const cmd=require('node-cmd'); 
cmd.run('yarn start');

// const express = require('express')
// const next = require('next');
// const dev = true
// const app = next({ dev });
// const handle = app.getRequestHandler();

// app.prepare().then(() => {
//   const server = express();
//   server.get('*', (req, res) => {
//     return handle(req, res)
//   })
//   server.listen(3000, (err) => {
//     console.log('> ready on http://localhost:3000')
//   })
// })