const express = require('express');
var app = express();
const server = require('http').Server(app);

const bodyParser = require('body-parser');
const socket = require('./socket');
const db = require('./db');
const router = require('./network/routes');

db('mongodb+srv://ivan:eq5gT9KrAD3ZtSTB@back-node.aamew.mongodb.net/back-node?retryWrites=true&w=majority')

app.use(bodyParser.json()); //es json porque en postman mandaremos json en localhost/3000/message

socket.connect(server);
router(app);

app.use('/app', express.static('public'));

server.listen(3000, function(){
    console.log('La aplicacion esta escuchando en hhtp://localhost:3000');
}); 

