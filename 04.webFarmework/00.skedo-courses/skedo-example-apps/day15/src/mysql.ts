import mysql from 'mysql'
import {promisify} from 'util'

const conn = mysql.createConnection({
  "host" : "172.17.0.3",
  "user" : 'root',
  "password" : "123456"
})


conn.connect((err) => {
  console.log('conn error:' + err.toString())
})

// const query = promisify(conn.query.bind(conn)) 

// async function run(){
// }

// run()

// conn.query("select * from mysql", (error, result) => {
//   if(error) {
//     throw error
//   }
//   console.log(result)
// })


