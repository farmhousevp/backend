const Admin = require("../models/admin");


exports.fetchSiteDetails = async(req, res, next) => {
    const { adminUrl } = req.body;

    const address = req.headers["cf-connecting-ip"] || req.headers["x-real-ip"] || req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";
    try {
        const siteData = await Admin.find({ adminUrl: `#${adminUrl}` });
       
        if (!siteData || siteData.length === 0) {
            return res.status(404).json({ error: "Not found" });
        }
        return res.status(200).json({
            message: "Success",
            address,
            user: siteData
        });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// exports.getUserData = async(req, res, next) => {

//     try {
//         const user = await User.find();
//         res.status(200).json({
//             message: "Success",
//             address,
//             user: user
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };

// exports.postPopulateDb = async(req, res, next) => {
//     try {
//         const user = new User();
//         const userData = await user.save();
//         res.status(200).json({
//             message: "Success",
//             user: userData
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// }


// exports.updateUserData = async(req, res, next) => {
//     const {
//         id,
//         exchange_wallet_address,
//         booked_amount,
//         test_amount,
//         trx_date,
//         receiver_wallet_address,
//         sending_wallet_address,
//         receiving_amount,
//         token
//     } = req.body;


//     try {
//         // Await the execution of the query to get the user document
//         const user = await User.findOne({ _id: id });
//         if (!user) {
//             return res.status(400).json({ error: "No user found" });
//         }

//         user.exchange_wallet_address = exchange_wallet_address;
//         user.booked_amount = booked_amount;
//         user.test_amount = test_amount;
//         user.trx_date = trx_date;
//         user.receiver_wallet_address = receiver_wallet_address;
//         user.sending_wallet_address = sending_wallet_address;
//         user.receiving_amount = receiving_amount;

//         const userData = await user.save();
//         res.status(201).json({
//             message: "Success",
//             user: userData
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// }