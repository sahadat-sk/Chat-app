const Messages = require("../../models/messageModel");

const allMessages = async (req,res)=>{
    const chatId = req.params.chatId;
    try{
        const messages = await Messages.find({chatId}).populate("sender","name pic");
        res.json(messages);
    }catch(err){
        res.status(400);
        throw new Error(err.message);
    }
}

module.exports = {allMessages};