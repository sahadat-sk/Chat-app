const User = require("../../models/userModel");

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

module.exports = { getAllUsers };
