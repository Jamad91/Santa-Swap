const db = require('APP/db')

const seedUsers = () => db.Promise.map([
  {name: 'Jimmy DiColandrea', email: 'god@example.com', password: '1234', isAdmin: true},
  {name: 'Barack Obama', email: 'barack@example.gov', password: '1234', isAdmin: false},
  {name: 'Joey DiColandrea', email: 'jdicolandrea@gmail.com', password: '1234', isAdmin: false}
], user => db.model('users').create(user))

// {giver: 1, receiver: 2}

const seedExchanges = () => db.Promise.map([
  {title: 'Main One', members: [], list: [], owner_id: 1},
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
