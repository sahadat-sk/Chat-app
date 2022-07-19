const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");

//console.log("loginController", loginController);

router.post("/", loginController.handleLogin);

module.exports = router;
