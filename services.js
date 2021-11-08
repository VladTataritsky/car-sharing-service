const { driver, run, car, booking } = require("./models");
const { carData } = require("./mockedData");
const { Op } = require("sequelize");

class CarSharingServise {
  static async getActiveCars() {
    return await car.findAll({
      where: {
        status: "In use",
        fuelLevel: {
          [Op.lt]: 0.25,
        },
      },
    });
  }

  static async getUnauthorizedDrivers() {
    return car
      .findAll({
        where: {
          status: "Reserved",
        },
      })
      .then(carData => {
        const runIds = carData.map(car => car.currentRunId);
        return run.findAll({ where: { runId: runIds } }).then(runData => {
          const driverIds = runData.map(car => car.driverId);
          return driver
            .findAll({ where: { driverId: driverIds } })
            .then(driverData => {
              const unauthorizedDrivers = driverData
                .filter(driver => driver.cardId === null)
                .map(driver => driver.driverId);
              const unauthorizedRunIds = unauthorizedDrivers.map(d => {
                return runData.find(r => r.driverId === d).runId;
              });
              const unauthorizedCars = unauthorizedRunIds.map(run => {
                return carData.find(r => r.currentRunId === run);
              });
              const response = [];
              unauthorizedCars.map(car => {
                const driverId = runData.find(
                  r => r.runId === car.currentRunId
                ).driverId;
                const driver = driverData.find(d => d.driverId === driverId);
                const { licenceNumber, firstName, lastName } = driver;
                const { vin, latitude, longitude } = car;
                response.push({
                  vin,
                  location: `${latitude},${longitude}`,
                  licenceNumber,
                  firstName,
                  lastName,
                });
              });

              return response;
            });
        });
      });
  }

  static async addNewCar() {
    return car.create(carData);
  }

  static async updateOutdatedCars() {
    return car
      .findAll({
        where: {
          [Op.or]: [
            {
              productionDate: {
                [Op.lt]: "1/1/2017",
              },
            },
            {
              mileage: {
                [Op.gt]: 100000,
              },
            },
          ],
        },
      })
      .then(data => {
        const ids = data.map(car => car.id);
        car.update({ status: "In Service" }, { where: { id: ids } });
      });
  }

  static async updateCarLocation() {
    return car
      .findAll({
        where: {
          status: {
            [Op.not]: ["In use", "Reserved"],
          },
        },
      })
      .then(data => {
        const ids = data.map(car => car.id);
        booking.findAll({ where: { carId: ids } }).then(bookings => {
          const bookingIds = bookings.map(b => b.carId);
          const counts = {};
          bookingIds.forEach(function (x) {
            counts[x] = (counts[x] || 0) + 1;
          });
          Object.keys(counts).forEach(id => {
            if (counts[id] > 2) {
              car.update(
                { latitude: "53.8882836", longitude: "27.5442615" },
                { where: { id: ids } }
              );
            }
          });
        });
      });
  }

  static async removeCar() {
    return car.destroy({
      where: {
        vin: "41111-2222-342",
      },
    });
  }
}

module.exports = CarSharingServise;
