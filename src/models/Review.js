const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    email: {
        type: String,
        ref: 'User',
        required: true
    },
    scholarship: {
        type: Schema.Types.ObjectId,
        ref: 'Scholarship',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
 
ReviewSchema.virtual('user', {
    ref: 'User',               
    localField: 'email',      
    foreignField: 'email',    
    justOne: true            
});


ReviewSchema.set('toObject', { virtuals: true });
ReviewSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Review', ReviewSchema);
