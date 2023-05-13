const express= require('express')
const router=express.Router();


const Payment=require("../Controllers/Payment")
router.route("/getPaymentHistory").get(Payment.getPaymentHistory)
router.route("/getPaymentInfo/:id").get(Payment.getPaymentInfo)
router.route("/updatePayment/:id").post(Payment.updatePayment)
router.route("/deletePayment/:id").delete(Payment.deletePayment)
module.exports= router;