const { Client } = require('pg');
const bcrypt = require('bcrypt');

class UserModel {
    constructor() {
        this.client = new Client({
            user: 'postgres', 
            host: 'localhost', 
            database: 'postgres', 
            password: 'rootUser', 
            port: 5432,
        });
    }

    async connect() {
        try {
            await this.client.connect();
            await this.createUserTableIfNotExists();
        } catch (error) {
            console.error('Database connection error:', error);
            throw error;
        }
    }

    async createUserTableIfNotExists() {
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                address VARCHAR(255) DEFAULT '',
                type VARCHAR(50) DEFAULT 'user',
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `;
        await this.client.query(createTableQuery);
    }

    validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    async findByEmail(email) {
        const query = 'SELECT * FROM users WHERE email = $1';
        const result = await this.client.query(query, [email]);
        return result.rows[0];
    }

    async createUser(userData) {
        
        if (!userData.name || !userData.email || !userData.password) {
            throw new Error('Name, email, and password are required');
        }

        if (!this.validateEmail(userData.email)) {
            throw new Error('Invalid email address');
        }

    
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

        try {
            const query = `
                INSERT INTO users (name, email, password, address, type) 
                VALUES ($1, $2, $3, $4, $5) 
                RETURNING id, name, email, address, type
            `;
            const values = [
                userData.name.trim(), 
                userData.email.trim(), 
                hashedPassword, 
                userData.address || '', 
                userData.type || 'user'
            ];

            const result = await this.client.query(query, values);
            return result.rows[0];
        } catch (error) {
            if (error.code === '23505') {  // Unique constraint violation
                throw new Error('Email already exists');
            }
            throw error;
        }
    }

    async close() {
        await this.client.end();
    }
}

module.exports = new UserModel();