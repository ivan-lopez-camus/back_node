const express = require('express');
const multer = require('multer');
const path = require("path")
const response = require('../../network/response');
const router = express.Router();
const controller = require('./controller');

// const upload = multer({
//     dest: 'uploads/',
// })

//Guarda la imagen en binario
const storage = multer.diskStorage({
    destination : "public/files/",
    filename : function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + 
        path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage });

router.get('/', function(req,res){
    const filterMessages = req.query.chat || null;
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

router.post('/', upload.single('file'), function(req,res){

    controller.addMensaje(req.body.chat,req.body.user, req.body.message,req.file)
        .then((fullMessage)=>{
            response.success(req,res,fullMessage, 201);
        })
        .catch(e=>{
            response.error(req,res,'Informacion invalida', 400, 'Error en el controlador');
        });
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