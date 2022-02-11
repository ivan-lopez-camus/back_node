const express = require('express');
var app = express();
const server = require('http').Server(app);

const bodyParser = require('body-parser');
const socket = require('./socket');
const db = require('./db');
const router = require('./network/routes');
require('dotenv').config()

db(process.env.DB_URI)

app.use(bodyParser.json()); //es json porque en postman mandaremos json en localhost/3000/message

socket.connect(server);
router(app);

app.use('/app', express.static('public'));

server.listen(process.env.PORT, function(){
    console.log('La aplicacion esta escuchando en hhtp://localhost:3000');
}); 

