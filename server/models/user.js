const prisma = require('../lib/prisma');
const bcryptjs = require('bcryptjs');

class UserModel {
    validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return emailRegex.test(email)
    }

    async findByEmail(email) {
        return await prisma.user.findUnique({
            where: { email }
        })
    }

    async createUser(userData) {
        if (!userData.name || !userData.email || !userData.password) {
            throw new Error('Name, email, and password are required')
        }

        if (!this.validateEmail(userData.email)) {
            throw new Error('Invalid email address')
        }

        const saltRounds = 10
        const hashedPassword = await bcryptjs.hash(userData.password, saltRounds)

        try {
            return await prisma.user.create({
                data: {
                    name: userData.name.trim(),
                    email: userData.email.trim(),
                    password: hashedPassword,
                    address: userData.address || '',
                    type: userData.type || 'user'
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    address: true,
                    type: true
                }
            })
        } catch (error) {
            if (error.code === 'P2002') { // Prisma unique constraint violation
                throw new Error('Email already exists')
            }
            throw error
        }
    }
}

module.exports = new UserModel()