const Review = require('../../models/Review');
const CustomError = require('../../errors/CustomError');
const Application = require('../../models/Application');

const getAllReviews = async (_req, res, next) => {
    try {
        const reviews = await Review.find()
                                    .populate('scholarship')
                                    .populate('user');
        res.status(200).json({ reviewCount: reviews.length, reviews });
    } catch (err) {
        next(new CustomError(err.message, 500));
    }
};

const deleteReview = async (req, res, next) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json({ message: 'Review deleted successfully'});
    } catch (err) {
        next(new CustomError(err.message, 500));
    }
};

const addReview = async (req, res, next) => {
    try {
        const { rating, comment } = req.body;
        const scholarshipId = req.params.id;

        // Validate application existence and ownership
        const application = await Application.findOne({ scholarship: scholarshipId, userEmail: req.user.email });
        if (!application) {
            return next(new CustomError('You need to apply first to give a review', 404));
        }

        // Check if the user has already reviewed this scholarship
        const existingReview = await Review.findOne({ userEmail: req.user.email, scholarship: application.scholarship });
        if (existingReview) {
            return next(new CustomError('You have already reviewed this scholarship', 400));
        }

        // Create new review
        const newReview = new Review({
            userEmail: req.user.email,
            scholarship: application.scholarship,
            rating,
            comment
        });

        const savedReview = await newReview.save();
        res.status(201).json(savedReview);
    } catch (err) {
        next(new CustomError(err.message, 500));
    }
};

const getUserReviews = async (req, res, next) => {
    try {
        const reviews = await Review.find({ userEmail: req.user.email }).populate('scholarship');
        res.status(200).json(reviews);
    } catch (err) {
        next(new CustomError(err.message, 500));
    }
};

const getReviewById = async (req, res, next) => {
    try {
        const review = await Review.findOne({ _id: req.params.id, userEmail: req.user.email }).populate('scholarship');
        if (!review) {
            return next(new CustomError('Review not found', 404));
        }
        res.status(200).json(review);
    } catch (err) {
        next(new CustomError(err.message, 500));
    }
};

// Delete a specific review
const userDeleteReview = async (req, res, next) => {
    try {
        const review = await Review.findOneAndDelete({ _id: req.params.id, userEmail: req.user.email });
        if (!review) {
            return next(new CustomError('Review not found or unauthorized', 404));
        }
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (err) {
        next(new CustomError(err.message, 500));
    }
};

// Update a specific review
const userUpdateReview = async (req, res, next) => {
    try {
        const { rating, comment } = req.body;
        const review = await Review.findOneAndUpdate(
            { _id: req.params.id, userEmail: req.user.email },
            { rating, comment },
            { new: true}
        ).populate('scholarship');
        if (!review) {
            return next(new CustomError('Review not found or unauthorized', 404));
        }
        res.status(200).json(review);
    } catch (err) {
        next(new CustomError(err.message, 500));
    }
};

module.exports = {
    getAllReviews,
    deleteReview,
    addReview,
    getUserReviews,
    getReviewById,
    userDeleteReview,
    userUpdateReview
};
