const express = require('express');

const response = require('../../network/response');

const router = express.Router();
const controller = require('./controller');

router.get('/', function(req,res){

    controller.getMessages()
    .then((messageList)=>{
        response.success(req,res,messageList,200);
    })
    .catch(e=>{
        response.error(req,res,'Unexpected Error', 500, e);
    })
//     console.log(req.headers);//las cabeceras
//     res.header({
//         "custom-header": "Nuestro valor personalizado"
//     });
//    // res.send('Lista de mensajes');
//    response.success(req,res, 'Lista de mensajes');
});

router.delete('/', function(req,res){
    console.log(req.query);
    console.log(req.body);
    res.send('Mensaje ' +req.body.text +' añadido');
});

router.post('/', function(req,res){
    
    controller.addMensaje(req.body.user, req.body.message)
        .then((fullMessage)=>{
            response.success(req,res,fullMessage, 201);
        })
        .catch(e=>{
            response.error(req,res,'Informacion invalida', 400, 'Error en el controlador');
        });

    // if(req.query.error =='ok'){
    //     response.error(req,res,'Error inesperado', 500, 'Es solo una simulacion de error');
    // }
    // else{
    //     response.success(req,res, 'Creado correctamente', 201);
    // }
    //console.log(req.body);
    // res.status(201).send([{
    //     error: '', message:'Creado correctamente'
    // }]);
   
}) 

module.exports = router;