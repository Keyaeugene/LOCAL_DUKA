const express = require('express');
const {Client} = require('pg');  
//imports from other files
const authRouter = require("./routes/auth");

//INIT
const PORT = 3000;
const app = express();

// PostgreSQL connection configuration
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'rootUser',
    port: 5432, 
});

//middleware
app.use(express.json());  // Add this to parse JSON bodies
app.use('/auth', authRouter);  // Add a prefix for auth routes

//Test database connection
client.connect()
    .then(() => { 
        console.log('Database connection successful');
    })
    .catch((e) => {
        console.log('Database connection error:', e);
    });

app.listen(PORT, () => {
    console.log(`Server connected at port ${PORT}`);
});

// Export pool for use in other files
module.exports = client;
