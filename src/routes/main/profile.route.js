const express = require("express");
const router = express.Router();
const profileController = require("../../app/controllers/profile.controller");

router.get("/", profileController.getUserProfile);


module.exports = router;