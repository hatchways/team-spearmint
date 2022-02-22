const asyncHandler = require("express-async-handler");
const Profile = require("../models/Profile");
require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_SK);

const createCustomer = async(profile, email) => {
  const customer = await stripe.customers.create({
    name: profile.name,
    address: profile.address,
    email: email,
  });
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

  let profile = await Profile.findOne({ userId: req.user.id })
  let user = await User.findById(req.user.id)
  if(!profile){
    res.status(404)
    throw new Error("Profile not found!")
  } else {
    if(!profile.customerId){
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

const getAllPaymentMethods = async (profile) => {
  const paymentMethods = await stripe.paymentMethods.list({
    customer: profile.customerId,
    type: 'card',
  });

  if(!paymentMethods){
    throw new Error("There was an error retrieving payment options!")
  } else {
    return paymentMethods.data.map((payment) => {
      return {
        brand: payment.card.brand,
        last4: payment.card.last4,
        experationMonth: payment.card.exp_month,
        experationYear: payment.card.exp_year,
        name: payment.billing_details.name,
        id: payment.id
      }
    })
  }
}

// @route GET "/payment/all-payment-methods"
// @desc Get all payment methods associated with an account
// @access private
exports.getPaymentMethods = asyncHandler(async (req, res, next) => {
  console.log(req.user.id)
  const profile = await Profile.findOne({ userId: req.user.id })

  if(!profile){
    res.status(404)
    throw new Error("No profile found!")
  } else {
    if(!profile.customerId){
      res.status(200).send({ paymentMethods: []})
    } else {
      const allPaymentMethods = await getAllPaymentMethods(profile)
      if(allPaymentMethods.length === 0){
        return res.status(200).send({ paymentMethods: []})
      } else {
          const customer = await stripe.customers.retrieve(profile.customerId)
          let defaultPaymentMethod = customer.invoice_settings.default_payment_method

          if(!defaultPaymentMethod){
            defaultPaymentMethod = allPaymentMethods[0].id

            const updatedCustomer = await stripe.customers.update(profile.customerId, {
              invoice_settings: { default_payment_method: defaultPaymentMethod}
            })

            if(!updatedCustomer){
              res.status(500)
              throw new Error("There was an error updating default payment method!")
            }
          } 

          res.status(200).send({ paymentMethods: allPaymentMethods, defaultPaymentMethod: defaultPaymentMethod})
      }
    }
  }
})

//@route PATCH "/payment/set-default/:paymentId"
//@desc Update default payment method
//@access private

exports.setDefaultPaymentMethod = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({ userId: req.user.id })

  if(!profile){
    res.status(404)
    throw new Error("No profile found!")
  } else {
    const updatedCustomer = await stripe.customers.update(profile.customerId, {
      invoice_settings: { default_payment_method: req.params.paymentId }
    })

    if(!updatedCustomer){
      res.status(500)
      throw new Error("There was issue setting default payment!")
    } else {
      res.status(200).send({ success: updatedCustomer })
    }
  }
})