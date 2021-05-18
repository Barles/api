module.exports = app => {
  const user = require('../controllers/user.controller.js')
  let router = require('express').Router()

  router.post('/', user.create)
  router.get('/', user.get)
  router.put('/:id', user.update)
  router.delete('/:id', user.delete)

  app.use('/user', router)
}
