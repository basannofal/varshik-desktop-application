const express = require('express');
const router = express.Router();
const multer = require("multer");

const Clan = require("../Controllers/Clan")

router.route("/addclan").post(Clan.addClan);
router.route("/getclan").get(Clan.getClan);
router.route("/getperclan/:id").get(Clan.getPerClan);
router.route("/deleteclan/:id").delete(Clan.deleteClan)
router.route("/editclan/:id").patch(Clan.EditClan)


module.exports = router;