'use strict';

var Product = require('../models/ProductoModel');
var bcrypt = require('bcrypt-node');


function saveProduct(req,res){
    var params = req.body;
    var product = new Product();


    if(params.productoId && params.nombreProducto && params.precio && params.cantidad){
        product.productoId = params.productoId;
        product.nombreProducto = params.nombreProducto;
        product.precio = params.precio;
        product.cantidad = params.cantidad;
        product.codeQR = '';

        Product.findOne({productoId: product.productoId, nombreProducto: product.nombreProducto}, (err, buscarProducto)=>{
            if(err){
                res.status(500).send({message: 'Problemas 500 Producto'});
            }else{
                if(!buscarProducto){
                    product.save((err, guardando)=>{
                        if(err){
                            res.status(500).send({message: 'Error 500, Guardar producto'});
                        }else{
                            res.status(200).send({Product: guardando});
                        }
                    })
                }
            }
        })
    }else{
        res.status(200).send({message: 'Debes de agregar todos los campos'});
    }
}

function updateProduct(req,res){
    var params = req.body;
    var productId = req.params.id;
    Product.findByIdAndUpdate(productId, params,{new: true},(err,update)=>{
        if(err){
            res.status(200).send({message: 'Error al actualizar'});
        }else{
            res.status(200).send({product: update});
        }
    });
}
function deleteProduct(req,res){
    var productId = req.params.id;
    Product.findOneAndDelete(productId,(err) =>{
        if(err){
            res.status(200).send({message: "Error al eliminar"});
        }else{
            res.status(200).send({message: 'Se ha eliminado de la bases de datos'});
        }
    });
}
function listProduct(req,res){
    Product.find({}, (err,listar)=>{
        if(err){
            res.status(200).send({message: 'Error al listar productos'});
        }else{
            res.status(200).send({products: listar});
        }
    });
}
module.exports = {
    saveProduct,
    updateProduct,
    deleteProduct,
    listProduct
}