const express = require("express");
const router = express.Router();
const {getAllUsers} = require("../controllers/userController/getAllUsers");

router.get("/",getAllUsers)

module.exports = router;

