const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  editProfile,
  loadProfile,
  uploadProfilePhoto
} = require('../controllers/profile');

router.route('/edit').put(protect, editProfile);

router.route('/load/:id').get(protect, loadProfile);

module.exports = router;