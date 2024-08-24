
const CustomError = require("../../errors/CustomError");

const authorizeModerator = async (req, _res, next) => {
    if (req.user.role !== 'moderator') {
        return next(new CustomError('Only moderator can access', 403));
    }
    next();
}

module.exports = authorizeModerator;