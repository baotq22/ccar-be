const mongoose = require('mongoose');

const carSchema = new mongoose.Schema(
  {
    make: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      min: 1900,
      required: true,
    },
    engine_fuel_type: {
      type: String,
      required: true,
    },
    engine_hp: {
      type: Number,
      required: true,
    },
    engine_cylinders: {
      type: Number,
      required: true,
    },
    transmission_type: {
      type: String,
      enum: ['MANUAL', 'AUTOMATIC', 'AUTOMATED_MANUAL', 'DIRECT_DRIVE', 'UNKNOWN'],
      required: true,
    },
    driven_wheels: {
      type: String,
      required: true,
    },
    number_of_doors: {
      type: Number,
      required: true,
    },
    market_category: {
      type: String,
    },
    vehicle_size: {
      type: String,
      enum: ['Compact', 'Midsize', 'Large'],
      required: true,
    },
    vehicle_style: {
      type: String,
      required: true,
    },
    highway_mpg: {
      type: Number,
      required: true,
    },
    city_mpg: {
      type: Number,
      required: true,
    },
    popularity: {
      type: Number,
    },
    msrp: {
      type: Number,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-query middleware to exclude soft-deleted cars (isDeleted: true)
carSchema.pre(/^find/, function (next) {
  if (!('_conditions' in this)) return next();
  if (!('isDeleted' in carSchema.paths)) {
    delete this['_conditions']['all'];
    return next();
  }
  if (!('all' in this['_conditions'])) {
    this['_conditions'].isDeleted = false;
  } else {
    delete this['_conditions']['all'];
  }
  next();
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
