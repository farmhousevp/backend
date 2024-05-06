const User = require("../models/user");

exports.getUserData = async(req, res, next) => {
    const address = req.headers["cf-connecting-ip"] || req.headers["x-real-ip"] || req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";
    try {
        const user = await User.find();
        res.status(200).json({
            message: "Success",
            address,
            user: user
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.postPopulateDb = async(req, res, next) => {
    try {
        const user = new User();
        const userData = await user.save();
        res.status(200).json({
            message: "Success",
            user: userData
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}