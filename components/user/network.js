const express = require('express');

const response = require('../../network/response');

const router = express.Router();
const controller = require('./controller');

router.get('/', function(req, res) {
    controller.listUsers()
        .then(users => {
            response.success(req, res, users, 200);
        })
        .catch(err => {
            response.error(req, res, 'Internal error', 500, err);
        });
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