const express = require('express');
const router = express.Router();
const multer = require("multer");

const Member = require("../Controllers/Member")

router.route("/getmember").get(Member.getMember);
// router.route("/getdebit").get(Member.getDebit);
router.route("/getMemberListByFilter").post(Member.getMemberListByFilter);
router.route("/getpermember/:grno").get(Member.getPerMember);
router.route("/addmember").post(Member.addMember)
router.route("/updateMember").post(Member.updateMember)
router.route("/deletemember/:id").delete(Member.deleteMember)
router.route("/addpayment/:memberid/:rollno").post(Member.addPayment)
// router.route("/getmemberpersonaldetail").get(Member.getPersonalMemberDetail)
module.exports = router;