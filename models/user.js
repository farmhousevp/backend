const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
    trx_date: {
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
    }
});

module.exports = mongoose.model('User', userSchema);