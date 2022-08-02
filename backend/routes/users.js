const express = require("express");
const router = express.Router();
const {
    getAllUsers,
    getRecent,
} = require("../controllers/userController/searchUser");

router.get("/", getAllUsers);
router.get("/recent", getRecent);

module.exports = router;
