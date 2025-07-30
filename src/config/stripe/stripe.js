const stripe = require('stripe')(process.env.Stripe_SecretKey);

module.exports = stripe;