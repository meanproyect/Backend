'use strict';
var AdminModel = require('../models/AdministratorModel');
var ClientModel = require('../models/clientModel');
var bcrypt = require('bcrypt-nodejs');
var jwt  = require('../services/jwt');

function login(){
    var params = req.body;
    AdminModel.findOne({code: params.code.toUpperCase()},(err,user)=>{
        if(err){
            res.status(400).send({message = 'Error al buscar'});
        }else{
            if(!user){
                ClientModel.findOne({clientCode: params.clientCode}, (err,user)=>{
                    if(err){
                        res.status(400).send({message: 'Error'});
                    }else{
                        if(!user){
                            res.status(200).send({message: 'No se ha encontrado usuario'});
                        }else{
                            bcrypt.compare(params.password,user.password,(err,check)=>{
                                if(check){
                                    res.status(200).send({token: jwt.createTokenClient(user)})
                                }
                            })
                        }
                    }
                })
            }else{
                bcrypt.compare(params.password,user.password,(err,check)=>{
                    if(check){
                        res.status(200).send({token: jwt.createToken(user)});
                    }else{
                        res.status(200).send({message: 'Contraseña incorrecta'});
                    }
                })
            }
        }
    })
}