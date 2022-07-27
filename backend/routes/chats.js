const express = require("express");
const router = express.Router();

const { accessChat } = require("../controllers/chatController/accessChat");

router.post("/", accessChat);
// router.get("/", getChat);
// router.post("/newgroupchat", newGroupChat);
// router.put("/rename", renameChat);
// router.put("/adduser", addUser);
// router.put("/removeuser", removeUser);

module.exports = router;
