require('dotenv').config()

const Sequelize = require('sequelize')
const conString = process.env.DB_STRING

const sequelize = new Sequelize(conString, { dialect: 'postgres' })

module.exports = sequelize
