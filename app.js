'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//CORS
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

var administrator_routes = require('./routes/AdministratorRoutes');
var product_routes = require('./routes/productRoutes');
var ticket_routes = require('./routes/ticketsRoutes');
var client_routes = require('./routes/clientRoutes');
var login_routes = require('./routes/LoginRoute');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/AdministratorPlusTI', administrator_routes);
app.use('/VetasPlustTI2019-Products', product_routes);
app.use('/TicketPlusTI', ticket_routes);
app.use('/ClientPlusTI', client_routes);
app.use('/PlusTI', login_routes);




module.exports = app;