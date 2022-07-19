const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerController");

//console.log("registerController", registerController);

router.post("/", registerController.handleNewUser);

module.exports = router;