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
    
    const chat = await Chat.findById(chatId);
    if(chat.groupAdmin.toString() !== req.user.id)return res.status(403).json({message: "You are not admin"});

    const removed = await Chat.findByIdAndUpdate(
        chatId,
        { $pull: { users: userId } },
        { new: true }
    ).select("users").populate("users");

    if (removed) res.status(200).json(removed);
    else res.status(400).json({ message: "User not found" });
};

const addToGroup = async (req, res) => {
    const { chatId, userId } = req.body;

    const chat = await Chat.findById(chatId);
    if (chat.groupAdmin.toString() !== req.user.id){
        //console.log(chat.groupAdmin.toString(), req.user.id);
        return res.status(403).json({ message: "You are not admin" });
    }

    const added = await Chat.findByIdAndUpdate(
        chatId,
        { $push: { users: userId } },
        { new: true }
    ).select("users").populate("users");
    if (added) {
        res.status(200).json(added);
    } else {
        res.status(400).json({ message: "User not found" });
    }
};

const getUsersInGroup = async (req, res) => {
    const  chatId  = req.params.id;
   
    const users = await Chat.findById(chatId).populate("users").select("users");
    if (users) res.status(200).json(users);
    else res.status(400).json({ message: "Chat not found" });
}

module.exports = { renameGroup, removeFromGroup, addToGroup,getUsersInGroup };
