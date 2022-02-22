const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  addPaymentMethod,
  getPaymentMethods
} = require('../controllers/stripe');

router.route('/add-payment').post(protect, addPaymentMethod);
router.route('/all-payment-methods').get(protect, getPaymentMethods)
module.exports = router;