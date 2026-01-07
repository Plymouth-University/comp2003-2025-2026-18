const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

//Register new user
router.post('/register', async (req, res) => {
    try {
        const {username, email, password} = req.body;

        const existingUser = await User.findOne({email});
        if (existingUser) return res.status(400).json({message: 'User already exists'});

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({username, email, password: hashedPassword});
        await newUser.save();

        res.status(201).json({message: 'User created successfully'});
    } catch (err) {
        res.status(500).json({message: 'Server error'});
    }
});

//Login and JWT
router.post('/login', async (req, res) => {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if (!user) return res.status(400).json({message: 'invalid credentials'});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({message: 'invalid credentials'});

        const payload = {id: user._id, email: user.email};

        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '15m'});

        res.json({
            message: "login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email:user.email
            }
        });

    } catch (err) {
        res.status(500).json({message: 'Server error'});
    }
});

module.exports = router;