const express = require('express');

const response = require('../../network/response');

const router = express.Router();
const controller = require('./controller');

router.get('/', function(req,res){
    const filterName = req.query.name || null;
    controller.getUser(filterName)
    .then((user)=>{
        response.success(req,res,user,200);
    })
    .catch(e=>{
        response.error(req,res,'Unexpected Error', 500, e);
    })

});

router.post('/', function(req,res){

    controller.addUser(req.body.name)
    .then(data=>{
        response.success(req,res,data,200);
    })
    .catch(e=>{
        response.error(req,res,'Internal Error', 500, e);
    })

});

module.exports = router;