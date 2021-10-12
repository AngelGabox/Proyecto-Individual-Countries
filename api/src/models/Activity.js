const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('activity', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    difficulty: {
      type: DataTypes.STRING,
      allowNull: true 
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: true      
    },
    season: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
};
