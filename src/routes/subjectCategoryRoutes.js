const getSubjectCategories = require('../controllers/SubjectCategory/subjectCategoryController');

const router = require('express').Router();

router.get('/',getSubjectCategories);


module.exports = router;