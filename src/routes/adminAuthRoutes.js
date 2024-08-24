const router = require('express').Router();
const {loginController, logoutController} = require('../controllers/user/authController');
const { isLoggedIn } = require('../middlewares/auth/IsLoggedIn');
const runValidation = require('../validators');
const { validateLogin } = require('../validators/user/auth');
 

router.post('/login',validateLogin,runValidation,loginController);
router.post('/logout',isLoggedIn,logoutController);
module.exports = router;