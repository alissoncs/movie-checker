// load the database connection
const database = require('./database')

// load express module
const express = require('express')

// load body parser
const bodyParser = require('body-parser')

// application starup
const app = express()

const Movie = require('./entity/Movie')

// assign the bodyParser module
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// main route
app.get('/', function(req, res) {

  let movie = new Movie({

  })

  return res.send({
    movie: movie
  })

})

module.exports = app
