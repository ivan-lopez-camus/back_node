const express = require('express');
const bodyParser = require('body-parser');

//const router = require('./components/messages/network')
const router = require('./network/routes');

var app = express();
app.use(bodyParser.json()); //es json porque en postman mandaremos json en localhost/3000/message
//app.use(router); //agrega el router a la aplicacion en express
//toda funcion http tiene request y response
// app.use('/', function(req,resp){
//         resp.send('Hola');
// });

router(app);

app.use('/app', express.static('public'));

app.listen(3000);
console.log('La aplicacion esta escuchando en hhtp://localhost:3000');

