const express = require("express");
const router = express.Router();
const homeController = require("../../app/controllers/home.controller");

router.get("/", homeController.renderHome);


module.exports = router;