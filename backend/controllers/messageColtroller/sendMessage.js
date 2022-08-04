const Messages = require("../../models/messageModel");
const Chat = require("../../models/chatModel");

const sendMessage = async (req, res) => {
    const { message } = req.body;
    const chatId = req.params.chatId;
    const sender = req.user.id;
    if (!message || !chatId || !sender) {
        return res.status(400).json({ message: "Please enter all fields" });
    }
    const messageData = {
        content: message,
        chat: chatId,
        sender: sender,
    };

    try {
        const createMessage = await Messages.create(messageData);
        const FullMessage = await Messages.findById(createMessage._id).populate(
            "sender",
            "name pic"
        );
        await Chat.findByIdAndUpdate(chatId, { latestMessage: createMessage._id });
        res.status(201).json(FullMessage);
    } catch (err) {
        res.status(400);
        throw new Error(err);
    }
};

module.exports = {sendMessage};