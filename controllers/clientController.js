'use strict'

var Client = require('../models/clientModel');
var bcrypt = require('bcrypt-nodejs');
var Support = require('../models/supportModel');
var Ticket = require('../models/ticketsModel');
function createClient(req, res) {
    var client = new Client();
    var params = req.body;

    if (params.nameClient && params.country && params.password) {
        var date = new Date();
        client.nameClient = params.nameClient.toUpperCase();
        client.country = params.country;
        if (params.nameClient.includes(' ')) {
            var name = params.nameClient.replace(' ', '');
            client.code = name.toUpperCase() + params.country + '-' + date.getFullYear()
        } else {
            client.code = client.nameClient + params.country + '-' + date.getFullYear()
        }

        client.password = params.password;
        client.role = 'CLIENT';
        client.image = null;

        Client.findOne({ code: client.code, country: client.country }, (err, isSetUser) => {
            if (err) {
                res.status(200).send({ message: 'Ya se ha registrado este Client' });
            } else {
                if (!isSetUser) {
                    bcrypt.hash(params.password, null, null, function (err, hash) {
                        client.password = hash;

                        client.save((err, clientStored) => {
                            if (err) {
                                res.status(200).send({ message: 'Error al guardar el Cliente' });
                            } else {
                                res.status(200).send({ client: clientStored });
                            }
                        });
                    });
                } else {
                    res.status(200).send({ message: 'Este Cliente ya se ha registrado' });
                }
            }
        });
    } else {
        res.status(200).send({ message: 'Debes de ingresar la información en todos los campos' });
    }
}

function updateClient(req, res) {
    var params = req.body;
    var clientId = req.params.id;
    params.nameClient = params.nameClient.toUpperCase();
    var date = new Date();
    var name = params.nameClient.replace(' ', '');
    params.code = name.toUpperCase() + params.country + '-' + date.getFullYear()
    if (params.password == '') {
        res.status(200).send({ message: 'Debes de llenar el campo de contraseña' });
    } else {
        bcrypt.hash(params.password, null, null, function (err, hash) {
            {
                params.password = hash
                Client.findByIdAndUpdate(clientId, params, { new: true }, (err, update) => {
                    if (err) {
                        res.status(200).send({ message: 'Error al actualizar' });
                    } else {
                        res.status(200).send({ client: update });
                    }
                });
            }
        });
    }
}

function updateDatos(req, res) {
    var clientId = req.params.id;
    var params = req.body;
    var date = new Date();
    var name = params.nameClient.replace(' ', '');
    params.code = name.toUpperCase() + params.country + '-' + date.getFullYear()

    Client.findByIdAndUpdate(clientId, params, { new: true }, (err, update) => {
        if (err) {
            res.status(200).send({ message: 'Error al actualizar' });
        } else {
            res.status(200).send({ client: update });
        }
    });
}

function deleteClient(req, res) {
    var ClientId = req.params.id;
    var idDefault = '5d6fd1b161859e168c27fb3f'
    Support.populate(ClientId,{path: 'client'},(err,listar)=>{
        if(err){
            res.status(400).send({message: 'Error al listar Support'});
        }else{
            Support.find({client: listar},(err,listarSup)=>{
                if(err){
                    res.status(400).send({message: 'Error al buscar support'});
                }else{
                    // res.status(200).send({Support: listarSup});
                    listarSup.forEach(support => [
                        Support.findByIdAndUpdate({ _id: support._id }, { client: idDefault }, { new: true }, (err, update) => {
                            if (err) {
                                console.log('Error');
                            } else {

                            }
                        })
                    ])
                    Ticket.find({ client: ClientId }, (err, listarTicket) => {
                        if (err) {
                            console.log(err);
                        } else {
                            listarTicket.forEach(ticket => {
                                Ticket.findByIdAndDelete(ticket._id, (err) => {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        console.log('Eliminador Ticket')
                                    }
                                })
                            })
                            Client.findByIdAndDelete(ClientId, (err) => {
                                if (err) {
                                    res.status(200).send({ message: 'Error al eliminar' });
                                } else {
                                    res.status(200).send({ message: 'Se ha eliminado el Cliente' });
                                }
                            });
                        }
                    })
                }
            })
        }
    })
}
function deleteClientDefault(req, res) {

}

function listClients(req, res) {
    Client.find({}, (err, listar) => {
        if (err) {
            res.status(200).send({ message: 'Error al listar los CLientes registrados' });
        } else {
            res.status(200).send({ client: listar });
        }
    });
}

function buscarClient(req, res) {
    var id = req.params.id;
    Client.findById({ _id: id }, (err, buscarClient) => {
        if (err) {
            res.status(500).send({ message: 'No se encontro' });
        } else {
            res.status(200).send({ client: buscarClient });
        }
    })
}

module.exports = {
    createClient,
    updateClient,
    updateDatos,
    deleteClient,
    listClients,
    buscarClient,
    deleteClientDefault
}

