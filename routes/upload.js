const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const uploadDir = path.join(__dirname, '../uploads/');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

fs.readdir(uploadDir, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  for (const file of files) {
    fs.unlink(path.join(uploadDir, file), err => {
      if (err) {
        console.error(err);
        return;
      }
    });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Carpeta donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.get('/files', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/file-upload.html'));
});

router.post('/files', upload.single('file'), (req, res) => {
    res.status(200).json({ file: req.file });
});

module.exports = router;