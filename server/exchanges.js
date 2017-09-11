'use strict'

const db = require('APP/db');
const Exchange = db.model('exchanges')
const router = require('express').Router();
const nodemailer = require('nodemailer')
const login_info = require('./login_info');

console.log(login_info);


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

router.put('/:id', (req, res, next) => {
  Exchange.findById(req.params.id)
    .then(exchange => {
      console.log('REQ.BODY', Object.keys(req.body[0])[0]);
      console.log('REQ.BODY', req.body);
      let mailList = [];
      let names = []

      for (var i = 0; i < req.body.length; i++) {
        mailList.push(req.body[i].giver.email)
        names.push(req.body[i].giver.firstName)
      }

      console.log('MAIL LIST', mailList);
      console.log('NAMES', names);

      let newMembers = exchange.members
      let newList = exchange.list
      if (Object.keys(req.body[0])[0] === 'giver') {
        newList = req.body;

        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: login_info
          //login_info is an exported object with a user and a password key
          // info corresponds to a google account, in this case santaswap25
        });
        for (var i = 0; i < req.body.length; i++) {
          let mailOptions = {
            from: 'santaswap25@gmail.com',
            to: mailList[i],
            subject: 'Email Example',
            text: `Hello ${names[i]}`
          }
          transporter.sendMail(mailOptions, function(error, info){
            if(error){
              console.log('ERROR:', error);
            }else{
              console.log('Message sent: ' + info.response);
              res.json({yo: info.response});
            };
          });
        }


      }
      else if (Object.keys(req.body).length > 1) {
        newMembers.push(req.body)
      }
      else {
        let id = parseInt(Object.keys(req.body))
        let idx
        for (var i = 0; i < newMembers.length && !idx; i++) {
          if (id === newMembers[i].id) {
            idx = i
          }
        }
        newMembers.splice(idx, 1)
      }
      return exchange.update({members: newMembers, list: newList})
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
