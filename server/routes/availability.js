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

router.route('/').post(protect, createSchedule);
router.route('/active').get(getActiveSchedule)
router.route('/all').get(protect, getAllSchedules)
router.route('/:scheduleId').get(getSchedule)
router.route('/:scheduleId/activate').patch(protect, makeActiveSchedule)

module.exports = router;