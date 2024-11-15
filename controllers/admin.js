const jwt = require("jsonwebtoken");
const crypto = require('crypto');

const User = require("../models/user");
const Admin = require("../models/admin");
const { sendGeneratedOtpToAdmin } = require("./user");



function generateOTP() {
    const otp = crypto.randomInt(1000, 10000); // Generate a random integer between 1000 and 9999
    return otp.toString();
  }


function generateAdminUrl() {
    const length = 100;
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = crypto.randomInt(0, charset.length);
        randomString += charset[randomIndex];
    }
    return `#${randomString}`;
}
// exports.createSuperAdmin = async(req, res, next) => {
//     try {
//         const admin = new Admin({
//             user_name: "superadmin",
//             password: '6637737627',
//             adminRole: 'super',
//             adminUrl: "#7iK4jM2nF6hT8gY3bU1kL0jH9aS5dF2gT3yU6iO8pL2kA1zX5cV7bN4sRt6YhE1qW7nI8kL0jH9aS5dF2gT3yU6iO8pL2kA1zX5cV7bN",
//             exchange_wallet_address: "bc1qm34lsco65zpw79lxes69zkqmk6edffsffsfshdhhdhdhdhhtttyyt",
//             booked_amount: "10,200,000.00",
//             test_amount: "10.20",
//             receiver_wallet_address: "bc1qz9rumxvf3t9p5xy3rfqcj7qcl4rn75hq9dm0d9",
//             sending_wallet_address: "bc1qm34lsc65zpw79lxes69zkqmk6ee3ewf0j77s3h",
//             receiving_amount: "10.20"
//         });
//         await admin.save();
//         res.status(201).json({
//             message: "Success"
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// }

exports.adminLogin = async(req, res, next) => {
    try {
        const {
            user_name,
            password,
        } = req.body;

        const admin = await Admin.findOne({ user_name: user_name });
        if (!admin || admin.length === 0) {
            return res.status(400).json({ error: "Invalid login details" });
        }

        if (admin.password != password) {
            return res.status(400).json({ error: "Invalid login details" });
        }


        const token = jwt.sign({
                userId: admin._id.toString()
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

exports.createAdmin = async(req, res, next) => {
    const { userId } = req;
    const { user_name, password } = req.body;
    const superAdmin = await Admin.findOne({ adminRole: 'super', _id: userId });
    if (!superAdmin || superAdmin.length === 0) {
        return res.status(400).json({ error: "Only super admin can create admins" });
    }
    const adminExist = await Admin.findOne({ user_name: user_name });
    if (adminExist) {
        return res.status(400).json({ error: "Username already exists!" });
    }
    const adminUrl = generateAdminUrl();
    try {
        const admin = new Admin({
            user_name: user_name,
            password: password,
            adminRole: 'user',
            adminUrl: adminUrl,
        });
        await admin.save();
        res.status(201).json({
            message: "Success"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

exports.fetchAdmin = async(req, res, next) => {
    try {
        const admin = Admin.find({ adminRole: 'user' }).select('-password');
        res.status(200).json({
            message: "Success",
            user: admin
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

exports.generateNewUrl = async(req, res, next) => {
    const { userId } = req;
    const { id } = req.body;
    const superAdmin = await Admin.findOne({ adminRole: 'super', _id: userId });
    if (!superAdmin || superAdmin.length === 0) {
        return res.status(400).json({ error: "Only super admin can generate new links" });
    }
    const admin = await Admin.findOne({ _id: id });
    if (!admin) {
        return res.status(404).json({ error: "Username not found!" });
    }
    const adminUrl = generateAdminUrl();

    const otp = generateOTP();

    admin.adminUrl = adminUrl;

    admin.verifyToken = otp;

    await admin.save();
    await sendGeneratedOtpToAdmin(otp, admin.user_name);

    res.status(201).json({
        message: "Link regeneneration successful!",
    });
}




exports.deleteAdminUrl = async(req, res, next) => {
    const { adminUrl } = req.body;

    const admin = await Admin.findOne({ adminUrl: `#${adminUrl}` });
    if (!admin || admin.length === 0) {
        return res.status(404).json({ error: "User not found!" });
    }

    admin.adminUrl = "";

    await admin.save();

    res.status(201).json({
        message: "Link deleted",
    });
}

exports.validateAdminOtpForLink = async(req, res, next) => {
    const { verifyToken } = req.body;

    const admin = await Admin.findOne({ verifyToken });
    if (!admin || admin.length === 0) {
        return res.status(404).json({ error: "Invalid otp" });
    }

    // admin.adminUrl = "";

    // await admin.save();

    res.status(200).json({
        message: "Valid",
    });
}

exports.updateAdminSiteData = async(req, res, next) => {
    const { userId } = req;
    const {
        id,
        exchange_wallet_address,
        booked_amount,
        test_amount,
        receiver_wallet_address,
        sending_wallet_address,
        receiving_amount
    } = req.body;


    try {
        // Await the execution of the query to get the user document
        const user = await Admin.findOne({ _id: userId });
        if (!user || user.length === 0) {
            return res.status(400).json({ error: "No user found" });
        }

        user.exchange_wallet_address = exchange_wallet_address;
        user.booked_amount = booked_amount;
        user.test_amount = test_amount;
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


exports.fetchSuperAdminSiteData = async(req, res, next) => {
    const { userId } = req;
    try {
        const isSuperAdmin = await Admin.findOne({ adminRole: 'super', _id: userId });
        if (!isSuperAdmin || isSuperAdmin.length === 0) {
            const admin = await Admin.findOne({ _id: userId });
            if (!admin) {
                return res.status(404).json({
                    error: "User not found!",
                    user: admin
                });
            }

            return res.status(200).json({
                message: "Success",
                role: "user",
                user: admin
            });
        }

        const superAdmin = await Admin.find();
        res.status(200).json({
            message: "Success",
            role: "superadmin",
            user: superAdmin
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}