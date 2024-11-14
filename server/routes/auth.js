const express = require('express');
const User = require("../models/user");
const bcryptjs = require('bcryptjs');

const authRouter = express.Router();


authRouter.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

         if (!name || !email || !password) {
            return res.status(400).json({ 
                message: 'Name, email, and password are required' 
            });
        }
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ 
                message: 'User with this email already exists' 
            });
        }

    
        const newUser = await User.createUser({ 
            name, 
            email, 
            password 
        });

    
        const { password: userPassword, ...userResponse } = newUser;

        res.status(201).json({
            message: 'User created successfully',
            user: userResponse
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ 
            message: error.message || 'Error creating user' 
        });
    }
});

// Login Route
authRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).json({ 
                message: 'Invalid email or password' 
            });
        }

        
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ 
                message: 'Invalid email or password' 
            });
        }

        // Remove sensitive information before sending response
        const { password: userPassword, ...userResponse } = user;

        res.status(200).json({
            message: 'Login successful',
            user: userResponse
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            message: 'Server error during login' 
        });
    }
});

module.exports = authRouter;