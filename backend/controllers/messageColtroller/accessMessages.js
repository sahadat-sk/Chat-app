const Messages = require("../../models/messageModel");

const allMessages = async (req,res)=>{
    const chatId = req.params.chatId;
    try{
        const messages = await Messages.find({chat: chatId}).populate("sender","name pic").sort({createdAt: "-1"});
        res.json(messages);
    }catch(err){
        res.status(400);
        throw new Error(err.message);
    }
}

module.exports = {allMessages};