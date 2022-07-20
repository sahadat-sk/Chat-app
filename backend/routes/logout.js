const express = require("express");
const router = express.Router();
const logoutController = require("../controllers/logoutController");

//console.log("loginController", loginController);

router.get("/", logoutController.handleLogout);

module.exports = router;
