'use strict';

var express = require('express');
var productController = require('../controllers/ProductosController');
var api = express.Router();

api.post('/Save-Product', productController.saveProduct);
api.put('/Update-Product', productController.updateProduct);
api.put('/delete-Product', productController.deleteProduct);
api.get('/list-Products', productController.listProduct);

module.exports = api;