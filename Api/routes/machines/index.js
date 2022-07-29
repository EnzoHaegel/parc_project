const express = require('express');
const router = express.Router();
var sqlite = require('sqlite3');
var db = new sqlite.Database('./database/identifier.sqlite');
const authenticateToken = require('../../passport/authorization')
const fs = require('fs');
require('dotenv').config();

function returnCpu(id) {
    // return cpu table base on id
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM cpu WHERE id = ?', id, (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}

function returnSystem(id) {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM system WHERE id = ?', id, (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}

function returnDisks(id) {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM disks WHERE id = ?', id, (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}

function returnNetwork(id) {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM network WHERE id = ?', id, (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}

function returnMachine(machine) {
    return new Promise((resolve, reject) => {
        try {
            returnNetwork(machine.network).then(network => {
                // get cpu info
                returnCpu(machine.cpu).then(cpu => {
                    // get disks info
                    returnDisks(machine.disks).then(disks => {
                        // get system info
                        returnSystem(machine.system).then(system => {
                            resolve({
                                id: machine.id,
                                cpu: cpu,
                                disks: disks,
                                network: network,
                                system: system
                            });
                        });
                    });
                });
            });
        } catch (err) {
            reject(err);
        }
    });
}

function returnAllMachines() {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM machine', (err, rows) => {
            if (err) {
                reject(err);
            } else {
                // get all machines with returnMachine array
                let returnMachines = [];
                rows.forEach(row => {
                    returnMachine(row).then(machine => {
                        returnMachines.push(machine);
                        if (returnMachines.length == rows.length) {
                            resolve(returnMachines);
                        }
                    });
                });
            }
        });
    });
}



// GET /api/machines with query params id optional
router.get('/', async (req, res) => {
    var id = req.query.id;
    if (id) {
        // return machine with id and fill its data with network, cpu, disks, and system info based on id
        db.get('SELECT * FROM machine WHERE id = ?', id, (err, row) => {
            if (err) {
                res.status(500).json({
                    error: err.message
                });
            } else {
                if (row) {
                    returnMachine(id).then(machine => {
                        res.status(200).json(machine);
                    });
                } else {
                    res.status(404).json({
                        error: 'Machine not found'
                    });
                }
            }
        });
    } else {
        db.all('SELECT * FROM machine', (err, rows) => {
            if (err) {
                res.status(400).json({
                    error: err
                });
            } else {
                // data = returnAllMachines
                returnAllMachines().then(data => {
                    res.status(200).json({data: data});
                });
            }
        });
    }
});

// GET /api/machines/network with query params id optional, get the network table
router.get('/network', async (req, res) => {
    var id = req.query.id;
    if (id) {
        db.get('SELECT * FROM network WHERE id = ?', id, (err, row) => {
            if (err) {
                res.status(400).json({
                    error: err
                });
            } else {
                res.status(200).json({
                    data: row
                });
            }
        });
    } else {
        db.all('SELECT * FROM network', (err, rows) => {
            if (err) {
                res.status(400).json({
                    error: err
                });
            } else {
                res.status(200).json({
                    data: rows
                });
            }
        });
    }
});

// GET /api/machines/system with query params id optional, get the system table
router.get('/system', async (req, res) => {
    var id = req.query.id;
    if (id) {
        db.get('SELECT * FROM system WHERE id = ?', id, (err, row) => {
            if (err) {
                res.status(400).json({
                    error: err
                });
            } else {
                res.status(200).json({
                    data: row
                });
            }
        });
    } else {
        db.all('SELECT * FROM system', (err, rows) => {
            if (err) {
                res.status(400).json({
                    error: err
                });
            } else {
                res.status(200).json({
                    data: rows
                });
            }
        });
    }
});

// GET /api/machines/disks with query params id optional, get the disks table
router.get('/disks', async (req, res) => {
    var id = req.query.id;
    if (id) {
        db.get('SELECT * FROM disks WHERE id = ?', id, (err, row) => {
            if (err) {
                res.status(400).json({
                    error: err
                });
            } else {
                res.status(200).json({
                    data: row
                });
            }
        });
    } else {
        db.all('SELECT * FROM disks', (err, rows) => {
            if (err) {
                res.status(400).json({
                    error: err
                });
            } else {
                res.status(200).json({
                    data: rows
                });
            }
        });
    }
});

// GET /api/machines/cpu with query params id optional, get the cpu table
router.get('/cpu', async (req, res) => {
    var id = req.query.id;
    if (id) {
        db.get('SELECT * FROM cpu WHERE id = ?', id, (err, row) => {
            if (err) {
                res.status(400).json({
                    error: err
                });
            } else {
                res.status(200).json({
                    data: row
                });
            }
        });
    } else {
        db.all('SELECT * FROM cpu', (err, rows) => {
            if (err) {
                res.status(400).json({
                    error: err
                });
            } else {
                res.status(200).json({
                    data: rows
                });
            }
        });
    }
});

module.exports = router;
