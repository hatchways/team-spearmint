const asyncHandler = require("express-async-handler");
require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_SK);

exports.createPaymentIntent = asyncHandler(async (req, res, next) => {
  const { items } = req.body;
  console.log(req.body)
  const calculateOrderAmount = () => {

  } 
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 100,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  console.log(paymentIntent)
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});