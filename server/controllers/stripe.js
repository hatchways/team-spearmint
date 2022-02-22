const asyncHandler = require("express-async-handler");
const Profile = require("../models/Profile");
require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_SK);

const createCustomer = async(profile, email) => {
  console.log(profile, profile.name)
  const customer = await stripe.customers.create({
    name: profile.name,
    address: profile.address,
    email: email,
  });
  console.log("here", customer)
  if(!customer){
    throw new Error("Unable to create a customer, please try again!")
  } else {
    profile.customerId = customer.id

    let savedProfile = await profile.save()
    if(!savedProfile){
      throw new Error("Profile could not be updated with stripe customer Id")
    } else {
      return profile
    }
  }
}

// @route POST "/payment/add-payment"
// @desc create a stripe customer and add a card payment to that customer
// @access private
exports.addPaymentMethod = asyncHandler(async (req, res, next) => {
  // console.log(req)
  console.log(req.user)
  let profile = await Profile.findOne({ userId: req.user.id })
  let user = await User.findById(req.user.id)
  console.log('here')
  console.log(user, profile)
  if(!profile){
    res.status(404)
    throw new Error("Profile not found!")
  } else {
    if(!profile.customerId){
      console.log('here in here')
      profile = await createCustomer(profile, user.email)
      if(!profile){
        res.status(500)
        throw new Error("Stripe customer was not able to be created!")
      }
    } 

   
    const paymentIntent = await stripe.setupIntents.create({
      payment_method_types: ["card"],
      customer: profile.customerId
    })

    const billingDetails = {
      name: profile.name,
      email: user.email
    }

    res.status(201).send({clientSecret: paymentIntent.client_secret, billingDetails: billingDetails})
    
  }
})
// exports.createPaymentIntent = asyncHandler(async (req, res, next) => {
//   const { items } = req.body;
//   console.log(req.body)
//   const calculateOrderAmount = () => {

//   } 
//   // Create a PaymentIntent with the order amount and currency
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: 100,
//     currency: "usd",
//     automatic_payment_methods: {
//       enabled: true,
//     },
//   });
//   console.log(paymentIntent)
//   res.send({
//     clientSecret: paymentIntent.client_secret,
//   });
// });