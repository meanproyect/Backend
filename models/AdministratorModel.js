'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdministratorSchema = Schema({
    name: String,
    surname: String,
    password: String,
    role: String,
    code: String,
    image: String
});

module.exports = mongoose.model('Administrator', AdministratorSchema);

