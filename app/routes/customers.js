const router = require('express').Router()
import Customer from '../entity/Customer'
import ErrorHandler from '../util/ErrorHandler'

router.get('/', function(req, res) {

  let customer = new Customer()
  customer.fetchAll()
  .then( ( result ) => {
    return res.send(
      result
    )
  })

})

router.get('/:id', function(req, res) {

  let id = req.params.id

  let customer = new Customer()

  customer.fetchById( id )
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

  let customer = new Customer()

  customer.delete( id )
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

  let customer = new Customer()
  customer.update( req.params.id, req.body )
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

router.post('/', function( req, res) {

  let customer = new Customer( req.body )

  // try to save
  customer.save()
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
