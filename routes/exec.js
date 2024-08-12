const express = require('express');
const router = express.Router();
const { exec } = require('child_process');
const path = require('path');

router.post("/ping", express.json(), (req, res) => {
    const { ip } = req.body;
    console.log("IP: ", ip);
    if (!ip) {
        res.status(400).json({ error: 'IP is required' });
        return
    }
    const invalid = /[^a-zA-Z0-9.-]/;
    if (invalid.test(ip)) {
        res.status(400).json({ error: 'Invalid IP' });
        return "Invalid IP";
    }
    
    exec(`ping -c 4 ${ip}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        res.json({ stdout, stderr });
    });
});

router.get("/ping", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/ping.html'));
});

module.exports = router;