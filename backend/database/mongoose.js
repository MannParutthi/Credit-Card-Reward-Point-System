const mongoose = require('mongoose');

mongoose.Promise = global.Promise; //allows us to use promises to handle async code e.g connecting to db 

mongoose.connect('mongodb://127.0.0.1:27017/co-ccrps-db', { useNewUrlParser: true, useUnifiedTopology: true }) // default port no of mongodb
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log(err));

module.exports = mongoose;
