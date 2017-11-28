const db = require('APP/db')

const seedUsers = () => db.Promise.map([
  {name: 'Admin', email: 'santaswap25@gmail.com', password: 'merry christmas', isAdmin: true},
], user => db.model('users').create(user))

// const seedExchanges = () => db.Promise.map([
//   {title: 'Main One', members: [
//     {
//       id: 1,
//       firstName: "Jimmy",
//       lastName: "DiColandrea",
//       email: "jdicolandrea@gmail.com",
//       phone: "3472556257",
//       houseNum: "Jimmy's House",
//       city: "Cincinnati"
//       state: "OH",
//       zip: "45202",
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
//       houseNum: "87 Bainbridge",
//       apartment: "Apt 3"
//       city: "Brooklyn",
//       state: "NY",
//       zip: "11385",
//       likes: "pigeons",
//       dislikes: "scruples",
//       misc: "don't care for beaches"
//     }
//   ], list: [], restrictions: [],owner_id: 1, dueDate: '12/25/17'}
// ], exchange => db.model('exchanges').create(exchange))

db.didSync
  .then(() => db.sync({force: true}))
  .then(seedUsers)
  .then(users => console.log(`Seeded ${users.length} users OK`))
  // .then(seedExchanges)
  // .then(exchanges => console.log(`Seeded ${exchanges.length} exchanges OK`))
  .catch(error => console.error(error))
  .finally(() => db.close())
