const express = require('express');

const response = require('../../network/response');

const router = express.Router();
const controller = require('./controller');

router.get('/', function(req,res){
    const filterMessages = req.query.user || null;
    controller.getMessages(filterMessages)
    .then((messageList)=>{
        response.success(req,res,messageList,200);
    })
    .catch(e=>{
        response.error(req,res,'Unexpected Error', 500, e);
    })

});

router.delete('/:id', function(req,res){
    controller.deleteMessage(req.params.id)
        .then(()=>{
            response.success(req,res,`Usuario ${req.params.id} eliminado`,200);
        })
        .catch(e=>{
            response.error(req,res,'Error interno, el usuario ya fue borrado o no existe', 500, e);
        
        })
    
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

router.patch('/:id', function(req,res){
    //console.log(req.params.id);

    controller.updateMessage(req.params.id, req.body.message)
        .then((data)=>{
            response.success(req,res,data,200);
        })
        .catch(e=>{
            response.error(req,res,'Error interno', 500,e);
        });
})
module.exports = router;