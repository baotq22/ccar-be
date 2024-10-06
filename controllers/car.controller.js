const mongoose = require('mongoose');
const Car = require('../models/Car');
const carController = {};

carController.createCar = async (req, res, next) => {
  try {
    const { make, model, release_date, transmission_type, size, style, price } = req.body;

    const newCar = new Car({
      make,
      model,
      year: release_date,
      transmission_type,
      vehicle_size: size,
      vehicle_style: style,
      msrp: price,
      engine_fuel_type: 'Unknown',
      engine_hp: 0,
      engine_cylinders: 0,
      driven_wheels: 'Unknown',
      number_of_doors: 4,
      highway_mpg: 0,
      city_mpg: 0,
      popularity: 0,
      isDeleted: false
    })

    const savedCar = await newCar.save();

    res.status(201).json({
      message: "Create Car Successfully!",
      car: {
        make: savedCar.make,
        model: savedCar.model,
        release_date: savedCar.year,
        transmission_type: savedCar.transmission_type,
        size: savedCar.vehicle_size,
        style: savedCar.vehicle_style,
        price: savedCar.msrp,
      },
    })
  } catch (err) {
    res.status(500).json({ message: "Failed to create car", error: err.message });
  }
};

carController.getCars = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const cars = await Car.find({ isDeleted: false })
      .select('make model vehicle_size vehicle_style transmission_type msrp year')
      .limit(limit)
      .skip(skip);

    const totalCars = await Car.countDocuments({ isDeleted: false });
    const totalPages = Math.ceil(totalCars / limit);

    res.status(200).json({
      message: "Get Car List Successfully!",
      cars,
      page,
      total: totalPages,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve car list", error: err.message });
  }
};

carController.editCar = async (req, res, next) => {
  try {
    const carId = req.params.id;
    const updatedData = req.body;

    const updatedCar = await Car.findByIdAndUpdate(
      carId,
      { $set: updatedData },
      { new: true }
    );

    if (!updatedCar) {
      return res.status(404).json({ message: "Car not found!" });
    }

    res.status(200).json({
      message: "Updated Successfully",
      car: updatedCar,
    })
  } catch (err) {
    res.status(500).json({ message: "Failed to update", error: err.message });
  }
};

carController.deleteCar = async (req, res, next) => {
  try {
    const carId = req.params.id;

    const deletedCar = await Car.findByIdAndDelete(
      carId
    );

    if (!deletedCar) {
      return res.status(404).json({ message: "Car not found!" });
    }

    res.status(200).json({
      message: "Delete Car Successfully!",
      car: deletedCar,
    })
  } catch (err) {
    res.status(500).json({ message: "Failed to delete car", error: err.message });
  }
};

module.exports = carController;
