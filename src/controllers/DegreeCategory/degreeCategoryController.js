const CustomError = require("../../errors/CustomError");
const Degree = require('../../models/Degree');

const getDegreeCategories = async (_req, res, next) => {
    try {
        const degreeCategories = await Degree.find({});
        if (degreeCategories.length === 0) {
            return next(new CustomError('No degree categories found.', 404));
        }
        return res.status(200).json({ success: true, data: degreeCategories });
    } catch (err) {
        console.error('Error fetching Degree categories:', err);
        next(new CustomError('Internal Server Error', 500));
    }
}

module.exports = getDegreeCategories;