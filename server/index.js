const express = require('express');
const User = require('./models/user');
const authRouter = require("./routes/auth");
const cors = require('cors');
const prisma = require('./lib/prisma');


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


app.use('/auth', authRouter);


async function startServer() {
    try {
        
    
        console.log('Database connection successful');

        
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Server startup error:', error);
        process.exit(1);
    }
}

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'production' ? {} : err.message 
    });
});


startServer();
