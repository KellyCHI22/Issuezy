'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Project.belongsTo(models.User, {
        foreignKey: 'creatorId',
        as: 'Creator',
      });
      Project.belongsToMany(models.User, {
        through: models.Membership,
        foreignKey: 'projectId',
        as: 'Members',
      });
    }
  }
  Project.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      creatorId: DataTypes.INTEGER,
      isPublic: DataTypes.BOOLEAN,
      isDeleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Project',
      tableName: 'Projects',
      underscored: true,
    }
  );
  return Project;
};
