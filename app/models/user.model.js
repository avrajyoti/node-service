const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    user_name: String,
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    token: String
});

module.exports = mongoose.model('User', UserSchema);