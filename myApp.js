const express = require('express');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const config = require('./config.json');

const app = express();

mongoose.connect(config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true});
app.use('/public', express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

function logger(req, res, next) {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
}

app.use(logger);

app.get('/', (req, res) => {
    const path = __dirname + '/views/index.html';
    res.sendFile(path);
});

app.get('/json', (req, res) => {
    if (process.env.MESSAGE_STYLE === 'uppercase') {
        res.json({ 'message': 'HELLO JSON' });
    } else {
        res.json({ 'message': 'Hello json' });
    }

});

app.get('/now', function date(req, res, next) {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    console.log(req.time);
    res.json({ time: req.time });
});

app.get('/:word/echo', (req, res) => {
    res.json({ echo: req.params.word });
});

app.get('/name', (req, res) => {
    res.json({ name: `${req.query.first} ${req.query.last}` });
});

app.post('/name', (req, res) => {
    res.json({ name: `${req.body.first} ${req.body.last}` });
});













app.listen(3000);










module.exports = app;
