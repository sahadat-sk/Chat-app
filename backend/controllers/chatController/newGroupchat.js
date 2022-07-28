const Chat = require("../../models/chatModel");

const newGroupChat = async (req, res) => {
    const { users, chatName } = req.body;
    if (!users || !chatName) {
        return res.status(400).json({ message: "Invalid Request" });
    }
    users = JSON.parse(users);
    if (users.length < 2) {
        return res
            .status(400)
            .json({ message: "More than 2 members are required" });
    }
    users.push(req.user);
    try {
        const groupChat = await Chat.create({
            chatName,
            users,
            isGroupChat: true,
            groupAdmin: req.user.id,
        });
        const fullGroupChat = await Chat.findById(groupChat._id)
            .populate(
                "users",
                "-password -refreshToken -__v -createdAt -updatedAt"
            )
            .populate(
                "groupAdmin",
                "-password -refreshToken -__v -createdAt -updatedAt"
            );
        res.status(200).json(fullGroupChat);
    } catch (err) {
        res.status(400);
        throw new Error(err.message);
    }
};

module.exports = { newGroupChat };
