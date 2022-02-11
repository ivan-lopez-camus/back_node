const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
db('mongodb+srv://ivan:eq5gT9KrAD3ZtSTB@back-node.aamew.mongodb.net/back-node?retryWrites=true&w=majority')
const router = require('./network/routes');

var app = express();
app.use(bodyParser.json()); //es json porque en postman mandaremos json en localhost/3000/message

router(app);

app.use('/app', express.static('public'));

app.listen(3000); 
console.log('La aplicacion esta escuchando en hhtp://localhost:3000');

