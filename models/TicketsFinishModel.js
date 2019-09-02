'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SchemaTicket = Schema({
    title: String,
    decription: String,
    status: String,
    startDate: Date,
    finalDate: Date,
    client: {type: Schema.ObjectId, ref:'Client'}
});

module.exports = mongoose.model('TicketsFinish', SchemaTicket);