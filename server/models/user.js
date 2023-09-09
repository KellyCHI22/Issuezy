'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Project, { foreignKey: 'creatorId' });
      User.belongsToMany(models.Project, {
        through: models.Membership,
        foreignKey: 'userId',
        as: 'JoinedProjects',
      });
      User.hasMany(models.Issue, {
        foreignKey: 'reporterId',
        as: 'ReportedIssues',
      });
      User.hasMany(models.Issue, {
        foreignKey: 'assigneeId',
        as: 'AssignedIssues',
      });
      User.hasMany(models.Comment, { foreignKey: 'userId' });
    }
  }
  User.init(
    {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users',
      underscored: true,
      defaultScope: {
        attributes: { exclude: ['password'] },
      },
      scopes: {
        withPassword: {
          attributes: {},
        },
      },
    }
  );
  return User;
};
