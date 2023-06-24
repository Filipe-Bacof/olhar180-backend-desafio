const sequelize = require('../config/sequelize')
const Sequelize = require('sequelize')

const Task = require('./TaskModel')
const User = require('./UserModel')

const task = Task(sequelize, Sequelize.DataTypes)
const user = User(sequelize, Sequelize.DataTypes)

const db = {
  task,
  user,
  sequelize,
}

user.hasMany(task, {
  foreignKey: 'userId',
  as: 'tasks',
  onDelete: 'CASCADE',
})

task.belongsTo(user, {
  foreignKey: 'userId',
  as: 'user',
  onDelete: 'CASCADE',
})

module.exports = db
