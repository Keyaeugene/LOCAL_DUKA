const express = require('express');
const User = require("../models/user");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth');

const authRouter = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not set.');
}

// Signup Route
authRouter.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required' });
        }

        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'An account with this email already exists' });
        }

        const newUser = await User.createUser({ name, email, password });

        const { password: userPassword, ...userResponse } = newUser;

        const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({
            message: 'Account created successfully',
            user: userResponse,
            token
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: error.message || 'Error creating account' });
    }
});

//sign in route
authRouter.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'User with this email does not exist' });
        }

        console.log('Entered Password:', password);
        console.log('Stored Hashed Password:', user.password);

        const isMatch = await bcryptjs.compare(password, user.password);
        console.log('Password Match Result:', isMatch);

        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect Password' });
        }

        const { password: userPassword, ...userResponse } = user;

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({
            message: 'Signin successful',
            user: userResponse,
            token
        });
    } catch (error) {
        console.error('Signin error:', error);
        res.status(500).json({ message: 'Server error during signin' });
    }
});


// Token validation route
authRouter.post('/tokenIsValid', async (req, res) => {
    try {
        const token = req.header('x-auth-token');
        if (!token) return res.status(401).json({ valid: false });

        const verified = jwt.verify(token, JWT_SECRET);
        if (!verified) return res.status(401).json({ valid: false });

        const user = await User.findById(verified.id);
        if (!user) return res.status(401).json({ valid: false });

        const { password: userPassword, ...userResponse } = user;
        res.json({ valid: true, user: userResponse });
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(500).json({ message: 'Server error during token verification' });
    }
});

// Get user data route
authRouter.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { password: userPassword, ...userResponse } = user;
        res.json({ ...userResponse, token: req.token });
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Server error fetching user data' });
    }
});

module.exports = authRouter;
