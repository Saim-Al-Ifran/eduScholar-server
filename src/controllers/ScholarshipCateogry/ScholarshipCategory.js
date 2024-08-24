const CustomError = require("../../errors/CustomError");
const ScholarshipCategory = require('../../models/ScholarshipCategory');

const getScholarshipCategories = async (_req, res, next) => {
    try {
        const scholarshipCategories = await ScholarshipCategory.find({});
        if (scholarshipCategories.length === 0) {
            return next(new CustomError('No scholarship categories found.', 404));
        }
        return res.status(200).json({ success: true, data: scholarshipCategories });
    } catch (err) {
        console.error('Error fetching scholarship categories:', err);
        next(new CustomError('Internal Server Error', 500));
    }
}

module.exports = getScholarshipCategories;

