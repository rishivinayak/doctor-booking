const { Schema, model } = require('mongoose');

const departmentSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    about: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      default: 'http://localhost:1000/images/no-image.png',
    },
  },
  { timestamps: true }
);

const Department = model('departments', departmentSchema);

module.exports = Department;
