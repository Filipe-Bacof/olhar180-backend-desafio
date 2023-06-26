const task = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    'Task',
    {
      title: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      conclusionDate: {
        type: DataTypes.DATE,
      },
      completed: {
        type: DataTypes.INTEGER,
      },
      priority: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'task',
    },
  )

  return Task
}

module.exports = task
