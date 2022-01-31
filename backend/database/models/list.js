const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        minlength: 3
    }
})

const list = mongoose.model('List', listSchema);

module.exports = list;