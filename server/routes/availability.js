const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
 createSchedule,
 getSchedule,
 getActiveSchedule, 
 getAllSchedules, 
 makeActiveSchedule
} = require('../controllers/availability');

router.route('/availability').post(createSchedule);
router.route('/availability/active').get(getActiveSchedule)
router.route('/availability/:scheduleId').get(getSchedule)
router.route('/availability').get(getAllSchedules)
router.route('/availability/:scheduleId/activate').patch(makeActiveSchedule)

module.exports = router;