const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    //console.log(cookies);
    if (!cookies?.jwt) return res.sendStatus(401);
    const token = cookies.jwt;
    const foundUser = await User.findOne({ refreshToken: token });
    if (!foundUser) return res.sendStatus(403);
    try {
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) return res.sendStatus(401);
        const accessToken = jwt.sign(
            {
                id: user._id,
                name: user.name,
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "300s" }
        );
        res.status(200).json({
            name: user.name,
            email: user.email,
            accessToken,
        });
    } catch (error) {
        res.sendStatus(401);
    }
};

module.exports = { handleRefreshToken };
