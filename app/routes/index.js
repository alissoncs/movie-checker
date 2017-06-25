const router = require('express').Router()

// users endpoint
router.use('/movies', require('./movies'))

router.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
})

module.exports = router
