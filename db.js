var mysql = require('mysql2');


var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  port: 3306,
  database: 'trivia'
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected !:) ");
});


module.exports = connection;
