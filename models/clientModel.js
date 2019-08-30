'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientSchema = Schema({
    nameClient: String,
    country: String,
    code: String,
    password: String,
    role: String,
    image: String
});

module.exports = mongoose.model('Client', ClientSchema);

