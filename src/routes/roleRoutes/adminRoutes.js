const { getAllScholarship, getSingleScholarship, addScholarship, updateScholarship, deleteScholarship } = require('../../controllers/Scholarship/scholarshipController');
const { getProfile, getAllUsers, updateUserRole, deleteUser, getSingleUser } = require('../../controllers/User/userController');
const { authenticate } = require('../../middlewares/auth/authenticate');
const authorizeAdmin = require('../../middlewares/auth/authorizeAdmin');
const upload = require('../../middlewares/upload');
const router = require('express').Router();

//routes for hanlding Users
router.get('/profile',authenticate,authorizeAdmin,getProfile);
router.get('/users',authenticate,authorizeAdmin,getAllUsers);
router.get('/users/:id',authenticate,authorizeAdmin,getSingleUser);
router.patch('/users/:id/role',authenticate,authorizeAdmin,updateUserRole);
router.delete('/users/:id',authenticate,authorizeAdmin,deleteUser);


//routes to handle scholarships
router.get('/scholarships',authenticate,authorizeAdmin,getAllScholarship)
router.get('/scholarships/:id',authenticate,authorizeAdmin,getSingleScholarship)
router.post('/scholarships',authenticate,authorizeAdmin,upload.single('image'),addScholarship)
router.put('/scholarships/:id',authenticate,authorizeAdmin,upload.single('image'),updateScholarship)
router.delete('/scholarships/:id',authenticate,authorizeAdmin,deleteScholarship)

module.exports = router;