const express = require('express');
const router = express.Router();
const multer = require("multer");

const Year = require("../Controllers/Yearly")

router.route("/getyear").get(Year.getYear);
router.route("/addyear").post(Year.addYear)
router.route("/deleteyear/:id").delete(Year.deleteYear)


module.exports = router;