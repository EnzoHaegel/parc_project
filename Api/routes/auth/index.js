const express = require('express');
const router = express.Router();
const md5 = require('md5');
const jwt = require('jsonwebtoken');
var sqlite = require('sqlite3');
var db = new sqlite.Database('./database/identifier.sqlite');

// GET /api/auth/:id
router.get('/:id', async (req, res) => {
    var id = req.params.id;
    db.get('SELECT * FROM users WHERE id = ?', id, (err, row) => {
        if (err) {
            res.status(400).json({
                error: err.message
            });
        } else {
            res.json({
                id: row.id,
                username: row.username,
                email: row.email,
                role: row.role_id
            });
        }
    });
});

// POST /api/auth/register
router.post('/register', async (req, res) => {
    try {
        var username = req.body.username;
        var email = req.body.email;
        var password = md5(req.body.password);
    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }

    // check if username or email already exists
    db.get('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], (err, row) => {
        if (err) {
            res.status(500).json({
                error: err.message
            });
        } else if (row) {
            res.status(403).json({
                error: 'Username or email already exists'
            });
        } else {
            // if not, insert new user
            db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', username, email, password, (err) => {
                if (err) {
                    res.status(500).json({
                        error: err.message
                    });
                } else {
                    res.json({
                        message: 'User registered successfully'
                    });
                }
            });
        }
    });
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
    var username = req.body.username;
    var password = md5(req.body.password);
    // get user from database
    db.get('SELECT * FROM users WHERE username = ? AND password = ?', username, password, (err, row) => {
        if (err) {
            res.status(400).json({
                error: err.message
            });
        } else {
            if (row) {
                // create a token
                var token = jwt.sign({
                    id: row.id,
                    username: row.username
                }, process.env.JWT_SECRET, {
                    expiresIn: '24h'
                });
                // return the token
                res.json({
                    message: 'User logged in successfully',
                    token: token,
                    id: row.id,
                    username: row.username
                });
            } else {
                // if user not found return error
                res.status(400).json({
                    error: 'User not found'
                });
            }
        }
    });
});


module.exports = router;