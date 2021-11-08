const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "postgres://postgres:Unalul@localhost:5433/car-sharing",
  {
    dialect: "postgres",
  }
);

module.exports = sequelize;
