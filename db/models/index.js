'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require('./user')
const Exchange = require('./exchange')
const OAuth = require('./oauth')

OAuth.belongsTo(User)
User.hasOne(OAuth)

Exchange.belongsTo(User, {as: 'owner'})

module.exports = {User, Exchange}
