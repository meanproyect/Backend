'use strict';

var Ticket = require('../models/ticketsModel');
function saveTicket(req, res) {
    var params = req.body;
    var ticket = new Ticket();

    if (params.title && params.description && params.startDate) {
        ticket.title = params.title.toUpperCase();
        ticket.description = params.description.toUpperCase();
        ticket.status = params.status.toUpperCase();
        ticket.startDate = params.startDate;
        ticket.client = params.client;

        ticket.save((err, saveTicket) => {
            if (err) {
                res.status(200).send({ message: 'Error al guardar ticket' });
            } else {
                if (!saveTicket) {
                    res.status(200).send({ message: 'No se ha podido guardar' });
                } else {
                    res.status(200).send({ ticket: saveTicket });
                }
            }
        })
    } else {
        res.status(200).send({ message: 'Debes de ingresar todo los campos' });
    }
}

function updateTicket(req, res) {
    var ticketId = req.params.id;
    var params = req.body;

    Ticket.findByIdAndUpdate(ticketId, params, (err, updateTicket) => {
        if (err) {
            res.status(200).send({ message: 'Error al actualizar' });
        }else{
            res,status(200).send({update: updateTicket});
        }
    });
}

function deleteTicket(req,res){
    var ticketId = req.params.id;

    Ticket.findByIdAndDelete(ticketId,(err)=>{
        if(err){
            res.status(200).send({message: 'Error al eliminar'});
        }else{
            res.status(200).send({message: 'Eliminado de la base de datos'});
        }
    })
}
function listTicket(req,res){

    Ticket.find({},(err,ticketStored)=>{
        if(err){
            res.status(200).send({message: 'Error al listar'});
        }else{
            res.status(200).send({ticket: ticketStored});
        }
    })
}

module.exports = {
    saveTicket,
    updateTicket,
    deleteTicket,
    listTicket
}