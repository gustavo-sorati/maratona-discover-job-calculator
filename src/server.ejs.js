const express = require('express');
const routes = require('./routes/routes');
const path = require('path');

const server = express();


// usando template engine
server.set('view engine', 'ejs');
// Mudar a localização da pasta views
server.set('views', path.join(__dirname, "views", "ejs"));

// habilitar arquivos estaticos
server.use(express.static('public'));

// usar o req.body
server.use(express.urlencoded({
  extended: true
}));

server.use(routes);

server.listen(3000, () => {
  console.log('Server is running in port: 3000');
});
