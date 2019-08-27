'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var administrator_routes = require('./routes/AdministratorRoutes');
var product_routes = require('./routes/productRoutes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/VentasPlusTI2019', administrator_routes);
app.use('/VetasPlustTI2019-Products', product_routes);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

module.exports = app;