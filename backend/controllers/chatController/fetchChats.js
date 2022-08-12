const Chat = require("../../models/chatModel");
const User = require("../../models/userModel");

const fetchChats = async (req, res) => {
    try {
        Chat.find({ users: { $elemMatch: { $eq: req.user.id } } })
            .populate(
                "users",
                "-password -refreshToken -__v -createdAt -updatedAt"
            )
            .populate(
                "groupAdmin",
                "-password -refreshToken -__v -createdAt -updatedAt"
            )
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "latestMessage.sender",
                    select: "name email pic",
                });
                res.status(200).json(results);
            });
    } catch (err) {
        res.status(400);
        throw new Error(err.message);
    }
};

module.exports = { fetchChats };
