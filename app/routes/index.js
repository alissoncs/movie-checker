const router = require('express').Router()


let authmd = require('../middlewares/authmd')

// users endpoint
router.use('/movies', authmd, require('./movies'))
router.use('/rentings', authmd, require('./rentings'))
router.use('/customers', authmd, require('./customers'))
router.use('/users', require('./users'))
router.use('/auth', require('./authentication'))

module.exports = router
