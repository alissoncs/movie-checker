const router = require('express').Router()

// users endpoint
router.use('/movies', require('./movies'))
router.use('/rentings', require('./rentings'))
router.use('/customers', require('./customers'))

module.exports = router
