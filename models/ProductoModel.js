'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SchemaProducto = Schema({
    productoId: String,
    nombreProducto: String,
    precio: Number,
    cantindad: Number,
    codeQr: String
});

module.exports = mongoose.model('Product', SchemaProducto);