const express = require('express');
const router = express.Router();
var sqlite = require('sqlite3');
var db = new sqlite.Database('./database/identifier.sqlite');
const authenticateToken = require('../../passport/authorization')
const profile_picture = require('./profile_picture')
const fs = require('fs');
require('dotenv').config();


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


// GET /api/user/all
router.get('/all', authenticateToken, isAdmin, async(req, res) => {
    db.all('SELECT * FROM users', (err, rows) => {
        if (err) {
            res.status(500).json({
                error: err.message
            });
        } else {
            res.status(200).json({
                data: rows
            });
        }
    });
});


// GET /api/user/role
router.get('/role', authenticateToken, isAdmin, async(req, res) => {
    // return admin if user is admin
    res.status(200).json({
        role: 'admin'
    });
});


// POST /api/user/role
router.post('/role', authenticateToken, isAdmin, async(req, res) => {
    // return admin if user is admin else user, depend on username given in body
    if (req.body.username) {
        db.get('SELECT * FROM users WHERE username = ?', req.body.username, (err, row) => {
            if (err) {
                res.status(500).json({
                    error: err.message
                });
            } else if (row.role_id == 1) {
                res.status(200).json({
                    role: 'admin'
                });
            } else {
                res.status(200).json({
                    role: 'user'
                });
            }
        });
    } else {
        res.status(400).json({
            error: 'Bad request'
        });
    }
});


// POST /api/user/role/update
router.post('/role/update', authenticateToken, isAdmin, async(req, res) => {
    // Change user role, search by its username
    var username = req.body.username
    var role = req.body.role
    if (role != 1 && role != 2) {
        return res.status(400).send({ error: 'Invalid role' })
    }
    db.get('SELECT * FROM users WHERE username = ?', username, (err, row) => {
        if (err) {
            res.status(500).json({
                error: err.message
            });
        } else {
            db.run('UPDATE users SET role_id = ? WHERE username = ?', role, username, (err) => {
                if (err) {
                    res.status(500).json({
                        error: err.message
                    });
                } else {
                    res.status(200).json({
                        message: 'User role updated'
                    });
                }
            });
        }
    });
});


// POST /api/user/delete
router.post('/delete', authenticateToken, isAdmin, async(req, res) => {
    // Delete user, search by its username
    var username = req.body.username
    db.get('SELECT * FROM users WHERE username = ?', username, (err, row) => {
        if (err) {
            res.status(500).json({
                error: err.message
            });
        } else {
            // delete profile picture if exists
            pp_path = './assets/user/profile_picture/' + (row.profile_picture || '');
            if (fs.existsSync(pp_path) && pp_path != './assets/user/profile_picture/default.jpg') {
                fs.unlinkSync(pp_path);
            }
            db.run('DELETE FROM users WHERE username = ?', username, (err) => {
                if (err) {
                    res.status(500).json({
                        error: err.message
                    });
                } else {
                    res.status(200).json({
                        message: 'User deleted'
                    });
                }
            });
        }
    });
});

router.use('/profile_picture', profile_picture);
module.exports = router;
