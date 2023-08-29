const express = require('express');
const router = express.Router();
const multer = require("multer");

const Member = require("../Controllers/Member")

router.route("/getmember").get(Member.getMember);
router.route("/getmember/:selectedDate").get(Member.getMemberBySelectedDate);
router.route("/getsinglemember").get(Member.getSingleMember);
// router.route("/getdebit").get(Member.getDebit);
router.route("/getMemberListByFilter").post(Member.getMemberListByFilter);
router.route("/getpermember/:grno").get(Member.getPerMember);
router.route("/getpermemberbyrollno/:id").get(Member.getPerMemberByRollNo);
router.route("/addmember").post(Member.addMember)
router.route("/updateMember").post(Member.updateMember)
router.route("/deletemember/:id").delete(Member.deleteMember)
router.route("/addpayment/:memberid/:rollno").post(Member.addPayment)
// router.route("/getmemberpersonaldetail").get(Member.getPersonalMemberDetail)
module.exports = router;