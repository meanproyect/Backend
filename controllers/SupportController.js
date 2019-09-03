'use strict'


var bcrypt = require('bcrypt-nodejs');
var Support = require('../models/supportModel');
var Client = require('../models/clientModel');
//var jwt = require('../services/jwt');
// var fs = require('fs');
// var path = require('path');

function saveSupport(req, res) {
    var params = req.body;
    var support = new Support();

    if (params.password && params.name && params.surname  && params.client) {
        var nameArray = params.name.split('');
        var date = new Date
        var finalCode = nameArray[0] + nameArray[1] + '-' + 'SUPPORT' + '-' + params.surname + date.getFullYear();
        support.name = params.name.toUpperCase();
        support.surname = params.surname.toUpperCase();
        support.password = params.password.toUpperCase();
        support.role = 'SUPPORT';
        support.code = finalCode.toUpperCase();
        support.client = params.client;
        support.image = params.image;

        Support.findOne({ code: support.code }, (err, issetUser) => {
            if (err) {
                res.status(200).send({ message: 'Ya esta registrado el usuario' });
            } else {
                if (!issetUser) {
                    bcrypt.hash(params.password, null, null, function (err, hash) {
                        support.password = hash;
                        support.save((err, userStored) => {
                            if (err) {
                                res.status(200).send({ message: 'Error al guardar el usuario' });
                            } else {
                                res.status(200).send({ support: userStored });
                            }
                        })
                    })
                } else {
                    res.status(200).send({ message: 'Ya esta registrado el usuario' });
                }
            }
        })
    } else {
        res.status(200).send({ message: 'Debes de ingresar la informacion en todos los campos' });
    }


}

function updateSupport(req, res) {
    var params = req.body;
    var userId = req.params.id;
    params.name = params.name.toUpperCase();
    params.surname = params.surname.toUpperCase();
    if (userId != '') {
        if (params.password == '') {
            res.status(200).send({ message: 'Debes de ingresar la contraseña obligatoriamente' });
        } else {

            bcrypt.hash(params.password, null, null, function (err, hash) {
                params.password = hash;
                Support.findByIdAndUpdate(userId, params, { new: true }, (err, update) => {
                    if (err) {
                        res.status(200).send({ message: 'Error al actualizar' });
                    } else {
                        res.status(200).send({ support: update });
                    }
                });
            })
        }
    } else {

    }

}
function updateDatos(req, res) {
    var userId = req.params.id;
    var params = req.body;
    params.name = params.name.toUpperCase();
    params.surname = params.surname.toUpperCase();
    Support.findByIdAndUpdate(userId, params, { new: true }, (err, update) => {
        if (err) {
            res.status(200).send({ message: 'Error al actualizar' });
        } else {
            res.status(200).send({ support: update });
        }
    });
}

function deleteSupport(req, res) {
    var userId = req.params.id
    Support.findByIdAndDelete(userId, (err) => {
        if (err) {
            res.stauts(200).send({ message: 'Error al eliminar el usuario' });
        } else {
            res.status(200).send({ message: 'Se ha eliminado el usuario' });
        }
    });
}

function listSupport(req, res) {
    Support.find({}, (err, listar) => {
        if (err) {
            res.status(200).send({ message: 'Error al listar los usuarios registrados' });
        } else {
            //res.status(200).send({ support: listar });
            Client.populate(listar,{path: 'client'},(err,listar)=>{
                if(err){
                    res.status(400).send({message: 'Error al buscar Client'});
                }else{
                    res.status(200).send({support: listar});
                }
            })
        }
    });
}
function buscandoSupport(req, res) {
    var id = req.params.id;
    Support.findById({ _id: id }, (err, buscandoUser) => {
        if (err) {
            res.status(200).send({ message: 'Error al buscar' });
        } else {
            res.status(200).send({ support: buscandoUser });
        }
    });
}

module.exports ={
    saveSupport,
    updateSupport,
    updateDatos,
    deleteSupport,
    listSupport,
    buscandoSupport
}
