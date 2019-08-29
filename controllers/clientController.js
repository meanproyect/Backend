'use strict'

var Client = require('../models/clientModel');
var bcrypt = require('bcrypt-nodejs');

function createClient(req, res){
    var client = new Client();
    var params = req.body;

    if(params.nameClient && params.country && params.password){
       let nameArray = [] 
       var date = new Date();
        nameArray = params.nameClient.split('');
        client.nameClient = params.nameClient;
        client.country = params.country;
        client.clientCode = nameArray[0] +nameArray[1]+ nameArray[2] + nameArray[3] + params.country + date.getFullYear()
        client.password = params.password;
        client.role = 'CLIENT';
        client.image = null;
      
        Client.findOne({nameClient: client.nameClient, country: client.country}, (err, isSetUser) =>{
            if(err){
                res.status(200).send({message: 'Ya se ha registrado este Client'});
            }else{
                if(!isSetUser){
                    bcrypt.hash(params.password, null, null, function(err, hash){
                        client.password = hash;                  

                        client.save((err, clientStored) =>{
                            if(err){
                                res.status(200).send({message: 'Error al guardar el Cliente'});
                            }else{
                                res.status(200).send({client: clientStored});
                            }
                        });
                    });
                }else{
                    res.status(200).send({message: 'Este Cliente ya se ha registrado'});
                }
            }
        });
    }else{
        res.status(500).send({message: 'Debes de ingresar la información en todos los campos'});
    }
}

function updateClient(req, res){
    var params = req.body;
    var clientId = req.params.id;

    Client.findByIdAndUpdate(clientId, params, {new: true}, (err, update) =>{
        if(err){
            res.status(200).send({message: 'Error al actualizar'});
        }else{
            res.status(200).send({client: update});
        }
    });
}

function deleteClient(req, res){
    var clientId = req.params.body;

    Client.findByIdAndDelete(clientId, (err) =>{
        if(err){
            res.status.status(200).send({message: 'Error al eliminar'});
        }else{
            res.status.status(200).send({message: 'Se ha eliminado el Cliente'});
        }
    });
}

function listClients(req, res){
    Client.find({}, (err, listar) =>{
        if(err){
            res.status(200).send({message: 'Error al listar los CLientes registrados'});
        }else{
            res.status(200).send({client: listar});
        }
    });
}

module.exports ={
    createClient,
    updateClient,
    deleteClient,
    listClients
}

