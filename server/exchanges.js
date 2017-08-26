'use strict'

const db = require('APP/db');
const Exchange = db.model('exchanges')
const router = require('express').Router();

router.get('/', (req, res, next) => {
  Exchange.findAll()
  .then(res.send.bind(res))
  .catch(next)
})

router.get('/:id', (req, res, next) => {
  Exchange.findById(req.params.id)
  .then(exchange => {
    console.log(exchange);
    return res.json(exchange)
  })
  .catch(next)
})

router.put('/:id', (req, res, next) => {
  Exchange.findById(req.params.id)
    .then(exchange => {
      var id = parseInt(Object.keys(req.body)[0])
      let newMembers = exchange.members
      newMembers.push(id)
      return exchange.update({members: newMembers})
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
  Exchange.create(req.body)
  .then(exchange => res.status(201).json(exchange))
  .catch(next)
})

router.delete('/:id', (req, res, next) => {
  Exchange.findById(req.params.id)
  .then(exchange => {
    exchange.destroy()
  })
  .then((destroyedExchange) => {res.status(204).send(destroyedExchange)})
  .catch(next)
})

module.exports = router;
