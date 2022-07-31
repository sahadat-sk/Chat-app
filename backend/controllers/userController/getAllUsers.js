const User = require("../../models/userModel");

const getAllUsers = async (req, res) => {
    const users = await User.find({});
    if (users) res.status(200).json(users);
    else res.status(400).json({ message: "No Users found" });
}

module.exports = { getAllUsers };