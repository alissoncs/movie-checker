const router = require('express').Router()

// users endpoint
router.use('/movies', require('./movies'))

module.exports = router
