const express = require('express');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();
const UPLOAD_DIR = path.join(__dirname, '../uploads');

if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('image'), async (req, res) => {
    console.log('Received file:', req.file);
    if (!req.file) {
        return res.status(400).json({ success: 0, message: 'Image file is required' });
    }

    try {
        const imageBuffer = req.file.buffer;
        const fileName = `${uuidv4()}.jpg`;
        const filePath = path.join(UPLOAD_DIR, fileName);

        const image = sharp(imageBuffer);
        
        await image
            .resize({ width: 800, fit: 'inside' })
            .toFile(filePath);

        const imageUrl = `https://zhang-blog.onrender.com/api/uploads/${fileName}`;

        res.status(200).json({
            success: 1,
            file: {
                url: imageUrl,
            }
        });
    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).json({ success: 0, message: 'Error uploading image' });
    }
});

module.exports = router;
