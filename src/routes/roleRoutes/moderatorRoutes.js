const { getAllScholarship, getSingleScholarship, addScholarship, updateScholarship, deleteScholarship } = require('../../controllers/Scholarship/scholarshipController');
const { getProfile } = require('../../controllers/User/userController');
const { authenticate } = require('../../middlewares/auth/authenticate');
const authorizeModerator = require('../../middlewares/auth/authorizeModerator');

const upload = require('../../middlewares/upload');
const router = require('express').Router();

 
router.get('/profile',authenticate,authorizeModerator,getProfile);

//routes to handle scholarships
router.get('/scholarships',authenticate,authorizeModerator,getAllScholarship)
router.get('/scholarships/:id',authenticate,authorizeModerator,getSingleScholarship)
router.post('/scholarships',authenticate,authorizeModerator,upload.single('image'),addScholarship)
router.put('/scholarships/:id',authenticate,authorizeModerator,upload.single('image'),updateScholarship)
router.delete('/scholarships/:id',authenticate,authorizeModerator,deleteScholarship)

module.exports = router;