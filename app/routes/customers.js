const router = require('express').Router()
import Customer from '../entity/Customer'

router.get('/', function(req, res) {

  let Customer = new Customer()
  Customer.fetchAll()
  .then( ( result ) => {
    return res.send(
      result
    )
  })

})

router.get('/:id', function(req, res) {

  let id = req.params.id

  let Customer = new Customer()

  Customer.fetchById( id )
  .then(( register ) => {
    return res.json( register )
  })
  .catch( (error) => {
    if(error == Customer.NOT_FOUND)
      return res.status(Customer.NOT_FOUND).json( {
        message: 'Resource not found'
      } )
    else
      return res.status(Customer.SERVER_ERROR)
  })

})

router.delete('/:id', function(req, res) {

  let id = req.params.id

  let Customer = new Customer()

  Customer.delete( id )
  .then(( ) => {
    return res.status( 200 ).json({
      'message': 'Deleted with success'
    })
  })
  .catch( (error) => {
    if(error == Customer.NOT_FOUND)
      return res.status(Customer.NOT_FOUND).json( {
        message: 'Resource not found'
      } )
    else
      return res.status(Customer.SERVER_ERROR)
  })

})

router.put('/:id', function(req, res) {

  let Customer = new Customer()
  Customer.update( req.params.id, req.body )
  .then(( ) => {
    return res.status( 200 ).json({
      'message': 'Updated with success'
    })
  })
  .catch( (error) => {
    if(error == Customer.NOT_FOUND)
      return res.status(Customer.NOT_FOUND).json( {
        message: 'Resource not found'
      } )
    else
      return res.status(Customer.SERVER_ERROR)
  })

})

router.post('/', function( req, res) {

  let Customer = new Customer( req.body )

  // try to save
  Customer.save()
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
