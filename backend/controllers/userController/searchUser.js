const User = require("../../models/userModel");
const Chat = require("../../models/chatModel");

const getAllUsers = async (req, res) => {
    //console.log("query is", req.query.search);
    const keyword = req.query.search
        ? {
              $or: [
                  { name: { $regex: req.query.search, $options: "i" } },
                  { email: { $regex: req.query.search, $options: "i" } },
              ],
              $options: "i",
          }
        : {};
    const users = await User.find(keyword).find({ _id: { $ne: req.user.id } });

    if (users) res.status(200).json(users);
    else res.status(400).json({ message: "No Users found" });
};

const getRecent = async (req, res) => {
    const myChats = await Chat.find({
        users: { $elemMatch: { $eq: req.user.id } },
    })
        .sort({
            createdAt: -1,
        })
        .populate(
            "users",
            "-password -refreshToken -__v -createdAt -updatedAt"
        );
    let users = [];
    for (let i = 0; i < myChats.length; i++) {
        users.push(myChats[i].users.filter((user) => user.id !== req.user.id)[0]);
    }

   // console.log(users);
    if (users) res.status(200).json(users);
    else res.status(400).json({ message: "No Users found" });
};

module.exports = { getAllUsers, getRecent };
