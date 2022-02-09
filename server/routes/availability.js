const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
 createSchedule,
 getSchedule,
 getActiveSchedule
} = require('../controllers/availability');

router.route('/availability').post(createSchedule);
router.route('/availability/active').get(getActiveSchedule)
router.route('/availability/:scheduleId').get(getSchedule)

module.exports = router;