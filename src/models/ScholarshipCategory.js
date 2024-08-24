const mongoose = require('mongoose');

const scholarshipCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: ['Full fund', 'Partial', 'Self-fund'],
  },
  description: {
    type: String,
    default: '',
  },
});

const ScholarshipCategory = mongoose.model('ScholarshipCategory', scholarshipCategorySchema);

module.exports = ScholarshipCategory;
