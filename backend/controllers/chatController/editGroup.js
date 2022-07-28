const Chat = require("../../models/chatModel");

const renameGroup = async (req, res) => {
    const { chatId, chatName } = req.body;

    const updateChat = await Chat.findByIdAndUpdate(
        chatId,
        { chatName },
        { new: true }
    );
    if (updateChat) res.status(200).json(updateChat);
    else res.status(400).json({ message: "Chat not found" });
};

const removeFromGroup = async (req, res) => {
    const { chatId, userId } = req.body;

    const removed = await Chat.findByIdAndUpdate(
        chatId,
        { $pull: { users: userId } },
        { new: true }
    );

    if (removed) res.status(200).json(removed);
    else res.status(400).json({ message: "User not found" });
};

const addToGroup = async (req, res) => {
    const { chatId, userId } = req.body;

    const added = await Chat.findByIdAndUpdate(
        chatId,
        { $push: { users: userId } },
        { new: true }
    );
    if (added) {
        res.status(200).json(added);
    } else {
        res.status(400).json({ message: "User not found" });
    }
};

module.exports = { renameGroup, removeFromGroup, addToGroup };
