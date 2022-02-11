const express = require('express');

const response = require('../../network/response');

const router = express.Router();

router.get('/', function(req,res){
    console.log(req.headers);//las cabeceras
    res.header({
        "custom-header": "Nuestro valor personalizado"
    });
   // res.send('Lista de mensajes');
   response.success(req,res, 'Lista de mensajes');
});

router.delete('/', function(req,res){
    console.log(req.query);
    console.log(req.body);
    res.send('Mensaje ' +req.body.text +' añadido');
});

router.post('/', function(req,res){
    console.log(req.query);
    if(req.query.error =='ok'){
        response.error(req,res,'Error inesperado', 500, 'Es solo una simulacion de error');
    }
    else{
        response.success(req,res, 'Creado correctamente', 201);
    }
    //console.log(req.body);
    // res.status(201).send([{
    //     error: '', message:'Creado correctamente'
    // }]);
   
}) 

module.exports = router;