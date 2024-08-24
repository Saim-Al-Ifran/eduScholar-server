const getScholarshipCategories = require('../controllers/ScholarshipCateogry/ScholarshipCategory');

const router = require('express').Router();

router.get('/',getScholarshipCategories);


module.exports = router;