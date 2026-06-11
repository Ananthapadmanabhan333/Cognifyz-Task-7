const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        sparse: true // allows multiple null values if email is not provided by provider
    },
    profilePicture: {
        type: String
    },
    provider: {
        type: String,
        enum: ['google', 'github', 'local'],
        required: true
    },
    oauthId: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
