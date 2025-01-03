const { getDB } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

async function register(newUser) {
    try {
        const db = getDB();
        const existingUser = await db.collection('users').findOne({ email: newUser.email });
        const existingUsername = await db.collection('users').findOne({ username: newUser.username });
        if (existingUsername) {
            throw new Error('Username ' + newUser.username + ' taken. Please choose another username.');
        }
        if (existingUser) {
            throw new Error('User with Email ' + newUser.email + ' already exists');
        }
        newUser.password = await bcrypt.hash(newUser.password, 10);
        newUser.isLoggedIn = false;
        const result = await db.collection('users').insertOne(newUser);
        if (!result || !result.insertedId) {
            throw new Error('Failed to register new user.');
        }
        const user = await db.collection('users').findOne({ _id: result.insertedId });
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function login(credentials) {
    try {
        const db = getDB();
        const user = await db.collection('users').findOne({ email: credentials.email });
        if (!user) {
            throw new Error('User not found with email: ' + credentials.email);
        }
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }
        await db.collection('users').updateOne({ _id: user._id }, { $set: { isLoggedIn: true } });

        const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        return { user, token };
    } catch (error) {
        throw new Error('Error logging in: ' + error.message);
    }
}

async function logout(email) {
    try {
        const db = getDB();
        const user = await db.collection('users').findOne({ email });
        if (!user) {
            throw new Error('User not found with email: ' + email);
        }
        const result = await db.collection('users').updateOne({ _id: user._id }, { $set: { isLoggedIn: false } });
        if (result.modifiedCount === 0) {
            throw new Error('Failed to update isLoggedIn status.');
        }
        return { message: 'User logged out successfully' };
    } catch (error) {
        throw new Error('Error logging out: ' + error.message);
    }
}

module.exports = { register, login, logout };