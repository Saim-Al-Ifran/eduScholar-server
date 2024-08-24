const mongoose = require('mongoose');

const degreeCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: ['Diploma', 'Bachelor', 'Masters'],
  },
  description: {
    type: String,
    default: '',
  },
});

const Degree = mongoose.model('Degree', degreeCategorySchema);

module.exports = Degree;
