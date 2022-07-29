const express = require('express');
const router = express.Router();
const auth = require('./auth')
const scripts = require('./scripts')
const user = require('./user')
const application = require('./application')
const machines = require('./machines')

router.use('/auth', auth);
router.use('/script', scripts);
router.use('/user', user);
router.use('/application', application);
router.use('/machines', machines);

router.get('/', (req, res) => {
    res.status(200).json({message: 'API works'});
});

module.exports = router;
