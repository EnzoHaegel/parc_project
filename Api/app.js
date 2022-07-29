const express = require('express');
const indexRouter = require('./routes/index');
const cors = require('cors');
const app = express();

app.use(cors())
app.use(express.json());
app.use('/api/', indexRouter);
app.listen(4000, () => {
    console.log('listening on port 4000');
})

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});
