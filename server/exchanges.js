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
// //   console.log('IN THE SERVER');
// //   console.log(req.params.id);
// //   console.log('+++++++++++++++');
//   Exchange.findById(req.params.id)
//   // .then(exchange => exchange)
//   .then(exchange => {
//     console.log('BODY',req.body);
//     console.log('+++++++++++++++');
//     console.log('DATA VALUES',exchange.dataValues);
//     // console.log(parseInt(Object.keys(req.body)[0]));
//     // var id = parseInt(Object.keys(req.body)[0])
//     // exchange.dataValues.members
//     exchange.update(req.body)
//     // console.log(exchange.dataValues.members);
//     // exchange.dataValues.members.push(id)
//     return exchange
//   })
//   .then(updated => {
//
//     res.status(201).json(updated)
//   })
//   .catch(next)
// })

router.get('/:id/members', (req, res, next) => {
  Exchange.findById(req.params.id)
  .then(exchange => res.json(exchange.members))
  .catch(next)
})


// NB:This is me trying to PUT the members array of the selectedExchange object
router.put('/:id/members', (req, res, next) => {
  Exchange.findById(req.params.id)
  .then(exchange => exchange.update(req.body))
  // .then(exchange => exchange.update(req.body))
  // .then(exchange => {
  //   // exchange.members.update(req.body)
  //   exchange.update(req.body)
  //   return exchange
  // })
  .then(updated => {
    res.status(201).json(updated)
    return res
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
