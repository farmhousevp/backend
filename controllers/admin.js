const jwt = require("jsonwebtoken");

const User = require("../models/user");
const Admin = require("../models/admin");

exports.updateUserData = async(req, res, next) => {
    const {
        id,
        exchange_wallet_address,
        booked_amount,
        test_amount,
        trx_date,
        receiver_wallet_address,
        sending_wallet_address,
        receiving_amount,
        token
    } = req.body;


    try {
        // Await the execution of the query to get the user document
        const user = await User.findOne({ _id: id });
        if (!user) {
            return res.status(400).json({ error: "No user found" });
        }

        user.exchange_wallet_address = exchange_wallet_address;
        user.booked_amount = booked_amount;
        user.test_amount = test_amount;
        user.trx_date = trx_date;
        user.receiver_wallet_address = receiver_wallet_address;
        user.sending_wallet_address = sending_wallet_address;
        user.receiving_amount = receiving_amount;

        const userData = await user.save();
        res.status(201).json({
            message: "Success",
            user: userData
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


exports.adminLogin = async(req, res, next) => {
    try {
        const {
            user_name,
            password,
        } = req.body;

        const admin = await Admin.findOne({ user_name: user_name });
        if (!admin) {
            return res.status(400).json({ error: "Invalid login details" });
        }

        if (admin.password != password) {
            return res.status(400).json({ error: "Invalid login details" });
        }


        const token = jwt.sign({
                user_name: "user"
            },
            "somesupersecretsecret", { expiresIn: "1h" }
        );
        res.status(201).json({
            message: "Success",
            token
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


exports.resetAdminData = async(req, res, next) => {
    try {
        const admin = new Admin();
        await admin.save();
        res.status(201).json({
            message: "Success"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}