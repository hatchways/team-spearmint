const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  addPaymentMethod
} = require('../controllers/stripe');

router.route('/add-payment').post(protect, addPaymentMethod);

module.exports = router;