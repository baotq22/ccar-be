const mongoose = require('mongoose');
const Car = require('../models/Car');
const carController = {};

carController.createCar = async (req, res, next) => {
	try {
		// YOUR CODE HERE
	} catch (err) {
		// YOUR CODE HERE
	}
};

carController.getCars = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    console.log('Fetching cars data from DB...');

    // Fetch cars with pagination
    const cars = await Car.find().skip(skip).limit(limit);

    // Total count of cars
    const totalCars = await Car.countDocuments();
    const totalPages = Math.ceil(totalCars / limit);

    console.log('Total Cars:', totalCars);
    console.log('Total Pages:', totalPages);
    console.log('Fetched Cars:', cars.length);

    return res.status(200).json({
      message: 'Get Car List Successfully!',
      cars,         // The cars for the current page
      page,         // Current page number
      totalPages,   // Total number of pages
      totalCars,    // Total number of cars
    });
  } catch (err) {
    console.log('Error:', err.message);
    return res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

carController.editCar = async (req, res, next) => {
	try {
		// YOUR CODE HERE
	} catch (err) {
		// YOUR CODE HERE
	}
};

carController.deleteCar = async (req, res, next) => {
	try {
		// YOUR CODE HERE
	} catch (err) {
		// YOUR CODE HERE
	}
};

module.exports = carController;
