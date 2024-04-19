const {Post, User} = require('../models')

'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {

    static associate(models) {
    //  association define here
    }
  }
  Comment.init({
    postId:{
      type: DataTypes.INTEGER,
      references:{
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
    body: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};