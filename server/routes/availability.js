const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
 createSchedule
} = require('../controllers/availability');

router.route('/availability').post(createSchedule);


module.exports = router;