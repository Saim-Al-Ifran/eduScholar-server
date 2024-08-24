const { createPaymentIntent, confirmPayment } = require('../controllers/Payment/PaymentController');
const { authenticate } = require('../middlewares/auth/authenticate');

const router = require('express').Router();

router.post('/create-payment-intent',createPaymentIntent);
router.post('/confirm-payment',confirmPayment);

router.get('/hi',authenticate,async(req,res)=>{
       try {
          return res.status(200).json({message:'welcome firebase auth'})
       } catch (err) {
        
       }
})


module.exports = router;