const jwt = require('jsonwebtoken');
const CustomError = require('../../errors/CustomError');
const { secretKey } = require('../../secret');
const User = require('../../models/User');
const admin = require('../../firebase/firebase')

const authenticate = async (req, _res, next) => {
  try {
    const authHeader = req.headers.authorization;
    let token = req.cookies.jwt || (authHeader && authHeader.split(' ')[1]);
   
    if (!token) {
      return next(new CustomError('Unauthorized', 403));
    }

    let decoded;
    let user;
    
    try {
      decoded = jwt.verify(token, secretKey);
      user = await User.findById({ _id: decoded.id });
    } catch (err) {
      if (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') {
        
        try {
          decoded = await admin.auth().verifyIdToken(token);
          user=decoded;
         
        } catch (firebaseErr) {
          if (firebaseErr.code === 'auth/id-token-expired') {
            return next(new CustomError('Token expired', 401));
          } else if (firebaseErr.code === 'auth/argument-error' || firebaseErr.code === 'auth/id-token-revoked') {
            return next(new CustomError('Invalid token', 401));
          } else {
            return next(new CustomError('Authentication server problem', 500));
          }
        }
      } else {
        throw err;
      }
    }

    if (!user) {
      return next(new CustomError('Unauthorized', 401));
    }

    req.user = user;
    next();
  } catch (err) {
    next(new CustomError('Authentication server problem', 500));
  }
};

module.exports = {
  authenticate
};
