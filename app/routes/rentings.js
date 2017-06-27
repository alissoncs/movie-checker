const router = require('express').Router()

import RentingService from '../services/RentingService'
import Renting from '../entity/Renting'
import ErrorHandler from '../util/ErrorHandler'

router.post('/', ( req, res ) => {

  let service = new RentingService
  service.makeRent( req.body )
  .then(( id ) => {
    res.status(201).json({'id': id})
  })
  .catch((err) => {
    res.json( ErrorHandler(err, res) )
  })

})

router.get('/', (req, res) => {

  let renting = new Renting

  renting.fetchAll()
  .then(( data ) => {

    res.json(data)

  })
  .catch((err) => {

    res.json( ErrorHandler(err, res) )

  })

})

router.delete('/:id', function(req, res) {

  let id = req.params.id

  let renting = new Renting()

  renting.delete( id )
  .then(( ) => {
    return res.status( 200 ).json({
      'message': 'Movie returned with success'
    })
  })
  .catch( function(error) {
    return res.json(
      ErrorHandler( error, res )
    )
  })

})

module.exports = router
