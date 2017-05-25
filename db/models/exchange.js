'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')

const Exchange = db.define('exchanges', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  organizer: {
    type: Sequelize.STRING,
    allowNull: false
  },
  members: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
})

module.exports = Exchange
