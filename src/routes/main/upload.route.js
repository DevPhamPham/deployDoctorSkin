const express = require("express");
const router = express.Router();
const uploadController = require("../../app/controllers/upload.controller");

router.post("/", uploadController.uploadImage);


module.exports = router;