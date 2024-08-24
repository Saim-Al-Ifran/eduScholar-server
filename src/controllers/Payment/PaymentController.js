const Payment = require('../../models/Payment');
const { stripeSecretKey } = require('../../secret');
const stripe = require('stripe')(stripeSecretKey);

// Create Payment Intent
const createPaymentIntent = async (req, res, next) => {
    try {
        console.log(stripeSecretKey)
        const { price } = req.body;
        const amount = parseInt(price * 100);

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            payment_method_types: ['card'],
        });

        console.log(paymentIntent.client_secret);
        console.log(amount, 'amount inside the intent');

        res.status(200).send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (err) {
        console.error('Error creating payment intent:', err);
        res.status(500).send({ error: 'Failed to create payment intent' });
    }
};

// Confirm Payment
const confirmPayment = async (req, res) => {
    const payment = req.body;
    console.log(payment);

    try {
        const successPayment = new Payment(payment);
        await successPayment.save();

        res.status(201).json({ message: 'Payment successful', successPayment });
    } catch (error) {
        console.error('Error confirming payment:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createPaymentIntent,
    confirmPayment,
};
