var mysql = require('mysql');
 
console.log('Get connection ...');
 
var conn = mysql.createConnection({
  database: 'testeNodeJs',
  host: "localhost",
  user: "root",
  password: "bortolosso9090"
});
 
conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});