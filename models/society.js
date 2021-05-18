'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Society extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Society.init({
    users_id: DataTypes.JSON,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Society',
  });
  return Society;
};
