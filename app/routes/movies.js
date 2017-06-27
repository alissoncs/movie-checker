const router = require('express').Router()
import Movie from '../entity/Movie'
import ErrorHandler from '../util/ErrorHandler'

router.get('/', function(req, res) {

  let movie = new Movie()
  movie.fetchAll()
  .then( ( result ) => {
    return res.send(
      result
    )
  })

})

router.get('/:id', function(req, res) {

  let id = req.params.id

  let movie = new Movie()

  movie.fetchById( id )
  .then(( register ) => {
    return res.json( register )
  })
  .catch( function(error) {
    return res.json(
      ErrorHandler( error, res )
    )
  })

})

router.delete('/:id', function(req, res) {

  let id = req.params.id

  let movie = new Movie()

  movie.delete( id )
  .then(( ) => {
    return res.status( 200 ).json({
      'message': 'Deleted with success'
    })
  })
  .catch( function(error) {
    return res.json(
      ErrorHandler( error, res )
    )
  })

})

router.put('/:id', function(req, res) {

  let movie = new Movie()
  movie.update( req.params.id, req.body )
  .then(( ) => {
    return res.status( 200 ).json({
      'message': 'Updated with success'
    })
  })
  .catch( function(error) {
    return res.json(
      ErrorHandler( error, res )
    )
  })

})

// search by name
router.get('/search/:title', ( req, res ) => {

  let { title } = req.params

  let movie = new Movie
  movie.fetchByTitle( title )
  .then( ( result ) => {
    return res.send(
      result
    )
  })

})

router.post('/', function( req, res) {

  let movie = new Movie( req.body )

  // try to save
  movie.save()
    .then( ( id ) => {

      return res.json({
        id
      })

    })
    .catch( function(error) {
      return res.json(
        ErrorHandler( error, res )
      )
    })

})

module.exports = router
