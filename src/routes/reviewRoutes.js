const { getAllReviews, deleteReview } = require('../controllers/Review/reviewController');
const { authenticate } = require('../middlewares/auth/authenticate');
const authorizeAdminOrModerator = require('../middlewares/auth/authorizeAdminOrModerator');

const router = require('express').Router();



// route for admin
router.get('/',authenticate, authorizeAdminOrModerator ,getAllReviews);
router.delete('/:id',authenticate, authorizeAdminOrModerator ,deleteReview);

module.exports = router;