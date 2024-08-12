const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const upload = multer();

router.get("/http-form", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/form-http.html'));
});

router.post("/http-form", express.urlencoded({ extended: true }), (req, res) => {
    const { name, password } = req.body;
    res.json({ name, password });
});

router.get("/json-form", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/form-json.html'));
});

router.post("/json-form", express.json(), (req, res) => {
    const { name, password } = req.body;
    res.json({ name, password });
});

router.get("/formdata-form", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/form-formdata.html'));
});

router.post("/formdata-form", upload.none(), (req, res) => {
    const { name, password } = req.body;
    res.json({ name, password });
});

module.exports = router;