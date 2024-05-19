const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    role: { type: String, enum: ['admin', 'premium', 'regular'] },
    lastConnection: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
