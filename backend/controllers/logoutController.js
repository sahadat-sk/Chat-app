const User = require("../models/userModel");

const handleLogout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //no content
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken });
    if (!foundUser) {
        res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "None",
            secure: true,
        });
        return res.sendStatus(204); //no content
    }
    foundUser.refreshToken = "";
    await foundUser.save();
    res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
    });
    res.sendStatus(204); //no content
};

module.exports = { handleLogout };
