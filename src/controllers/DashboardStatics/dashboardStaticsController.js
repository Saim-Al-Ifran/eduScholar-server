const User = require('../../models/User');
const Application = require('../../models/Application');
const Scholarship = require('../../models/Scholarship');
const Payment = require('../../models/Payment');
const CustomError = require('../../errors/CustomError');

const getDashboardStats = async (_req, res, next) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalModerators = await User.countDocuments({ role: 'moderator' });
        const totalAdmins = await User.countDocuments({ role: 'admin' });
        const totalApplications = await Application.countDocuments();
        const totalScholarships = await Scholarship.countDocuments();
        
        const totalAmountResult = await Scholarship.aggregate([
            { $group: { _id: null, totalAmount: { $sum: '$fees' } } }
        ]);
        const totalAmount = totalAmountResult[0]?.totalAmount || 0;
        
        const totalPayments = await Payment.countDocuments();
        const totalPaymentAmountResult = await Payment.aggregate([
            { $group: { _id: null, totalPaymentAmount: { $sum: '$amount' } } }
        ]);
        const totalPaymentAmount = totalPaymentAmountResult[0]?.totalPaymentAmount || 0;
        
        return res.status(200).json({
            totalUsers,
            totalModerators,
            totalAdmins,
            totalApplications,
            totalScholarships,
            totalAmount,
            totalPayments,
            totalPaymentAmount
        });
    } catch (err) {
        next(new CustomError(err.message, 500));
    }
};
module.exports = {
    getDashboardStats
};
