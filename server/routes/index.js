const express = require('express');
const router = express.Router();
const imageRoute = require('./image-route');
const adminRoutes = require('./admin-routes');
const doctorRoutes = require('./doctor-routes');
const departmentRoutes = require('./department-routes');

const hospitalRoutes = require('./hospital-routes');

router.use('/upload', imageRoute);
router.use('/admin', adminRoutes);

router.use('/doctor', doctorRoutes);

router.use('/department', departmentRoutes);
router.use('/hospital', hospitalRoutes);

module.exports = router;
