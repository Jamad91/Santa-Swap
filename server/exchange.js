'use strict'

const db = require('APP/db');
const Exchange = db.model('exchanges')
const router = require('express').Router();

router.get('/', (req, res, next) => {
  Exchange.findAll()
  .then(res.sent.bind(res))
  .catch(next)
})

router.get('/:id', (req, res, next) => {
  Exchange.findById(req.params.id)
  .then(exchange => res.json(exchange))
  .catch(next)
})

router.put('/:id', (req, res, next) => {
  Exchange.findById(req.params.id)
  .then(exchange => exchange.update(req.body))
  .then(updated => res.status(201).json(updated))
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
