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

module.exports = app
