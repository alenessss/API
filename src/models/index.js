const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AppealModel = require('./appeal.model');

const Appeal = AppealModel(sequelize, DataTypes);

module.exports = {
  sequelize,
  Appeal,
};