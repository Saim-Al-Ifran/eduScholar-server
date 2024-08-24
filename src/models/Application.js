const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
    userEmail: {
        type:String,
        required: true
    },
    scholarship: {
        type: Schema.Types.ObjectId,
        ref: 'Scholarship',
        required: true
    },
    personalDetails: {
        type: Map,
        of: String,
        required: true
    },
    academicDetails: {
        type: Map,
        of: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending','processing', 'approved', 'rejected'],
        default: 'pending'
    },
    feedback: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Application', ApplicationSchema);
