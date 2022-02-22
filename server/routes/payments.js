const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  addPaymentMethod,
  getPaymentMethods,
  setDefaultPaymentMethod
} = require('../controllers/stripe');

router.route('/add-payment').post(protect, addPaymentMethod);
router.route('/all-payment-methods').get(protect, getPaymentMethods)
router.route('/set-default/:paymentId').patch(protect, getPaymentMethods)

module.exports = router;