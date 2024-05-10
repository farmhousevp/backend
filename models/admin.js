const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    user_name: {
        type: String,
        require
    },
    password: {
        type: String,
        require
    },
    adminRole: {
        type: String,
        require
    },
    adminUrl: {
        type: String,
        require
    },
    exchange_wallet_address: {
        type: String,
        default: ""
    },
    booked_amount: {
        type: String,
        default: ""
    },
    test_amount: {
        type: String,
        default: ""
    },
    receiver_wallet_address: {
        type: String,
        default: ""
    },
    sending_wallet_address: {
        type: String,
        default: ""
    },
    receiving_amount: {
        type: String,
        default: ""
    },
    verifyToken: String,
    verifyTokenExpiration: Date,
});

module.exports = mongoose.model('Admin', userSchema);