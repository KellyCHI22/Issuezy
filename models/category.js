'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.belongsTo(models.Project, {
        foreignKey: 'projectId',
        as: 'Project',
      });
    }
  }
  Category.init(
    {
      name: DataTypes.STRING,
      projectId: DataTypes.INTEGER,
      isDefault: DataTypes.BOOLEAN,
      isDeleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Category',
      tableName: 'Categories',
      underscored: true,
    }
  );
  return Category;
};
