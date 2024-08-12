const express = require('express');
const router = express.Router();
const path = require('path');
const usersMock = require('../scripts/users-db');

function auth(req, res, next) {
    const { name, password } = req.query;
    const user = usersMock.find(user => user.name === name && user.password === password);
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    next();
}
router.post('/json-login', express.json(), (req, res) => {
    const { name, password } = req.body;
    console.log(name, password);
    const user = usersMock.find(user => user.name === name && user.password === password);
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    //crear y enviar token
    
    res.json({ message: 'Login successful', name: user.name });
});

router.post('/http-login', express.urlencoded({ extended: true }), (req, res) => {
    //hydra -l admin -p admin localhost -s 3000 http-post-form '/http-login:name=^USER^&password=^PASS^:Invalid credentials'
    const { name, password } = req.body;
    console.log(name, password);
    const user = usersMock.find(user => user.name === name && user.password === password);
    if (!user) {
        return res.status(401).send('Invalid credentials');
    }
    res.status(200).send('Login successful');
});


router.get('/json-login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/json-login.html'));
});


router.get("/http-login", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/http-login.html'));
});

router.get('/secret, auth', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/secret.html'));
});

module.exports = router;