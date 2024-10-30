const express = require('express');
const { Pool } = require('pg');  // Import Pool from pg
//imports from other files
const authRouter = require("./routes/auth");

//INIT
const PORT = 3000;
const app = express();

// PostgreSQL connection configuration
const pool = new Pool({
    user: 'your_username',
    host: 'localhost',
    database: 'your_database_name',
    password: 'your_password',
    port: 5432,  // default PostgreSQL port
});

//middleware
app.use(express.json());  // Add this to parse JSON bodies
app.use('/auth', authRouter);  // Add a prefix for auth routes

//Test database connection
pool.connect()
    .then(() => {
        console.log('Database connection successful');
    })
    .catch((e) => {
        console.log('Database connection error:', e);
    });

app.listen(PORT,'0.0.0.0', () => {
    console.log(`Server connected at port ${PORT}`);
});

// Export pool for use in other files
module.exports = pool;