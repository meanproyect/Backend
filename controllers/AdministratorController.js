'use strict'

var User = require('../models/AdministratorModel');
var bcrypt = require('bcrypt-nodejs');
//var jwt = require('../services/jwt');
// var fs = require('fs');
// var path = require('path');

function saveuser(req, res) {
    var user = new User();
    var params = req.body;

    if (params.password && params.name && params.surname ) {
        var nameArray = params.name.split('');
        var date = new Date
        var finalCode = nameArray[0]+nameArray[1] + '-' +'ADMINISTRATOR' +'-'+ params.surname + date.getFullYear();
        user.name = params.name.toUpperCase();
        user.surname = params.surname.toUpperCase();
        user.password = params.password.toUpperCase();
        user.role = 'ADMINISTRATOR';
        user.code = finalCode.toUpperCase();
        user.image = params.image;

        User.findOne({ code: user.code }, (err, issetUser) => {
            if (err) {
                res.status(200).send({ message: 'Ya esta registrado el usuario' });
            } else {
                if (!issetUser) {
                    bcrypt.hash(params.password, null, null, function (err, hash) {
                        user.password = hash;
                        user.save((err, userStored) => {
                            if (err) {
                                res.status(200).send({ message: 'Error al guardar el usuario' });
                            } else {
                                res.status(200).send({ user: userStored });
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

function updateuser(req, res) {
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
                User.findByIdAndUpdate(userId, params, { new: true }, (err, update) => {
                    if (err) {
                        res.status(200).send({ message: 'Error al actualizar' });
                    } else {
                        res.status(200).send({ user: update });
                    }
                });
            })
        }
    } else {
      
    }

}
function updateDatos(req,res){
    var userId = req.params.id;
    var params = req.body;
    params.name = params.name.toUpperCase();
    params.surname = params.surname.toUpperCase();
    params.role = 'ADMINISTRATOR';
    User.findByIdAndUpdate(userId, params, { new: true }, (err, update) => {
        if (err) {
            res.status(200).send({ message: 'Error al actualizar' });
        } else {
            res.status(200).send({ user: update });
        }
    });
}

function deleteUser(req, res) {
    var userId = req.params.id
    User.findByIdAndDelete(userId, (err) => {
        if (err) {
            res.stauts(200).send({ message: 'Error al eliminar el usuario' });
        } else {
            res.status(200).send({ message: 'Se ha eliminado el usuario' });
        }
    });
}

function listUser(req, res) {
    User.find({}, (err, listar) => {
        if (err) {
            res.status(200).send({ message: 'Error al listar los usuarios registrados' });
        } else {
            res.status(200).send({ users: listar });
        }
    });
}
function buscandoUser(req, res) {
    var id = req.params.id;
    User.findById({ _id: id }, (err, buscandoUser) => {
        if (err) {
            res.status(200).send({ message: 'Error al buscar' });
        } else {
            res.status(200).send({ user: buscandoUser });
        }
    })
}


module.exports = {
    saveuser,
    updateuser,
    updateDatos,
    deleteUser,
    listUser,
    buscandoUser

}