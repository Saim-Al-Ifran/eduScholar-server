const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScholarshipSchema = new Schema({
    universityName: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    scholarshipCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ScholarshipCategory',
        required: true,
    },
    degree: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Degree',
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    applicationDeadline: {
        type: Date,
        required: true
    },
    subjectCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubjectCategory',
        required: true,
      },
    fees: {
        type: Number,
        required: true
    },
    stipend: {
        type: Number,
        default: 0
    },
    serviceCharge: {
        type: Number,
        required: true
    },
    worldRank:{
      type:Number,
      required:true
    },
    rating: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Scholarship', ScholarshipSchema);
