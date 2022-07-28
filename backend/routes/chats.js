const express = require("express");
const router = express.Router();

const { accessChat } = require("../controllers/chatController/accessChat");
const { fetchChats } = require("../controllers/chatController/fetchChats");
const { newGroupChat } = require("../controllers/chatController/newGroupchat");
const {
    renameGroup,
    removeFromGroup,
    addToGroup,
} = require("../controllers/chatController/editGroup");

router.post("/", accessChat);
router.get("/", fetchChats);
router.post("/newgroupchat", newGroupChat);
router.put("/rename", renameGroup);
router.put("/adduser", addToGroup);
router.put("/removeuser", removeFromGroup);

module.exports = router;
