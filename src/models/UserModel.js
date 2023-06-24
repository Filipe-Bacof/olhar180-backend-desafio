const user = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: {
        type: DataTypes.STRING,
      },
      surname: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      githubUrl: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'user',
    },
  )

  return User
}

module.exports = user
