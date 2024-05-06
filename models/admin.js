const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    user_name: {
        type: String,
        default: 'superadmin'
    },
    password: {
        type: String,
        default: '6637737627'
    },

    verifyToken: String,
    verifyTokenExpiration: Date,
});

module.exports = mongoose.model('Admin', userSchema);