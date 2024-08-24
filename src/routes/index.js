const router = require('express').Router();
const adminAuthRoutes = require('../routes/adminAuthRoutes');
const adminRoutes = require('./roleRoutes/adminRoutes');
const applicationRoutes = require('./applicationRoutes');
const reviewRoutes = require('./reviewRoutes');
const moderatorRoutes = require('./roleRoutes/moderatorRoutes');
const userRoutes = require('./roleRoutes/userRoutes');
const scholarshipRoutes = require('./scholarshipRoutes');
const scholarshipCategory = require('./scholarshipCategoryRoutes');
const degreeCategory = require('./DegreeCategoryRoutes');
const subjectCategory = require('./subjectCategoryRoutes');
const dashboardStatics = require('./DashboardStatics');
const paymentRoutes = require('./paymentRoutes');

router.use('/api/v1/eduScholar-administration',adminAuthRoutes);
router.use('/api/v1/eduScholar-administration/dashboard/admin',adminRoutes);
router.use('/api/v1/eduScholar-administration/dashboard/admin/applied_applications',applicationRoutes);
router.use('/api/v1/eduScholar-administration/dashboard/admin/reviews',reviewRoutes);
router.use('/api/v1/eduScholar-administration/dashboard/admin/scholarship_category',scholarshipCategory);
router.use('/api/v1/eduScholar-administration/dashboard/admin/degree_category',degreeCategory);
router.use('/api/v1/eduScholar-administration/dashboard/admin/subject_category',subjectCategory);
router.use('/api/v1/eduScholar-administration/dashboard/admin/dashboard_statics',dashboardStatics);
router.use('/api/v1/eduScholar-administration/dashboard/moderator',moderatorRoutes);
router.use('/api/v1/eduScholar-administration/dashboard/user',userRoutes);
router.use('/api/v1/scholarships', scholarshipRoutes);
router.use('/api/v1/payment/', paymentRoutes);


module.exports = router;