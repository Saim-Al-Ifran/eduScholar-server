const CustomError = require('../../errors/CustomError');

const authorizeAdminOrModerator = async (req, _res, next) => {
    const { role } = req.user;
    if (role !== 'admin' && role !== 'moderator') {
        return next(new CustomError('Only admin or moderator can access', 403));
    }
    next();
}

module.exports = authorizeAdminOrModerator;
