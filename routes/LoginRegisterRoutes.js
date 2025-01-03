const express = require('express');
const { register, login, logout } = require('../services/LoginRegisterServices');
const authMiddleware = require('../authMiddleware');
const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const user = await register(req.body);
        res.json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { user, token } = await login(req.body);
        res.json({ user, token });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/logout', authMiddleware, async (req, res) => {
    try {
        const result = await logout(req.user.email);
        res.json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;