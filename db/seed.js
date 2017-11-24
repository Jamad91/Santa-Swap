const db = require('APP/db')

const seedUsers = () => db.Promise.map([
  {name: 'Admin', email: 'santaswap25@gmail.com', password: 'merry christmas', isAdmin: true},
], user => db.model('users').create(user))

// email: "josephdicolandrea@gmail.com",
// phone: "9177414603",
// email: "gspectred@gmail.com",
// phone: "9172045125",
// email: "bud424@gmail.com",
// phone: "6466233065",

// const seedExchanges = () => db.Promise.map([
//   {title: 'Main One', members: [
//     {
//       id: 1,
//       firstName: "Jimmy",
//       lastName: "DiColandrea",
//       email: "jdicolandrea@gmail.com",
//       phone: "3472556257",
//       address1: "Jimmy's House",
//       address2: "Cincinnati, OH",
//       likes: "jimmy's things",
//       dislikes: "not jimmy's things",
//       misc: "no mushrooms"
//     },
//     {
//       id: 2,
//       firstName: "Joey",
//       lastName: "DiColandrea",
//       email: "jdicolandrea@gmail.com",
//       phone: "3472556257",
//       address1: "Joey's House",
//       address2: "Bedstuy, NY",
//       likes: "pigeons",
//       dislikes: "scruples",
//       misc: "don't care for beaches"
//     },
//     {
//       id: 3,
//       firstName: "Gary",
//       lastName: "Donofrio",
//       email: "jdicolandrea@gmail.com",
//       phone: "3472556257",
//       address1: "Gary's House",
//       address2: "Maspeth, NY",
//       likes: "punisher",
//       dislikes: "donald's bitching and moaning",
//       misc: "has to be shipped in several boxes, regardless of size"
//     },
//     {
//       id: 4,
//       firstName: "Matt",
//       lastName: "Putre",
//       email: "jdicolandrea@gmail.com",
//       phone: "3472556257",
//       address1: "Matt's House",
//       address2: "Middle Village, NY",
//       likes: "Paul Freck",
//       dislikes: "Andrew Zeni",
//       misc: "must be hand delivered, but beware of Al"
//     }
//   ], list: [], restrictions: [[1,2,1]],owner_id: 1, dueDate: '12/25/17'},
//   {title: 'Second One', members: [], list: [], owner_id: 2}
// ], exchange => db.model('exchanges').create(exchange))

db.didSync
  .then(() => db.sync({force: true}))
  .then(seedUsers)
  .then(users => console.log(`Seeded ${users.length} users OK`))
  // .then(seedExchanges)
  // .then(exchanges => console.log(`Seeded ${exchanges.length} exchanges OK`))
  .catch(error => console.error(error))
  .finally(() => db.close())
