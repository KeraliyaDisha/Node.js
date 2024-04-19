const {Faculty, Branch} = require("./branch");
("use strict");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Faculty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Faculty.belongsTo(models.Branch,{
      //   as:'branches',
      //   foreignKey: 'branch_code'
      // });
      Faculty.belongsTo(models.Branch,{
        as: "Branch",
        foreignKey: "branch_id"
      })
    }
  }
  Faculty.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      main_subject: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      qualification: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      experience: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      branch_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Faculty",
    }
  );
  return Faculty;
};
