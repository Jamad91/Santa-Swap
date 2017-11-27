'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')

const Exchange = db.define('exchanges', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  members: {
    type: Sequelize.ARRAY(Sequelize.JSON),
  },
  list: {
    type: Sequelize.ARRAY(Sequelize.JSON)
  },
  sentList: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  restrictions: {
    type: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.INTEGER))
  },
  dueDate: {
    type: Sequelize.STRING
  }
})

module.exports = Exchange
