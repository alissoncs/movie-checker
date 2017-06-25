
const mysql = require('mysql')

mysql.createConnection({

  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'movie_checker'

}).connect()

module.exports = mysql
