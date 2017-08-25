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
  .then(exchange => res.json(exchange))
  .catch(next)
})

// NB:This is me trying to PUT the actual selectedExchange object

// router.put('/:id', (req, res, next) => {
//   console.log('IN THE SERVER');
//   return Exchange.findById(req.params.id)
//   .then(exchange => {
//     var id = parseInt(Object.keys(req.body)[0])
//     exchange.members.push(id)
//     exchange.update(req.body)
//     return exchange
//   })
//   .then(updated => {
//     updated.save();
//     // console.log('HERE',updated);
//     return res.status(202).json(updated)
//   })
//   .catch(next)
// })

router.put('/:id', (req, res, next) => {
  Exchange.findById(req.params.id)
    .then(exchange => {
      console.log(req.body);
      var id = parseInt(Object.keys(req.body)[0])
      console.log(id);
      let newMembers = exchange.members
      newMembers.push(id)
      return exchange.update({members: newMembers})
    })
    .catch(next)
})

router.get('/:id/members', (req, res, next) => {
  Exchange.findById(req.params.id)
  .then(exchange => res.json(exchange.members))
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
