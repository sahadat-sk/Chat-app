const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleNewUser = async (req, res) => {
    const { name, email, password, pic } = req.body;
    if (!name || !email || !password || !pic) {
        return res.status(400).json({ message: "Please enter all fields" });
    }
    const duplicate = await User.findOne({ email });
    if (duplicate) return res.sendStatus(409);
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            pic,
        });
        const refreshToken = jwt.sign(
            { email: user.email, userId: user._id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }
        );
        await User.findOneAndUpdate({ email }, { refreshToken: refreshToken });
        const accessToken = jwt.sign(
            {
                id: user._id,
                name: user.name,
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "300s" }
        );

        //cookie with refrest token
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "None",
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(201).json({ user, accessToken });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { handleNewUser };
