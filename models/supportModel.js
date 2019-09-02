'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var SupportSchema = Schema({
    name: String,
    surname: String,
    password: String,
    role: String,
    code: String,
    image: String,
    client: {type: Schema.ObjectId, ref:'Client'}
});

module.exports = mongoose.model('Support', SupportSchema);