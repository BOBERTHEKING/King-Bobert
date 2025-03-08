const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000; // Use environment variable for Render

app.use(cors());
app.use(express.static('uploads'));

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

let musicList = [];

app.post('/upload', upload.single('audio'), (req, res) => {
    const fileUrl = `${req.protocol}://${req.get('host')}/${req.file.filename}`;
    musicList.push({ name: req.file.originalname, url: fileUrl });
    res.json({ name: req.file.originalname, url: fileUrl });
});

app.get('/music', (req, res) => {
    res.json(musicList);
});

app.listen(port, () => console.log(`Server running on port ${port}`));
