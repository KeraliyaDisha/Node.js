const { User } = require("./user")
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.hasMany(models.Like, {
        as: "likes",
        foreignKey: 'postId'
      }),
      Post.hasMany(models.Comment, {
        as: "comments",
        foreignKey: 'PostId'
      })
    }
  }
  Post.init({
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      foreignKey: true,
      references: {
        model: User,
        key: 'id',
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likeCount: {
      type: DataTypes.INTEGER,
    },
    commentCount: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};