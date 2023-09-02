'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.Issue, {
        foreignKey: 'issueId',
        as: 'Issue',
      });
      Comment.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'User',
      });
    }
  }
  Comment.init(
    {
      text: DataTypes.STRING,
      issueId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      isDeleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Comment',
      tableName: 'Comments',
      underscored: true,
    }
  );
  return Comment;
};
