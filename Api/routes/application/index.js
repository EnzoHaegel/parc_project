// create Api that will be used to upload profile picture, get the image and save it in the folder
const authenticateToken = require('../../passport/authorization')
const express = require('express');
const router = express.Router();
var sqlite = require('sqlite3');
var db = new sqlite.Database('./database/identifier.sqlite');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const DIR = './assets/application';

function isAdmin(req, res, next) {
    db.get('SELECT * FROM users WHERE username = ?', req.user.username, (err, row) => {
        if (err) {
            console.log('isAdmin: ' + err)
            return res.status(500).send({ error: 'Internal server error' })
        } else if (row.role_id == 1) {
            next()
        } else {
            return res.status(403).send({ error: 'Forbidden' })
        }
    })
}

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        cb(null, 'logo.png');
    }
});

let upload = multer({storage: storage});

//POST /api/application/logo/upload
router.post('/logo/upload', authenticateToken, isAdmin, upload.single('logo'), async(req, res) => {
    if (!req.file) {
        res.status(500).json({
            error: 'Le fichier n\a pas été trouvé'
        });
    } else {
        res.status(200).json({
            message: 'Logo enregistré',
            data: req.file.filename
        });
    }
});

//GET /api/application/logo/
router.get('/logo/', async(req, res) => {
    // return the image from ./assets/application/logo.png
    if (!fs.existsSync('./assets/application/logo.png')) {
        res.status(404).json({
            error: 'Logo not found'
        });
    } else {
        res.sendFile(path.join(__dirname, '../../assets/application/logo.png'));
    }
});

//GET /api/application/theme
router.get('/theme/', async(req, res) => {
    // return name of the first line in the table theme
    db.get('SELECT * FROM theme', (err, row) => {
        if (err) {
            res.status(500).json({
                error: err.message
            });
        } else {
            res.status(200).json({
                theme: row.name
            });
        }
    });
});

//POST /api/application/theme
router.post('/theme/', authenticateToken, isAdmin, async(req, res) => {
    // insert the theme in the table theme at id 1
    db.run('UPDATE theme SET name = ? WHERE id = 1', req.body.name, (err) => {
        if (err) {
            res.status(500).json({
                error: err.message
            });
        } else {
            res.status(200).json({
                message: 'Theme enregistré'
            });
        }
    });
});


module.exports = router;
