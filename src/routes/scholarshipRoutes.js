const express = require('express');
const { getAllScholarship, getSingleScholarship } = require('../controllers/Scholarship/scholarshipController');
const router = express.Router();
 


router.get('/', getAllScholarship);
router.get('/:id', getSingleScholarship);

module.exports = router;
