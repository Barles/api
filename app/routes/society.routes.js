module.exports = app => {
  const societies = require('../controllers/society.controller.js')
  let router = require('express').Router()

  router.post('/', societies.create)
  router.get('/', societies.get)
  router.put('/:id', societies.update)
  router.delete('/:id', societies.delete)

  app.use('/society', router)
}
