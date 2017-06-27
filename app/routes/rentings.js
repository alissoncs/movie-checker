const router = require('express').Router()

import RentingService from '../services/RentingService'
import ErrorHandler from '../util/ErrorHandler'

router.post('/', ( req, res ) => {

  let service = new RentingService
  service.makeRent( req.body )
  .then((ok) => {
    res.status(201).json({'id': ok})
  })
  .catch((err) => {
    res.json( ErrorHandler(err, res) )
  })

})

module.exports = router
