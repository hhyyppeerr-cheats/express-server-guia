const express = require('express');
const router = express.Router();
const path = require('path');
const usersMock = require('../scripts/users-db');

router.get('/users', (req, res) => {
    res.json(usersMock);
});

router.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = usersMock.find(user => user.id === parseInt(id));
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
});

router.post('/users', express.json(), (req, res) => {
    const { name, password } = req.query;
    console.log(name, password);
    usersMock.push({ id: usersMock.length + 1, name, password });
    res.json({ name, password });
});

router.put('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const { name, password } = req.query;
    const user = usersMock.find(user => user.id === parseInt(id));
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    user.name = name;
    user.password = password;
    res.json(user);
});

router.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const userIndex = usersMock.findIndex(user => user.id === parseInt(id));
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    usersMock.splice(userIndex, 1); //borra 1 elemento en la posición userIndex
    res.json({ message: 'User deleted' });
});

module.exports = router;