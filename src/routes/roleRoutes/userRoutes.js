const router = require('express').Router();
const { getStudentsApplication, studentDeleteApplication, studentUpdateApplication, studentGetApplicationById, applyForScholarship } = require('../../controllers/Application/applicationController');
const { addReview, getUserReviews, getReviewById, deleteReview, userUpdateReview } = require('../../controllers/Review/reviewController');
const { getProfile } = require('../../controllers/User/userController');
const { userRegisterController } = require('../../controllers/User/authController');
const { authenticate } = require('../../middlewares/auth/authenticate');


router.post('/register', userRegisterController);

// router.use(authenticate);


router.post('/applications',authenticate, applyForScholarship);
router.get('/applications',authenticate, getStudentsApplication);
router.get('/applications/:id',authenticate, studentGetApplicationById);
router.delete('/applications/:id',authenticate, studentDeleteApplication);
router.put('/applications/:id',authenticate, studentUpdateApplication);
router.get('/profile',authenticate,getProfile);


//review 
router.post('/:id/review',authenticate, addReview);

router.get('/reviews',authenticate, getUserReviews);

router.get('/reviews/:id',authenticate, getReviewById);

router.delete('/reviews/:id',authenticate, deleteReview);

router.put('/reviews/:id',authenticate, userUpdateReview);


module.exports = router;