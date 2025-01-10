const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.static('uploads'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ filePath: `/uploads/${req.file.filename}` });
});

app.listen(5000, () => console.log('Server started on port 5000'));
