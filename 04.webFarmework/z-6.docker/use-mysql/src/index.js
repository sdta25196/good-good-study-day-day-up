var mysql = require('mysql');

var connection = mysql.createConnection({
  host: '192.168.0.107',
  user: 'root',
  password: '123456',
  database: 'mysql'
});

connection.connect();

connection.query('SELECT * FROM `user` u', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});

connection.end();