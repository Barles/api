const db = require('../../models')
const Society = db.Society
const User = db.User
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

  if (society.user_id != null) {
    society.user_id.forEach((item, i) => {
      User.findAll({ where: { id: item }})
        .then(data => {
          const societies = data.societies_id || []
          societies.push(society.id)
          User.update({
            societies_id: societies
          }, {
            where: { id: item }
          })
            .catch(err => {
              res.status(500).send()
            })
        })
        .catch(err => {
          res.status(500).send()
        })
    });
  }

  Society.create(society)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send()
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
      res.status(500).send()
    })
}

exports.update = (req, res) => {
  const id = req.params.id

  if (req.body.users_id != null) {
    req.body.users_id.forEach((item, i) => {
      User.findAll({ where: { id: item }})
        .then(data => {
          const societies = data.societies_id || []
          societies.push(id)
          User.update({
            societies_id: societies
          }, {
            where: { id: item }
          })
            .catch(err => {
              res.status(500).send()
            })
        })
        .catch(err => {
          res.status(500).send()
        })
    });
  }


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
      res.status(500).send()
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
      res.status(500).send()
    })
}
