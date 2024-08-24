const mongoose = require('mongoose');

const subjectCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: ['Agriculture', 'Engineering', 'Doctor'],
  },
  description: {
    type: String,
    default: '',
  },
});

const SubjectCategory = mongoose.model('SubjectCategory', subjectCategorySchema);

module.exports = SubjectCategory;
