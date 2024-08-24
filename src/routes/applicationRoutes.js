const router = require('express').Router();
const {
     getAllApplications,
     getSingleApplication,
     addFeedback,
     deleteApplication,
     cancelApplication, 
     changeApplicationStatus
} = require('../controllers/Application/applicationController');

const { authenticate } = require('../middlewares/auth/authenticate');
const authorizeAdminOrModerator = require('../middlewares/auth/authorizeAdminOrModerator');

router.get('/',authenticate,authorizeAdminOrModerator,getAllApplications);
router.get('/:id',authenticate,authorizeAdminOrModerator, getSingleApplication);
router.patch('/:id/feedback',authenticate,authorizeAdminOrModerator,  addFeedback);
router.delete('/:id',authenticate,authorizeAdminOrModerator, deleteApplication);
router.patch('/:id/cancel',authenticate,authorizeAdminOrModerator,cancelApplication);
router.patch('/:id/status',authenticate,authorizeAdminOrModerator,changeApplicationStatus);


module.exports = router;