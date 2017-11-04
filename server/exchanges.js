'use strict'

const db = require('APP/db');
const Exchange = db.model('exchanges')
const router = require('express').Router();
const nodemailer = require('nodemailer')
const login_info = require('./login_info');
const twilio = require('twilio');
const twilio_info = require('./twilio_info');
const client = new twilio(twilio_info.API_KEY, twilio_info.SECRET);

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
      let newMembers = exchange.members
      let newList = exchange.newList
      if (Object.keys(req.body).length === 1) {
        let id = parseInt(Object.keys(req.body))
        let idx
        for (var i = 0; i < newMembers.length && !idx; i++) {
          if (id === newMembers[i].id) {
            idx = i
          }
        }
        newMembers.splice(idx, 1)
      }
      else if (Object.keys(req.body[0])[0] === 'giver') {
        newList = req.body;

        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: login_info
          //login_info is an exported object with a user and a password key
          // info corresponds to a google account, in this case santaswap25
        });
        for (var i = 0; i < req.body.length; i++) {
          let currentGiver = req.body[i].giver
          let currentReceiver = req.body[i].receiver
          // console.log(currentGiver);
          // client.messages.create({
          //   to: currentGiver.phone,
          //   from: '+12017343979',
          //   body: `Hello, ${currentGiver.firstName}. You are getting a present for ${currentReceiver.firstName} ${currentReceiver.lastName}. Please check your email for more information. Text Jimmy to confirm message.`
          // });
          // console.log('Client',client.httpClient);
          // console.log('------------------------------');
          // console.log('Messages',client.messages);
          // let mailOptions = {
          //   from: 'santaswap25@gmail.com',
          //   to: currentGiver.email,
          //   subject: `Test Email for ${currentGiver.firstName}`,
          //   text: `
          //     <div>
          //       Hello ${currentGiver.firstName}. You are getting a present for ${currentReceiver.firstName} ${currentReceiver.lastName}<br />
          //       Their address is: <br />
          //       ${currentReceiver.address1}<br />
          //       ${currentReceiver.address2}<br />
          //       <br />
          //       They like: <br />
          //       ${currentReceiver.likes}
          //       <br />
          //       They dislike: <br />
          //       ${currentReceiver.dislikes}
          //       <br /><br />
          //       Anything else to know about them: <br />
          //       ${currentReceiver.misc}
          //     </div>
          //   `
          // }

          // transporter.sendMail(mailOptions, function(error, info){
          //   if(error){
          //     console.log('ERROR:', error);
          //   }else{
          //     // console.log('Message sent: ' + info.response);
          //     res.json({yo: info.response});
          //   };
          // });
        }


      }
      else if (Object.keys(req.body).length > 1) {
        console.log('adding a perason');
        newMembers.push(req.body)
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
