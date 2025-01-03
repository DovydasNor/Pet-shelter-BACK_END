const express = require('express');
const { getUsers, setAsVolunteer, getUser, editUser } = require('../services/usersServices');

const router = express.Router();

router.get('/users', async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const user = await getUser(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/users/:id/volunteer', async (req, res) => {
  try {
    await setAsVolunteer(req.params.id);
    res.json({ message: 'User set as volunteer' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/users/:id', async (req, res) => {
  try {
    await editUser(req.params.id, req.body);
    res.json({ message: 'User updated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;