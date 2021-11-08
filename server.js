const express = require("express");
const sequelize = require("./database/auth");
const CarSharingServise = require("./services");

const app = express();

sequelize
  .sync()
  .then(() => {
    app.listen(3000, function () {
      console.log("Server is running on port 3000");
    });
  })
  .catch(err => console.log(err));

app.get("/active", async (req, res) => {
  try {
    const result = await CarSharingServise.getActiveCars();
    res.end(JSON.stringify(result));
  } catch (error) {
    res.end(error.message);
  }
});

app.get("/unauthorized", async (req, res) => {
  try {
    const result = await CarSharingServise.getUnauthorizedDrivers();
    res.end(JSON.stringify(result));
  } catch (error) {
    res.end(error.message);
  }
});

app.post("/", async (req, res) => {
  try {
    const result = await CarSharingServise.addNewCar();
    res.end(JSON.stringify(result));
  } catch (error) {
    res.end(error.message);
  }
});

app.put("/outdate", async (req, res) => {
  try {
    const result = await CarSharingServise.updateOutdatedCars();
    res.end(JSON.stringify(result));
  } catch (error) {
    res.end(error.message);
  }
});

app.put("/location", async (req, res) => {
  try {
    const result = await CarSharingServise.updateCarLocation();
    res.end(JSON.stringify(result));
  } catch (error) {
    res.end(error.message);
  }
});

app.delete("/", async (req, res) => {
  try {
    const result = await CarSharingServise.removeCar();
    res.end(JSON.stringify(result));
  } catch (error) {
    res.end(error.message);
  }
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
