'use strict'

var mongoose = require('mongoose');

var app = require('./app');
var port = process.env.port || 3789;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/DBTicketsPlusTI2019', {useNewUrlParser: true})
.then((err, res) =>{
    console.log('Conexión a la base de datos realizada correctamente.');

    app.listen(port, () => {
        console.log('El servidor de Node y Express son válidos y están en ejecución.');
    });
})
.catch(err => console.log(err));