'use strict';
const { Post, User } = require('../models');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      Like.belongsTo(models.Post,{
        as: "posts",
        foreignKey: "postId"
      })
    }
  }
  Like.init({
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: Post,
        key: 'id',
      }
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};