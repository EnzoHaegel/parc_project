const jwt = require('jsonwebtoken');
require('dotenv').config();
const fs = require('fs');

// a function that get a Date (11:59 Thu Apr 14 2022) and return a string with french date (11:59 Jeu Avr 14 2022)
function getFrenchDate(date) {
    var month = date.getMonth();
    var day = date.getDate();
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var dayOfWeek = date.getDay();

    var days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    var dayOfWeekString = days[dayOfWeek];

    var months = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'];
    var monthString = months[month];
    // add a 0 before the minutes and seconds if they are < 10
    if (minutes < 10)
        minutes = '0' + minutes;
    if (seconds < 10)
        seconds = '0' + seconds;
    return dayOfWeekString + ' ' + day + ' ' + monthString + ' ' + year + ' ' + hours + ':' + minutes + ':' + seconds;
}

module.exports = function authenticateToken(req, res, next) {
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    // if there is no token return an error
    if (token == null) return res.status(401).send({ error: 'No token provided.' })

    // verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err)
            console.log('authenticateToken: ' + err)
        if (err) return res.status(403).send({ error: 'Token is not valid.' })
        req.user = user
        if (req.originalUrl === '/api/script/execute') {
            // print date, user and name of script executed
            lineLog = `${getFrenchDate(new Date())} - Utilisateur: ${user.username} - Script lancé: ${req.body.name}`
            //Save in a logs file
            fs.appendFile('./logs/logs.txt', lineLog + '\n', (err) => {console.log(err)});
            console.log(`${getFrenchDate(new Date())} - Utilisateur: ${user.username} - Script lancé: ${req.body.name}`);
        }
        next()
    })
}