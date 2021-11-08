const carData = {
    vin: "41111-2222-342",
    registrationNumber: "3453.456435",
    brand: "Mazda",
    model: "MX-5",
    productionDate: "2018-11-01 14:33:18.948+03",
    status: "Free",
    fuelLevel: 0.5,
    mileage: "700",
    currentRunId: 6,
    latitude: "1133.6365622",
    longitude: "6464.862",
  };
  
  const bookingData = {
    carId: 7,
    runId: 6,
    finishFuelLevel: "13",
    finishMileage: "120",
  };
  
  const creditCardInfo = {
    cardNumber: "34536",
    cardHolder: "Anna Brown",
    cardValidDate: "01-01-2022",
  };
  
  const driverInfo = {
    driverId: 5,
    licenceNumber: "7458",
    firstName: "Anna",
    lastName: "Brown",
    cardId: 5,
  };
  
  const runInfo = {
    startDate: "20-10-2020",
    driverId: 5,
    startFuelLevel: "18",
    startMileage: "221",
  };

  module.exports = { carData, bookingData, creditCardInfo, driverInfo, runInfo }