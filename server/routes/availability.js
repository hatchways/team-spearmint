const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
 createSchedule,
 getSchedule
} = require('../controllers/availability');

router.route('/availability').post(createSchedule);
router.route('/availability/:scheduleId').get(getSchedule)

module.exports = router;