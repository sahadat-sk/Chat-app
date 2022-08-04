const express = require("express");
const router = express.Router();

const {
    allMessages,
} = require("../controllers/messageColtroller/accessMessages");
const { sendMessage } = require("../controllers/messageColtroller/sendMessage");

router.get("/:chatId", allMessages);
router.post("/:chatId", sendMessage);

module.exports = router;
