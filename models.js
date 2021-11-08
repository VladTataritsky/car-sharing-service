const { Sequelize } = require("sequelize");
const sequelize = require("./database/auth");

const creditCard = sequelize.define(
    "creditCard",
    {
      cardId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      cardNumber: { type: Sequelize.INTEGER, allowNull: false },
      cardHolder: { type: Sequelize.STRING, allowNull: false },
      cardValidDate: { type: Sequelize.STRING, allowNull: false },
    },
    {
      tableName: "creditCard",
    }
  );
  
  const driver = sequelize.define(
    "driver",
    {
      driverId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      licenceNumber: { type: Sequelize.INTEGER, allowNull: false },
      firstName: { type: Sequelize.STRING, allowNull: false },
      lastName: { type: Sequelize.STRING, allowNull: false },
      cardId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: creditCard, key: "cardId" },
      },
    },
    {
      tableName: "driver",
    }
  );
  
  const run = sequelize.define(
    "run",
    {
      runId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      startDate: { type: Sequelize.STRING, allowNull: false },
      driverId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "driver", key: "driverId" },
      },
      startFuelLevel: { type: Sequelize.STRING, allowNull: false },
      startMileage: { type: Sequelize.STRING, allowNull: false },
    },
    {
      tableName: "run",
    }
  );
  
  const car = sequelize.define(
    "test",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      vin: { type: Sequelize.STRING, allowNull: false },
      registrationNumber: { type: Sequelize.STRING, allowNull: false },
      brand: { type: Sequelize.STRING, allowNull: false },
      model: { type: Sequelize.STRING, allowNull: false },
      productionDate: { type: Sequelize.STRING, allowNull: false },
      status: { type: Sequelize.STRING, allowNull: false },
      fuelLevel: { type: Sequelize.STRING, allowNull: false },
      mileage: { type: Sequelize.STRING, allowNull: false },
      currentRunId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: run, key: "runId" },
      },
      latitude: { type: Sequelize.STRING, allowNull: false },
      longitude: { type: Sequelize.STRING, allowNull: false },
    },
    {
      tableName: "car",
    }
  );
  
  const booking = sequelize.define(
    "booking",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      carId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: car, key: "id" },
      },
      runId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: run, key: "runId" },
      },
      finishFuelLevel: { type: Sequelize.STRING, allowNull: false },
      finishMileage: { type: Sequelize.STRING, allowNull: false },
    },
    {
      tableName: "booking",
    }
  );

  module.exports = { creditCard, driver, run, car, booking}