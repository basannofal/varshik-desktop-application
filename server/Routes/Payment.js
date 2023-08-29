const express= require('express')
const router=express.Router();


const Payment=require("../Controllers/Payment")
router.route("/getPaymentHistory").get(Payment.getPaymentHistory)
router.route("/getsinglepaymentdata").get(Payment.getSingalPaymentData)
router.route("/getPaymentInfo/:id").get(Payment.getPaymentInfo)
router.route("/updatepayment/:id").patch(Payment.updatePayment)
router.route("/deletePayment/:id").delete(Payment.deletePayment)
module.exports= router;