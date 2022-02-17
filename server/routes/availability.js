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

router.route('/').post(createSchedule);
router.route('/active').get(getActiveSchedule)
router.route('/:scheduleId').get(getSchedule)
router.route('/all').get(getAllSchedules)
router.route('/:scheduleId/activate').patch(makeActiveSchedule)

module.exports = router;