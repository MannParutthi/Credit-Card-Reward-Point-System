const express = require('express');
const app = express();
const mongoose = require('./database/mongoose');

const list = require('./database/models/list');
const task = require('./database/models/task');

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS, HEAD, PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('/lists', (req, res) => {
    list.find({})
        .then(lists => res.send(lists))
        .catch(err => console.log(err));
});

app.post('/lists', (req, res) => {
    (new list({ 'title': req.body.title }))
        .save()
        .then(list => res.send(list))
        .catch(err => console.log(err));
});

app.get('/lists/:listId', (req, res) => {
    list.find({ _id : req.params.listId })
        .then(list => res.send(list))
        .catch(err => console.log(err));
});

app.patch('/lists/:listId', (req, res) => {
    list.findByIdAndUpdate({ '_id': req.params.listId}, { $set: req.body })
        .then(list => res.send(list))
        .catch(err => console.log(err));
});

app.delete('/lists/:listId', (req, res) => {
    list.findByIdAndDelete(req.params.listId)
        .then(list => res.send(list))
        .catch(err => console.log(err));
});


app.listen(3000, () => console.log("Server is connected on Port 3000"))