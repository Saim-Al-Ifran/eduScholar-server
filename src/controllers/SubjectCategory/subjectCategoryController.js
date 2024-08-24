const CustomError = require("../../errors/CustomError");
const SubjectCategory = require('../../models/SubjectCategory');

const getSubjectCategories = async (_req, res, next) => {
    try {
        const subjectCategories = await SubjectCategory.find({});
        if (subjectCategories.length === 0) {
            return next(new CustomError('No degree categories found.', 404));
        }
        return res.status(200).json({ success: true, data: subjectCategories });
    } catch (err) {
        console.error('Error fetching Degree categories:', err);
        next(new CustomError('Internal Server Error', 500));
    }
}

module.exports = getSubjectCategories;