const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  editProfile,
  loadProfile,
  loadProfiles,
} = require('../controllers/profile');

router.route('/edit').put(protect, editProfile);
router.route('/load').get(protect, loadProfile);
router.route('/profiles').get(loadProfiles)

module.exports = router;