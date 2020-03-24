'use strict';
module.exports = (sequelize, DataTypes) => {
  const tb_user = sequelize.define('tb_user', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {});
  tb_user.associate = function(models) {
    // associations can be defined here
  };
  return tb_user;
};