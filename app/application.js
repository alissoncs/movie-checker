// load the database connection
const database = require('./database')

// load express module
const express = require('express')

// load body parser
const bodyParser = require('body-parser')

// application starup
const app = express()

import Movie from './entity/Movie'

// assign the bodyParser module
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use( '/', require('./routes') )

app.use( '*', (req,res) => {
  res.status(404).json({
    message: 'Non existent route'
  })
} )
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({message: 'Something broke!'});
})

module.exports = app
