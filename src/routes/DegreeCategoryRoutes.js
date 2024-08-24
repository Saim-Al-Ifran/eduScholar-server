const getDegreeCategories = require('../controllers/DegreeCategory/degreeCategoryController');

const router = require('express').Router();

router.get('/',getDegreeCategories);


module.exports = router;