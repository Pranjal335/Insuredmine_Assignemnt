const express = require('express');
const multer = require('multer');
const path = require('path');

const {uploadFileController} = require('../controllers/upload.controller')

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, path.join(__dirname, '../../uploads'));
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext );
    }
});

const upload = multer({storage});

// Post api to upload file
router.post('/', upload.single('file'), uploadFileController);

module.exports = router;