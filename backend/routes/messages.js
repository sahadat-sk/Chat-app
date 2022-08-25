const express = require("express");
const router = express.Router();

const {
    allMessages,
} = require("../controllers/messageColtroller/accessMessages");
const { readMessage } = require("../controllers/messageColtroller/readMessage");
const { sendMessage } = require("../controllers/messageColtroller/sendMessage");

router.get("/:chatId", allMessages);
router.post("/:chatId", sendMessage);
router.put("/readby",readMessage);

module.exports = router;
