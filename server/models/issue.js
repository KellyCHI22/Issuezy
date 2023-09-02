'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Issue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Issue.belongsTo(models.Project, {
        foreignKey: 'projectId',
        as: 'Project',
      });
      Issue.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        as: 'Category',
      });
      Issue.belongsTo(models.User, {
        foreignKey: 'reporterId',
        as: 'Reporter',
      });
      Issue.belongsTo(models.User, {
        foreignKey: 'assigneeId',
        as: 'Assignee',
      });
    }
  }
  Issue.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      status: DataTypes.STRING,
      priority: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
      projectId: DataTypes.INTEGER,
      reporterId: DataTypes.INTEGER,
      assigneeId: DataTypes.INTEGER,
      isDeleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Issue',
      tableName: 'Issues',
      underscored: true,
    }
  );
  return Issue;
};
