// const catchAsyncError = require("../middleware/catchAsyncError")

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// exports.processPayment = catchAsyncError(async (req, res, next) => {
//   const myPayment = await stripe.paymentIntents.create({
//     amount: req.body.amount,
//     currency: "inr",
//     metadata: {
//       company: "Ecommerce",
//     },
//   });

//   res
//     .status(200)
//     .json({ success: true, client_secret: myPayment.client_secret });
// });
// exports.processPayment = catchAsyncError(async (req, res, next) => {
//   const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// console.log(process.env.STRIPE_SECRET_KEY)

//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: req.body.amount,
//     currency: "inr",
//   });
//     console.log(process.env.STRIPE_SECRET_KEY)
//   res.status(200).json({ success: true, client_secret: paymentIntent.client_secret });
// });

// exports.sendStripeApiKey = catchAsyncError(async (req, res, next) => {
//   res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
// });

const catchAsyncError = require("../middleware/catchAsyncError");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = catchAsyncError(async (req, res, next) => {
  const { amount } = req.body;

  if (!amount) {
    return res.status(400).json({ success: false, message: "Amount is required" });
  }

  console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY);
  console.log("Payment Amount:", amount);

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "inr",
  });

  res.status(200).json({ success: true, client_secret: paymentIntent.client_secret });
});

exports.sendStripeApiKey = catchAsyncError(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
