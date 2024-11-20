const express = require('express');
const User = require("../models/user");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authRouter = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || '';

// Signup Route
authRouter.post('/auth/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        
        if (!name || !email || !password) {
            return res.status(400).json({ 
                message: 'Name, email, and password are required' 
            });
        }

        
        const existingUser  = await User.findByEmail(email);
        if (existingUser ) {
            return res.status(400).json({ 
                message: 'User  with this email already exists' 
            });
        }

        
        const hashedPassword = await bcryptjs.hash(password, 10);

        
        const newUser  = await User.createUser ({ 
            name, 
            email, 
            password: hashedPassword 
        });

        
        const { password: userPassword, ...userResponse } = newUser ;

        
        const token = jwt.sign({ id: newUser .id, email: newUser .email }, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({
            message: 'User  created successfully',
            user: userResponse,
            token 
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ 
            message: error.message || 'Error creating user' 
        });
    }
});

// Sign in  Route
authRouter.post('/auth/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        
        if (!email || !password) {
            
            return res.status(400).json({ 
                message: 'Email and password are required' 
            });
        }

        
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
       
        const { password: userPassword, ...userResponse } = user;
    
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({
            message: 'Signin successful',
            user: userResponse,
            token 
        });
    } catch (error) {
        console.error('Signin error:', error);
        res.status(500).json({ 
            message: 'Server error during signin' 
        });
    }
});

//token route
authRouter.post('/tokenIsValid', async (req, res) => {
    try {
       const token = req.header('x-auth-token');
       if(!token) return res.json(false);
      const verified = jwt.verify(token, 'JWT_SECRET');
       if(!verified) return res.json(false);
    } catch (error) {
        console.error('Signin error:', error);
        res.status(500).json({ 
            message: 'Server error during signin' 
        });
    }
});

module.exports = authRouter;