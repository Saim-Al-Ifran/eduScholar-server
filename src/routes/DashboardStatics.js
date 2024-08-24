const { getDashboardStats } = require('../controllers/DashboardStatics/dashboardStaticsController');

const router = require('express').Router();

router.get('/',getDashboardStats);


module.exports = router;