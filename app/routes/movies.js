const router = require('express').Router()
import Movie from '../entity/Movie'

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
  .catch( (error) => {
    if(error == Movie.NOT_FOUND)
      return res.status(Movie.NOT_FOUND).json( {
        message: 'Resource not found'
      } )
    else
      return res.status(Movie.SERVER_ERROR)
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
      return res.json({
        error
      })
    })

})

router.delete('/:id', function( req, res ) {

  let movie = new Movie( req.body )

  // try to save
  movie.save()
    .then( ( id ) => {

      return res.json({
        id
      })

    })
    .catch( function(error) {
      return res.json({
        error
      })
    })

})

module.exports = router
