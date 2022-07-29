// create Api that will be used to upload profile picture, get the image and save it in the folder
const authenticateToken = require('../../../passport/authorization')
const express = require('express');
const router = express.Router();
var sqlite = require('sqlite3');
var db = new sqlite.Database('./database/identifier.sqlite');
const multer = require('multer');
const path = require('path');
const randomString = require('randomstring');
const randomString32 = randomString.generate(32);
const fs = require('fs');

const DIR = './assets/user/profile_picture';

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + randomString32 + path.extname(file.originalname));
    }
});

let upload = multer({storage: storage});

//POST /api/user/profile_picture/upload
router.post('/upload', authenticateToken, upload.single('photo'), async(req, res) => {
    // get username with token
    db.get('SELECT * FROM users WHERE username = ?', req.user.username, (err, row) => {
        if (err || !req.file) {
            res.status(500).json({
                error: err.message
            });
        } else {
            old_path = './assets/user/profile_picture/' + (row.profile_picture || '');
            // update profile picture in database
            db.run('UPDATE users SET profile_picture = ? WHERE username = ?', req.file.filename, req.user.username, (err) => {
                if (err) {
                    res.status(500).json({
                        error: err.message
                    });
                } else {
                    res.status(200).json({
                        message: 'Profile picture updated'
                    });
                    // delete old profile picture
                    if (fs.existsSync(old_path) && old_path != './assets/user/profile_picture/default.jpg') {
                        fs.unlinkSync(old_path);
                    }
                }
            });
        }
    });
});

//GET /api/user/profile_picture/
router.get('/:username', async(req, res) => {
    var username = req.params.username;
    db.get('SELECT * FROM users WHERE username = ?', username, (err, row) => {
        default_path = path.join(__dirname, '../../../assets/user/profile_picture/default.jpg')
        if (err || !row || !row.profile_picture) {
            res.sendFile(default_path);
        } else {
            file_path =  path.join(__dirname, '../../../assets/user/profile_picture/' + row.profile_picture)
            // check if file exist
            if (fs.existsSync(file_path)) {
                res.sendFile(file_path);
            } else {
                res.sendFile(default_path);
            }
        }
    });
});

module.exports = router;