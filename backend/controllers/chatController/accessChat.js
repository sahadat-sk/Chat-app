
const Chat = require("../../models/chatModel");
const User = require("../../models/userModel");

const accessChat = async (req, res) => {
    const {userId} = req.body;

    if(!userId){
        return res.status(400).json({message:` User ${userId} Id found`});
    }

    let isChat = await Chat.find({isGroupChat:false,
    $and:[
        {users : {$elemMatch: {$eq: req.user._id}}},
        {users : {$elemMatch: {$eq: userId}}}
         ]})
    .populate("users","-password -refreshToken -__v -createdAt -updatedAt")
    .populate("latestMessage");

    isChat = await User.populate(isChat,{
        path: "latestMessage.sender",
        select: "name email pic"
    });

    if( isChat.length > 0 ){
        res.send(isChat[0]);
    } else {
        let chatData = {
            isGroupChat:false,
            users:[req.user._id,userId],
            chatName: `sender`
        }
        try {
            const createChat = await Chat.create(chatData);
            const FullChat = await Chat.findById(createChat._id)
            .populate("users","-password -refreshToken -__v -createdAt -updatedAt")
            res.status(201).json(FullChat);

        } catch(err){
            res.status(400);
            throw new Error(err.message);
        }
    }

}

module.exports = { accessChat };