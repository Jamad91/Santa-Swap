const db = require('APP/db')

const seedUsers = () => db.Promise.map([
  {name: 'Jimmy DiColandrea', email: 'god@example.com', password: '1234', isAdmin: true},
  {name: 'Barack Obama', email: 'barack@example.gov', password: '1234', isAdmin: false},
  {name: 'Joey DiColandrea', email: 'jdicolandrea@gmail.com', password: '1234', isAdmin: false}
], user => db.model('users').create(user))

// {giver: 1, receiver: 2}

const seedExchanges = () => db.Promise.map([
  {title: 'Main One', members: [
    {
      firstName: "Jimmy",
      lastName: "DiColandrea",
      email: "jdicolandrea@gmail.com",
      phone: "3472556257",
      address1: "60-24 Woodbine St.",
      address2: "Ridgewood, NY 11385",
      likes: "stuff",
      dislikes: "other stuff",
      misc: "n/a"
    },
    {
      firstName: "Joey",
      lastName: "DiColandrea",
      email: "jdicolandrea@gmail.com",
      phone: "3472556257",
      address1: "60-24 Woodbine St.",
      address2: "Ridgewood, NY 11385",
      likes: "stuff",
      dislikes: "other stuff",
      misc: "n/a"
    },
    {
      firstName: "Barack",
      lastName: "Obama",
      email: "jdicolandrea@gmail.com",
      phone: "3472556257",
      address1: "60-24 Woodbine St.",
      address2: "Ridgewood, NY 11385",
      likes: "stuff",
      dislikes: "other stuff",
      misc: "n/a"
    },
  ], list: [], owner_id: 1},
  {title: 'Second One', members: [], list: [], owner_id: 2}
], exchange => db.model('exchanges').create(exchange))

db.didSync
  .then(() => db.sync({force: true}))
  .then(seedUsers)
  .then(users => console.log(`Seeded ${users.length} users OK`))
  .then(seedExchanges)
  .then(exchanges => console.log(`Seeded ${exchanges.length} exchanges OK`))
  .catch(error => console.error(error))
  .finally(() => db.close())
