const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

async function createTestUser() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        
        const testUser = new User({
            username: 'test',
            email: 'test@example.com',
            password: 'password123',
            role: 'User'
        });

        await testUser.save();
        console.log('Test user created successfully');
        
        mongoose.connection.close();
    } catch (error) {
        console.error('Error creating test user:', error);
    }
}

createTestUser();