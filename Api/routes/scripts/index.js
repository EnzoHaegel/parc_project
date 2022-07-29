const express = require('express');
const router = express.Router();
var sqlite = require('sqlite3');
var db = new sqlite.Database('./database/identifier.sqlite');
const authenticateToken = require('../../passport/authorization')
const fs = require('fs');
require('dotenv').config();


// POST /api/script/execute
router.post('/execute', authenticateToken, async(req, res) => {
    // Execute powershell script in ../../ps_scripts/{name}.ps1
    var scriptName = req.body.name

    // Check if scriptName have '../', if return unauthorized
    if (scriptName.includes('../')) {
        return res.status(401).send({ error: 'Unauthorized' })
    }

    // Check if script exists with path
    var scriptPath = './ps_scripts/' + scriptName + '.ps1'
    if (!fs.existsSync(scriptPath)) {
        res.status(400).json({
            error: 'Script does not exist'
        });
        return;
    }

    // Spawn powershell script with arguments from request body and pipe stdout to response
    var spawn = require("child_process").spawn,child;
    var return_code = -1;
    var stdout = '';
    var stderr = '';
    child = spawn("powershell", ["-ExecutionPolicy", "Bypass", "-File", scriptPath, req.body.arguments]);

    child.stdout.on("data", function(data) {
        stdout += data.toString();
    });
    child.stderr.on("data", function(data) {
        stderr += data.toString();
    });

    // Send response when script is finished
    child.on("exit", function(code) {
        console.log("child process exited with code " + code);
        // get last line of stdout to have return code
        return_code = parseInt(stdout.split('\n')[stdout.split('\n').length - 2]);
        //remove 2 last lines of stderr and stdout to remove return code
        stderr = stderr.split('\n').slice(0, -2).join('\n');
        stdout = stdout.split('\n').slice(0, -2).join('\n');
        if (code == 0 && return_code == 0) {
            res.status(200).send({
                message: 'Le script a été exécuté avec succès',
                stdout: stdout,
                stderr: stderr,
                return_code: return_code
            })
        } else if (code == 0 && return_code != 0) {
            res.status(209).send({
                message: 'Le script a renvoyé un code erreur',
                stdout: stdout,
                stderr: stderr,
                return_code: return_code
            })
        } else {
            // print current directory
            res.status(500).send({
                error: 'Echec de l\'exécution du script',
                stdout: stdout,
                stderr: stderr,
                return_code: return_code
            })
        }
    });
})

// GET /api/script
router.get('/', authenticateToken, async(req, res) => {
    // Get all scripts from ../../ps_scripts/
    try {
        var scripts = fs.readdirSync('./ps_scripts/')
        var scriptNames = []
        for (var i = 0; i < scripts.length; i++) {
            scriptNames.push(scripts[i].replace('.ps1', ''))
        }
        res.status(200).json({
            scripts: scriptNames
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
})


// GET /api/script/logs
router.get('/logs', authenticateToken, async(req, res) => {
    // Get 1000 lasts lines from ../../logs/
    try {
        var logs = fs.readFileSync('./logs/logs.txt').toString().split('\n').slice(-1000).join('\n');
        // find in database if user is admin based on name req.user.username
        db.get('SELECT * FROM users WHERE username = ?', req.user.username, (err, row) => {
            if (err) { // if error return 500
                console.log('/api/script/logs: ' + err)
                res.status(500).json({
                    error: err.message
                })
            } else if (row.role_id == 1) {
                // If user is admin, send all logs
                res.status(200).json({
                    logs: logs.split('\n')
                })
            } else {
                // if user is not admin, return only lines with his username
                var logs_user = ''
                for (var i = 0; i < logs.split('\n').length; i++) {
                    if (logs.split('\n')[i].includes('Utilisateur: '+req.user.username)) {
                        logs_user += logs.split('\n')[i] + '\n'
                    }
                }
                res.status(200).json({
                    logs: logs_user.split('\n')
                })
            }
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
})

module.exports = router;
