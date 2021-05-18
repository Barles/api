const db = require('../../models')
const User = db.User
const Society = db.Society
const { uuid } = require('uuidv4')
const Op = db.Sequelize.Op

exports.create = (req, res) => {
  if (!req.body.lastname
      || !req.body.firstname
      || !req.body.email) {
    res.status(400).send({
      message: 'Missing datas'
    })
  }

  const user = {
    id: uuid(),
    lastname: req.body.lastname,
    firstname: req.body.firstname,
    email: req.body.email,
    societies_id: req.body.societies_id || null
  }

  if (user.societies_id != null) {
    user.societies_id.forEach((item, i) => {
      Society.findAll({ where: { id: item }})
        .then(data => {
          const users = data.users_id || []
          users.push(user.id)
          Society.update({
            users_id: users
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

  User.create(user)
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

  console.log('tets')

  User.findAll({ where: condition })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send()
    })
}

exports.update = (req, res) => {
  const id = req.params.id

  if (req.body.societies_id != null) {
    req.body.societies_id.forEach((item, i) => {
      Society.findAll({ where: { id: item }})
        .then(data => {
          const users = data.users_id || []
          users.push(id)
          Society.update({
            users_id: users
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

  User.update(req.body, {
    where: { id: id }
  })
    .then(resp => {
      if (resp == 1) {
        res.send({
          message: 'User updated'
        })
      } else {
        res.send({
          message: `Cannot update user with id ${id}`
        })
      }
    })
    .catch(err => {
      res.status(500).send()
    })
}

exports.delete = (req, res) => {
  const id = req.params.id

  User.destroy({
    where: { id: id }
  })
    .then(resp => {
      if (resp == 1) {
        res.send({
          message: 'User destroyed'
        })
      } else {
        res.send({
          message: `Cannot delete user with id ${id}`
        })
      }
    })
    .catch(err => {
      res.status(500).send()
    })
}
