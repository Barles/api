const db = require('../../models')
const Society = db.Society
const { uuid } = require('uuidv4')
const Op = db.Sequelize.Op

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: 'Missing society name'
    })
  }

  const society = {
    id: uuid(),
    name: req.body.name,
    users_id: req.body.users || null
  }

  Society.create(society)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error while creating Society"
      })
    })
}

exports.get = (req, res) => {
  const id = req.query.id
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  Society.findAll({ where: condition })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error while fetching Societies"
      })
    })
}

exports.update = (req, res) => {
  const id = req.params.id

  Society.update(req.body, {
    where: { id: id }
  })
    .then(resp => {
      if (resp == 1) {
        res.send({
          message: 'Society updated'
        })
      } else {
        res.send({
          message: `Cannot update society with id ${id}`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error while updating Society"
      })
    })
}

exports.delete = (req, res) => {
  const id = req.params.id

  Society.destroy({
    where: { id: id }
  })
    .then(resp => {
      if (resp == 1) {
        res.send({
          message: 'Society destroyed'
        })
      } else {
        res.send({
          message: `Cannot delete society with id ${id}`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error while deleting Society"
      })
    })
}
