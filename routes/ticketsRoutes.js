'use sstrict';
var express = require('express');
var ticketController = require('../controllers/ticketsController');
var api = express.Router();
const multer = require('multer');
var path = require('path');
var storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads/Tickets');
    },
    filename: function(req,file,cb){
        cb(null, req.params.id + path.extname(file.originalname))
    }
});

var upload = multer({storage: storage})


api.post('/Save-Ticket', ticketController.saveTicket);
api.post('/uploadPhoto/:id/upload',upload.single('photo'), ticketController.setImage);
api.get('/getPhoto/:id',ticketController.getImage);
api.put('/Update-Ticket/:id', ticketController.updateTicket);
api.put('/Update-Confim/:id', ticketController.updateTicketConfirm);
api.put('/Update-Process/:id', ticketController.updateTicketProcess);
api.put('/Update-Wait/:id', ticketController.updateTicketWait);
api.put('/Update-ConfirmClient/:id', ticketController.updateTicketofClient);
api.put('/Update-finish/:id',ticketController.updateTicketEnd);
api.put('/Delete-ticket/:id', ticketController.deleteTicket);
api.get('/List-Tickets', ticketController.listTicket);
api.get('/Buscar-Ticket/:id', ticketController.buscarTicket);
api.post('/Assigned-Ticket', ticketController.TicketAsiganado);
api.get('/Listar-Tickets-Terminados', ticketController.ListarTicketTerminado);

module.exports = api;