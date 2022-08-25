const Messages = require("../../models/messageModel");

const readMessage = async (req, res) => {
    const {messageId,userId} = req.body;
    try {
        const messages = await Messages.findByIdAndUpdate(messageId,{$addToSet: {readBy:userId}})
        res.json(messages);
    } catch (err) {
        res.status(400);
        throw new Error(err.message);
    }
};

module.exports = { readMessage };
