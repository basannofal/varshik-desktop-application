const express = require('express');
const router = express.Router();
const multer = require("multer");

const Clan = require("../Controllers/Clan")

router.route("/addclan").post(Clan.addClan);
router.route("/getclan").get(Clan.getClan);
router.route("/deleteclan/:id").delete(Clan.deleteClan)

module.exports = router;