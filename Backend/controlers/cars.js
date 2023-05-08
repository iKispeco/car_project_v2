const { carBrand } = require("../models/CarBrand");

// method that fetch all cars from DB
exports.findCars = async (req, res) => {
  const cars = await carBrand.find();
  res.send(cars);
};

// method that INSERTs new car into DB
exports.createCar = async (req, res) => {
  const carId = req.body.carId;
  const name = req.body.name;
  const abrv = req.body.abrv;

  const car = await carBrand.create({ carId, name, abrv });
  /* const car = new carBrand(req.body); */

  res.send(car);
};

// method to fetch car from DB filtered by REGEXP
exports.findCar = async (req, res) => {
  try {
    const car = await carBrand.find({
      name: new RegExp("^" + req.query.name, "i"),
    });
    res.send(car);
  } catch {
    res.status(404).send({ error: "Car is not found!" });
  }
};

// method to UPDATE car in DB
exports.updateCar = async (req, res) => {
  const carId = req.params.id;
  const name = req.body.name;
  const abrv = req.body.abrv;

  await carBrand.findByIdAndUpdate(carId, { name, abrv });

  const car = await carBrand.findById(carId);

  res.send(car);
};

// method to DELETE car from DB
exports.deleteCar = async (req, res) => {
  const carId = req.params.id;

  await carBrand.deleteOne({ _id: carId });
  res.send({ success: "record deleted" });
};
