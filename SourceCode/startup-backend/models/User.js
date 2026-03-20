const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true },
    email: {type: String, required: true, unique: true },
    password: {type: String, required: true },

    visitHistory: [{
        restaurantId: { type: String, required: true },
        count: { type: Number, default: 0 }
    }],

    achievements: [{
        name: String,
        dateEarned: { type: Date, default: Date.now}
    }]

}, { timestamps: true});

module.exports = mongoose.model('User', userSchema, 'Users');