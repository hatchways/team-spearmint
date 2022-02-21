const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  createPaymentIntent
} = require('../controllers/stripe');

router.route('/create-payment-intent').post(protect, createPaymentIntent);

module.exports = router;