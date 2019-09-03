'use strict';
var Support = require('../models/AdministratorModel');
var Ticket = require('../models/ticketsModel');
var Finish = require('../models/TicketsFinishModel');
var Client = require('../models/clientModel');
var TicketFinished = require('../models/TicketsFinishModel');

function saveTicket(req, res) {
    var params = req.body;
    var ticket = new Ticket();

    if (params.title && params.description ) {
        ticket.title = params.title.toUpperCase();
        ticket.description = params.description.toUpperCase();
        ticket.status = 'ESPERA';
        ticket.startDate = Date.now();
        ticket.client = params.client;

        ticket.save((err, saveTicket) => {
            if (err) {
                res.status(200).send({ message: 'Error al guardar ticket' });
            } else {
               
                    res.status(200).send({ ticket: saveTicket });
                
            }
        })
    } else {
        res.status(200).send({ message: 'Debes de ingresar todo los campos' });
    }
}

function updateTicket(req, res) {
    var ticketId = req.params.id;
    var params = req.body;
    params.title = params.title.toUpperCase();
    params.description = params.description.toUpperCase();
    Ticket.findByIdAndUpdate(ticketId, params,{new: true},(err, updateTicket) => {
        if (err) {
            res.status(200).send({ message: 'Error al actualizar' });
        }else{
            res.status(200).send({update: updateTicket});
        }
    });
}

function updateTicketConfirm(req,res){
    var ticketId = req.params.id;
    var params = req.body;
    params.status = 'CONFIRMADO';
    Ticket.findByIdAndUpdate(ticketId, params,{new: true},(err, updateTicket)=>{
        if(err){
            res.status(200).send({ message: 'Error al actualizar' });
        }else{
            res.status(200).send({ update: updateTicket });
        }
    })
}
function updateTicketProcess(req,res){
    var ticketId = req.params.id;
    var params = req.body;
    params.status = 'PROCESO'
    Ticket.findByIdAndUpdate(ticketId,params,{new: true},(err,updateTicket)=>{
        if(err){
            res.status(200).send({ message: 'Error al actualizar' });
        }else{
            res.status(200).send({ update: updateTicket });
        }
    })
}
function updateTicketEnd(req,res){
    var ticketId = req.params.id;
    var params = req.body;
    var finish = new Finish();
    params.status = 'Terminado';

    Ticket.findByIdAndUpdate(ticketId,params,{new: true},(err,updateTicket)=>{
        if(err){
            res.status(200).send({ message: 'Error al actualizar' });
        }else{
            finish.title = updateTicket.title;
            finish.description = updateTicket.description;
            finish.status = updateTicket.status;
            finish.startDate = updateTicket.startDate;
            finish.finalDate = Date.now();
            finish.client = updateTicket.client;

            finish.save((err,save)=>{
                if(err){
                    res.status(400).send({message: 'NO se pudo guardar'});
                }else{
                    Ticket.findByIdAndDelete({_id: updateTicket._id},(err)=>{
                        if(err){
                            res.status(400).send({message: 'Error al eliminar'});
                        }else{
                            res.status(200).send({message: 'Se ha terminado el ticket'});
                        }
                    })
                }
            })
        }
    })
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
            //res.status(200).send({ticket: ticketStored});
            Client.populate(ticketStored,{path:'client'},(err,ticketStored)=>{
                if(err){
                    res.status(400).send({message: 'Error al listar'});
                }else{
                    res.status(200).send({ticket: ticketStored});
                }
            })
        }
    })
}
function buscarTicket(req,res){
    var ticketId = req.params.id;
    Ticket.findById({_id: ticketId},(err,buscarTicket)=>{
        if(err){
            res.status(500).send({message: 'Error al buscar el ticket'});
        }else{
            res.status(200).send({ticket: buscarTicket});
        }
    })
}
function TicketAsiganado(req,res){
    var params = req.body
    Ticket.find({client: params.client},(err,buscarTicket)=>{
        if(err){
            res.status(400).send({message: 'Error al buscar Tickets'});
        }else{
            res.status(200).send({ticket: buscarTicket});
        }
    })
}

function ListarTicketTerminado(req, res){

    TicketFinished.find({},(err,buscarTicket)=>{
        if(err){
            res.status(500).send({message: 'Error al buscar el ticket'});
        }else{
            Client.populate(buscarTicket,{path:'client'},(err,ticketStored)=>{
                if(err){
                    res.status(400).send({message: 'Error al listar'});
                }else{
                    res.status(200).send({ticket: ticketStored});
                }
            })
        }
    })
}

module.exports = {
    saveTicket,
    updateTicket,
    deleteTicket,
    listTicket,
    buscarTicket,
    TicketAsiganado,
    updateTicketConfirm,
    updateTicketProcess,
    updateTicketEnd,
    ListarTicketTerminado
}